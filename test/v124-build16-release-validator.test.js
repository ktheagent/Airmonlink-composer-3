'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('Build 19 release validator requires the new source and runtime shell proof', () => {
  const pkg = require('../package.json');
  const bootstrap = read('src/bootstrap.js');
  const validator = read('scripts/windows-release-validation.ps1');

  assert.equal(pkg.main, 'src/bootstrap.js');
  assert.equal(pkg.buildNumber, '19');
  assert.equal(pkg.build.buildVersion, '1.1.0.19');

  assert.match(bootstrap, /const BUILD = 19;/);
  assert.match(bootstrap, /composer3-shell-ready/);
  assert.match(bootstrap, /AirmonPublishingUI/);
  assert.match(bootstrap, /AirmonDockManager/);

  assert.match(validator, /\[int\]\$ExpectedBuild = 19/);
  assert.match(validator, /composer3-shell\.js/);
  assert.match(validator, /composer3-shell\.css/);
  assert.match(validator, /composer3-shell-ready/);
  assert.match(validator, /legacyNavigationInert/);
  assert.match(validator, /staffViewportOverlapped/);
  assert.match(validator, /SHA256SUMS\.txt/);
  assert.match(validator, /Test-PEFile/);
});

test('Build 19 validator leaves hands-on and hardware checks explicit', () => {
  const validator = read('scripts/windows-release-validation.ps1');

  assert.match(validator, /Human Windows GUI inspection/);
  assert.match(validator, /PDF page opening and visual inspection/);
  assert.match(validator, /PNG page visual inspection/);
  assert.match(validator, /Mouse drag-out and redock/);
  assert.match(validator, /MIDI hardware/);
  assert.match(validator, /Audio hardware/);
  assert.match(validator, /Code-signing trust/);
  assert.match(validator, /BLOCKED/);
  assert.match(validator, /NOT TESTED/);
});
