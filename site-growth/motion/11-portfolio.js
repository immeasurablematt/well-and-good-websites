/* 11. Portfolio screenshots: tilt toward a mouse pointer (the glide on hover and focus is pure CSS), and on
   touch screens glide once as each screenshot scrolls in. Nothing runs under reduced motion. */
(() => {
  const frames = document.querySelectorAll('.portfolio-grid .portfolio-image');
  if (!frames.length) return;
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  frames.forEach(frame => {
    let pending = null;
    const apply = () => {
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      frame.style.setProperty('--tilt-x', (-y * 5).toFixed(2) + 'deg');
      frame.style.setProperty('--tilt-y', (x * 7).toFixed(2) + 'deg');
      frame.style.setProperty('--shade-x', (6 - x * 10).toFixed(1) + 'px');
      frame.style.setProperty('--shade-y', (8 - y * 6).toFixed(1) + 'px');
      frame.classList.add('is-tilting');
    };
    frame.addEventListener('pointermove', event => {
      if (WG.reduce || !mouse.matches || event.pointerType !== 'mouse') return;
      const box = frame.getBoundingClientRect();
      if (!pending) requestAnimationFrame(apply);
      pending = { x: (event.clientX - box.left) / box.width - .5, y: (event.clientY - box.top) / box.height - .5 };
    });
    frame.addEventListener('pointerleave', () => { pending = null; frame.classList.remove('is-tilting'); });
  });
  if (WG.reduce || !matchMedia('(hover: none)').matches) return;
  frames.forEach(frame => WG.onceInView(frame, async () => {
    await WG.wait(300);
    frame.classList.add('is-gliding');
    await WG.wait(3700);
    frame.classList.remove('is-gliding');
  }, .6));
})();
