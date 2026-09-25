/* Homepage hero bridge: the drawing plays from CSS on load (20-hero-bridge.css), so it needs no script.
   If the hero leaves the screen before the drawing has finished (a link to /#work scrolls past it, or a
   visitor scrolls on quickly), this winds the drawing back to its first frame while it is out of sight
   and plays it again when the hero is back on screen. Once it has played through, this lets go. */
(() => {
  const art = document.querySelector('.hero-bridge');
  if (!art || typeof art.getAnimations !== 'function' || !('IntersectionObserver' in window)) return;
  const animations = () => art.getAnimations({ subtree: true });
  let held = false;
  const io = new IntersectionObserver(entries => {
    const entry = entries[entries.length - 1];
    if (WG.reduce) { io.disconnect(); return; }
    if (!entry.isIntersecting && !held) {
      const running = animations().filter(animation => animation.playState !== 'finished');
      if (!running.length) { io.disconnect(); return; }
      held = true;
      animations().forEach(animation => { animation.pause(); animation.currentTime = 0; });
    } else if (held && entry.intersectionRatio >= .3) {
      held = false;
      animations().forEach(animation => animation.play());
    }
  }, { threshold: [0, .3] });
  io.observe(art);
})();
