import { config } from './config.mjs';
import { loadDraft, saveDraft, clearDraft, computeKey, nearestContainerId, labelFor } from './core.mjs';

const iframe = document.getElementById('studio-frame');
const statFields = document.getElementById('stat-fields');
const statChanged = document.getElementById('stat-changed');
const resetBtn = document.getElementById('btn-reset');
const exportBtn = document.getElementById('btn-export');
const importInput = document.getElementById('input-import');
const viewportBtns = Array.from(document.querySelectorAll('[data-viewport]'));
const frameWrap = document.getElementById('frame-wrap');

let registry = new Map(); // key -> { el, original, label, tag, containerId }
let draft = {};
let resetArmed = false;
let resetTimer = null;

function isExcluded(el) {
  return Boolean(el.closest(config.excludedSelectors.join(',')) || el.closest(`[${config.ignoreAttr}]`));
}

function collectElements(doc) {
  const candidates = Array.from(doc.querySelectorAll(config.editableSelectors.join(',')))
    .filter((el) => !isExcluded(el));
  const forced = Array.from(doc.querySelectorAll(`[${config.forceIncludeAttr}]`));
  const merged = Array.from(new Set([...candidates, ...forced]));

  // Keep only the outermost element when candidates nest (e.g. a <p> containing an <a>).
  const set = new Set(merged);
  return merged.filter((el) => {
    let parent = el.parentElement;
    while (parent) {
      if (set.has(parent)) return false;
      parent = parent.parentElement;
    }
    return true;
  });
}

function updateStats() {
  statFields.textContent = String(registry.size);
  statChanged.textContent = String(Object.keys(draft).length);
}

function persistField(key) {
  const entry = registry.get(key);
  if (!entry) return;
  const current = entry.el.innerHTML;
  if (current === entry.original) {
    delete draft[key];
  } else {
    draft[key] = {
      tag: entry.tag,
      containerId: entry.containerId,
      label: entry.label,
      originalHtml: entry.original,
      currentHtml: current,
    };
  }
  saveDraft(config.pageUrl, draft);
  updateStats();
}

function wireDocument(doc) {
  registry = new Map();
  draft = loadDraft(config.pageUrl);
  const tagCounters = new Map();
  const elements = collectElements(doc);

  elements.forEach((el) => {
    const key = computeKey(el, doc, tagCounters);
    const tag = el.tagName.toLowerCase();
    const containerId = nearestContainerId(el, doc);
    const original = el.innerHTML;

    registry.set(key, { el, original, label: labelFor(el), tag, containerId });
    el.setAttribute('contenteditable', 'true');
    el.dataset.copyStudioKey = key;

    const saved = draft[key];
    if (saved) {
      if (saved.originalHtml === original) {
        el.innerHTML = saved.currentHtml;
      } else {
        // Source has drifted since this entry was captured; don't apply a stale edit.
        delete draft[key];
      }
    }

    el.addEventListener('input', () => persistField(key));
    el.addEventListener('focus', () => {
      el.style.outline = '2px dashed #E76F4F';
      el.style.outlineOffset = '2px';
    });
    el.addEventListener('blur', () => {
      el.style.outline = '';
    });
  });

  // Studio is for editing text, not for navigating away from the page being edited.
  doc.querySelectorAll('a[href]').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

  saveDraft(config.pageUrl, draft);
  updateStats();
}

function loadStudio() {
  iframe.addEventListener('load', () => {
    try {
      wireDocument(iframe.contentDocument);
    } catch (err) {
      console.error('[copy-studio] could not access iframe document (same-origin required)', err);
    }
  });
  iframe.src = config.pageUrl;
}

exportBtn.addEventListener('click', () => {
  const payload = { page: config.pageUrl, fields: draft };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'copy-studio-draft.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importInput.addEventListener('change', async () => {
  const file = importInput.files[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const fields = payload.fields || payload;
    Object.entries(fields).forEach(([key, field]) => {
      const entry = registry.get(key);
      if (entry) {
        entry.el.innerHTML = field.currentHtml;
        persistField(key);
      }
    });
  } catch (err) {
    alert('Could not read that draft file: ' + err.message);
  }
  importInput.value = '';
});

resetBtn.addEventListener('click', () => {
  if (!resetArmed) {
    resetArmed = true;
    resetBtn.textContent = 'Click again to confirm reset';
    resetTimer = setTimeout(() => {
      resetArmed = false;
      resetBtn.textContent = 'Reset to source';
    }, 4000);
    return;
  }
  clearTimeout(resetTimer);
  resetArmed = false;
  resetBtn.textContent = 'Reset to source';
  clearDraft(config.pageUrl);
  iframe.src = config.pageUrl;
});

viewportBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    viewportBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    frameWrap.style.width = btn.dataset.viewport;
  });
});

loadStudio();
