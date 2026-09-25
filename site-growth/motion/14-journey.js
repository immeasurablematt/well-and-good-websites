/* 14. The customer's journey: the freighter's place on the route follows the figure's position on screen.
 *
 * At the top of the page the boat has just reached "Find you." (it sails in from the start of the route the
 * first time the figure shows). Scrolling carries it past "See the fit." to "Get in touch.", which it reaches
 * before the hero slides under the header. Scrolling back sails it back. The boat eases toward the scroll
 * position, so the scrub feels like water rather than a slider, and the frame loop stops as soon as it
 * arrives. Without scripts, and under reduced motion, the markup's finished state stays: whole route
 * travelled, every stop lit.
 */
(() => {
  const figures = document.querySelectorAll('.journey');
  if (!figures.length || WG.reduce) return;
  const header = document.querySelector('.site-header');

  figures.forEach(figure => {
    const route = figure.querySelector('.journey-route');
    const done = figure.querySelector('.journey-done');
    const ship = figure.querySelector('.journey-ship');
    const stops = [...figure.querySelectorAll('.journey-stop')];
    const labels = [...figure.querySelectorAll('.journey-stops li')];
    if (!route || !ship || stops.length !== labels.length) return;
    const total = route.getTotalLength();

    // Where each stop sits along the route, as a share of its length (nearest point to the stop's post).
    const shareNear = (x, y) => {
      let best = 0, bestD = Infinity;
      for (let i = 0; i <= 240; i++) {
        const p = route.getPointAtLength(total * i / 240), d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bestD) { bestD = d; best = i / 240; }
      }
      return best;
    };
    const stopAt = stops.map(stop => shareNear(+stop.dataset.x, +stop.dataset.y));
    const first = stopAt[0];

    const draw = p => {
      const at = p * total;
      const a = route.getPointAtLength(Math.max(0, at - 3)), b = route.getPointAtLength(Math.min(total, at + 3));
      const here = route.getPointAtLength(at);
      const angle = Math.atan2(b.y - a.y, b.x - a.x) * 90 / Math.PI;   // half the route's slope: a gentle pitch
      ship.setAttribute('transform', `translate(${here.x.toFixed(1)} ${(here.y - 3).toFixed(1)}) rotate(${angle.toFixed(1)}) scale(.8)`);
      done.style.strokeDashoffset = ((1 - p) * 1.02).toFixed(4);
      stopAt.forEach((share, i) => {
        const reached = p >= share - .004;
        stops[i].classList.toggle('is-reached', reached);
        labels[i].classList.toggle('is-reached', reached);
      });
    };

    // Scroll position to progress. The boat sits at the first stop until the figure starts to rise, and
    // reaches the last stop while the whole drawing is still in view: by the time the figure's top nears
    // the header, or once it has risen 45% of the screen, whichever comes first.
    const target = () => {
      const top = figure.getBoundingClientRect().top;
      const pageTop = top + scrollY;
      const start = Math.min(innerHeight * .8, pageTop);
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      let end = Math.max(headerBottom + 16, start - Math.max(220, innerHeight * .45));
      if (start - end < 160) end = start - 160;
      const t = Math.min(1, Math.max(0, (start - top) / (start - end)));
      return first + (1 - first) * t;
    };

    let shown = 0, goal = first, frame = 0, last = 0, visible = false;
    const step = now => {
      frame = 0;
      const dt = Math.min(.05, (now - last) / 1000 || .016);
      last = now;
      goal = target();
      const gap = goal - shown;
      // Ease toward the scroll position, never faster than a boat should go.
      const move = Math.sign(gap) * Math.min(Math.abs(gap) * (1 - Math.exp(-dt * 4.5)), dt * .55);
      shown = Math.abs(gap) < .0008 ? goal : shown + move;
      draw(shown);
      if (shown !== goal && visible) frame = requestAnimationFrame(step);
    };
    const kick = () => {
      if (visible && !frame) { last = performance.now(); frame = requestAnimationFrame(step); }
    };

    draw(0);   // the first time it shows, the boat sails in from the start of the route
    figure.classList.add('is-live');   // the markup's first-frame styles (14-journey.css) hand over to draw()
    WG.whileVisible(figure, () => { visible = true; kick(); }, () => {
      visible = false;
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
    });
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
  });
})();
