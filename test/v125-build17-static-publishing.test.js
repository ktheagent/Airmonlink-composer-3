'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('Build 19 package uses the Composer 3 source and matching artifact names', () => {
  const pkg = require('../package.json');

  assert.equal(pkg.main, 'src/bootstrap.js');
  assert.equal(pkg.buildNumber, '19');
  assert.equal(pkg.build.buildVersion, '1.1.0.19');
  assert.match(pkg.build.nsis.artifactName, /Build19/);
  assert.match(pkg.build.portable.artifactName, /Build19/);
});

test('Build 19 publishes through static controls without document observers', () => {
  const controller = read('src/ui/publishing-controller.js');
  const html = read('src/ui/index.html');
  const shell = read('src/ui/composer3-shell.js');

  assert.match(controller, /AirmonPublishingUI/);
  assert.match(controller, /data-publish="pdf"/);
  assert.match(controller, /data-publish="png"/);
  assert.match(controller, /pdfControls/);
  assert.match(controller, /pngControls/);
  assert.doesNotMatch(controller, /MutationObserver/);

  assert.match(html, /Dedicated PDF/);
  assert.match(html, /PNG Pages/);
  assert.match(html, /System Print/);

  assert.match(shell, /Dedicated PDF/);
  assert.match(shell, /PNG pages/);
  assert.match(shell, /System Print/);
  assert.match(shell, /data-build-19-badge/);
  assert.match(shell, /removeAttribute\(['"]data-build-18-badge['"]\)/);
});

test('Build 19 bootstrap verifies the actual shell before showing the window', () => {
  const source = read('src/bootstrap.js');

  assert.match(source, /window\.hide\(\)/);
  assert.match(source, /installComposer3Shell/);
  assert.match(source, /Composer 3 runtime verification failed/);
  assert.match(source, /window\.show\(\)/);
  assert.match(source, /composer3-shell-ready/);
  assert.match(source, /native-ui-ready/);
  assert.doesNotMatch(source, /publishing-exposure\.js|publishing-ui\.js/);
});
