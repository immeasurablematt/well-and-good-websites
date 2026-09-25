/* The canal lock on the AI automation page (spec section 6), ported from the approved preview
   (design/rebrand-preview/preview_template.html, round four).

   The markup is the finished state: the job has passed every lock. The first time the drawing is on
   screen the story plays once: lock 1 fills through its sluices (fast, then slowing as the levels meet)
   while the surface churns and bubbles rise, the gate lifts with a small overshoot and drips, the
   freighter moves up bobbing and leaving a wake, the gate drops behind it with a splash, and the chamber
   drains, leaving a wet mark on the wall that fades. At gate 4 the job waits: the gate pulses, the ring
   fills around the review badge, the tick lands, and only then does the gate open.

   The simulation runs only while the drawing is on screen and the tab is visible. The story is timed by
   the simulation's own clock, so it pauses there too instead of skipping ahead. Watch again replays it.
   Reduced motion keeps the finished state and runs nothing. The geometry comes from the drawing's
   data-geometry attribute, written by scripts/art_showpieces.py. */
(() => {
  const fig = document.querySelector('.lock-figure');
  const svg = fig && fig.querySelector('.cl-art');
  if (!svg || WG.reduce) return;
  const geo = JSON.parse(svg.dataset.geometry);
  const W = geo.w, FL = geo.floors, LO = FL.map(floor => floor - geo.depth), LIFT = geo.lift;
  const all = selector => [...svg.querySelectorAll(selector)];
  const waterEls = all('.cl-water'), surfEls = all('.cl-surf'), ripEls = all('.cl-rip'), wetEls = all('.cl-wet'), gateEls = all('.cl-gate');
  const boat = svg.querySelector('.cl-boat'), rock = svg.querySelector('.cl-rock');
  const ringEl = svg.querySelector('.cl-ring'), tickEl = svg.querySelector('.cl-tick');
  const steps = [...fig.querySelectorAll('.cl-steps li')];
  const replay = fig.parentElement.querySelector('.cl-replay');
  const fx = svg.querySelector('.cl-fx'), NS = 'http://www.w3.org/2000/svg';
  const dots = [], rings = [];
  for (let k = 0; k < 44; k++) { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', '0'); fx.appendChild(c); dots.push(c); }
  for (let k = 0; k < 18; k++) { const e = document.createElementNS(NS, 'ellipse'); e.setAttribute('class', 'cl-splash'); e.setAttribute('rx', '0'); e.setAttribute('ry', '0'); fx.appendChild(e); rings.push(e); }

  const lin = t => t;
  const ease = WG.ease.inOut, backOut = WG.ease.backOut;
  const settle = t => (t < .78 ? Math.pow(t / .78, 2) : 1 - .07 * Math.sin(((t - .78) / .22) * Math.PI));
  const zeros = () => [0, 0, 0, 0, 0];

  const S = {
    t: 0, level: LO.slice(), fin: zeros(), fout: zeros(),
    gate: [0, 0, 0, 0], prevGate: [0, 0, 0, 0], gateIn: [true, true, true, true],
    bx: 4 * W + W / 2, by: LO[4], pbx: 4 * W + W / 2, wetTop: LO.slice(), wetA: zeros(),
    ring: 1, tick: 1, parts: [], rings: []
  };

  /* Tweens and waits on the simulation clock: they only advance while step() runs. */
  const jobs = new Set();
  const tween = (ms, fn, alive) => new Promise(resolve => {
    if (!alive()) { resolve(); return; }
    jobs.add({ ms, fn, alive, resolve, elapsed: 0 });
  });
  const wait = (ms, alive) => tween(ms, () => {}, alive);
  const runJobs = dt => jobs.forEach(job => {
    if (!job.alive()) { jobs.delete(job); job.resolve(); return; }
    job.elapsed += dt * 1000;
    const p = Math.min(1, job.elapsed / job.ms);
    job.fn(p);
    if (p >= 1) { jobs.delete(job); job.resolve(); }
  });
  const dropJobs = () => { jobs.forEach(job => job.resolve()); jobs.clear(); };

  const chamberAt = x => Math.max(0, Math.min(4, Math.floor(x / W)));
  function surf(i, x) {
    let y = S.level[i] + .9 * Math.sin(.085 * x + S.t * 1.6 + i) + .45 * Math.sin(.19 * x - S.t * 2.3);
    if (S.fin[i] > 0) y += S.fin[i] * 3.4 * Math.exp(-((i + 1) * W - x) / 26) * Math.sin(.42 * x - S.t * 9);
    if (S.fout[i] > 0) y += S.fout[i] * 1.6 * Math.exp(-(x - i * W) / 30) * Math.sin(.3 * x + S.t * 7);
    return y;
  }
  const surfAt = x => surf(chamberAt(x), x);
  const spawn = p => { if (S.parts.length < dots.length) S.parts.push(p); };
  const splash = (x, y, size) => { if (S.rings.length < rings.length) S.rings.push({ x, y, size, age: 0, life: .6 }); };

  function step(dt) {
    S.t += dt;
    runJobs(dt);
    // Inflow at the sluice: bubbles boil up from the chamber floor next to the upper gate.
    for (let i = 0; i < 5; i++) {
      const fi = S.fin[i];
      if (fi > .03 && Math.random() < fi * .9) {
        spawn({ k: 'b', x: (i + 1) * W - 8 - Math.random() * 16, y: FL[i] - 3, vx: -Math.random() * .5, vy: -(.5 + Math.random() * .8), r: .8 + Math.random() * 1.8, age: 0 });
      }
    }
    // Gates: drips while raised, a splash when the gate drops back into the water.
    for (let g = 0; g < 4; g++) {
      const lift = S.gate[g], b = (g + 1) * W, bottom = FL[g + 1] - lift;
      const rising = lift - S.prevGate[g] > .2;
      if (lift > 18 && Math.random() < (rising ? .35 : .05)) spawn({ k: 'd', x: b + (Math.random() - .5) * 8, y: bottom, vx: 0, vy: .2, r: 1.1 + Math.random() * .6, age: 0 });
      const sy = surfAt(b - 1), inWater = bottom > sy;
      if (inWater && !S.gateIn[g]) {
        for (let n = 0; n < 5; n++) spawn({ k: 'f', x: b + (Math.random() - .5) * 14, y: sy, vx: (Math.random() - .5) * .8, r: 1 + Math.random() * 1.2, age: 0, life: .7 });
        splash(b, sy, 1.4);
      }
      S.gateIn[g] = inWater; S.prevGate[g] = lift;
    }
    // The freighter: stern wash and a small bow wave while it moves.
    const vx = (S.bx - S.pbx) / Math.max(dt, 1e-3); S.pbx = S.bx;
    if (Math.abs(vx) > 8) {
      if (Math.random() < .5) spawn({ k: 'f', x: S.bx - 34, y: surfAt(S.bx - 34), vx: -.4 - Math.random() * .3, r: .9 + Math.random() * 1.3, age: 0, life: .9 });
      if (Math.random() < .12) splash(S.bx + 36, surfAt(S.bx + 36), .9);
    }
    S.parts = S.parts.filter(p => {
      p.age += dt;
      if (p.k === 'b') {
        p.x += p.vx + Math.sin(p.age * 9 + p.r) * .15; p.y += p.vy;
        const sy = surfAt(p.x); if (p.y <= sy + 1) { splash(p.x, sy, p.r * .5); return false; }
        return p.age < 4;
      }
      if (p.k === 'd') {
        p.vy += .22; p.y += p.vy;
        if (Math.abs(p.x - S.bx) < 33 && p.y >= S.by - 13 && p.y <= S.by) return false;
        const sy = surfAt(p.x); if (p.y >= sy) { splash(p.x, sy, .8); return false; }
        return p.age < 3;
      }
      p.x += p.vx; p.y = surfAt(p.x);
      return p.age < (p.life || .8);
    });
    S.rings = S.rings.filter(r => (r.age += dt) < r.life);
    for (let i = 0; i < 5; i++) S.wetA[i] *= Math.pow(.55, dt);
    // The boat floats on the surface and rocks with its slope and the inflow.
    const ci = chamberAt(S.bx);
    S.by += (surf(ci, S.bx) - S.by) * .3;
    const slope = (surfAt(S.bx + 14) - surfAt(S.bx - 14)) / 28;
    const rot = Math.max(-4, Math.min(4, Math.atan(slope) * 57.3 * .8)) + S.fin[ci] * 1.4 * Math.sin(S.t * 5);
    draw(rot);
  }

  function draw(rot) {
    for (let i = 0; i < 5; i++) {
      const x0 = i * W, x1 = x0 + W;
      let d = `M${x0} ${FL[i]}`, line = '';
      for (let x = x0; x <= x1; x += 5) { const y = surf(i, x).toFixed(2); d += ` L${x} ${y}`; line += (line ? ' L' : 'M') + `${x} ${y}`; }
      waterEls[i].setAttribute('d', d + ` L${x1} ${FL[i]} Z`);
      surfEls[i].setAttribute('d', line);
      [13, 27].forEach((depth, k) => {
        const el = ripEls[i * 2 + k], y = S.level[i] + depth;
        if (y < FL[i] - 4) { el.setAttribute('d', `M${x0 + 12} ${y.toFixed(1)} H${x1 - 12}`); el.style.strokeDashoffset = (-(S.t * 9 + i * 7)) % 18; el.style.visibility = ''; }
        else el.style.visibility = 'hidden';
      });
      const wt = S.wetTop[i];
      wetEls[i].setAttribute('y', wt.toFixed(1)); wetEls[i].setAttribute('height', (FL[i] - wt).toFixed(1));
      wetEls[i].style.opacity = S.wetA[i].toFixed(3);
    }
    gateEls.forEach((g, k) => g.setAttribute('transform', `translate(0 ${(-S.gate[k]).toFixed(2)})`));
    boat.setAttribute('transform', `translate(${S.bx.toFixed(2)} ${S.by.toFixed(2)})`);
    rock.setAttribute('transform', `rotate(${rot.toFixed(2)})`);
    dots.forEach((c, k) => {
      const p = S.parts[k];
      if (!p) { c.setAttribute('r', '0'); return; }
      c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('r', p.r.toFixed(2));
      c.setAttribute('class', 'cl-p-' + p.k);
      c.style.opacity = p.k === 'f' ? (1 - p.age / (p.life || .8)).toFixed(2) : '';
    });
    rings.forEach((e, k) => {
      const r = S.rings[k];
      if (!r) { e.setAttribute('rx', '0'); e.setAttribute('ry', '0'); return; }
      const f = r.age / r.life, rx = (1.5 + f * 6) * r.size + 1;
      e.setAttribute('cx', r.x.toFixed(1)); e.setAttribute('cy', r.y.toFixed(1));
      e.setAttribute('rx', rx.toFixed(2)); e.setAttribute('ry', (rx * .32).toFixed(2)); e.style.opacity = (1 - f).toFixed(2);
    });
    ringEl.style.strokeDashoffset = ((1 - S.ring) * 1.02).toFixed(3);
    tickEl.style.strokeDashoffset = ((1 - S.tick) * 1.02).toFixed(3);
  }

  const at = k => steps.forEach((s, j) => { s.classList.toggle('is-done', j < k); s.classList.toggle('is-active', j === k); });

  // The start of the story: the freighter waits in lock 1 and the review has not happened.
  function reset() {
    S.level = LO.slice(); S.fin = zeros(); S.fout = zeros();
    S.gate = [0, 0, 0, 0]; S.prevGate = [0, 0, 0, 0]; S.gateIn = [true, true, true, true];
    S.wetA = zeros(); S.parts = []; S.rings = [];
    S.bx = S.pbx = W / 2; S.by = LO[0]; S.ring = 0; S.tick = 0;
    fig.classList.remove('is-approved', 'is-waiting'); at(0);
  }

  async function story(alive) {
    reset();
    await wait(900, alive); if (!alive()) return;
    for (let i = 0; i < 4; i++) {
      const lo = LO[i], hi = LO[i + 1];
      // Fill: fast while the difference in level is large, slowing as the levels meet.
      await tween(1800, t => { const r = 1 - t; S.level[i] = hi + (lo - hi) * r * r; S.fin[i] = r; }, alive);
      if (!alive()) return; S.fin[i] = 0;
      if (i === 3) {
        fig.classList.add('is-waiting');
        await tween(1700, t => { S.ring = t; }, alive); if (!alive()) return;
        await tween(420, t => { S.tick = t; }, alive); if (!alive()) return;
        fig.classList.remove('is-waiting'); fig.classList.add('is-approved');
        await wait(350, alive); if (!alive()) return;
      }
      await tween(750, t => { S.gate[i] = LIFT * backOut(t); }, alive); if (!alive()) return;
      await tween(1500, t => { S.bx = W / 2 + i * W + W * ease(t); }, alive); if (!alive()) return;
      at(i + 1);
      // Close the gate behind the boat and drain the chamber, leaving a wet mark on the wall.
      S.wetTop[i] = hi; S.wetA[i] = .2;
      const drain = tween(1600, t => { const r = 1 - t; S.level[i] = lo + (hi - lo) * r * r; S.fout[i] = r * .8; }, alive);
      await tween(700, t => { S.gate[i] = LIFT * (1 - settle(t)); }, alive); if (!alive()) return;
      await drain; if (!alive()) return; S.fout[i] = 0;
      await wait(150, alive); if (!alive()) return;
    }
    at(5);
  }

  let run = 0;
  const play = () => {
    const id = ++run;
    dropJobs();
    story(() => run === id && !WG.reduce).catch(() => {});
  };

  // The simulation loop, only while the drawing is on screen and the tab is visible.
  let frame = 0, last = 0;
  const loop = now => {
    if (WG.reduce) { frame = 0; return; }
    step(Math.min(.05, (now - last) / 1000 || .016)); last = now;
    frame = requestAnimationFrame(loop);
  };
  WG.whileVisible(svg,
    () => { if (!frame && !WG.reduce) { last = performance.now(); frame = requestAnimationFrame(loop); } },
    () => { cancelAnimationFrame(frame); frame = 0; });

  // If motion is switched off part way, go straight to the finished state.
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
    if (!event.matches) return;
    run++; dropJobs();
    Object.assign(S, { level: LO.slice(), fin: zeros(), fout: zeros(), gate: [0, 0, 0, 0], wetA: zeros(), parts: [], rings: [],
      bx: 4 * W + W / 2, pbx: 4 * W + W / 2, by: LO[4], ring: 1, tick: 1 });
    fig.classList.remove('is-waiting'); fig.classList.add('is-approved'); at(5);
    draw(0);
    replay.hidden = true;
  });

  // Wind back to the start while the drawing is still off screen, then play once it is in view.
  reset(); draw(0);
  WG.onceInView(svg, play, .35);
  replay.hidden = false;
  replay.addEventListener('click', () => {
    if (WG.reduce) return;
    const box = svg.getBoundingClientRect();
    if (box.top < 0 || box.bottom > innerHeight) svg.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    play();
  });
})();
