import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../../site-growth/enquiry-measurement.js', import.meta.url), 'utf8');
const key = 'wgg-enquiry-pending-v1';
function target(extra = {}) {
  const handlers = {};
  return { ...extra, addEventListener(type, fn) { (handlers[type] ||= []).push(fn); },
    fire(type, event = {}) { for (const fn of handlers[type] || []) fn(event); } };
}
function setup({ url = 'https://www.wellandgoodgrowth.ca/', storage = new Map(), blocked = false,
  analytics = true, brokenAnalytics = false, valid = true, placement = '.main-nav' } = {}) {
  const events = [];
  let beforeSend;
  const location = new URL(url);
  const elements = { service: { value: 'Web development' }, _honey: { value: '' },
    _next: { value: 'https://www.wellandgoodgrowth.ca/thank-you/' } };
  const form = target({ elements, checkValidity: () => valid });
  const dialog = { open: true };
  const button = target({ closest(selector) { return selector.includes(placement) ? {} : null; } });
  const window = target(analytics ? { va(command, payload) {
    if (brokenAnalytics) throw Error('analytics unavailable');
    if (command === 'beforeSend') beforeSend = payload;
    else events.push(payload);
  } } : {});
  const sessionStorage = {
    getItem(k) { if (blocked) throw Error('blocked'); return storage.get(k) || null; },
    setItem(k, v) { if (blocked) throw Error('blocked'); storage.set(k, v); },
    removeItem(k) { if (blocked) throw Error('blocked'); storage.delete(k); }
  };
  const context = { window, location, URLSearchParams, sessionStorage, crypto: { randomUUID: () => 'test-token' },
    history: { state: null, replaceState(state, title, path) { location.href = new URL(path, location).href; } },
    document: { querySelector: s => s === '.enquiry-form' ? form : dialog, querySelectorAll: () => [button] } };
  runInNewContext(source, context);
  return { events, beforeSend, form, button, dialog, window, storage, location };
}
const names = s => s.events.map(e => e.name);

test('popup and first edit have safe categories, repeated edits do not inflate starts', () => {
  const s = setup();
  s.button.fire('click');
  s.form.fire('input', { target: { name: 'email', value: 'private@example.com' } });
  s.form.fire('change', { target: { name: 'message', value: 'private message' } });
  assert.deepEqual(names(s), ['enquiry_open', 'enquiry_start']);
  assert.deepEqual(JSON.parse(JSON.stringify(s.events[0].data)), {
    page: '/', placement: 'navigation', service: 'Web development'
  });
  assert.ok(!JSON.stringify(s.events).includes('private'));
  s.form.fire('reset');
  s.form.fire('input', { target: { name: 'message' } });
  assert.equal(s.events.length, 3);
});
test('modified clicks, unopened dialog and hidden fields do not count', () => {
  const s = setup();
  s.button.fire('click', { ctrlKey: true });
  s.dialog.open = false;
  s.button.fire('click');
  s.form.fire('input', { target: { name: '_honey' } });
  assert.equal(s.events.length, 0);
});
test('invalid, prevented and honeypot submits never count', () => {
  const invalid = setup({ valid: false });
  invalid.form.fire('submit');
  assert.equal(invalid.events.length, 0);
  const prevented = setup();
  prevented.form.fire('submit', { defaultPrevented: true });
  prevented.form.elements._honey.value = 'bot';
  prevented.form.fire('submit');
  assert.equal(prevented.events.length, 0);
  assert.equal(prevented.storage.size, 0);
});
test('valid native attempt is counted once and does not cancel submission', () => {
  const s = setup();
  let prevented = false;
  s.form.fire('submit', { preventDefault() { prevented = true; } });
  s.form.fire('submit');
  assert.deepEqual(names(s), ['enquiry_submit_attempt']);
  assert.equal(prevented, false);
  assert.match(s.form.elements._next.value, /#enquiry-return=test-token$/);
});
test('matching same-tab return consumes marker; reload and direct URL do not count', () => {
  const s = setup();
  s.form.fire('submit');
  const returned = setup({ url: s.form.elements._next.value, storage: s.storage });
  assert.deepEqual(names(returned), ['enquiry_return']);
  assert.equal(returned.location.hash, '');
  assert.equal(s.storage.size, 0);
  assert.equal(setup({ url: s.form.elements._next.value, storage: s.storage }).events.length, 0);
  assert.equal(setup({ url: 'https://www.wellandgoodgrowth.ca/thank-you/' }).events.length, 0);
});
test('pending attempt without matching return URL cannot count a direct visit', () => {
  const s = setup(); s.form.fire('submit');
  const direct = setup({ url: 'https://www.wellandgoodgrowth.ca/thank-you/', storage: s.storage });
  assert.equal(direct.events.length, 0);
});
test('stale, malformed, mismatched and tampered return markers fail closed', () => {
  for (const marker of ['bad json', JSON.stringify({ token: 'wrong', created: Date.now() }),
    JSON.stringify({ token: 'test-token', created: Date.now() - 3600001, page: '/', placement: 'hero', service: 'Web development' }),
    JSON.stringify({ token: 'test-token', created: Date.now(), page: '/private?email=x', placement: 'hero', service: 'Web development' })]) {
    const storage = new Map([[key, marker]]);
    const s = setup({ url: 'https://www.wellandgoodgrowth.ca/thank-you/#enquiry-return=test-token', storage });
    assert.equal(s.events.length, 0);
  }
});
test('blocked storage and absent analytics do not interfere with form', () => {
  const s = setup({ blocked: true, analytics: false });
  assert.doesNotThrow(() => s.form.fire('submit'));
  assert.equal(s.form.elements._next.value, 'https://www.wellandgoodgrowth.ca/thank-you/');
});
test('back-forward cache resets attempt guard and return marker for retry', () => {
  const s = setup(); s.form.fire('submit');
  s.window.fire('pageshow', { persisted: true });
  assert.equal(s.storage.size, 0);
  assert.equal(s.form.elements._next.value, 'https://www.wellandgoodgrowth.ca/thank-you/');
  s.form.fire('submit');
  assert.equal(s.events.length, 2);
});
test('local, preview and unrelated hosts send no events or stored markers', () => {
  for (const url of ['http://localhost:4187/', 'http://127.0.0.1:4187/', 'https://wgg-test.vercel.app/',
    'https://wellandgoodgrowth.ca.evil.example/', 'http://www.wellandgoodgrowth.ca/',
    'https://www.wellandgoodwebsites.ca/', 'https://wellandgoodwebsites.ca/']) {
    const s = setup({ url });
    s.button.fire('click'); s.form.fire('submit');
    assert.equal(s.events.length, 0);
    assert.equal(s.storage.size, 0);
    assert.equal(s.beforeSend({ url }), null);
  }
});
test('URL queries, fragments and unknown page/service values are never transmitted', () => {
  const s = setup({ url: 'https://www.wellandgoodgrowth.ca/private-person?email=x#secret' });
  s.form.elements.service.value = 'Private text';
  s.form.fire('submit');
  assert.equal(s.events[0].data.page, 'other');
  assert.equal(s.events[0].data.service, 'Help me choose');
  assert.equal(s.beforeSend({ url: s.location.href }).url, 'https://www.wellandgoodgrowth.ca/other/');
});

test('known campaign labels survive; arbitrary fields, fragments and duplicate labels do not', () => {
  const s = setup({ url: 'https://www.wellandgoodgrowth.ca/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=autumn_services&email=private@example.com&utm_content=client_name#private' });
  assert.equal(s.beforeSend({ url: s.location.href }).url,
    'https://www.wellandgoodgrowth.ca/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=autumn_services');
  const bad = setup({ url: 'https://www.wellandgoodgrowth.ca/?utm_source=private@example.com&utm_medium=Matthew&utm_campaign=ClientName' });
  assert.equal(bad.beforeSend({ url: bad.location.href }).url, 'https://www.wellandgoodgrowth.ca/');
  const duplicate = setup({ url: 'https://www.wellandgoodgrowth.ca/?utm_source=linkedin&utm_source=private@example.com&utm_campaign=site_launch' });
  assert.equal(duplicate.beforeSend({ url: duplicate.location.href }).url,
    'https://www.wellandgoodgrowth.ca/?utm_campaign=site_launch');
});
test('preview remains excluded even with approved campaign labels', () => {
  const s = setup({ url: 'https://preview.vercel.app/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=site_launch' });
  assert.equal(s.beforeSend({ url: s.location.href }), null);
  s.form.fire('submit');
  assert.equal(s.events.length, 0);
});
test('a throwing analytics hook neither throws out of setup nor modifies submission', () => {
  const s = setup({ brokenAnalytics: true });
  assert.doesNotThrow(() => s.form.fire('submit'));
  assert.equal(s.form.elements._next.value, 'https://www.wellandgoodgrowth.ca/thank-you/');
  assert.equal(s.storage.size, 0);
});
