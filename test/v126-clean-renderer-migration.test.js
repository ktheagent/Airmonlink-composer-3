'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('Composer 3 source exists and retired runtime injectors remain absent', () => {
  for (const relative of [
    'src/bootstrap.js',
    'src/main.js',
    'src/preload.js',
    'src/ui/index.html',
    'src/ui/styles.css',
    'src/ui/app.js',
    'src/ui/composer3-shell.js',
    'src/ui/composer3-shell.css',
    'src/ui/dock-manager.js',
    'src/ui/publishing-controller.js'
  ]) {
    assert.equal(fs.existsSync(path.join(root, relative)), true, `${relative} must exist`);
  }

  for (const relative of [
    'src/ui/publishing-ui.js',
    'src/ui/publishing-exposure.js',
    'src/release-bootstrap.js'
  ]) {
    assert.equal(fs.existsSync(path.join(root, relative)), false, `${relative} must be absent`);
  }
});

test('Composer 3 replaces the visible old navigation without replacing the score engine', () => {
  const bootstrap = read('src/bootstrap.js');
  const shell = read('src/ui/composer3-shell.js');
  const html = read('src/ui/index.html');

  assert.match(bootstrap, /installComposer3Shell/);
  assert.match(bootstrap, /require\(['"]\.\/main['"]\)/);
  assert.match(shell, /composer3-command-deck/);
  assert.match(shell, /retireLegacyNavigation/);
  assert.match(shell, /composer3-legacy-command-source/);
  assert.match(shell, /aria-hidden/);
  assert.match(shell, /setAttribute\(['"]inert['"]/);
  assert.match(html, /notationCanvas/);
  assert.match(html, /app\.js/);
  assert.match(html, /publishing-controller\.js/);
  assert.match(html, /dock-manager\.js/);
});

test('Composer 3 staff-safe layout uses structural rows and a scrollable score viewport', () => {
  const css = read('src/ui/composer3-shell.css');
  const baseCss = read('src/ui/styles.css');

  assert.match(css, /grid-template-rows:\s*auto auto auto minmax\(0,\s*1fr\) auto/i);
  assert.match(css, /#composer3CommandDeck[\s\S]*grid-row:\s*3/i);
  assert.match(css, /\.workspace[\s\S]*grid-row:\s*4/i);
  assert.match(css, /\.workspace[\s\S]*min-height:\s*0/i);
  assert.match(css, /\.workspace[\s\S]*overflow:\s*hidden/i);
  assert.match(baseCss, /\.score-viewport[\s\S]*overflow:\s*auto/i);
});

test('Build 19 identity is consistent in package and active Composer 3 source', () => {
  const pkg = require('../package.json');
  const bootstrap = read('src/bootstrap.js');
  const shell = read('src/ui/composer3-shell.js');

  assert.equal(pkg.buildNumber, '19');
  assert.equal(pkg.build.buildVersion, '1.1.0.19');
  assert.match(pkg.build.nsis.artifactName, /Build19/);
  assert.match(pkg.build.portable.artifactName, /Build19/);
  assert.match(bootstrap, /const BUILD = 19;/);
  assert.match(shell, /const BUILD = 19;/);
  assert.match(shell, /Build \$\{BUILD\} · Composer 3/);
  assert.doesNotMatch([bootstrap, shell, JSON.stringify(pkg)].join('\n'), /Build 17/);
});
