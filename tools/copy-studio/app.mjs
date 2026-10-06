import { config } from './config.mjs';
import { loadDraft, saveDraft, computeKey, nearestContainerId, labelFor, sanitizeHtml } from './core.mjs';

const $ = (id) => document.getElementById(id);
const iframe = $('studio-frame');
let review;
let state = { version: 1, pages: {} };
let registry = new Map();
let registryPath = null;
let path = '/';
let mode = 'proposed';
let conflicts = new Set();
let saveQueue = Promise.resolve();
let revision = 0;
let resetTimer;
let ready = false;
let busy = false;
const storageKey = 'whole-site-review-v1';

function status(message, error = false) {
  $('save-status').textContent = message;
  $('save-status').classList.toggle('error', error);
}
function setBusy(value) {
  busy = value;
  document.querySelectorAll('button, input, select, textarea').forEach((control) => { control.disabled = value; });
  iframe.style.pointerEvents = value ? 'none' : '';
  for (const [key, entry] of registry) {
    const field = state.pages[registryPath]?.fields[key];
    entry.el.contentEditable = !value && mode === 'proposed' && registryPath === path && (!field || field.originalHtml === entry.originalHtml) ? 'true' : 'false';
  }
  if (!value) for (const name of ['title', 'description']) $('proposed-' + name).disabled = mode === 'current';
}
function collectElements(doc) {
  const excluded = config.excludedSelectors.join(',');
  const elements = [...new Set([...doc.querySelectorAll(config.editableSelectors.join(',')), ...doc.querySelectorAll(`[${config.forceIncludeAttr}]`)])]
    .filter((el) => !el.closest(excluded) && !el.closest(`[${config.ignoreAttr}]`));
  const set = new Set(elements);
  return elements.filter((el) => {
    for (let parent = el.parentElement; parent; parent = parent.parentElement) if (set.has(parent)) return false;
    return true;
  });
}
function entriesFor(doc) {
  const counters = new Map();
  return new Map(collectElements(doc).map((el) => [computeKey(el, doc, counters), {
    el, tag: el.tagName.toLowerCase(), containerId: nearestContainerId(el, doc),
    label: labelFor(el), originalHtml: el.innerHTML,
  }]));
}
function definition() { return review.pages.find((page) => page.path === path); }
function pageDraft() { return state.pages[path]; }
function reportConflicts() {
  $('source-conflicts').hidden = conflicts.size === 0;
  $('source-conflicts').textContent = [...conflicts].join(' ');
}
function changedCount(page) {
  return Object.values(page.fields).filter((field) => field.currentHtml !== field.originalHtml).length +
    Object.values(page.metadata || {}).filter((value) => value.current !== value.original).length;
}
function updateStats() {
  $('stat-fields').textContent = registry.size;
  $('stat-changed').textContent = changedCount(pageDraft());
  $('stat-total').textContent = Object.values(state.pages).reduce((count, page) => count + changedCount(page), 0);
}
function persist() {
  if (!ready) return Promise.resolve();
  state.updatedAt = new Date().toISOString();
  const serial = ++revision;
  const payload = JSON.stringify(state);
  let backupSaved = true;
  try { saveDraft(storageKey, state); } catch { backupSaved = false; }
  status('Saving on this Mac…');
  saveQueue = saveQueue.catch(() => {}).then(async () => {
    const response = await fetch('/api/drafts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload });
    if (!response.ok) {
      const failure = await response.json().catch(() => ({}));
      throw new Error(failure.error || 'Save returned ' + response.status);
    }
    if (serial === revision) status('Saved on this Mac');
  }).catch((error) => {
    if (serial === revision) status('Save failed. ' + (backupSaved ? 'Browser backup retained. ' : 'Browser backup also failed. Export before closing. ') + error.message, true);
  });
  return saveQueue;
}
function seedPage(page, doc, saved) {
  const entries = entriesFor(doc);
  const next = { fields: { ...(saved?.fields || {}) }, metadata: {} };
  for (const proposal of page.fields) {
    const el = doc.querySelector(proposal.selector);
    const match = [...entries].find(([, entry]) => entry.el === el);
    if (!match || el.innerHTML !== proposal.originalHtml) {
      conflicts.add(`${page.label}: proposed field does not match the source (${proposal.selector}).`);
      continue;
    }
    const [key, entry] = match;
    if (!next.fields[key]) next.fields[key] = { tag: entry.tag, containerId: entry.containerId, label: entry.label,
      selector: proposal.selector, originalHtml: entry.originalHtml, currentHtml: proposal.currentHtml };
  }
  for (const [key, field] of Object.entries(next.fields)) {
    if (!entries.has(key) || entries.get(key).originalHtml !== field.originalHtml) {
      conflicts.add(`${page.label}: saved edit “${field.label}” conflicts with the source. It remains in the draft export.`);
    }
  }
  const originals = { title: doc.title, description: doc.querySelector('meta[name="description"]')?.content || '' };
  for (const name of ['title', 'description']) {
    const proposal = page.metadata?.[name];
    const current = saved?.metadata?.[name] || proposal;
    if (current?.original !== undefined && current.original !== originals[name]) {
      conflicts.add(`${page.label}: saved ${name} differs from its source. It remains in the draft.`);
    }
    next.metadata[name] = current || { original: originals[name], current: originals[name] };
  }
  return next;
}
function paint() {
  const scroll = { x: iframe.contentWindow.scrollX, y: iframe.contentWindow.scrollY };
  for (const [key, entry] of registry) {
    const field = pageDraft().fields[key];
    const matches = !field || field.originalHtml === entry.originalHtml;
    entry.el.innerHTML = mode === 'proposed' && field && matches ? field.currentHtml : entry.originalHtml;
    entry.el.contentEditable = mode === 'proposed' && matches ? 'true' : 'false';
    entry.el.classList.toggle('copy-studio-changed', Boolean(field && matches && field.currentHtml !== entry.originalHtml));
  }
  iframe.contentDocument.documentElement.classList.toggle('copy-studio-highlight', $('highlight-changes').checked);
  for (const name of ['title', 'description']) {
    const value = pageDraft().metadata[name];
    $('current-' + name).textContent = name === 'title' ? iframe.contentDocument.title : (iframe.contentDocument.querySelector('meta[name="description"]')?.content || '');
    $('proposed-' + name).value = value.current;
    $('proposed-' + name).disabled = mode === 'current';
  }
  $('mode-note').textContent = mode === 'current' ? 'Current website copy. Read only.' : 'Proposed copy. Click any text to edit it.';
  document.querySelectorAll('[data-mode]').forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  iframe.contentWindow.scrollTo({left: scroll.x, top: scroll.y, behavior: 'instant'});
  updateStats();
}
function captureField(key) {
  if (mode !== 'proposed' || busy || !ready || registryPath !== path) return;
  const entry = registry.get(key);
  const prior = pageDraft().fields[key];
  if (prior && prior.originalHtml !== entry.originalHtml) {
    status('This field has a source conflict. Export the retained draft before resolving it.', true);
    return;
  }
  const safe = sanitizeHtml(entry.el.innerHTML, iframe.contentDocument);
  if (safe !== entry.el.innerHTML) entry.el.innerHTML = safe;
  pageDraft().fields[key] = { tag: entry.tag, containerId: entry.containerId, label: entry.label,
    selector: prior?.selector, originalHtml: entry.originalHtml, currentHtml: safe };
  entry.el.classList.toggle('copy-studio-changed', safe !== entry.originalHtml);
  updateStats();
  persist();
}
function wireDocument(doc) {
  registry = entriesFor(doc);
  registryPath = path;
  const style = doc.createElement('style');
  style.textContent = '[contenteditable="true"]:focus{outline:2px dashed #bf5b31;outline-offset:4px}.copy-studio-highlight .copy-studio-changed{box-shadow:0 0 0 2px #d69437;background-color:#fff0c7!important}';
  doc.head.appendChild(style);
  for (const [key, entry] of registry) {
    entry.el.dataset.copyStudioKey = key;
    entry.el.addEventListener('input', () => captureField(key));
    entry.el.addEventListener('paste', (event) => {
      if (mode !== 'proposed') return;
      event.preventDefault();
      const html = event.clipboardData.getData('text/html');
      if (html) doc.execCommand('insertHTML', false, sanitizeHtml(html, doc));
      else doc.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
      captureField(key);
    });
    entry.el.addEventListener('drop', (event) => event.preventDefault());
  }
  doc.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) event.preventDefault();
  }, true);
  doc.addEventListener('submit', (event) => { event.preventDefault(); event.stopImmediatePropagation(); status('Form submission is disabled in this review.'); }, true);
  $('page-note').textContent = definition().note || '';
  paint();
}
function validatePayload(payload) {
  if (payload?.version !== undefined && payload.version !== 1) throw new Error('Unsupported draft version.');
  if (!payload || !payload.pages || typeof payload.pages !== 'object' || Array.isArray(payload.pages)) throw new Error('Expected a whole-site draft with pages.');
  const clean = { version: 1, pages: {}, updatedAt: payload.updatedAt || '' };
  for (const [route, page] of Object.entries(payload.pages)) {
    if (!review.pages.some((item) => item.path === route)) throw new Error('Unrecognised page: ' + route);
    if (!page?.fields || typeof page.fields !== 'object' || Array.isArray(page.fields)) throw new Error('Invalid fields for ' + route);
    const fields = {};
    for (const [key, field] of Object.entries(page.fields)) {
      if (['__proto__', 'constructor', 'prototype'].includes(key) || ['tag', 'containerId', 'label', 'originalHtml', 'currentHtml'].some((name) => typeof field?.[name] !== 'string') || (field.selector !== undefined && typeof field.selector !== 'string')) throw new Error('Invalid field: ' + key);
      const safe = sanitizeHtml(field.currentHtml, document);
      if (safe !== field.currentHtml) throw new Error('Unsupported or unsafe markup in ' + field.label + '. No changes were imported.');
      fields[key] = { ...field, currentHtml: safe };
    }
    const metadata = {};
    for (const name of ['title', 'description']) {
      if (page.metadata?.[name]) {
        const value = page.metadata[name];
        if (typeof value.original !== 'string' || typeof value.current !== 'string') throw new Error('Invalid ' + name);
        metadata[name] = { original: value.original, current: value.current };
      }
    }
    clean.pages[route] = { fields, metadata };
  }
  return clean;
}
async function rebuild(saved = {}) {
  conflicts = new Set();
  const pages = {};
  for (const page of review.pages) {
    const response = await fetch(page.path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Cannot load ' + page.path);
    const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
    pages[page.path] = seedPage(page, doc, saved.pages?.[page.path]);
  }
  state = { version: 1, pages };
  reportConflicts();
}
$('page-select').addEventListener('change', async (event) => {
  persist();
  setBusy(true);
  path = event.target.value;
  iframe.src = path;
});
document.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => {
  persist();
  mode = button.dataset.mode;
  paint();
}));
$('highlight-changes').addEventListener('change', paint);
for (const name of ['title', 'description']) $('proposed-' + name).addEventListener('input', (event) => {
  pageDraft().metadata[name].current = event.target.value;
  updateStats();
  persist();
});
document.querySelectorAll('[data-viewport]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-viewport]').forEach((other) => other.classList.toggle('active', other === button));
  $('frame-wrap').style.width = button.dataset.viewport;
}));
$('btn-export').addEventListener('click', () => {
  const pages = {};
  for (const [route, page] of Object.entries(state.pages)) pages[route] = {
    fields: structuredClone(page.fields),
    metadata: structuredClone(page.metadata),
  };
  const payload = { version: 1, title: review.title, updatedAt: state.updatedAt, pages, sourceMapping: review.pages };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'well-and-good-growth-copy-draft.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('input-import').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  setBusy(true);
  try {
    const imported = validatePayload(JSON.parse(await file.text()));
    // Merge so an incomplete export cannot erase edits on other pages.
    const combined = structuredClone(state);
    for (const [route, page] of Object.entries(imported.pages)) {
      Object.assign(combined.pages[route].fields, page.fields);
      Object.assign(combined.pages[route].metadata, page.metadata);
    }
    await rebuild(combined); paint(); await persist();
  } catch (error) { status('Import failed: ' + error.message, true); }
  finally { setBusy(false); }
  event.target.value = '';
});
$('btn-reset').addEventListener('click', async () => {
  if (!resetTimer) {
    $('btn-reset').textContent = 'Confirm reset of all your edits';
    resetTimer = setTimeout(() => { resetTimer = null; $('btn-reset').textContent = 'Reset to proposed draft'; }, 5000);
    return;
  }
  clearTimeout(resetTimer); resetTimer = null; $('btn-reset').textContent = 'Reset to proposed draft';
  setBusy(true);
  try { await rebuild(); paint(); await persist(); }
  catch (error) { status('Reset failed. Your existing draft is retained. ' + error.message, true); }
  finally { setBusy(false); }
});
window.addEventListener('beforeunload', () => {
  if (!ready) return;
  try { saveDraft(storageKey, state); } catch {}
  navigator.sendBeacon('/api/drafts', new Blob([JSON.stringify(state)], { type: 'application/json' }));
});
iframe.addEventListener('load', () => {
  if (!review || !state.pages[path]) return;
  try { wireDocument(iframe.contentDocument); setBusy(false); } catch (error) { status('Preview failed: ' + error.message, true); }
});
async function start() {
  setBusy(true);
  const response = await fetch('/copy-review.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Cannot load proposed copy.');
  review = await response.json();
  $('review-title').textContent = review.title;
  const local = loadDraft(storageKey);
  let saved = local.pages ? local : {};
  try {
    const response = await fetch('/api/drafts', { cache: 'no-store' });
    if (!response.ok) throw new Error('Draft store returned ' + response.status);
    const remote = await response.json();
    if (remote.pages && (!saved.updatedAt || (remote.updatedAt || '') >= saved.updatedAt)) saved = remote;
  } catch (error) { status('Using browser backup. ' + error.message, true); }
  if (saved.pages) saved = validatePayload(saved);
  await rebuild(saved);
  ready = true;
  $('page-select').replaceChildren(...review.pages.map((page) => {
    const option = document.createElement('option'); option.value = page.path; option.textContent = page.label; return option;
  }));
  path = review.pages[0].path;
  $('page-select').value = path;
  await persist();
  iframe.src = path;
  window.copyStudio = { getDraft: () => structuredClone(state), getRegistry: () => registry, save: persist };
}
start().catch((error) => status('Review could not start: ' + error.message, true));
