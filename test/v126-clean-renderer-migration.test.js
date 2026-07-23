'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('clean renderer source exists and legacy injected renderer files are absent', () => {
  for (const relative of [
    'src/ui/index.html',
    'src/ui/styles.css',
    'src/ui/app.js',
    'src/ui/dock-manager.js',
    'src/ui/publishing-controller.js',
    'src/bootstrap.js'
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

test('native publishing controls replace legacy print labels', () => {
  const html = read('src/ui/index.html');
  const combined = [
    html,
    read('src/ui/app.js'),
    read('src/ui/publishing-controller.js')
  ].join('\n');
  for (const label of ['Dedicated PDF', 'PNG Pages', 'System Print']) {
    assert.match(html, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  for (const legacy of ['Print or PDF', 'Print / PDF', 'PDF Print / PDF', 'Build 12', 'Build 17']) {
    assert.equal(combined.includes(legacy), false, `legacy marker must be absent: ${legacy}`);
  }
});

test('staff-safe layout uses structural rows and a scrollable score viewport', () => {
  const css = read('src/ui/styles.css');
  assert.match(css, /\.app-shell[\s\S]*display:\s*grid/i);
  assert.match(css, /grid-template-rows\s*:/i);
  assert.match(css, /\.score-viewport[\s\S]*overflow\s*:\s*auto/i);
  assert.match(css, /min-height\s*:\s*0/i);
});

test('docking and publishing are normal renderer modules, not runtime injectors', () => {
  const docking = read('src/ui/dock-manager.js');
  const publishing = read('src/ui/publishing-controller.js');
  const bootstrap = read('src/bootstrap.js');
  assert.match(docking, /AirmonDockManager/);
  assert.match(docking, /dragstart|pointerdown|mousedown/i);
  assert.match(docking, /drop/i);
  assert.match(publishing, /AirmonPublishingUI/);
  assert.match(publishing, /beginPdf|beginPng|System Print|print/i);
  assert.match(bootstrap, /require\(['"]\.\/main['"]\)/);
  assert.equal(bootstrap.includes('publishing-ui.js'), false);
  assert.equal(bootstrap.includes('publishing-exposure.js'), false);
});

test('Build 18 identity is consistent in renderer and bootstrap', () => {
  const combined = [
    read('src/bootstrap.js'),
    read('src/ui/index.html'),
    read('src/ui/app.js'),
    read('src/ui/publishing-controller.js')
  ].join('\n');
  assert.match(combined, /Build 18/);
  assert.match(read('src/bootstrap.js'), /const BUILD = 18/);
  assert.match(read('src/ui/app.js'), /build:\s*18/);
  assert.match(read('src/ui/publishing-controller.js'), /BUILD = 18/);
  assert.equal(combined.includes('Build 17'), false);
});
