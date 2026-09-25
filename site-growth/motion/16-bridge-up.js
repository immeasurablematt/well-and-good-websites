/* 16. Bridge up on the 404 page: reaching for Back to home lowers the span, stops the lamps, and lifts
   the barrier. Mouse hover and keyboard focus lower it and moving away raises it again; a tap starts it
   lowering as the homepage loads (navigation is never delayed). The lamps flash only while the drawing
   is on screen and the tab is visible. */
(() => {
  const stage = document.querySelector('.bridge-up');
  const art = stage && stage.querySelector('.bu-art');
  const home = stage && stage.querySelector('.bu-copy .button');
  if (!art || !home) return;
  const lower = () => stage.classList.add('is-lowered');
  const raise = () => stage.classList.remove('is-lowered');
  home.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') lower(); });
  home.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse' && document.activeElement !== home) raise(); });
  home.addEventListener('pointerdown', lower);
  home.addEventListener('focus', lower);
  home.addEventListener('blur', () => { if (!home.matches(':hover')) raise(); });
  // Coming back with the browser's Back button shows the bridge up again.
  addEventListener('pageshow', event => { if (event.persisted) raise(); });
  WG.whileVisible(art, () => stage.classList.add('is-live'), () => stage.classList.remove('is-live'));
})();
