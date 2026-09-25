/* 5. Canal reading bar: the water fills and the freighter sails along the top edge as the page scrolls.
   At rest (top of the page, or no script) the ship waits at the left end. */
(() => {
  const bar = document.querySelector('.canal-bar');
  if (!bar) return;
  const fill = bar.querySelector('.canal-fill'), ship = bar.querySelector('.canal-ship');
  let room = 0, queued = false;
  const measure = () => { room = bar.clientWidth - ship.getBoundingClientRect().width - 16; };
  const place = () => {
    queued = false;
    if (WG.reduce) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    fill.style.transform = `scaleX(${p.toFixed(4)})`;
    ship.style.transform = `translateX(${(p * room).toFixed(1)}px)`;
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(place); } };
  measure();
  place();
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { measure(); queue(); });
})();
