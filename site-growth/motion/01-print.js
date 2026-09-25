/* 1. Section H2s print in the first time they enter the screen (H1s print on load in 01-print.css).
   Skips headings inside the automation task picker, which swap in place. */
(() => {
  if (WG.reduce) return;
  document.querySelectorAll('main h2').forEach(heading => {
    if (heading.closest('.picker-result')) return;
    WG.onceInView(heading, () => heading.classList.add('is-printing'), .6);
  });
})();
