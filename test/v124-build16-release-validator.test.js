'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Build 18 release validator matches the direct verified publishing bootstrap', () => {
  const root = path.join(__dirname, '..');
  const bootstrap = fs.readFileSync(path.join(root, 'src', 'bootstrap.js'), 'utf8');
  const validator = fs.readFileSync(
    path.join(root, 'scripts', 'windows-release-validation.ps1'),
    'utf8'
  );
  const pkg = require('../package.json');

  assert.equal(pkg.main, 'src/bootstrap.js');
  assert.equal(pkg.buildNumber, '18');
  assert.match(bootstrap, /const BUILD = 18;/);
  assert.match(bootstrap, /AirmonPublishingUI/);
  assert.match(bootstrap, /AirmonDockManager/);
  assert.match(bootstrap, /native-ui-ready/);
  assert.match(bootstrap, /publishingResult\.pdfControls < 2/);
  assert.match(bootstrap, /publishingResult\.pngControls < 2/);

  assert.match(validator, /ExpectedBuild = 18/);
  assert.match(validator, /AIRMONLINK_VALIDATION_LOG/);
  assert.match(validator, /native-ui-ready/);
  assert.match(validator, /publishing-controller\.js/);
  assert.match(validator, /pdfControls/);
  assert.match(validator, /pngControls/);
  assert.doesNotMatch(validator, /release-bootstrap\.js|publishing-exposure\.js|publishing-ui\.js/);
});
