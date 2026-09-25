/* 17. Through the last lock, on the thank-you page. The markup is the finished state. On load the drawing
   winds back to the start (the freighter low in the chamber, the gate shut, the tick not yet drawn) and
   plays once: the chamber fills, the gate lifts, the freighter sails out, the tick lands, and the gate
   closes behind it. The surface ripples only while the drawing is on screen and the tab is visible.
   Geometry matches THANK_YOU_LOCK in scripts/art_showpieces.py. */
(() => {
  const svg = document.querySelector('.ty-art');
  if (!svg || WG.reduce) return;
  const ship = svg.querySelector('.ty-ship'), gate = svg.querySelector('.ty-gate-up'), tick = svg.querySelector('.ty-tick');
  const chamber = svg.querySelector('.ty-chamber'), surf = svg.querySelector('.ty-surf');
  const LOW = 100, HIGH = 70, FROM = 140, TO = 270, LIFT = 62;
  const S = { level: LOW, x: FROM, gate: 0, tick: 0, t: 0 };
  const surface = (y, t, amp) => {
    let d = '';
    for (let x = 70; x <= 210; x += 5) d += (d ? ' L' : 'M') + `${x} ${(y + amp * Math.sin(.12 * x + t * 2)).toFixed(2)}`;
    return d;
  };
  const draw = () => {
    const amp = .8 + (S.level > HIGH + .5 && S.level < LOW - .5 ? 1.6 : 0);
    const top = surface(S.level, S.t, amp);
    chamber.setAttribute('d', top.replace('M', 'M70 140 L') + ' L210 140 Z');
    surf.setAttribute('d', top);
    const y = S.x <= 210 ? S.level : HIGH;
    ship.setAttribute('transform', `translate(${S.x.toFixed(1)} ${(y + amp * Math.sin(.12 * S.x + S.t * 2) - 4).toFixed(1)}) scale(.8)`);
    gate.setAttribute('transform', `translate(0 ${(-S.gate).toFixed(1)})`);
    tick.style.strokeDashoffset = ((1 - S.tick) * 1.02).toFixed(3);
  };

  let alive = true;
  const live = () => alive && !WG.reduce;
  async function sail() {
    await WG.wait(700); if (!live()) return;
    await WG.tween(1800, t => { const r = 1 - t; S.level = HIGH + (LOW - HIGH) * r * r; draw(); }, t => t, live); if (!live()) return;
    await WG.tween(650, t => { S.gate = LIFT * t; draw(); }, 'inOut', live); if (!live()) return;
    await WG.tween(1500, t => { S.x = FROM + (TO - FROM) * t; draw(); }, 'inOut', live); if (!live()) return;
    await WG.tween(450, t => { S.tick = t; draw(); }, t => t, live); if (!live()) return;
    await WG.tween(500, t => { S.gate = LIFT * (1 - t); draw(); }, 'inOut', live);
  }

  // The gentle ripple, only while the drawing can be seen.
  let frame = 0, last = 0;
  const loop = now => {
    if (WG.reduce) { frame = 0; return; }
    S.t += Math.min(.05, (now - last) / 1000 || .016); last = now;
    draw();
    frame = requestAnimationFrame(loop);
  };
  WG.whileVisible(svg,
    () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(loop); } },
    () => { cancelAnimationFrame(frame); frame = 0; });

  // If motion is switched off part way, go straight to the finished state.
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
    if (!event.matches) return;
    alive = false;
    Object.assign(S, { level: HIGH, x: TO, gate: 0, tick: 1, t: 0 });
    draw();
  });

  draw();
  WG.onceInView(svg, sail, .3);
})();
