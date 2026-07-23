'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const publishing = require('../src/desktop/publishing');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('publishing request sanitizes filenames and preserves physical dimensions', () => {
  const request = publishing.normalizePublishRequest({
    view: 'solfa',
    title: ' Psalm 23: <Choir>? ',
    width: 794,
    height: 1123
  });
  assert.equal(request.view, 'solfa');
  assert.equal(request.title, 'Psalm 23- -Choir--');
  assert.equal(request.width, 794);
  assert.equal(request.height, 1123);
  assert.equal(request.landscape, false);
});

test('dedicated PDF options preserve backgrounds, page size and zero margins', () => {
  const options = publishing.pdfOptions({ width: 1123, height: 794, view: 'score' });
  assert.equal(options.landscape, true);
  assert.equal(options.printBackground, true);
  assert.equal(options.preferCSSPageSize, true);
  assert.deepEqual(options.margins, { top: 0, bottom: 0, left: 0, right: 0 });
});

test('numbered PNG paths are unique and stable', () => {
  const selected = path.join(os.tmpdir(), 'Anthem-page-001.png');
  assert.match(publishing.numberedPngPath(selected, 1, 12), /Anthem-page-001\.png$/);
  assert.match(publishing.numberedPngPath(selected, 12, 12), /Anthem-page-012\.png$/);
});

test('private publishing URL accepts only strict PDF and PNG commands', () => {
  assert.equal(publishing.publishingUrl('https://example.com'), null);
  assert.equal(publishing.publishingUrl('airmon-publish://exe?title=x'), null);
  assert.equal(publishing.publishingUrl('airmon-publish://pdf/path?title=x'), null);
  assert.equal(publishing.publishingUrl('airmon-publish://pdf?title=x#fragment'), null);

  const pdf = publishing.publishingUrl(
    'airmon-publish://pdf?view=solfa&title=Hymn&width=794&height=1123'
  );
  assert.equal(pdf.kind, 'pdf');
  assert.equal(pdf.request.view, 'solfa');
  assert.equal(pdf.request.width, 794);
  assert.equal(pdf.request.height, 1123);

  const png = publishing.publishingUrl(
    'AIRMON-PUBLISH://PNG?view=score&title=Anthem'
  );
  assert.equal(png.kind, 'png');
  assert.equal(png.request.view, 'score');
});

test('PDF and PNG signatures are validated before success', () => {
  assert.doesNotThrow(() => publishing.assertPdfBuffer(Buffer.from('%PDF-1.7')));
  assert.throws(
    () => publishing.assertPdfBuffer(Buffer.from('bad')),
    /invalid|no document/i
  );
  assert.doesNotThrow(() =>
    publishing.assertPngBuffer(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]))
  );
  assert.throws(
    () => publishing.assertPngBuffer(Buffer.from('bad')),
    /invalid|no image/i
  );
});

test('atomic single-file write leaves no temporary file', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'airmon-publish-'));
  const target = path.join(directory, 'score.pdf');
  await publishing.atomicWrite(target, Buffer.from('%PDF-test'));
  assert.equal(fs.readFileSync(target, 'utf8'), '%PDF-test');
  assert.deepEqual(fs.readdirSync(directory), ['score.pdf']);
  fs.rmSync(directory, { recursive: true, force: true });
});

test('atomic PNG batch restores old files when installation fails', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'airmon-publish-batch-'));
  const one = path.join(directory, 'page-001.png');
  const two = path.join(directory, 'page-002.png');
  fs.writeFileSync(one, 'old-one');
  fs.writeFileSync(two, 'old-two');

  const batch = publishing.createAtomicBatch([one, two]);
  await batch.stage(0, Buffer.from('new-one'));
  await batch.stage(1, Buffer.from('new-two'));

  const originalRename = fs.promises.rename;
  let installs = 0;
  fs.promises.rename = async (from, to) => {
    if (String(from).endsWith('.tmp')) {
      installs += 1;
      if (installs === 2) {
        throw Object.assign(new Error('simulated install failure'), { code: 'EIO' });
      }
    }
    return originalRename(from, to);
  };

  try {
    await assert.rejects(batch.commit(), /simulated install failure/);
  } finally {
    fs.promises.rename = originalRename;
  }

  assert.equal(fs.readFileSync(one, 'utf8'), 'old-one');
  assert.equal(fs.readFileSync(two, 'utf8'), 'old-two');
  assert.deepEqual(fs.readdirSync(directory).sort(), ['page-001.png', 'page-002.png']);
  fs.rmSync(directory, { recursive: true, force: true });
});

test('desktop backend and direct renderer expose dedicated PDF and numbered PNG publishing', () => {
  const bootstrap = read('src/bootstrap.js');
  const controller = read('src/ui/publishing-controller.js');
  const html = read('src/ui/index.html');

  assert.match(bootstrap, /printToPDF/);
  assert.match(bootstrap, /capturePage/);
  assert.match(bootstrap, /showSaveDialog/);
  assert.match(bootstrap, /AirmonPublishingUI/);

  assert.match(controller, /const BUILD = 18;/);
  assert.match(controller, /AirmonPublishingUI/);
  assert.match(controller, /beginPdf/);
  assert.match(controller, /beginPng/);
  assert.match(controller, /showPngPage/);
  assert.match(controller, /data-publish="pdf"/);
  assert.match(controller, /data-publish="png"/);
  assert.doesNotMatch(controller, /MutationObserver/);

  assert.match(html, /Dedicated PDF/);
  assert.match(html, /PNG Pages/);
  assert.match(html, /System Print/);
  assert.match(html, /publishing-controller\.js/);
});

test('Build 18 package metadata names both Windows artifacts consistently', () => {
  const pkg = require('../package.json');
  assert.equal(pkg.main, 'src/bootstrap.js');
  assert.equal(pkg.buildNumber, '18');
  assert.equal(pkg.build.buildVersion, '1.1.0.18');
  assert.match(pkg.build.nsis.artifactName, /Build18/);
  assert.match(pkg.build.portable.artifactName, /Build18/);
});
