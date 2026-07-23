'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('Build 18 package uses the direct publishing bootstrap', () => {
  const pkg = require('../package.json');
  assert.equal(pkg.main, 'src/bootstrap.js');
  assert.equal(pkg.buildNumber, '18');
  assert.equal(pkg.build.buildVersion, '1.1.0.18');
  assert.match(pkg.build.nsis.artifactName, /Build18/);
  assert.match(pkg.build.portable.artifactName, /Build18/);
});

test('Build 18 publishing controller binds visible static controls without observers', () => {
  const controller = read('src/ui/publishing-controller.js');
  const html = read('src/ui/index.html');

  assert.match(controller, /const BUILD = 18;/);
  assert.match(controller, /AirmonPublishingUI/);
  assert.match(controller, /data-publish="pdf"/);
  assert.match(controller, /data-publish="png"/);
  assert.match(controller, /pdfControls/);
  assert.match(controller, /pngControls/);
  assert.doesNotMatch(controller, /MutationObserver/);

  assert.match(html, /Dedicated PDF/);
  assert.match(html, /PNG Pages/);
  assert.match(html, /System Print/);
  assert.match(html, /data-build-18-badge/);
});

test('desktop bootstrap verifies direct controls inside the live renderer', () => {
  const source = read('src/bootstrap.js');
  assert.match(source, /const BUILD = 18;/);
  assert.match(source, /AirmonPublishingUI/);
  assert.match(source, /AirmonDockManager/);
  assert.match(source, /native-ui-ready/);
  assert.match(source, /publishingResult\.pdfControls < 2/);
  assert.match(source, /publishingResult\.pngControls < 2/);
  assert.match(source, /dialog\.showMessageBox/);
  assert.doesNotMatch(source, /publishing-exposure\.js|publishing-ui\.js/);
});

test('Windows validator requires built renderer proof before artifact approval', () => {
  const source = read('scripts/windows-release-validation.ps1');
  assert.match(source, /AIRMONLINK_VALIDATION_LOG/);
  assert.match(source, /native-ui-ready/);
  assert.match(source, /publishing-controller\.js/);
  assert.match(source, /pdfControls/);
  assert.match(source, /pngControls/);
  assert.match(source, /ExpectedBuild = 18/);
  assert.match(source, /windows-validation\.ok/);
});
