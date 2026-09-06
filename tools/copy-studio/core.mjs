// Draft persistence and stable-key computation. No DOM wiring here.

const STORAGE_PREFIX = 'copy-studio-draft:';

export function draftStorageKey(pageUrl) {
  return STORAGE_PREFIX + pageUrl;
}

export function loadDraft(pageUrl) {
  try {
    const raw = window.localStorage.getItem(draftStorageKey(pageUrl));
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('[copy-studio] failed to load draft', err);
    return {};
  }
}

export function saveDraft(pageUrl, draft) {
  window.localStorage.setItem(draftStorageKey(pageUrl), JSON.stringify(draft));
}

export function clearDraft(pageUrl) {
  window.localStorage.removeItem(draftStorageKey(pageUrl));
}

export function nearestContainerId(el, doc) {
  let node = el.parentElement;
  while (node && node !== doc.body) {
    if (node.id) return node.id;
    node = node.parentElement;
  }
  return 'page';
}

// Key precedence: explicit data-copy-id > nearest ancestor id + tag + index > page + tag + index.
export function computeKey(el, doc, tagCounters) {
  if (el.hasAttribute('data-copy-id')) {
    return 'id:' + el.getAttribute('data-copy-id');
  }
  const tag = el.tagName.toLowerCase();
  const containerId = nearestContainerId(el, doc);
  const counterKey = containerId + '::' + tag;
  const index = tagCounters.get(counterKey) || 0;
  tagCounters.set(counterKey, index + 1);
  return counterKey + ':' + index;
}

export function labelFor(el) {
  const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
  return text.length > 60 ? text.slice(0, 57) + '...' : (text || '(empty)');
}
