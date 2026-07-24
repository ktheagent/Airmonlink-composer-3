'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('Build 19 packaged entry installs and verifies the Composer 3 shell', () => {
  const bootstrap = read('src/bootstrap.js');
  const shell = read('src/ui/composer3-shell.js');

  assert.match(bootstrap, /const BUILD = 19;/);
  assert.match(bootstrap, /browser-window-created/);
  assert.match(bootstrap, /did-finish-load/);
  assert.match(bootstrap, /window\.hide\(\)/);
  assert.match(bootstrap, /installComposer3Shell/);
  assert.match(bootstrap, /AirmonComposer3Shell/);
  assert.match(bootstrap, /legacyNavigationInert/);
  assert.match(bootstrap, /staffViewportOverlapped/);
  assert.match(bootstrap, /composer3-shell-ready/);
  assert.match(bootstrap, /require\(['"]\.\/main['"]\)/);

  assert.match(shell, /const BUILD = 19;/);
  assert.match(shell, /retireLegacyNavigation/);
  assert.match(shell, /Build \$\{BUILD\} · Composer 3/);
  assert.match(shell, /data-build-19-badge/);
});

test('Build 19 preserves direct publishing and docking verification', () => {
  const bootstrap = read('src/bootstrap.js');
  const controller = read('src/ui/publishing-controller.js');
  const html = read('src/ui/index.html');

  assert.match(bootstrap, /window\.AirmonPublishingUI/);
  assert.match(bootstrap, /window\.AirmonDockManager/);
  assert.match(bootstrap, /publishingResult\.pdfControls < 2/);
  assert.match(bootstrap, /publishingResult\.pngControls < 2/);
  assert.match(bootstrap, /dockingResult\.handles < 3/);

  assert.match(controller, /AirmonPublishingUI/);
  assert.match(controller, /beginPdf/);
  assert.match(controller, /beginPng/);
  assert.match(controller, /showPngPage/);
  assert.match(controller, /document\.addEventListener\(['"]click['"]/);
  assert.doesNotMatch(controller, /MutationObserver|queueMicrotask/);

  assert.match(html, /data-publish="pdf"/);
  assert.match(html, /data-publish="png"/);
  assert.match(html, /data-command="system-print"/);
  assert.match(html, /dock-manager\.js/);
  assert.match(html, /publishing-controller\.js/);
});
