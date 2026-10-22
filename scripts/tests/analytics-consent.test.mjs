import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../../site-growth/analytics-consent.js', import.meta.url), 'utf8')
  .replace("const GA4_ID = 'G-9V037QTGCE';", "const GA4_ID = 'G-TEST123';")
  .replace("const CLARITY_ID = 'z1rewvqi70';", "const CLARITY_ID = 'test123';");

function setup(url, initialChoice = null) {
  const tags = [];
  const calls = [];
  const saved = new Map(initialChoice ? [['wgg-optional-analytics-v1', initialChoice]] : []);
  const choiceButtons = ['allow', 'deny'].map(value => ({
    dataset: { analyticsChoice: value },
    addEventListener(type, listener) { if (type === 'click') this.click = listener; }
  }));
  const banner = { hidden: true, querySelectorAll: () => choiceButtons };
  const settings = { addEventListener(type, listener) { if (type === 'click') this.click = listener; } };
  const location = new URL(url);
  location.reload = () => { location.reloaded = true; };
  const window = {};
  const document = {
    title: 'Well and Good Growth', referrer: 'https://referrer.example/private/path?email=secret',
    querySelector: selector => selector === '.analytics-choice' ? banner : settings,
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
  return { tags, calls, saved, choiceButtons, banner, settings, window, location };
}

test('optional tags stay absent before a visitor choice and on preview hosts', () => {
  const pending = setup('https://www.wellandgoodgrowth.ca/');
  assert.equal(pending.banner.hidden, false);
  assert.equal(pending.tags.length, 0);
  const declined = setup('https://www.wellandgoodgrowth.ca/', 'deny');
  assert.equal(declined.banner.hidden, true);
  assert.equal(declined.tags.length, 0);
  const preview = setup('https://preview.vercel.app/', 'allow');
  assert.equal(preview.tags.length, 0);
});

test('consent loads both tags and sends only sanitized location and referrer', () => {
  const s = setup('https://www.wellandgoodgrowth.ca/services/growth/?utm_source=linkedin&utm_campaign=site_launch&email=private@example.com#private');
  s.choiceButtons[0].click();
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

test('safe production URLs load Clarity and changing to decline unloads optional tags', () => {
  const s = setup('https://www.wellandgoodgrowth.ca/?utm_source=linkedin', 'allow');
  assert.equal(s.tags.length, 2);
  assert.match(s.tags[1].src, /clarity\.ms\/tag\/test123/);
  s.settings.click();
  assert.equal(s.banner.hidden, false);
  s.choiceButtons[1].click();
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
