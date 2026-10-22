import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../../site-growth/analytics-consent.js', import.meta.url), 'utf8')
  .replace("const GA4_ID = 'G-9V037QTGCE';", "const GA4_ID = 'G-TEST123';")
  .replace("const CLARITY_ID = 'z1rewvqi70';", "const CLARITY_ID = 'test123';");

function setup(url, initialChoice = null, hasToggle = true) {
  const tags = [];
  const calls = [];
  const saved = new Map(initialChoice ? [['wgg-optional-analytics-v1', initialChoice]] : []);
  const toggle = { checked: false, addEventListener(type, listener) { if (type === 'change') this.change = listener; } };
  const location = new URL(url);
  location.reload = () => { location.reloaded = true; };
  const window = {};
  const document = {
    title: 'Well and Good Growth', referrer: 'https://referrer.example/private/path?email=secret',
    querySelector: selector => selector === '[data-analytics-toggle]' && hasToggle ? toggle : null,
    createElement: () => ({}), head: { appendChild: tag => tags.push(tag) }
  };
  const localStorage = {
    getItem: key => saved.get(key) || null,
    setItem: (key, value) => saved.set(key, value)
  };
  runInNewContext(source, { window, document, location, localStorage, URLSearchParams,
    URL, Date, encodeURIComponent });
  if (window.gtag) {
    for (const args of window.dataLayer) calls.push([...args]);
  }
  return { tags, calls, saved, toggle, window, location };
}

test('optional tags stay absent without a footer choice, including on other pages', () => {
  const pending = setup('https://www.wellandgoodgrowth.ca/privacy/');
  assert.equal(pending.toggle.checked, false);
  assert.equal(pending.tags.length, 0);
  const declined = setup('https://www.wellandgoodgrowth.ca/privacy/', 'deny');
  assert.equal(declined.toggle.checked, false);
  assert.equal(declined.tags.length, 0);
  assert.equal(setup('https://www.wellandgoodgrowth.ca/', null, false).tags.length, 0);
  const preview = setup('https://preview.vercel.app/', 'allow');
  assert.equal(preview.tags.length, 0);
  pending.toggle.checked = true;
  pending.toggle.change();
  assert.equal(pending.saved.get('wgg-optional-analytics-v1'), 'allow');
  assert.equal(pending.tags.length, 2);
});

test('consent loads both tags and sends only sanitized location and referrer', () => {
  const s = setup('https://www.wellandgoodgrowth.ca/services/growth/?utm_source=linkedin&utm_campaign=site_launch&email=private@example.com#private', 'allow', false);
  assert.equal(s.tags.length, 1, 'Clarity skips an unsafe URL');
  assert.match(s.tags[0].src, /googletagmanager\.com/);
  const events = [...s.window.dataLayer].map(args => [...args]);
  const view = events.find(args => args[0] === 'event' && args[1] === 'page_view');
  assert.equal(view[2].page_location, 'https://www.wellandgoodgrowth.ca/services/growth/?utm_source=linkedin&utm_campaign=site_launch');
  assert.equal(view[2].page_referrer, 'https://referrer.example');
  assert.ok(!JSON.stringify(events).includes('private@example.com'));
  s.window.wggAnalyticsTrack('enquiry_open', { page: '/services/growth/', placement: 'hero', service: 'Growth marketing' });
  assert.equal([...s.window.dataLayer].filter(args => args[0] === 'event' && args[1] === 'enquiry_open').length, 1);
  s.window.wggAnalyticsTrack('enquiry_open', { page: '/private-client/', placement: 'hero', service: 'Growth marketing' });
  assert.equal([...s.window.dataLayer].filter(args => args[0] === 'event' && args[1] === 'enquiry_open').length, 1);
});

test('safe production URLs load Clarity and the privacy-page checkbox revokes consent', () => {
  const s = setup('https://www.wellandgoodgrowth.ca/privacy/', 'allow');
  assert.equal(s.tags.length, 2);
  assert.match(s.tags[1].src, /clarity\.ms\/tag\/test123/);
  assert.equal(s.toggle.checked, true);
  s.toggle.checked = false;
  s.toggle.change();
  assert.equal(s.saved.get('wgg-optional-analytics-v1'), 'deny');
  assert.equal(s.location.reloaded, true);
  assert.equal(setup('https://www.wellandgoodgrowth.ca/', 'deny').tags.length, 0);
});

test('unknown paths and thank-you returns never load Clarity', () => {
  for (const url of [
    'https://www.wellandgoodgrowth.ca/private-client-name/',
    'https://www.wellandgoodgrowth.ca/thank-you/',
    'https://www.wellandgoodgrowth.ca/thank-you/#enquiry-return=private-token'
  ]) {
    const s = setup(url, 'allow');
    assert.equal(s.tags.length, 1);
    assert.match(s.tags[0].src, /googletagmanager\.com/);
    const view = [...s.window.dataLayer].find(args => args[0] === 'event' && args[1] === 'page_view');
    assert.ok(!view[2].page_location.includes('private-client-name'));
  }
});
