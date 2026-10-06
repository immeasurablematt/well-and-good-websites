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

// Preserve simple inline formatting while preventing active pasted or imported content.
export function sanitizeHtml(html, doc) {
  const template = doc.createElement('template');
  template.innerHTML = html;
  const allowed = new Set(['A', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'SPAN', 'SMALL', 'CODE', 'DIV', 'P', 'DETAILS', 'SUMMARY', 'H1', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'FIGCAPTION', 'DT', 'DD']);
  for (const el of [...template.content.querySelectorAll('*')].reverse()) {
    if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'IMG', 'VIDEO', 'AUDIO', 'LINK', 'META'].includes(el.tagName)) {
      el.remove(); continue;
    }
    if (!allowed.has(el.tagName)) { el.replaceWith(...el.childNodes); continue; }
    for (const attr of [...el.attributes]) {
      if (!['href', 'rel', 'target', 'class', 'aria-hidden'].includes(attr.name) || (attr.name === 'href' && !/^(https?:|mailto:|tel:|\/|#)/i.test(attr.value))) el.removeAttribute(attr.name);
    }
    if (el.tagName === 'A' && el.getAttribute('target') === '_blank' && !el.relList.contains('noopener')) el.setAttribute('rel', 'noopener noreferrer');
  }
  return template.innerHTML;
}
