'use strict';

const { app } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const STYLESHEET_PATH = path.join(__dirname, 'ui', 'composer3-native.css');
const STYLESHEET = fs.readFileSync(STYLESHEET_PATH, 'utf8');

const REVEAL_SCRIPT = `(function removeLegacyInterfaceBeforeReveal() {
  'use strict';

  const fatal = !document.querySelector('.professional-nav') &&
    /Composer 3 interface could not start/i.test(document.body?.textContent || '');
  if (fatal) return { ready: true, fatal: true, legacyRemoved: true };

  const shell = window.AirmonComposer3Shell?.verify?.() || null;
  if (
    !shell ||
    shell.mounted !== true ||
    shell.build !== 19 ||
    shell.tabs !== 6 ||
    shell.activePanels !== 1 ||
    shell.publishControls < 7 ||
    shell.staffViewportOverlapped === true
  ) {
    return { ready: false, fatal: false, legacyRemoved: false, shell };
  }

  let bridge = document.getElementById('composer3CommandBridge');
  if (!bridge) {
    bridge = document.createElement('div');
    bridge.id = 'composer3CommandBridge';
    bridge.hidden = true;
    bridge.setAttribute('aria-hidden', 'true');
    bridge.dataset.purpose = 'internal-command-dispatch-only';
    document.body.append(bridge);
  }

  const moveChildrenToBridge = container => {
    if (!container) return;
    Array.from(container.childNodes).forEach(node => bridge.append(node));
    container.remove();
  };

  const oldTitlebar = document.querySelector('.titlebar');
  if (oldTitlebar) {
    const header = document.createElement('header');
    header.id = 'composer3NativeHeader';
    header.className = 'composer3-native-header';

    const brand = document.createElement('div');
    brand.className = 'composer3-native-brand';
    brand.innerHTML = '<strong>Airmonlink Composer</strong><span>Composer 3</span>';

    const documentTitle = oldTitlebar.querySelector('.document-title');
    const buildBadge = oldTitlebar.querySelector('.build-badge');
    const actions = document.createElement('div');
    actions.className = 'composer3-native-actions';

    if (buildBadge) {
      buildBadge.textContent = 'Build 19';
      buildBadge.removeAttribute('data-build-18-badge');
      buildBadge.setAttribute('data-build-19-badge', 'true');
      actions.append(buildBadge);
    }

    ['themeButton', 'helpButton'].forEach(id => {
      const control = document.getElementById(id);
      if (control) actions.append(control);
    });

    header.append(brand);
    if (documentTitle) header.append(documentTitle);
    header.append(actions);
    oldTitlebar.before(header);
    oldTitlebar.remove();
  }

  moveChildrenToBridge(document.querySelector('.professional-nav'));
  moveChildrenToBridge(document.querySelector('.quick-toolbar'));

  document.documentElement.dataset.legacyInterfaceRemoved = 'true';
  document.body.classList.add('composer3-legacy-removed');

  const legacyRemoved = !document.querySelector('.professional-nav, .quick-toolbar, .titlebar');
  const headerReady = Boolean(document.getElementById('composer3NativeHeader'));
  const bridgeHidden = Boolean(bridge.hidden && bridge.getAttribute('aria-hidden') === 'true');

  return {
    ready: legacyRemoved && headerReady && bridgeHidden,
    fatal: false,
    legacyRemoved,
    headerReady,
    bridgeHidden,
    shell
  };
})();
};

function guardWindow(window) {
  if (!window || window.isDestroyed() || window.__airmonComposer3Guarded) return;
  window.__airmonComposer3Guarded = true;

  const nativeShow = window.show.bind(window);
  const nativeShowInactive = typeof window.showInactive === 'function'
    ? window.showInactive.bind(window)
    : null;

  window.hide();
  let revealInFlight = null;

  const requestReveal = (inactive = false) => {
    if (window.isDestroyed() || revealInFlight) return;
    revealInFlight = window.webContents.executeJavaScript(REVEAL_SCRIPT, true)
      .then(result => {
        if (!result?.ready || window.isDestroyed()) return;
        window.__airmonComposer3Ready = !result.fatal;
        if (inactive && nativeShowInactive) nativeShowInactive();
        else nativeShow();
      })
      .catch(error => {
        console.error('[startup-guard] reveal blocked:', error);
      })
      .finally(() => {
        revealInFlight = null;
      });
  };

  window.show = () => requestReveal(false);
  if (nativeShowInactive) window.showInactive = () => requestReveal(true);

  window.webContents.once('did-finish-load', () => {
    void window.webContents.insertCSS(STYLESHEET);
  });
}

app.on('browser-window-created', (_event, window) => guardWindow(window));

require('./bootstrap');
