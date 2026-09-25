/* 00-core.js: shared helpers for every motion partial, on window.WG.
 *
 *   WG.reduce                         true while the visitor prefers reduced motion (a live getter).
 *   WG.onceInView(el, fn, threshold)  calls fn(el) once, the first time el is on screen. threshold is the
 *                                     share of el that must show (default 0.2, capped for elements taller
 *                                     than the screen). Without IntersectionObserver, fn runs at once.
 *   WG.whileVisible(el, start, stop)  calls start() when el is on screen and the tab is visible, and stop()
 *                                     when either ends. Returns a function that disconnects (and stops).
 *                                     Every requestAnimationFrame loop must run inside one of these.
 *   WG.tween(ms, fn, ease, alive)     calls fn(p) each frame with eased progress p from 0 to 1 and returns a
 *                                     promise that resolves at the end. ease is a function or a WG.ease name
 *                                     (default 'inOut'). Optional alive() returning false stops it early.
 *                                     Under reduced motion it calls fn(1) and resolves at once.
 *   WG.ease.out, .inOut, .backOut     easing functions, t => eased t. backOut overshoots slightly.
 *   WG.wait(ms)                       a promise that resolves after ms.
 *
 * Rules (docs/specs/2026-09-25-rebrand-design.md, section 8): content is complete at rest, reduced motion
 * shows the finished state, and loops run only while on screen. Each partial (NN-name.js) is an IIFE that
 * shares nothing but WG; the build wraps each one so an error is logged without stopping the others.
 */
(() => {
  const query = matchMedia('(prefers-reduced-motion: reduce)');
  const hasIO = 'IntersectionObserver' in window;
  const ease = {
    out: t => 1 - Math.pow(1 - t, 3),
    inOut: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    backOut: t => { const c1 = 1.3, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };

  const WG = {
    get reduce() { return query.matches; },
    ease,
    wait: ms => new Promise(resolve => setTimeout(resolve, ms)),

    tween(ms, fn, easing = ease.inOut, alive = () => true) {
      const curve = typeof easing === 'string' ? ease[easing] : easing;
      return new Promise(resolve => {
        if (query.matches || ms <= 0) { fn(1); resolve(); return; }
        const t0 = performance.now();
        const step = now => {
          if (!alive()) { resolve(); return; }
          const t = Math.min(1, (now - t0) / ms);
          fn(curve(t));
          if (t < 1) requestAnimationFrame(step); else resolve();
        };
        requestAnimationFrame(step);
      });
    },

    onceInView(el, fn, threshold = 0.2) {
      if (!el) return;
      if (!hasIO) { fn(el); return; }
      const tall = innerHeight / Math.max(1, el.getBoundingClientRect().height);
      const io = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { io.disconnect(); fn(el); }
      }, { threshold: Math.min(threshold, tall * .9) });
      io.observe(el);
    },

    whileVisible(el, start, stop) {
      if (!el) return () => {};
      let onScreen = !hasIO, running = false;
      const update = () => {
        const want = onScreen && !document.hidden;
        if (want === running) return;
        running = want;
        (want ? start : stop)();
      };
      const io = hasIO && new IntersectionObserver(entries => {
        onScreen = entries[entries.length - 1].isIntersecting;
        update();
      });
      if (io) io.observe(el);
      document.addEventListener('visibilitychange', update);
      update();
      return () => {
        if (io) io.disconnect();
        document.removeEventListener('visibilitychange', update);
        if (running) { running = false; stop(); }
      };
    }
  };

  window.WG = WG;
  // An empty touch listener lets :active styles show on iOS taps (letterpress press, header lift).
  document.addEventListener('touchstart', () => {}, { passive: true });
})();
