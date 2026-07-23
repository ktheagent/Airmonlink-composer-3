'use strict';

(() => {
  const BUILD = 18;
  const state = {
    active: false,
    kind: null,
    pageIndex: 0,
    previousView: null
  };

  const byId = id => document.getElementById(id);
  const all = selector => Array.from(document.querySelectorAll(selector));

  function status(message, kind = 'info') {
    const host = byId('statusText') || byId('publishStatus') || document.querySelector('[data-publish-status]');
    if (host) {
      host.textContent = message;
      host.dataset.kind = kind;
    }
  }

  function toast(message, kind = 'success') {
    const host = byId('toastContainer');
    if (!host) {
      status(message, kind);
      return;
    }
    const node = document.createElement('div');
    node.className = `toast ${kind}`;
    node.textContent = message;
    host.appendChild(node);
    setTimeout(() => node.remove(), 5000);
  }

  function scoreTitle() {
    return (
      byId('titleInput')?.value ||
      byId('documentTitle')?.textContent ||
      document.title ||
      'Untitled Score'
    ).trim();
  }

  function pageNodes() {
    const explicit = all('[data-publish-page]');
    if (explicit.length) return explicit;
    const scorePage = byId('scorePage');
    return scorePage ? [scorePage] : [];
  }

  async function settle() {
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  function setPublishingMode(enabled, kind = null) {
    document.documentElement.classList.toggle('publishing', enabled);
    document.body.classList.toggle('publishing', enabled);
    document.body.dataset.publishKind = enabled && kind ? kind : '';
  }

  function begin(kind, view = {}) {
    state.active = true;
    state.kind = kind;
    state.pageIndex = 0;
    state.previousView = {
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };
    setPublishingMode(true, kind);
    document.documentElement.style.setProperty('--publish-page-size', view.pageSize || 'A4');
    document.documentElement.style.setProperty('--publish-orientation', view.orientation || 'portrait');
    status(`Preparing ${kind.toUpperCase()} output…`);
  }

  async function beginPdf(view = {}) {
    begin('pdf', view);
    await settle();
    return { count: Math.max(1, pageNodes().length) };
  }

  async function beginPng(view = {}) {
    begin('png', view);
    await settle();
    const pages = pageNodes();
    return { count: Math.max(1, pages.length) };
  }

  async function showPngPage(index) {
    const pages = pageNodes();
    if (!pages.length) throw new Error('No score page is available for PNG export.');
    if (!Number.isInteger(index) || index < 0 || index >= pages.length) {
      throw new Error(`PNG page index ${index} is outside the available page range.`);
    }
    pages.forEach((page, pageIndex) => {
      page.hidden = pageIndex !== index;
      page.dataset.captureActive = pageIndex === index ? 'true' : 'false';
    });
    state.pageIndex = index;
    await settle();
    const rect = pages[index].getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) throw new Error('The selected score page has no visible capture area.');
    return {
      x: Math.max(0, Math.floor(rect.x)),
      y: Math.max(0, Math.floor(rect.y)),
      width: Math.max(1, Math.ceil(rect.width)),
      height: Math.max(1, Math.ceil(rect.height))
    };
  }

  async function endPublishing() {
    pageNodes().forEach(page => {
      page.hidden = false;
      delete page.dataset.captureActive;
    });
    setPublishingMode(false);
    if (state.previousView) window.scrollTo(state.previousView.scrollX, state.previousView.scrollY);
    state.active = false;
    state.kind = null;
    state.previousView = null;
    await settle();
  }

  function complete(result = {}) {
    if (result.error) {
      toast(result.error, 'error');
      status(result.error, 'error');
      return;
    }
    if (result.cancelled) {
      status('Publishing cancelled.');
      return;
    }
    const target = result.filePath || (Array.isArray(result.files) ? result.files[0] : '');
    const label = result.kind === 'png'
      ? `${result.count || result.files?.length || 0} PNG page(s) exported`
      : result.kind === 'pdf'
        ? 'PDF exported'
        : 'Publishing complete';
    toast(target ? `${label}: ${target}` : label);
    status(label, 'success');
  }

  function request(kind) {
    const title = scoreTitle();
    const paperSize = byId('paperSize')?.value || byId('pageSize')?.value || 'A4';
    const orientation = byId('orientation')?.value || 'portrait';
    const request = {
      title,
      paperSize,
      orientation,
      pageSize: paperSize,
      allPages: true,
      view: { paperSize, pageSize: paperSize, orientation }
    };
    const url = `airmon-publish://${kind}?request=${encodeURIComponent(JSON.stringify(request))}`;
    window.open(url, '_blank', 'noopener');
  }

  function bind() {
    document.addEventListener('click', event => {
      const pdf = event.target.closest('[data-publish="pdf"], [data-command="export-pdf"], #exportPdf');
      const png = event.target.closest('[data-publish="png"], [data-command="export-png"], #exportPng');
      const print = event.target.closest('[data-publish="print"], [data-command="system-print"], #systemPrint');
      if (pdf) {
        event.preventDefault();
        request('pdf');
      } else if (png) {
        event.preventDefault();
        request('png');
      } else if (print) {
        event.preventDefault();
        window.print();
      }
    });
  }

  bind();

  window.AirmonPublishingUI = Object.freeze({
    build: BUILD,
    beginPdf,
    beginPng,
    showPngPage,
    endPublishing,
    complete,
    verify() {
      return {
        build: BUILD,
        api: true,
        native: true,
        pdfControls: all('[data-publish="pdf"], [data-command="export-pdf"], #exportPdf').length,
        pngControls: all('[data-publish="png"], [data-command="export-png"], #exportPng').length,
        badge: Boolean(document.querySelector('[data-build-18-badge], .build-badge')),
        status: Boolean(byId('statusText') || byId('publishStatus') || document.querySelector('[data-publish-status]')),
        forbidden: []
      };
    }
  });
})();
