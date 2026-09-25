/* 8. Process steps fill like lock chambers, one after another, the first time each list comes on screen.
   A list that is already on screen when the page loads keeps its full chambers and does not replay. */
(() => {
  if (WG.reduce) return;
  document.querySelectorAll('.process-list').forEach(list => {
    const box = list.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) return;
    [...list.children].forEach((step, i) => step.style.setProperty('--step', i));
    list.classList.add('is-waiting');
    WG.onceInView(list, () => {
      list.classList.add('is-filling');
      list.classList.remove('is-waiting');
    }, .35);
  });
})();
