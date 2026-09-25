/* 15. Your town on the canal.
 *
 * - Choosing a town (click, tap, or Enter and Space on its button) moves the marigold pin there and marks
 *   that button pressed. This works under reduced motion too; only the drop animation is skipped.
 * - A map that starts below the screen waits with its canal undrawn and pins lifted (.is-armed), then draws
 *   the canal from Lake Ontario to Lake Erie and drops the pins the first time it comes on screen.
 * - While the map is on screen and the tab is visible, a freighter works up and down the canal, pausing and
 *   turning in each lake. Under reduced motion it stays moored where the markup puts it.
 */
(() => {
  const maps = document.querySelectorAll('.canal-map');
  if (!maps.length) return;
  const restart = (el, cls) => { el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); };

  maps.forEach(map => {
    const primary = map.querySelector('.map-pin.is-primary');
    const buttons = [...map.querySelectorAll('.map-town')];
    const dots = [...map.querySelectorAll('.map-dot')];
    const fixed = [...map.querySelectorAll('.map-pin.is-also')];
    const alsoTowns = new Set(fixed.map(pin => pin.dataset.town));
    if (!primary || !buttons.length) return;

    const movePin = button => {
      const town = button.dataset.town;
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      primary.setAttribute('transform', `translate(${button.dataset.x} ${button.dataset.y})`);
      dots.forEach(dot => dot.classList.toggle('is-pinned', dot.dataset.town === town || alsoTowns.has(dot.dataset.town)));
      fixed.forEach(pin => pin.classList.toggle('is-under', pin.dataset.town === town));
      if (!WG.reduce) restart(primary, 'is-dropping');
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') !== 'true') movePin(button);
    }));

    if (WG.reduce) return;

    // First time on screen: draw the canal, then drop the pins (only for maps that start out of view).
    if (map.getBoundingClientRect().top > innerHeight) {
      map.classList.add('is-armed');
      WG.onceInView(map, () => {
        map.classList.add('is-drawing');
        map.classList.remove('is-armed');
        setTimeout(() => map.classList.remove('is-drawing'), 3200);
      }, .3);
    }

    // The freighter: u is its share of the canal from Lake Ontario (0) to Lake Erie (1).
    const canal = map.querySelector('.map-canal');
    const ship = map.querySelector('.map-ship');
    if (!canal || !ship) return;
    const total = canal.getTotalLength();
    const LEG = 17, PAUSE = 1.6, SCALE = .38;   // seconds per passage, seconds turning in a lake, ship size
    const moored = ship.transform.baseVal.consolidate();
    let u = 0, dir = -1, wait = 0, facing = 1, frame = 0, last = 0;
    if (moored) {                          // start from where the markup moored it, heading north
      const { e: x, f: y } = moored.matrix;
      let best = Infinity;
      for (let i = 0; i <= 200; i++) {
        const p = canal.getPointAtLength(total * i / 200), d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < best) { best = d; u = i / 200; }
      }
    }
    // The ship stays upright and faces its direction of travel: east heading north, west heading south
    // (the way the canal leans). In a lake it turns by swinging its bow round, which reads as a flip.
    const place = dt => {
      const here = canal.getPointAtLength(u * total);
      facing += (-dir - facing) * (1 - Math.exp(-dt * 4));
      ship.setAttribute('transform', `translate(${here.x.toFixed(1)} ${here.y.toFixed(1)}) scale(${(SCALE * facing).toFixed(3)} ${SCALE})`);
    };
    const step = now => {
      const dt = Math.min(.05, (now - last) / 1000 || .016);
      last = now;
      if (wait > 0) wait -= dt;
      else {
        u += dir * dt / LEG;
        if (u >= 1 || u <= 0) { u = Math.min(1, Math.max(0, u)); dir = -dir; wait = PAUSE; }
      }
      place(dt);
      frame = requestAnimationFrame(step);
    };
    WG.whileVisible(map, () => {
      map.classList.add('is-live');
      last = performance.now();
      frame = requestAnimationFrame(step);
    }, () => {
      map.classList.remove('is-live');
      cancelAnimationFrame(frame);
    });
  });
})();
