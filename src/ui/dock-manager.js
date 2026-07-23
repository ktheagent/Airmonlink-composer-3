(() => {
  'use strict';

  const STORAGE_KEY = 'airmon-panel-positions-v2';
  const PANELS = ['composition', 'inspector', 'tonic'];
  const DRAG_THRESHOLD = 5;
  let drag = null;

  const panelFor = name =>
    document.querySelector(`[data-dock-panel="${name}"]`);
  const floatButtonFor = name =>
    document.querySelector(`[data-float-panel="${name}"]`);
  const dock = () => document.getElementById('rightDock');
  const dropZone = () => document.getElementById('rightDockDropZone');

  function readPositions() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch (_) {
      return {};
    }
  }

  function writePositions(value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }

  function clampPosition(position, element) {
    const width = Math.max(280, element?.offsetWidth || 340);
    const height = Math.max(180, element?.offsetHeight || 480);
    return {
      left: Math.min(
        Math.max(8, Number(position?.left) || 24),
        Math.max(8, window.innerWidth - width - 8)
      ),
      top: Math.min(
        Math.max(56, Number(position?.top) || 96),
        Math.max(56, window.innerHeight - height - 8)
      )
    };
  }

  function applySavedPosition(name) {
    const panel = panelFor(name);
    if (!panel || !panel.classList.contains('floating')) return;
    const saved = readPositions()[name];
    const position = clampPosition(saved, panel);
    panel.style.left = `${position.left}px`;
    panel.style.top = `${position.top}px`;
    panel.style.right = 'auto';
  }

  function savePosition(name, panel) {
    const positions = readPositions();
    const rect = panel.getBoundingClientRect();
    positions[name] = clampPosition(
      { left: rect.left, top: rect.top },
      panel
    );
    writePositions(positions);
  }

  function ensureFloating(name) {
    const panel = panelFor(name);
    if (!panel) return null;
    if (!panel.classList.contains('floating')) {
      floatButtonFor(name)?.click();
    }
    return panel;
  }

  function ensureDocked(name) {
    const panel = panelFor(name);
    if (!panel) return;
    if (panel.classList.contains('floating')) {
      floatButtonFor(name)?.click();
    }
    panel.style.removeProperty('left');
    panel.style.removeProperty('top');
    panel.style.removeProperty('right');
  }

  function showDropTarget(show) {
    dropZone()?.classList.toggle('active', Boolean(show));
    dock()?.classList.toggle('dock-drag-active', Boolean(show));
    document.body.classList.toggle('panel-drag-active', Boolean(show));
  }

  function dockTargetContains(x, y) {
    const target = dropZone() || dock();
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function start(event, handle) {
    if (event.button !== 0 || event.target.closest('button,input,select,textarea')) {
      return;
    }
    const name = handle.dataset.dockHandle;
    if (!PANELS.includes(name)) return;
    const panel = panelFor(name);
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    drag = {
      name,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      active: false,
      panel,
      handle
    };
    handle.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  function move(event) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = Math.hypot(
      event.clientX - drag.startX,
      event.clientY - drag.startY
    );
    if (!drag.active && distance < DRAG_THRESHOLD) return;

    if (!drag.active) {
      drag.active = true;
      drag.panel = ensureFloating(drag.name) || drag.panel;
      drag.panel.classList.add('mouse-dragging');
      showDropTarget(true);
    }

    const position = clampPosition(
      {
        left: event.clientX - drag.offsetX,
        top: event.clientY - drag.offsetY
      },
      drag.panel
    );
    drag.panel.style.left = `${position.left}px`;
    drag.panel.style.top = `${position.top}px`;
    drag.panel.style.right = 'auto';
    dropZone()?.classList.toggle(
      'hover',
      dockTargetContains(event.clientX, event.clientY)
    );
  }

  function finish(event) {
    if (!drag || (event.pointerId != null && drag.pointerId !== event.pointerId)) {
      return;
    }

    if (drag.active) {
      if (dockTargetContains(event.clientX, event.clientY)) {
        ensureDocked(drag.name);
      } else {
        savePosition(drag.name, drag.panel);
      }
      drag.panel.classList.remove('mouse-dragging');
    }

    drag.handle.releasePointerCapture?.(drag.pointerId);
    drag = null;
    showDropTarget(false);
    dropZone()?.classList.remove('hover');
  }

  function restore() {
    PANELS.forEach(applySavedPosition);
  }

  function bind() {
    if (document.documentElement.dataset.dockManagerBound === '2') return;
    document.documentElement.dataset.dockManagerBound = '2';

    document.querySelectorAll('[data-dock-handle]').forEach(handle => {
      handle.addEventListener('pointerdown', event => start(event, handle));
    });
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    window.addEventListener('resize', restore);

    document.querySelectorAll('[data-float-panel]').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.dataset.floatPanel;
        requestAnimationFrame(() => applySavedPosition(name));
      });
    });

    restore();
  }

  window.AirmonDockManager = Object.freeze({
    version: 2,
    bind,
    restore,
    verify() {
      return {
        handles: document.querySelectorAll('[data-dock-handle]').length,
        dropZone: Boolean(dropZone()),
        panels: PANELS.filter(name => Boolean(panelFor(name))).length
      };
    }
  });

  bind();
})();
