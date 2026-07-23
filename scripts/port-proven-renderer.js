#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const repositoryRoot = path.resolve(__dirname, '..');
const sourceRoot = path.resolve(process.argv[2] || 'proven-source');

const expected = Object.freeze({
  'src/ui/app.js': 'ea469553262367354165fa8f6e12e846a6876244',
  'src/ui/index.html': '8e705ab1192fb3d40bcbeb26506e308c31659dfe',
  'src/ui/styles.css': 'd49a116f619d76d42cacb1adb299f9d9f7ed408c',
  'src/ui/staff-key-rules.css': '1981352b9b47535912be2611e8cf05c0fc04acf3'
});

function fail(message) {
  throw new Error(message);
}

function read(root, relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function write(relative, value) {
  const target = path.join(repositoryRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value, 'utf8');
}

function replaceRequired(value, search, replacement, label) {
  if (!value.includes(search)) fail(`Missing required ${label} marker.`);
  return value.replace(search, replacement);
}

for (const [relative, sha] of Object.entries(expected)) {
  const actual = execFileSync('git', ['-C', sourceRoot, 'hash-object', relative], {
    encoding: 'utf8'
  }).trim();
  if (actual !== sha) fail(`Proven source mismatch for ${relative}: expected ${sha}, found ${actual}`);
}

let app = read(sourceRoot, 'src/ui/app.js');
let html = read(sourceRoot, 'src/ui/index.html');
let css = read(sourceRoot, 'src/ui/styles.css');
const staffRules = read(sourceRoot, 'src/ui/staff-key-rules.css');

for (const marker of [
  'initializeShutdownLifecycle',
  'initializeAssociatedFileOpening',
  'const commandCatalog = [',
  'const functionalGroupDefinitions = [',
  'window.airmonDesktop',
  'state.playback.shutdown()',
  'closeMidiResources',
  'cancelAutosaveTasks'
]) {
  if (!app.includes(marker)) fail(`Proven renderer is missing ${marker}.`);
}

app = replaceRequired(
  app,
  "['print', 'Print or PDF', 'Export']",
  "['publishPdf', 'Dedicated PDF', 'Export'], ['publishPng', 'PNG Pages', 'Export'], ['systemPrint', 'System Print', 'Export']",
  'legacy print command catalogue'
);
app = replaceRequired(
  app,
  "['export','exportMusicXml','exportMxl','exportMidi','exportSolfa','print']",
  "['export','exportMusicXml','exportMxl','exportMidi','exportSolfa','publishPdf','publishPng','systemPrint']",
  'legacy import/export functional group'
);
app = replaceRequired(
  app,
  "print: () => exportAs('print'),",
  "publishPdf: () => document.querySelector('[data-publish=\"pdf\"]')?.click(), publishPng: () => document.querySelector('[data-publish=\"png\"]')?.click(), systemPrint: () => window.print(),",
  'legacy print action'
);

html = replaceRequired(
  html,
  '<html lang="en">',
  '<html lang="en" data-interface-version="3">',
  'HTML root'
);
html = replaceRequired(
  html,
  '  <meta name="viewport" content="width=device-width,initial-scale=1" />',
  '  <meta name="viewport" content="width=device-width,initial-scale=1" />\n  <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data:; style-src \'self\' \'unsafe-inline\'; script-src \'self\'; connect-src \'none\'; object-src \'none\'; base-uri \'none\'; form-action \'none\'" />',
  'viewport metadata'
);
html = replaceRequired(
  html,
  '  <link rel="stylesheet" href="styles.css" />',
  '  <link rel="stylesheet" href="styles.css" />\n  <link rel="stylesheet" href="staff-key-rules.css" />',
  'stylesheet link'
);
html = replaceRequired(
  html,
  '      <div class="title-actions">',
  '      <div class="title-actions"><span class="build-badge" data-build-18-badge="true">Build 18 · Proven full renderer</span>',
  'title actions'
);
html = replaceRequired(
  html,
  '<button data-command="print">Print or PDF</button>',
  '<button data-publish="pdf">Dedicated PDF…</button><button data-publish="png">PNG Pages…</button><button data-command="system-print">System Print…</button>',
  'export menu print button'
);

const exportCardPattern = /<button data-export="print" class="export-card">[\s\S]*?<\/button>/;
if (!exportCardPattern.test(html)) fail('Missing legacy export dialog print card.');
html = html.replace(
  exportCardPattern,
  '<button type="button" data-publish="pdf" class="export-card"><span>PDF</span><strong>Dedicated PDF</strong><small>Direct all-page PDF publishing</small></button>\n      <button type="button" data-publish="png" class="export-card"><span>PNG</span><strong>PNG Pages</strong><small>Numbered high-resolution pages</small></button>\n      <button type="button" data-command="system-print" class="export-card"><span>SYS</span><strong>System Print</strong><small>Operating-system print fallback</small></button>'
);

html = html
  .replaceAll('Print or PDF', 'System Print')
  .replaceAll('Print / PDF', 'System Print')
  .replaceAll('Airmonlink Composer 1.0.0 · Build 12', 'Airmonlink Composer 1.1.0 · Build 18');

html = replaceRequired(
  html,
  '<div id="scorePage" class="score-page">',
  '<div id="scorePage" class="score-page" data-publish-page="score">',
  'score page'
);
html = replaceRequired(
  html,
  '<article id="solfaFirstPage" class="score-page solfa-sheet" data-solfa-page="1">',
  '<article id="solfaFirstPage" class="score-page solfa-sheet" data-solfa-page="1" data-publish-page="solfa">',
  'sol-fa first page'
);
html = replaceRequired(
  html,
  '<div class="canvas-scroll" id="canvasScroll">',
  '<div class="canvas-scroll score-viewport" id="canvasScroll">',
  'score viewport'
);
html = replaceRequired(
  html,
  '<aside class="right-panel panel" id="rightDock" aria-label="Managed right-side panels">',
  '<aside class="right-panel panel" id="rightDock" aria-label="Managed right-side panels"><div id="rightDockDropZone" class="dock-drop-zone" aria-hidden="true">Drop panel here</div>',
  'right dock'
);

for (const [id, name] of [
  ['compositionPanel', 'composition'],
  ['inspectorPanel', 'inspector'],
  ['tonicPanel', 'tonic']
]) {
  const pattern = new RegExp(`(<section id="${id}"[\\s\\S]*?<div class="panel-heading")`);
  if (!pattern.test(html)) fail(`Missing panel heading for ${id}.`);
  html = html.replace(pattern, `$1 data-dock-handle="${name}"`);
}

html = replaceRequired(
  html,
  '  <script src="app.js"></script>',
  '  <script src="app.js"></script>\n  <script src="publishing-controller.js"></script>\n  <script src="dock-manager.js"></script>',
  'renderer script entry'
);

const cssAdditions = `

/* Composer 3 Build 18 direct-source integration. */
.app-shell{display:grid;grid-template-rows:auto auto minmax(0,1fr);min-height:0}
.workspace,.editor-area,.score-viewport{min-height:0}
.score-viewport{overflow:auto}
.build-badge{display:inline-flex;align-items:center;padding:.2rem .55rem;border-radius:999px;background:#dce9ff;color:#193a6a;font-size:.75rem;font-weight:700;white-space:nowrap}
.dock-drop-zone{display:none;margin:.45rem;padding:.8rem;border:2px dashed #4078c0;border-radius:.45rem;text-align:center;background:#edf4ff;color:#193a6a}
.dock-drop-zone.active{display:block}.dock-drop-zone.hover{background:#dce9ff}
.dock-panel[data-dock-panel]>[data-dock-handle]{cursor:grab}.dock-panel.mouse-dragging>[data-dock-handle]{cursor:grabbing}
.dock-panel.floating{position:fixed;z-index:70;width:min(360px,calc(100vw - 16px));max-height:calc(100vh - 64px);overflow:auto;box-shadow:0 12px 38px #0005}
html.publishing .titlebar(html.publishing .professional-nav,html.publishing .left-panel,html.publishing .right-panel,html.publishing .piano-dock,html.publishing .playhead-status,html.publishing .editor-toolbar{display:none!important}
html.publishing .workspace,html.publishing .editor-area,html.publishing .canvas-scroll{display:block!important;overflow:visible!important;height:auto!important;background:#fff!important}
@media print{.build-badge,.dock-drop-zone{display:none!important}}
`;
css += cssAdditions;

for (const forbidden of ['Print or PDF', 'Print / PDF', 'Build 12', 'Build 17']) {
  if (app.includes(forbidden) || html.includes(forbidden)) fail(`Legacy marker remains after port: ${forbidden}`);
}
for (const marker of [
  'Dedicated PDF',
  'PNG Pages',
  'System Print',
  'data-build-18-badge',
  'data-dock-handle="composition"',
  'data-dock-handle="inspector"',
  'data-dock-handle="tonic"',
  'rightDockDropZone',
  'publishing-controller.js',
  'dock-manager.js'
]) {
  if (!html.includes(marker)) fail(`Ported HTML is missing ${marker}.`);
}

write('src/ui/app.js', app);
write('src/ui/index.html', html);
write('src/ui/styles.css', css);
write('src/ui/staff-key-rules.css', staffRules);

console.log(JSON.stringify({
  source: 'ktheagent/Airmonlink-composer-2@main',
  verifiedBlobs: expected,
  outputs: {
    app: Buffer.byteLength(app),
    html: Buffer.byteLength(html),
    css: Buffer.byteLength(css),
    staffRules: Buffer.byteLength(staffRules)
  }
}, null, 2));
