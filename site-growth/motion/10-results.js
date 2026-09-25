/* 10. Real results rise: the first time a results chart comes on screen, its water columns fill (before, then
 * after) and each number counts up to the figure the copy states, in Canadian English formatting. Only charts
 * that start below the screen are emptied first, so a chart already in view simply stays complete. Under
 * reduced motion, or without scripts, the finished chart shows.
 */
(() => {
  const groups = document.querySelectorAll('.rise-group');
  if (!groups.length || WG.reduce) return;
  const format = n => n.toLocaleString('en-CA');

  groups.forEach(group => {
    if (group.getBoundingClientRect().top <= innerHeight) return;
    const counters = [...group.querySelectorAll('[data-count]')];
    group.classList.add('is-armed');
    counters.forEach(el => { el.textContent = '0'; });
    WG.onceInView(group, () => {
      group.classList.add('is-rising');
      group.classList.remove('is-armed');
      counters.forEach(async el => {
        const to = +el.dataset.count;
        const delay = parseFloat(getComputedStyle(el.closest('.rise-col')).getPropertyValue('--d')) || 0;
        await WG.wait(delay + 100);
        await WG.tween(1300, t => { el.textContent = format(Math.round(to * t)); }, 'out');
        el.textContent = format(to);
      });
    }, .35);
  });
})();
