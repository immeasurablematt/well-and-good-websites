/* 12. Founder photo develops from a two-ink print into colour the first time it comes on screen.
   A photo already on screen at load stays in colour. On touch screens a tap toggles the print. */
(() => {
  const prints = document.querySelectorAll('.founder-print');
  if (!prints.length || WG.reduce) return;
  const touch = matchMedia('(hover: none)').matches;
  prints.forEach(print => {
    if (touch) print.addEventListener('click', () => print.classList.toggle('is-print'));
    const box = print.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) return;
    print.classList.add('is-print');
    WG.onceInView(print, async () => {
      await WG.wait(450);
      print.classList.remove('is-print');
    }, .45);
  });
})();
