/*
 * dc-lite.js — minimal static replacement for the claude.ai design-canvas runtime.
 * Reproduces exactly the three behaviours the source mockup relied on:
 *   - style-hover="..."  inline hover styles (applied on mouseenter, restored on mouseleave)
 *   - style-focus="..."  inline focus styles (applied on focus, restored on blur)
 *   - data-reveal        fade/slide-up on scroll into view
 * No framework, no dependencies.
 */
(function () {
  function parseDecls(text) {
    return (text || '')
      .split(';')
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .map(function (s) {
        var i = s.indexOf(':');
        return { prop: s.slice(0, i).trim(), value: s.slice(i + 1).trim() };
      });
  }

  // Apply an inline-style attribute on an event, restoring only the touched
  // properties on the inverse event (so it composes with the reveal animation).
  function wire(attr, onEvent, offEvent) {
    document.querySelectorAll('[' + attr + ']').forEach(function (el) {
      var decls = parseDecls(el.getAttribute(attr));
      if (!decls.length) return;
      var saved = null;
      el.addEventListener(onEvent, function () {
        saved = {};
        decls.forEach(function (d) {
          saved[d.prop] = el.style.getPropertyValue(d.prop);
          el.style.setProperty(d.prop, d.value);
        });
      });
      el.addEventListener(offEvent, function () {
        if (!saved) return;
        decls.forEach(function (d) {
          if (saved[d.prop]) el.style.setProperty(d.prop, saved[d.prop]);
          else el.style.removeProperty(d.prop);
        });
        saved = null;
      });
    });
  }

  function reveal() {
    var els = document.querySelectorAll('[data-reveal]');
    var vh = window.innerHeight || 800;
    var show = function (el) { el.style.opacity = '1'; el.style.transform = 'none'; };
    els.forEach(function (el) {
      el.style.transition =
        'opacity 0.6s cubic-bezier(0.22,0.61,0.36,1), transform 0.6s cubic-bezier(0.22,0.61,0.36,1)';
      if (el.getBoundingClientRect().top < vh * 0.92) { show(el); return; }
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.1 });
      els.forEach(function (el) { if (el.style.opacity === '0') io.observe(el); });
    } else {
      els.forEach(show);
    }
    // Safety net: never leave content hidden if the observer never fires.
    setTimeout(function () { els.forEach(show); }, 2500);
  }

  function init() {
    wire('style-hover', 'mouseenter', 'mouseleave');
    wire('style-focus', 'focus', 'blur');
    reveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
