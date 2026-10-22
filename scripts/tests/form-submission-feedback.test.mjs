import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../../site-growth/motion/06-form.js', import.meta.url), 'utf8');

function target(extra = {}) {
  const handlers = {};
  return { ...extra,
    addEventListener(type, fn) { (handlers[type] ||= []).push(fn); },
    fire(type, event = {}) { for (const fn of handlers[type] || []) fn(event); }
  };
}

function setup(valid = true) {
  const status = { textContent: '' };
  const button = { disabled: false, innerHTML: 'Send enquiry <span>↗</span>',
    get textContent() { return this.innerHTML; },
    set textContent(value) { this.innerHTML = value; } };
  const classes = new Set();
  const ship = { classList: {
    add(name) { classes.add(name); }, remove(name) { classes.delete(name); }
  }, getBoundingClientRect() { return {}; } };
  const form = target({ nextElementSibling: status, checkValidity: () => valid,
    getBoundingClientRect: () => ({ right: 400 }) });
  const row = { closest: () => form,
    querySelector: selector => selector === '.castoff' ? ship : button,
    getBoundingClientRect: () => ({ right: 200 }),
    style: { setProperty() {} } };
  const window = target();
  runInNewContext(source, { document: { querySelectorAll: () => [row] },
    addEventListener: window.addEventListener.bind(window), WG: { reduce: false } });
  return { button, classes, form, status, window };
}

function submit(form) {
  const event = { defaultPrevented: false,
    preventDefault() { this.defaultPrevented = true; } };
  form.fire('submit', event);
  return event;
}

test('first valid submit stays native; repeated submit is blocked with visible feedback', () => {
  const s = setup();
  assert.equal(submit(s.form).defaultPrevented, false);
  assert.equal(s.button.disabled, true);
  assert.equal(s.button.textContent, 'Sending enquiry…');
  assert.match(s.status.textContent, /confirmation page/);
  assert.equal(s.classes.has('is-going'), true);
  assert.equal(submit(s.form).defaultPrevented, true);
  s.window.fire('pageshow', { persisted: true });
  assert.equal(s.button.disabled, false);
  assert.equal(s.button.innerHTML, 'Send enquiry <span>↗</span>');
  assert.equal(s.status.textContent, '');
  assert.equal(submit(s.form).defaultPrevented, false);
});

test('invalid submit does not lock the form; resetting allows another attempt', () => {
  const invalid = setup(false);
  assert.equal(submit(invalid.form).defaultPrevented, false);
  assert.equal(invalid.button.disabled, false);
  const s = setup();
  submit(s.form);
  s.form.fire('reset');
  assert.equal(s.button.disabled, false);
  assert.equal(submit(s.form).defaultPrevented, false);
});
