'use strict';

const { app, BrowserWindow, dialog, shell } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const publishing = require('./desktop/publishing');

const BUILD = 19;
const SHELL_CSS = path.join(__dirname, 'ui', 'composer3-shell.css');
const SHELL_JS = path.join(__dirname, 'ui', 'composer3-shell.js');
const activePublishing = new WeakSet();

function serialize(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

async function logValidation(stage, details = {}) {
  const target = process.env.AIRMONLINK_VALIDATION_LOG;
  if (!target) return;
  const record = JSON.stringify({
    timestamp: new Date().toISOString(),
    stage,
    build: BUILD,
    ...details
  });
  await fs.appendFile(target, `${record}\n`, 'utf8').catch(() => {});
}

async function rendererCall(contents, method, ...args) {
  return contents.executeJavaScript(
    `window.AirmonPublishingUI?.${method}?.(${args.map(serialize).join(',')})`,
    true
  );
}

async function completePublishing(contents, result) {
  if (!contents.isDestroyed()) {
    await rendererCall(contents, 'complete', result).catch(() => {});
  }
}

async function exportPdf(contents, request) {
  const owner = BrowserWindow.fromWebContents(contents);
  const selected = await dialog.showSaveDialog(owner, {
    title: 'Export dedicated PDF',
    defaultPath: publishing.pdfFileName(request),
    buttonLabel: 'Export PDF',
    filters: [{ name: 'PDF document', extensions: ['pdf'] }],
    properties: ['showOverwriteConfirmation']
  });

  if (selected.canceled || !selected.filePath) {
    return completePublishing(contents, { kind: 'pdf', cancelled: true });
  }

  await rendererCall(contents, 'beginPdf', request.view);
  try {
    const data = publishing.assertPdfBuffer(
      await contents.printToPDF(publishing.pdfOptions(request))
    );
    await publishing.atomicWrite(selected.filePath, data);
    await completePublishing(contents, {
      kind: 'pdf',
      filePath: selected.filePath
    });
  } finally {
    await rendererCall(contents, 'endPublishing').catch(() => {});
  }
}

async function exportPng(contents, request) {
  const owner = BrowserWindow.fromWebContents(contents);
  const selected = await dialog.showSaveDialog(owner, {
    title: 'Export numbered PNG pages',
    defaultPath: `${publishing.pngBaseName(request)}-page-001.png`,
    buttonLabel: 'Export PNG Pages',
    filters: [{ name: 'PNG image', extensions: ['png'] }],
    properties: ['showOverwriteConfirmation']
  });

  if (selected.canceled || !selected.filePath) {
    return completePublishing(contents, { kind: 'png', cancelled: true });
  }

  const info = await rendererCall(contents, 'beginPng', request.view);
  if (
    !info ||
    !Number.isInteger(info.count) ||
    info.count < 1 ||
    info.count > 2000
  ) {
    throw new Error('The renderer returned an invalid page count.');
  }

  const targets = Array.from({ length: info.count }, (_unused, index) =>
    publishing.numberedPngPath(selected.filePath, index + 1, info.count)
  );
  const batch = publishing.createAtomicBatch(targets);

  try {
    for (let index = 0; index < info.count; index += 1) {
      const rect = publishing.normalizeCaptureRect(
        await rendererCall(contents, 'showPngPage', index)
      );
      const image = await contents.capturePage(rect, { stayAwake: true });
      await batch.stage(index, publishing.assertPngBuffer(image.toPNG()));
    }
    const files = await batch.commit();
    await completePublishing(contents, {
      kind: 'png',
      count: files.length,
      files
    });
  } catch (error) {
    await batch.rollback().catch(() => {});
    throw error;
  } finally {
    await rendererCall(contents, 'endPublishing').catch(() => {});
  }
}

async function handlePublishing(contents, parsed) {
  if (activePublishing.has(contents)) {
    return completePublishing(contents, {
      kind: parsed.kind,
      error: 'Another export is already running.'
    });
  }

  activePublishing.add(contents);
  try {
    if (parsed.kind === 'pdf') {
      await exportPdf(contents, parsed.request);
    } else {
      await exportPng(contents, parsed.request);
    }
  } catch (error) {
    await completePublishing(contents, {
      kind: parsed.kind,
      error: error?.message || String(error)
    });
  } finally {
    activePublishing.delete(contents);
  }
}

async function installComposer3Shell(window) {
  const [css, source] = await Promise.all([
    fs.readFile(SHELL_CSS, 'utf8'),
    fs.readFile(SHELL_JS, 'utf8')
  ]);

  if (window.isDestroyed()) return null;

  await window.webContents.insertCSS(css, { cssOrigin: 'author' });
  await window.webContents.executeJavaScript(source, true);

  const result = await window.webContents.executeJavaScript(
    `(() => ({
      shell: window.AirmonComposer3Shell?.verify?.() || null,
      publishing: window.AirmonPublishingUI?.verify?.() || null,
      docking: window.AirmonDockManager?.verify?.() || null
    }))()`,
    true
  );

  const shellResult = result?.shell;
  const publishingResult = result?.publishing;
  const dockingResult = result?.docking;

  if (
    !shellResult ||
    shellResult.mounted !== true ||
    shellResult.build !== BUILD ||
    shellResult.tabs !== 6 ||
    shellResult.activePanels !== 1 ||
    shellResult.publishControls < 7 ||
    shellResult.legacyNavigationInert !== true ||
    shellResult.staffViewportOverlapped === true ||
    !publishingResult ||
    publishingResult.api !== true ||
    publishingResult.native !== true ||
    publishingResult.pdfControls < 2 ||
    publishingResult.pngControls < 2 ||
    publishingResult.badge !== true ||
    publishingResult.status !== true ||
    publishingResult.forbidden?.length ||
    !dockingResult ||
    dockingResult.handles < 3 ||
    dockingResult.dropZone !== true ||
    dockingResult.panels < 3
  ) {
    throw new Error(
      `Composer 3 runtime verification failed: ${JSON.stringify(result)}`
    );
  }

  const verified = {
    shell: shellResult,
    publishing: { ...publishingResult, build: BUILD },
    docking: dockingResult
  };
  await logValidation('composer3-shell-ready', verified);
  await logValidation('native-ui-ready', verified);
  return verified;
}

async function showFatalInterfaceFailure(window, error) {
  const detail = error?.message || String(error);
  await logValidation('composer3-shell-failed', { error: detail });

  if (window.isDestroyed()) return;

  const safeDetail = detail.replace(
    /[<>&]/g,
    character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[character]
  );
  await window.webContents.executeJavaScript(
    `document.body.innerHTML = ${serialize(`
      <main style="font-family:Segoe UI,sans-serif;max-width:760px;margin:10vh auto;padding:32px;border:1px solid #d5ddea;border-radius:16px;background:#fff;color:#10233d;box-shadow:0 16px 46px rgba(7,26,51,.18)">
        <h1 style="margin-top:0">Composer 3 interface could not start</h1>
        <p>The application stopped before exposing the legacy workspace. An outdated interface will not be presented as the new release.</p>
        <p><strong>Build ${BUILD}</strong></p>
        <pre style="white-space:pre-wrap;background:#f4f7fb;padding:14px;border-radius:9px">${safeDetail}</pre>
      </main>
    `)};`,
    true
  ).catch(() => {});

  window.show();
  await dialog.showMessageBox(window, {
    type: 'error',
    title: 'Airmonlink Composer 3 could not start',
    message: `Build ${BUILD} could not activate the Composer 3 interface.`,
    detail,
    buttons: ['Close'],
    noLink: true
  }).catch(() => {});
}

function attach(window) {
  const contents = window.webContents;
  window.hide();

  contents.setWindowOpenHandler(({ url }) => {
    const parsed = publishing.publishingUrl(url);
    if (parsed) {
      void handlePublishing(contents, parsed);
      return { action: 'deny' };
    }
    if (/^https?:/i.test(url)) void shell.openExternal(url);
    return { action: 'deny' };
  });

  contents.once('did-finish-load', () => {
    void installComposer3Shell(window)
      .then(() => {
        if (!window.isDestroyed()) window.show();
      })
      .catch(error => {
        console.error('[composer3-shell] activation failed:', error);
        void showFatalInterfaceFailure(window, error);
      });
  });
}

app.on('browser-window-created', (_event, window) => attach(window));

require('./main');
