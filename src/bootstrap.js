'use strict';

const { app, BrowserWindow, dialog, shell } = require('electron');
const fs = require('node:fs/promises');
const publishing = require('./desktop/publishing');

const BUILD = 17;
const active = new WeakSet();

function js(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function logValidation(stage, details = {}) {
  const target = process.env.AIRMONLINK_VALIDATION_LOG;
  if (!target) return Promise.resolve();
  const record = JSON.stringify({
    timestamp: new Date().toISOString(),
    stage,
    ...details
  });
  return fs.appendFile(target, `${record}\n`, 'utf8').catch(() => {});
}

async function rendererCall(contents, method, ...args) {
  return contents.executeJavaScript(
    `window.AirmonPublishingUI?.${method}?.(${args.map(js).join(',')})`,
    true
  );
}

async function complete(contents, result) {
  if (!contents.isDestroyed()) {
    await rendererCall(contents, 'complete', result).catch(() => {});
  }
}

async function exportPdf(contents, request) {
  const window = BrowserWindow.fromWebContents(contents);
  const selected = await dialog.showSaveDialog(window, {
    title: 'Export dedicated PDF',
    defaultPath: publishing.pdfFileName(request),
    buttonLabel: 'Export PDF',
    filters: [{ name: 'PDF document', extensions: ['pdf'] }],
    properties: ['showOverwriteConfirmation']
  });

  if (selected.canceled || !selected.filePath) {
    return complete(contents, { kind: 'pdf', cancelled: true });
  }

  await rendererCall(contents, 'beginPdf', request.view);
  try {
    const data = publishing.assertPdfBuffer(
      await contents.printToPDF(publishing.pdfOptions(request))
    );
    await publishing.atomicWrite(selected.filePath, data);
    await complete(contents, { kind: 'pdf', filePath: selected.filePath });
  } finally {
    await rendererCall(contents, 'endPublishing').catch(() => {});
  }
}

async function exportPng(contents, request) {
  const window = BrowserWindow.fromWebContents(contents);
  const selected = await dialog.showSaveDialog(window, {
    title: 'Export numbered PNG pages',
    defaultPath: `${publishing.pngBaseName(request)}-page-001.png`,
    buttonLabel: 'Export PNG Pages',
    filters: [{ name: 'PNG image', extensions: ['png'] }],
    properties: ['showOverwriteConfirmation']
  });

  if (selected.canceled || !selected.filePath) {
    return complete(contents, { kind: 'png', cancelled: true });
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

  const targets = Array.from({ length: info.count }, (_, index) =>
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
    await complete(contents, { kind: 'png', count: files.length, files });
  } catch (error) {
    await batch.rollback().catch(() => {});
    throw error;
  } finally {
    await rendererCall(contents, 'endPublishing').catch(() => {});
  }
}

async function handlePublishing(contents, parsed) {
  if (active.has(contents)) {
    return complete(contents, {
      kind: parsed.kind,
      error: 'Another export is already running.'
    });
  }

  active.add(contents);
  try {
    if (parsed.kind === 'pdf') await exportPdf(contents, parsed.request);
    else await exportPng(contents, parsed.request);
  } catch (error) {
    await complete(contents, {
      kind: parsed.kind,
      error: error?.messae || String(error)
    });
  } finally {
    active.delete(contents);
  }
}

async function verifyNativeUi(window) {
  const contents = window.webContents;
  const result = await contents.executeJavaScript(
    `(() => ({
      publishing: window.AirmonPublishingUI?.verify?.() || null,
      docking: window.AirmonDockManager?.verify?.() || null
    }))()`,
    true
  );

  const publishingResult = result?.publishing;
  const dockingResult = result?.docking;
  if (
    !publishingResult ||
    publishingResult.build !== BUILD ||
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
    throw new Error(`Canonical renderer verification failed: ${JSON.stringify(result)}`);
  }

  await logValidation('native-ui-ready', result);
  return result;
}

function attach(window) {
  const contents = window.webContents;

  contents.setWindowOpenHandler(({ url }) => {
    const parsed = publishing.publishingUrl(url);
    if (parsed) {
      void handlePublishing(contents, parsed);
      return { action: 'deny' };
    }
    if (/^https?:/i.test(url)) void shell.openExternal(url);
    return { action: 'deny' };
  });

  contents.on('did-finish-load', () => {
    void verifyNativeUi(window).catch(async error => {
      console.error('[native-ui] verification failed:', error);
      await logValidation('native-ui-failed', {
        build: BUILD,
        error: error?.message || String(error)
      });
      if (!window.isDestroyed()) {
        await dialog.showMessageBox(window, {
          type: 'error',
          title: 'Airmonlink interface failed to load',
          message: `Build ${BUILD} could not activate the new interface.`,
          detail: error?.message || String(error),
          buttons: ['OK'],
          noLink: true
        }).catch(() => {});
      }
    });
  });
}

app.on('browser-window-created', (_event, window) => attach(window));
require('./main');
