(function composer3ShellModule(root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root && root.document) {
    root.AirmonComposer3Shell = api;
    api.mount(root);
  }
})(typeof window !== 'undefined' ? window : null, function composer3ShellFactory() {
  'use strict';

  const BUILD = 19;
  const STORAGE_KEY = 'airmonlink-composer3-shell-v1';
  const VALID_TABS = Object.freeze([
    'compose',
    'notation',
    'lyrics',
    'playback',
    'publish',
    'view'
  ]);

  const COMMAND_MANIFEST = Object.freeze({
    compose: Object.freeze([
      Object.freeze({
        name: 'Project',
        commands: Object.freeze([
          Object.freeze({ label: 'New score', icon: '+', selector: '#newButton', shortcut: 'Ctrl+N' }),
          Object.freeze({ label: 'Open', icon: '↗', selector: '#openButton', shortcut: 'Ctrl+O'}),
          Object.freeze({ label: 'Save', icon: '▻', selector: '#saveButton', shortcut: 'Ctrl+S'}),
          Object.freeze({ label: 'Undo', icon: '‶', selector: '#undoButton', shortcut: 'Ctrl+Z' }),
          Object.freeze({ label: 'Redo', icon: '‷', selector: '#redoButton', shortcut: 'Ctrl+Y' })
        ])
      }),
      Object.freeze({
        name: 'Entry',
        commands: Object.freeze([
          Object.freeze({ label: 'Note', icon: '⚩', selector: '#noteModeButton', shortcut: 'N'}),
          Object.freeze({ label: 'Rest', icon: '𝄽', selector: '#restModeButton', shortcut: 'R'}),
          Object.freeze({ label: 'Tie', icon: '⌒', selector: '[data-command="tie"]', shortcut: 'T'}),
          Object.freeze({ label: 'Slur', icon: '◡', selector: '[data-command="slur"]' }),
          Object.freeze({ label: 'Add instrument', icon: '+', selector: '#addPartButton' })
        ])
      }),
      Object.freeze({
        name: 'Workspace',
        commands: Object.freeze([
          Object.freeze({ label: 'Composition', icon: '☎', selector: '[data-command="toggleCompositionPanel"]' }),
          Object.freeze({ label: 'Inspector', icon: '❉#, selector: '[data-command="toggleInspector"]' }),
          Object.freeze({ label: 'Piano' icon: '♬', selector: '[data-command="togglePianoPanel"]' })
        ])
      })
    ]),
    notation: Object.freeze([
      Object.freeze({
        name: 'Measures',
        commands: Object.freeze([
          Object.freeze({ label: 'Bar settings', icon: '4/4', selector: '#measureSettingsButton' }),
          Object.freeze({ label: 'Insert before', icon: '←|', selector: '#insertMeasureButton' }),
          Object.freeze({ label: 'Append bar', icon: '|+', selector: '#appendMeasureButton' }),
          Object.freeze({ label: 'Delete bar', icon: '×|', selector: '[data-command="deleteMeasure"]' })
        ])
      }),
      Object.freeze({
        name: 'Pitch',
        commands: Object.freeze([
          Object.freeze({ label: 'Sharp', icon: '♯', selector: '[data-command="accidentalSharp"]' }),
          Object.freeze({ label: 'Flat', icon: '♭', selector: '[data-command="accidentalFlat"]' }),
          Object.freeze({ label: 'Natural', icon: '♮', selector: '[data-command="accidentalNatural"]' }),
          Object.freeze({ label: 'Transpose up', icon: 'ₑ', selector: '[data-command="transposeUp"]' }),
          Object.freeze({ label: 'Transpose down', icon: '→', selector: '[data-command="transposeDown"]' })
        ])
      }),
      Object.freeze({
        name: 'Layout',
        commands: Object.freeze([
          Object.freeze({ label: 'Zoom out', icon: '∓', selector: '#zoomOut' }),
          Object.freeze({ label: 'Zoom in', icon: '+', selector: '#zoomIn' }),
          Object.freeze({ label: 'Full-screen score', icon: '⛶', selector: '[data-command="fullScreen"]' }),
          Object.freeze({ label: 'Reset spacing', icon: '↺', selector: '[data-command="resetScoreSpacing"]' })
        ])
      })
    ]),
    lyrics: Object.freeze([
      Object.freeze({
        name: 'Lyrics entry',
        commands: Object.freeze([
          Object.freeze({ label: 'Enter lyrics', icon: 'L', selector: '#lyricsModeButton' }),
          Object.freeze({ label: 'Paste complete lyrics', icon: '≡', selector: '#pasteLyricsButton' }),
          Object.freeze({ label: 'Copy verse', icon: '♪', selector: '#copyVerseButton' }),
          Object.freeze({ label: 'Search and replace', icon: '⌕', selector: '#lyricSearchButton' })
        ])
      }),
      Object.freeze({
        name: 'Navigation',
        commands: Object.freeze([
          Object.freeze({ label: 'Previous lyric note', icon: 'ₐ', selector: '#previousLyricNote' }),
          Object.freeze({ label: 'Apply syllable', icon: '✓', selector: '#applyQuickLyric' }),
          Object.freeze({ label: 'Next lyric note', icon: '↑', selector: '#nextLyricNote' }),
          Object.freeze({ label: 'Reset position', icon: '↺', selector: '#resetLyricPositionButton' })
        ])
      })
    ]),
    playback: Object.freeze([
      Object.freeze({
        name: 'Transport',
        commands: Object.freeze([
          Object.freeze({ label: 'Start', icon: '⏮', selector: '#rewindButton' }),
          Object.freeze({ label: 'Previous bar', icon: '|◀', selector: '#previousMeasureButton' }),
          Object.freeze({ label: 'Play', icon: '▶', selector: '#playButton', shortcut: 'Space' }),
          Object.freeze({ label: 'Stop', icon: '⒀', selector: '#stopButton' }),
          Object.freeze({ label: 'Next bar', icon: '■|', selector: '#nextMeasureButton' }),
          Object.freeze({ label: 'Loop', icon: '↻', selector: '#loopButton' })
        ])
      }),
      Object.freeze({
        name: 'Navigate',
        commands: Object.freeze([
          Object.freeze({ label: 'Previous beat', icon: '㠀.', selector: '#previousBeatButton' }),
          Object.freeze({ label: 'Next beat', icon: '.�', selector: '#nextBeatButton' }),
          Object.freeze({ label: 'Go to measure', icon: '#', selector: '#goToMeasureButton' })
        ])
      })
    ]),
    publish: Object.freeze([
      Object.freeze({
        name: 'Publish',
        accent: true,
        commands: Object.freeze([
          Object.freeze({ label: 'Dedicated PDF', icon: 'PDF', selector: '[data-publish="pdf"]', primary: true }),
          Object.freeze({ label: 'PNG pages', icon: 'PNG', selector: '[data-publish="png"]', primary: true }),
          Object.freeze({ label: 'System Print', icon: 'SYS', selector: '[data-command="system-print"]' })
        ])
      }),
      Object.freeze({
        name: 'Exchange',
        commands: Object.freeze([
          Object.freeze({ label: 'Export score', icon: '₩', selector: '#exportButton' }),
          Object.freeze({ label: 'MusicXML', icon: 'XML', selector: '[data-export="musicxml"]' }),
          Object.freeze({ label: 'MIDI', icon: 'MIDI', selector: '[data-export="midi"]' }),
          Object.freeze({ label: 'Tonic sol-fa', icon: 'd r m', selector: '[data-export="solfa"]' })
        ])
      }),
      Object.freeze({
        name: 'Release status',
        status: true,
        commands: Object.freeze([])
      })
    ]),
    view: Object.freeze([
      Object.freeze({
        name: 'Score views',
        commands: Object.freeze([
          Object.freeze({ label: 'Staff notation', icon: '℞
', selector: '[data-view="score"]' }),
          Object.freeze({ label: 'Tonic sol-fa', icon: 'd r m', selector: '[data-view="solfa"]' }),
          Object.freeze({ label: 'Mixer', icon: '⋋', selector: '[data-view="mixer"]' })
        ])
      }),
      Object.freeze({
        name: 'Panels',
        commands: Object.freeze([
          Object.freeze({ label: 'Composition', icon: '✎', selector: '[data-command="toggleCompositionPanel"]' }),
          Object.freeze({ label: 'Inspector', icon: '❥', selector: '[data-command="toggleInspector"]' }),
          Object.freeze({ label: 'Piano', icon: '♬', selector: '[data-command="togglePianoPanel"]' }),
          Object.freeze({ label: 'Tonic panel', icon: 'd', selector: '[data-command="toggleTonicPanel"]' })
        ])
      }),
      Object.freeze({
        name: 'Workspace',
        commands: Object.freeze([
          Object.freeze({ label: 'Reset workspace', icon: '↺', selector: '[data-command="resetWorkspace"]' }),
          Object.freeze({ label: 'High contrast', icon: '◐', selector: '[data-command="highContrast"]' }),
          Object.freeze({ label: 'Reduced motion', icon: '⁈', selector: '[data-command="reducedMotion"]' })
        ])
      })
    ])
  });

  function normalizeTab(value) {
    return VALID_TABS.includes(value) ? value : 'compose';
  }

  function readState(storage) {
    try {
      const parsed = JSON.parse(storage?.getItem(STORAGE_KEY) || '{}');
      return {
        activeTab: normalizeTab(parsed.activeTab),
        compact: Boolean(parsed.compact)
      };
    } catch (_) {
      return { activeTab: 'compose', compact: false };
    }
  }

  function writeState(storage, value) {
    try {
      storage?.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeTab: normalizeTab(value.activeTab),
          compact: Boolean(value.compact)
        })
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  function flattenCommands(manifest = COMMAND_MANIFEST) {
    return Object.values(manifest).flatMap(groups =>
      groups.flatMap(group => group.commands || [])
    );
  }

  function duplicateSelectors(manifest = COMMAND_MANIFEST) {
    const counts = new Map();
    flattenCommands(manifest).forEach(command => {
      counts.set(command.selector, (counts.get(command.selector) || 0) + 1);
    });
    return Array.from(counts.entries())
      .filter(([, count]) => count > 1)
      .map(([selector, count]) => ({ selector, count }));
  }

  function createElement(documentRef, tag, className, text) {
    const node = documentRef.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function setRuntimeStatus(documentRef, message, kind = 'info') {
    const host = documentRef.getElementById('composer3ShellStatus');
    if (!host) return;
    host.textContent = message;
    host.dataset.kind = kind;
  }

  function commandAvailable(documentRef, command) {
    return Boolean(documentRef.querySelector(command.selector));
  }

  function runCommand(documentRef, command) {
    const source = documentRef.querySelector(command.selector);
    if (!source) {
      setRuntimeStatus(documentRef, `${command.label} is unavailable in this score state.`, 'warning');
      return false;
    }
    if (source.disabled || source.getAttribute('aria-disabled') === 'true') {
      setRuntimeStatus(documentRef, `${command.label} is currently disabled.`, 'warning');
      return false;
    }
    const inertAncestor = source.closest?.('[inert]') || null;
    if (inertAncestor) inertAncestor.removeAttribute('inert');
    try {
      source.click();
    } finally {
      if (inertAncestor) inertAncestor.setAttribute('inert', '');
    }
    setRuntimeStatus(documentRef, `${command.label} opened.`, 'success');
    return true;
  }

  function commandButton(documentRef, command) {
    const button = createElement(documentRef, 'button', 'composer3-command');
    button.type = 'button';
    button.dataset.commandSelector = command.selector;
    button.dataset.commandLabel = command.label;
    if (command.primary) button.classList.add('primary');
    if (!commandAvailable(documentRef, command)) {
      button.classList.add('unavailable');
      button.setAttribute('aria-disabled', 'true');
    }

    const icon = createElement(documentRef, 'span', 'composer3-command-icon', command.icon);
    icon.setAttribute('aria-hidden', 'true');
    const label = createElement(documentRef, 'span', 'composer3-command-label', command.label);
    button.append(icon, label);
    if (command.shortcut) {
      const shortcut = createElement(documentRef, 'kbd', 'composer3-command-shortcut', command.shortcut);
      button.append(shortcut);
    }
    button.addEventListener('click', event => {
      event.preventDefault();
      runCommand(documentRef, command);
    });
    return button;
  }

  function createGroup(documentRef, group) {
    const section = createElement(
      documentRef,
      'section',
      `composer3-command-group${group.accent ? ' accent' : ''}${group.status ? ' status-group' : ''}`
    );
    section.setAttribute('aria-label', group.name);

    if (group.status) {
      const readiness = createElement(documentRef, 'div', 'composer3-publish-readiness');
      readiness.innerHTML = [
        '<strong>Publishing ready</strong>',
        '<span>Dedicated PDF × numbered PNG pages · System Print fallback</span>',
        `<small>Composer 3 · Build ${BUILD}</small>`
      ].join('');
      section.append(readiness);
      return section;
    }

    const commands = createElement(documentRef, 'div', 'composer3-command-list');
    group.commands.forEach(command => commands.append(commandButton(documentRef, command)));
    const caption = createElement(documentRef, 'div', 'composer3-group-caption', group.name);
    section.append(commands, caption);
    return section;
  }

  function createShell(documentRef, activeTab) {
    const shell = createElement(documentRef, 'section', 'composer3-command-deck');
    shell.id = 'composer3CommandDeck';
    shell.dataset.build = String(BUILD);
    shell.setAttribute('aria-label', 'Composer 3 command workspace');

    const tabs = createElement(documentRef, 'div', 'composer3-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Composer work areas');

    const tabLabels = {
      compose: 'Compose',
      notation: 'Notation',
      lyrics: 'Lyrics',
      playback: 'Playback',
      publish: 'Publish',
      view: 'View'
    };

    VALID_TABS.forEach((tabName, index) => {
      const tab = createElement(documentRef, 'button', 'composer3-tab', tabLabels[tabName]);
      tab.type = 'button';
      tab.id = `composer3Tab-${tabName}`;
      tab.dataset.shellTab = tabName;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `composer3Panel-${tabName}`);
      tab.setAttribute('aria-selected', String(tabName === activeTab));
      tab.tabIndex = tabName === activeTab ? 0 : -1;
      if (tabName === 'publish') tab.classList.add('publish-tab');
      tabs.append(tab);

      const panel = createElement(documentRef, 'div', 'composer3-tab-panel');
      panel.id = `composer3Panel-${tabName}`;
      panel.dataset.shellPanel = tabName;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.hidden = tabName !== activeTab;
      COMMAND_MANIFEST[tabName].forEach(group => panel.append(createGroup(documentRef, group)));
      shell.append(panel);

      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const allTabs = Array.from(tabs.querySelectorAll('[data-shell-tab]'));
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % allTabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + allTabs.length) % allTabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = allTabs.length - 1;
        allTabs[nextIndex].click();
        allTabs[nextIndex].focus();
      });
    });

    const chrome = createElement(documentRef, 'div', 'composer3-deck-chrome');
    const identity = createElement(documentRef, 'div', 'composer3-deck-identity');
    identity.innerHTML = `<strong>Composer 3</strong><span>Professional score workspace</span>`;

    const status = createElement(documentRef, 'div', 'composer3-shell-status', 'Ready');
    status.id = 'composer3ShellStatus';
    status.dataset.kind = 'success';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');

    const compact = createElement(documentRef, 'button', 'composer3-compact-toggle', 'Compact');
    compact.type = 'button';
    compact.id = 'composer3CompactToggle';
    compact.setAttribute('aria-pressed', 'false');

  chrome.append(identity, tabs, status, compact);
    shell.prepend(chrome);
    return shell;
  }

  function activateTab(documentRef, tabName, storage) {
    const next = normalizeTab(tabName);
    documentRef.querySelectorAll('[data-shell-tab]').forEach(tab => {
      const active = tab.dataset.shellTab === next;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    documentRef.querySelectorAll('[data-shell-panel]').forEach(panel => {
      panel.hidden = panel.dataset.shellPanel !== next;
    });
    const current = readState(storage);
    writeState(storage, { ...current, activeTab: next });
    setRuntimeStatus(documentRef, `${next[0].toUpperCase()}${next.slice(1)} tools ready.`, 'success');
    return next;
  }

  function updateIdentity(documentRef) {
    const badge = documentRef.querySelector('.build-badge');
    if (badge) {
      badge.textContent = `Build ${BUILD} · Composer 3`;
      badge.removeAttribute('data-build-18-badge');
      badge.setAttribute('data-build-19-badge', 'true');
    }
    const aboutVersion = documentRef.querySelector('#aboutDialog .about-content strong');
    if (aboutVersion) {
      aboutVersion.textContent = `Airmonlink Composer 1.1.0 ÷ Build ${BUILD}`;
    }
    const title = documentRef.querySelector('.brand-wordmark span');
    if (title) title.textContent = 'Composer 3';
  }

  function retireLegacyNavigation(documentRef) {
    const legacy = documentRef.querySelector('.professional-nav');
    if (!legacy) return false;
    legacy.classList.add('composer3-legacy-command-source');
    legacy.setAttribute('aria-hidden', 'true');
    legacy.setAttribute('inert', '');
    legacy.querySelectorAll('button, input, select, textarea, [tabindex]').forEach(node => {
      node.dataset.composer3PreviousTabindex = node.getAttribute('tabindex') || '';
      node.setAttribute('tabindex', '-1');
    });
    return true;
  }

  function mount(rootRef) {
    const documentRef = rootRef?.document;
    if (!documentRef || documentRef.documentElement.dataset.composer3Mounted === 'true') {
      return false;
    }

    const app = documentRef.getElementById('app');
    const legacyNav = documentRef.querySelector('.professional-nav');
    const workspace = documentRef.querySelector('.workspace');
    if (!app || !workspace) return false;

    const saved = readState(rootRef.localStorage);
    const shell = createShell(documentRef, saved.activeTab);
    if (legacyNav) legacyNav.before(shell);
    else workspace.before(shell);

    retireLegacyNavigation(documentRef);
    updateIdentity(documentRef);

    documentRef.documentElement.dataset.composer3Mounted = 'true';
    documentRef.documentElement.dataset.composer3Build = String(BUILD);
    documentRef.body.classList.add('composer3-interface');
    documentRef.body.classList.toggle('composer3-compact', saved.compact);

    const compactButton = documentRef.getElementById('composer3CompactToggle');
    compactButton?.setAttribute('aria-pressed', String(saved.compact));
    compactButton?.addEventListener('click', () => {
      const compact = !documentRef.body.classList.contains('composer3-compact');
      documentRef.body.classList.toggle('composer3-compact', compact);
      compactButton.setAttribute('aria-pressed', String(compact));
      compactButton.textContent = compact ? 'Comfortable' : 'Compact';
      const state = readState(rootRef.localStorage);
      writeState(rootRef.localStorage, { ...state, compact });
      setRuntimeStatus(documentRef, compact ? 'Compact command deck enabled.' : 'Comfortable command deck enabled.');
    });

    shell.querySelectorAll('[data-shell-tab]').forEach(tab => {
      tab.addEventListener('click', () => activateTab(documentRef, tab.dataset.shellTab, rootRef.localStorage));
    });

    let resizeFrame = 0;
    rootRef.addEventListener('resize', () => {
      if (resizeFrame) rootRef.cancelAnimationFrame(resizeFrame);
      resizeFrame = rootRef.requestAnimationFrame(() => {
        documentRef.body.classList.toggle('composer3-narrow', rootRef.innerWidth < 1180);
      });
    });
    documentRef.body.classList.toggle('composer3-narrow', rootRef.innerWidth < 1180);

    rootRef.dispatchEvent(new rootRef.CustomEvent('airmon:composer3-mounted', {
      detail: { build: BUILD, activeTab: saved.activeTab }
    }));
    setRuntimeStatus(documentRef, `Composer 3 Build ${BUILD} loaded.`, 'success');
    return true;
  }

  function verify(documentRef = typeof document !== 'undefined' ? document : null) {
    if (!documentRef) {
      return {
        mounted: false,
        build: BUILD,
        reason: 'No document is available.'
      };
    }
    const shell = documentRef.getElementById('composer3CommandDeck');
    const legacy = documentRef.querySelector('.professional-nav');
    const viewport = documentRef.getElementById('canvasScroll');
    const shellRect = shell?.getBoundingClientRect?.();
    const viewportRect = viewport?.getBoundingClientRect?.();
    const overlap = Boolean(
      shellRect &&
      viewportRect &&
      shellRect.bottom > viewportRect.top + 1 &&
      shellRect.top < viewportRect.bottom
    );

    return {
      mounted: Boolean(shell),
      build: BUILD,
      tabs: documentRef.querySelectorAll('[data-shell-tab]').length,
      activePanels: Array.from(documentRef.querySelectorAll('[data-shell-panel]'))
        .filter(panel => !panel.hidden).length,
      commands: documentRef.querySelectorAll('.composer3-command').length,
      publishControls: documentRef.querySelectorAll(
        '#composer3Panel-publish .composer3-command'
      ).length,
      legacyNavigationInert: Boolean(
        legacy &&
        legacy.hasAttribute('inert') &&
        legacy.getAttribute('aria-hidden') === 'true'
      ),
      dockManager: Boolean(globalThis.AirmonDockManager),
      publishingController: Boolean(globalThis.AirmonPublishingUI),
      staffViewportOverlapped: overlap,
      duplicateManifestSelectors: duplicateSelectors()
    };
  }

  return Object.freeze({
    build: BUILD,
    tabs: VALID_TABS,
    manifest: COMMAND_MANIFEST,
    normalizeTab,
    readState,
    writeState,
    flattenCommands,
    duplicateSelectors,
    commandAvailable,
    runCommand,
    mount,
    verify
  });
});
