import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../../site-growth/analytics.js', import.meta.url), 'utf8')
  .replace("const GA4_ID = 'G-9V037QTGCE';", "const GA4_ID = 'G-TEST123';")
  .replace("const CLARITY_ID = 'z1rewvqi70';", "const CLARITY_ID = 'test123';");

function setup(url) {
  const tags = [];
  const location = new URL(url);
  const window = {};
  const document = {
    title: 'Well and Good Growth', referrer: 'https://referrer.example/private/path?email=secret',
    createElement: () => ({}), head: { appendChild: tag => tags.push(tag) }
  };
  const localStorage = {
    getItem() { throw Error('Analytics must not read the removed consent setting'); },
    setItem() { throw Error('Analytics must not write the removed consent setting'); }
  };
  runInNewContext(source, { window, document, location, localStorage, URLSearchParams,
    URL, Date, encodeURIComponent });
  return { tags, window };
}

test('production loads once without consulting consent storage or sending consent grants', () => {
  const s = setup('https://www.wellandgoodgrowth.ca/');
  assert.equal(s.tags.length, 2);
  const events = [...s.window.dataLayer].map(args => [...args]);
  assert.equal(events.filter(args => args[0] === 'event' && args[1] === 'page_view').length, 1);
  assert.equal(events.find(args => args[0] === 'config')[2].send_page_view, false);
  assert.equal(events.some(args => args[0] === 'consent'), false);
  assert.equal(s.window.clarity.q, undefined, 'No consent signal is manufactured for Clarity');
  for (const url of ['http://www.wellandgoodgrowth.ca/', 'https://preview.vercel.app/', 'http://localhost:4198/']) {
    const local = setup(url);
    assert.equal(local.tags.length, 0);
    assert.equal(local.window.wggAnalyticsTrack, undefined);
  }
});

test('tracking sends only sanitized location, referrer and allowlisted enquiry details', () => {
  const s = setup('https://www.wellandgoodgrowth.ca/services/growth/?utm_source=linkedin&utm_campaign=site_launch&email=private@example.com#private');
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

test('unknown paths and thank-you returns never load Clarity', () => {
  for (const url of [
    'https://www.wellandgoodgrowth.ca/private-client-name/',
    'https://www.wellandgoodgrowth.ca/thank-you/',
    'https://www.wellandgoodgrowth.ca/thank-you/#enquiry-return=private-token'
  ]) {
    const s = setup(url);
    assert.equal(s.tags.length, 1);
    assert.match(s.tags[0].src, /googletagmanager\.com/);
    const view = [...s.window.dataLayer].find(args => args[0] === 'event' && args[1] === 'page_view');
    assert.ok(!view[2].page_location.includes('private-client-name'));
  }
});
