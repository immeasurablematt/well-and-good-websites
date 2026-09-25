/* 13. Service drawings: each card's drawing plays the first time the card is on screen, and again when
   the card is pointed at or focused. A drawing that starts below the screen is wound back to its first
   frame (.is-armed) while nobody can see it, so it never shows finished and then jumps back. When
   several cards arrive together their drawings start a moment apart. */
(() => {
  const glyphs = [...document.querySelectorAll('.service-links .service-glyph')];
  if (!glyphs.length || WG.reduce) return;
  const LENGTH = 2600;   // the longest drawing (the boat through the lock) runs 2.5 seconds
  const GAP = 280;       // stagger between drawings that start together
  let nextSlot = 0;
  glyphs.forEach(glyph => {
    const card = glyph.closest('a');
    let started = -Infinity;
    const play = () => {
      if (WG.reduce || performance.now() - started < LENGTH) return;
      started = performance.now();
      glyph.classList.remove('is-armed', 'is-on');
      void glyph.getBoundingClientRect();
      glyph.classList.add('is-on');
    };
    const box = glyph.getBoundingClientRect();
    if (box.top >= innerHeight || box.bottom <= 0) glyph.classList.add('is-armed');
    WG.onceInView(glyph, () => {
      const now = performance.now(), at = Math.max(now, nextSlot);
      nextSlot = at + GAP;
      setTimeout(play, at - now);
    }, .9);
    card.addEventListener('pointerenter', play);
    card.addEventListener('focus', play);
  });
})();
