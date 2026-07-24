'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const shell = require(path.join(root, 'src', 'ui', 'composer3-shell.js'));
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

function memoryStorage(initial = null) {
  let value = initial;
  return {
    getItem() {
      return value;
    },
    setItem(_key, next) {
      value = String(next);
    },
    value() {
      return value;
    }
  };
}

test('Composer 3 manifest exposes six focused work areas and dedicated publishing', () => {
  assert.equal(shell.build, 19);
  assert.deepEqual(Array.from(shell.tabs), [
    'compose',
    'notation',
    'lyrics',
    'playback',
    'publish',
    'view'
  ]);

  const publishCommands = shell.manifest.publish.flatMap(group => group.commands);
  assert.ok(publishCommands.length >= 7);
  assert.ok(publishCommands.some(command => command.label === 'Dedicated PDF'));
  assert.ok(publishCommands.some(command => command.label === 'PNG pages'));
  assert.ok(publishCommands.some(command => command.label === 'System Print'));
});

test('Composer 3 shell state validates tabs and survives invalid persisted JSON', () => {
  assert.equal(shell.normalizeTab('publish'), 'publish');
  assert.equal(shell.normalizeTab('unknown'), 'compose');

  const storage = memoryStorage();
  assert.equal(shell.writeState(storage, { activeTab: 'lyrics', compact: true }), true);
  assert.deepEqual(shell.readState(storage), { activeTab: 'lyrics', compact: true });

  const corrupt = memoryStorage('{not-json');
  assert.deepEqual(shell.readState(corrupt), { activeTab: 'compose', compact: false });
});

test('Composer 3 command forwarding temporarily releases inert source and restores it', () => {
  const attributes = new Set(['inert']);
  const inertAncestor = {
    removeAttribute(name) {
      attributes.delete(name);
    },
    setAttribute(name) {
      attributes.add(name);
    }
  };
  let clicks = 0;
  const source = {
    disabled: false,
    getAttribute() {
      return null;
    },
    closest(selector) {
      return selector === '[inert]' ? inertAncestor : null;
    },
    click() {
      assert.equal(attributes.has('inert'), false);
      clicks += 1;
    }
  };
  const status = { textContent: '', dataset: {} };
  const documentRef = {
    querySelector(selector) {
      return selector === '#saveButton' ? source : null;
    },
    getElementById(id) {
      return id === 'composer3ShellStatus' ? status : null;
    }
  };

  assert.equal(
    shell.runCommand(documentRef, { label: 'Save', selector: '#saveButton' }),
    true
  );
  assert.equal(clicks, 1);
  assert.equal(attributes.has('inert'), true);
  assert.equal(status.dataset.kind, 'success');
});

test('Composer 3 command forwarding reports missing and disabled source controls', () => {
  const status = { textContent: '', dataset: {} };
  const missingDocument = {
    querySelector() {
      return null;
    },
    getElementById() {
      return status;
    }
  };
  assert.equal(
    shell.runCommand(missingDocument, { label: 'Unavailable', selector: '#missing' }),
    false
  );
  assert.equal(status.dataset.kind, 'warning');

  const disabledSource = {
    disabled: true,
    getAttribute() {
      return null;
    }
  };
  const disabledDocument = {
    querySelector() {
      return disabledSource;
    },
    getElementById() {
      return status;
    }
  };
  assert.equal(
    shell.runCommand(disabledDocument, { label: 'Disabled', selector: '#disabled' }),
    false
  );
  assert.match(status.textContent, /disabled/i);
});

test('Build 19 uses a fail-closed Composer 3 bootstrap before the proven engine', () => {
  const pkg = require(path.join(root, 'package.json'));
  const bootstrap = read('src/bootstrap.js');

  assert.equal(pkg.main, 'src/bootstrap.js');
  assert.equal(pkg.buildNumber, '19');
  assert.equal(pkg.build.buildVersion, '1.1.0.19');
  assert.atch(pkg.build.nsis.artifactName, /Build19/);
  assert.match(pkg.build.portable.artifactName, /Build19/);

  assert.match(bootstrap, /window\.hide\(\)/);
  assert.match(bootstrap, /installComposer3Shell/);
  assert.match(bootstrap, /composer3-shell-ready/);
  assert.match(bootstrap, /Composer 3 runtime verification failed/);
  assert.match(bootstrap, /legacyNavigationInert/);
  assert.match(bootstrap, /staffViewportOverlapped/);
  assert.match(bootstrap, /require\(['"]\.^./main['"]\)/);
});

test('Composer3 CSS keeps command deck and score workspace in separate grid rows', () => {
  const css = read('src/ui/composer3-shell.css');

  assert.match(css, /grid-template-rows:\s*auto auto auto minmax\(0,\s*1fr\) auto/);
  assert.match(css, /#composer3CommandDeck[\s\S]*grid-row:\s*3/);
  assert.match(css, /\.workspace[\s\S]*grid-row:\s*4/);
  assert.atch(css, /\.workspace[\s\S]*[[^min-height:\s*0/);
  assert.atch(css, /\.workspace[\s\S]*overflow:\s*hidden/);
  assert.atch(css, /\.professional-nav\.composer3-legacy-command-source/);
  assert.atch(css, /@media print[\s\S]*composer3-command-deck/);
});
