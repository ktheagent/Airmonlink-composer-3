'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('Build 18 entry point verifies direct publishing and docking after renderer load', () => {
  const bootstrap = read('src/bootstrap.js');
  const controller = read('src/ui/publishing-controller.js');
  const html = read('src/ui/index.html');

  assert.match(bootstrap, /browser-window-created/);
  assert.match(bootstrap, /did-finish-load/);
  assert.match(bootstrap, /const BUILD = 18;/);
  assert.match(bootstrap, /verifyNativeUi/);
  assert.match(bootstrap, /AirmonPublishingUI/);
  assert.match(bootstrap, /AirmonDockManager/);
  assert.match(bootstrap, /native-ui-ready/);
  assert.match(bootstrap, /require\(['"]\.\/main['"]\)/);

  assert.match(controller, /const BUILD = 18;/);
  assert.match(controller, /AirmonPublishingUI/);
  assert.match(controller, /beginPdf/);
  assert.match(controller, /beginPng/);
  assert.match(controller, /showPngPage/);
  assert.match(controller, /verify\(\)/);

  assert.match(html, /Dedicated PDF/);
  assert.match(html, /PNG Pages/);
  assert.match(html, /System Print/);
  assert.match(html, /publishing-controller\.js/);
  assert.match(html, /dock-manager\.js/);

  assert.doesNotMatch(bootstrap, /release-bootstrap\.js|publishing-exposure\.js|publishing-ui\.js/);
});

test('Build 18 publishing controller uses static controls without document observers', () => {
  const controller = read('src/ui/publishing-controller.js');
  const html = read('src/ui/index.html');

  assert.match(controller, /document\.addEventListener\(['"]click['"]/);
  assert.match(controller, /Object\.freeze/);
  assert.match(controller, /data-publish="pdf"/);
  assert.match(controller, /data-publish="png"/);
  assert.match(controller, /data-command="system-print"/);
  assert.doesNotMatch(controller, /MutationObserver|queueMicrotask/);

  assert.match(html, /data-publish="pdf"/);
  assert.match(html, /data-publish="png"/);
  assert.match(html, /data-command="system-print"/);
});
