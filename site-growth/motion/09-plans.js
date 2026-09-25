/* 9. Plans as water levels: each card's water rises the first time the card comes on screen (side by
   side they rise in turn, Launch first), and the surfaces drift only while the plans are on screen and
   the tab is visible. Cards already on screen at load keep their standing water. */
(() => {
  if (WG.reduce) return;
  document.querySelectorAll('.plans').forEach(group => {
    const cards = [...group.querySelectorAll('.plan')];
    if (!cards.length) return;
    cards.forEach((card, i) => {
      card.style.setProperty('--i', i);
      const box = card.getBoundingClientRect();
      if (box.top < innerHeight && box.bottom > 0) return;
      card.classList.add('is-waiting');
      WG.onceInView(card, () => {
        card.classList.add('is-rising');
        card.classList.remove('is-waiting');
      }, .3);
    });
    WG.whileVisible(group, () => group.classList.add('is-drifting'), () => group.classList.remove('is-drifting'));
  });
})();
