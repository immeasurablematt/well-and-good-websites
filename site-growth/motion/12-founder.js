/* 12. Founder photo frame: touch screens have no mouseover, so the frame plays its echo and rule
   once when the photo comes on screen. Mouse users get it on hover, in 12-founder.css. */
(() => {
  const prints = document.querySelectorAll('.founder-print');
  if (!prints.length || WG.reduce || !matchMedia('(hover: none)').matches) return;
  prints.forEach(print => WG.onceInView(print, () => print.classList.add('is-lit'), .6));
})();
