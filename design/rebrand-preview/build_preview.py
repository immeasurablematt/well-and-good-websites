#!/usr/bin/env python3
"""Build the Well and Good Growth rebrand preview (direction B, Canal lock, Lake & Marigold).

The bridge is drawn from measurements rather than traced, so both towers are
identical and the span is symmetric. The lock drawing is generated here too;
its animation lives in preview_template.html.

Run: python3 design/rebrand-preview/build_preview.py
Output: design/rebrand-preview/well-and-good-growth-rebrand.html (the artifact page).
Keep this script em-dash free.
"""
import math
import pathlib
import sys

HERE = pathlib.Path(__file__).parent
OUT = HERE / 'well-and-good-growth-rebrand.html'
sys.path.insert(0, str(HERE))

# The bridge geometry is shared with the motion catalogue and the site build.
from bridge_geometry import LEFT, RIGHT, SPAN, WATER, MARK_D, MARK_WATER, MARK_VB, MARK_AR  # noqa: E402

SYMBOL = (f'<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">'
          f'<symbol id="mk" viewBox="{MARK_VB}">'
          f'<g class="ln" transform="translate(9 7)" style="stroke:var(--accent);stroke-width:var(--mw);opacity:var(--echo,.9);mix-blend-mode:multiply"><path d="{MARK_D}"/></g>'
          f'<path class="ln" style="stroke:var(--ink);stroke-width:var(--mw)" d="{MARK_D}"/>'
          f'<path class="ln" style="stroke:var(--water);stroke-width:var(--mw)" d="{MARK_WATER}"/></symbol></svg>')


def use(h, mw, echo=None):
    extra = f';--echo:{echo}' if echo is not None else ''
    return (f'<svg width="{round(h * MARK_AR)}" height="{h}" style="--mw:{mw}{extra}" aria-hidden="true" focusable="false">'
            f'<use href="#mk" width="100%" height="100%"/></svg>')


SIZES = ('<div class="sizes" aria-label="The mark at small sizes">'
         + ''.join(f'<span>{use(h, mw, 0 if h <= 32 else None)}{h} px</span>' for h, mw in ((56, 13), (32, 20), (18, 30)))
         + '</div>')

MARK = (f'<svg class="mark" viewBox="{MARK_VB}" role="img" aria-label="The mark: the Welland lift bridge printed in two inks">'
        f'<g transform="translate(9 7)" style="mix-blend-mode:multiply;opacity:.9"><path class="ln draw" pathLength="1" style="--d:.15s;--t:1.6s;stroke:var(--accent);stroke-width:10" d="{MARK_D}"/></g>'
        f'<path class="ln draw" pathLength="1" style="--t:1.6s;stroke:var(--ink);stroke-width:10" d="{MARK_D}"/>'
        f'<path class="ln draw" pathLength="1" style="--d:1.1s;--t:1s;stroke:var(--water);stroke-width:10" d="{MARK_WATER}"/></svg>')


def bridge_plate(cls, width, delay):
    d = delay
    return (f'<g class="{cls}" style="stroke-width:{width}">'
            f'<path class="ln draw" pathLength="1" style="--d:{d:.2f}s;--t:1.3s" d="{LEFT}"/>'
            f'<path class="ln draw" pathLength="1" style="--d:{d + .2:.2f}s;--t:1.3s" d="{RIGHT}"/>'
            f'<g class="span-lift"><path class="ln draw" pathLength="1" style="--d:{d + .8:.2f}s;--t:1.4s" d="{SPAN}"/></g></g>')


HERO = ('<svg viewBox="366 380 510 350" role="img" aria-label="The Welland lift bridge printed in two inks; the span lifts between the towers">'
        '<g transform="translate(6 5)" style="mix-blend-mode:multiply;opacity:.9">' + bridge_plate('b-accent', 6.5, .15) + '</g>'
        + f'<path class="ln draw" pathLength="1" style="--d:1.5s;--t:1.2s;stroke:var(--water);stroke-width:6.5" d="{WATER}"/>'
        + bridge_plate('b-ink', 6.5, 0) + '</svg>')

# ---------------------------------------------------------------- lock drawing
# Static markup is the resting state (the job has passed every lock). The
# animation in preview_template.html runs a small simulation over the same
# geometry, so these numbers must match the constants there.
W, STEP, DEPTH = 120, 34, 44
FLOORS = [250 - i * STEP for i in range(5)]      # canal bed of each chamber
LOWS = [fl - DEPTH for fl in FLOORS]              # resting water level of each chamber
COPES = [fl - 96 for fl in FLOORS]                # top of the chamber walls


def stair(ys):
    d = f"M0 {ys[0]}"
    for i in range(1, 5):
        d += f" H{i * W} V{ys[i]}"
    return d + " H600"


BED = stair(FLOORS)
WALL = stair(COPES) + f" V{FLOORS[4]}" + ''.join(f" H{i * W} V{FLOORS[i - 1]}" for i in range(4, 0, -1)) + " H0 Z"
EARTH = BED + " V272 H0 Z"
COPINGS = ' '.join(f"M{i * W} {COPES[i]} H{(i + 1) * W}" for i in range(5))


def surf0(i, x):
    """Resting surface: the same gentle ripple the animation starts from."""
    return LOWS[i] + 0.9 * math.sin(0.085 * x + i) + 0.45 * math.sin(0.19 * x)


water, surfaces, ripples, wets, numbers = [], [], [], [], []
for i in range(5):
    x0, x1 = i * W, (i + 1) * W
    pts = [(x, surf0(i, x)) for x in range(x0, x1 + 1, 5)]
    water.append(f'<path class="water" d="M{x0} {FLOORS[i]} ' + ' '.join(f'L{x} {y:.2f}' for x, y in pts) + f' L{x1} {FLOORS[i]} Z"/>')
    surfaces.append('<path class="surf" d="M' + ' L'.join(f'{x} {y:.2f}' for x, y in pts) + '"/>')
    ripples.append(f'<path class="rip" d="M{x0 + 12} {LOWS[i] + 13} H{x1 - 12}"/><path class="rip" d="M{x0 + 12} {LOWS[i] + 27} H{x1 - 12}"/>')
    wets.append(f'<rect class="wet" x="{x0}" y="{LOWS[i]}" width="{W}" height="{FLOORS[i] - LOWS[i]}"/>')
    numbers.append(f'<text class="locknum" x="{x0 + 14}" y="{COPES[i] + 14}">LOCK {i + 1}</text>')


def gate(b, top, sill, cls):
    """A lift gate in three braced panels, like the bridge towers."""
    h = sill - top
    d = []
    for p in range(3):
        y0, y1 = top + p * h / 3, top + (p + 1) * h / 3
        d.append(f"M{b - 3.5} {y0 + 2:.1f} L{b + 3.5} {y1 - 2:.1f} M{b + 3.5} {y0 + 2:.1f} L{b - 3.5} {y1 - 2:.1f}")
        if p:
            d.append(f"M{b - 5} {y0:.1f} H{b + 5}")
    return (f'<g class="{cls}"><rect x="{b - 5}" y="{top}" width="10" height="{h}" rx="1.2"/>'
            f'<path class="rib" d="{" ".join(d)}"/></g>')


# Every gate reaches the top of the higher chamber's wall, 12 above the highest
# level on either side (a chamber fills to the next chamber's resting level),
# so filled water never rises above the gate on a chamber's low side.
gates = [gate((i + 1) * W, COPES[i + 1] + 6, FLOORS[i + 1], 'gate yours' if i == 3 else 'gate') for i in range(4)]
# Closed end gates give the first and last locks a proper wall on the outside.
END_GATES = gate(5, COPES[0] + 6, FLOORS[0], 'gate-end') + gate(595, COPES[4] + 6, FLOORS[4], 'gate-end')
for i in range(5):
    highest = LOWS[min(i + 1, 4)]   # a chamber fills to the next chamber's resting level
    low_side_gate_top = COPES[i] + 6  # the end gate for lock 1, otherwise the shared gate below
    assert low_side_gate_top <= highest - 12, f'lock {i + 1}: water would rise above its low-side gate'

# A Great Lakes freighter: long low hull, stripe at the waterline, stern house and stack, pilothouse at the bow.
BOAT = (f'<g class="boat" transform="translate({4 * W + W // 2} {LOWS[4]})"><g class="rock">'
        '<path class="hull" d="M-33 -4 H30 Q34 -4 35 -6 L31 8 H-29 Q-33 8 -33 3 Z"/>'
        '<path class="stripe" d="M-31 -0.5 H31"/>'
        '<path class="hatch" d="M-12 -4 V-6 M-4 -4 V-6 M4 -4 V-6 M12 -4 V-6"/>'
        '<rect class="house" x="-30" y="-12" width="13" height="8"/>'
        '<rect class="stack" x="-26.5" y="-19" width="5" height="7"/>'
        '<rect class="house" x="19" y="-15" width="10" height="11"/>'
        '<rect class="win" x="20.8" y="-13" width="6.4" height="2.6"/>'
        '<path class="mast" d="M24 -15 V-21"/></g></g>')

BADGE = ('<g class="badge"><circle class="ring" pathLength="1" cx="456" cy="30" r="15" transform="rotate(-90 456 30)"/>'
         '<circle class="disc" cx="456" cy="30" r="10.5"/>'
         '<path class="tick" pathLength="1" d="M450.8 30.2 l3.6 3.8 l7.2 -8.2"/></g>')

DEFS = ('<defs>'
        '<linearGradient id="lkw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--water)"/>'
        '<stop offset="1" style="stop-color:var(--water-deep)"/></linearGradient>'
        '<pattern id="lkh" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
        '<line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--ink);stroke-width:1.2;opacity:.2"/></pattern>'
        '<pattern id="lkm" width="24" height="24" patternUnits="userSpaceOnUse">'
        '<path d="M0 11.5 H24 M0 23.5 H24 M6 0 V11.5 M18 12 V23.5" style="fill:none;stroke:var(--ink);stroke-width:.8;opacity:.08"/></pattern>'
        '</defs>')

LOCK_SVG = ('<svg viewBox="0 -60 600 332" role="img" aria-label="Side view of five canal locks rising left to right. '
            'A lake freighter rises lock by lock as each chamber fills. The fourth gate, your review, waits until you approve.">'
            + DEFS
            + f'<path class="wallface" d="{WALL}"/><path class="masonry" d="{WALL}"/>'
            + ''.join(wets) + ''.join(numbers) + f'<path class="coping" d="{COPINGS}"/>'
            + BOAT + ''.join(water) + ''.join(surfaces) + ''.join(ripples) + '<g class="fx"></g>'
            + f'<path class="earth" d="{EARTH}"/><path class="hatch-fill" d="{EARTH}"/><path class="bed" d="{BED}"/>'
            + ''.join(gates) + END_GATES + BADGE + '</svg>')

STEPS = ('<ol class="steps">'
         '<li class="done"><span class="n">1</span><span class="t">A new enquiry arrives</span></li>'
         '<li class="done"><span class="n">2</span><span class="t">Research prepared</span></li>'
         '<li class="done"><span class="n">3</span><span class="t">Follow-up drafted</span></li>'
         '<li class="done yours"><span class="n">4</span><span class="t">You review<small>Your gate opens when you have checked the work</small></span></li>'
         '<li class="done"><span class="n">5</span><span class="t">Sent, and records updated</span></li>'
         '</ol>')

GRAIN = ("url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E"
         "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E"
         "%3CfeColorMatrix values='0 0 0 0 .25 0 0 0 0 .2 0 0 0 0 .14 0 0 0 .9 -.25'/%3E%3C/filter%3E"
         "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")")

template = (HERE / 'preview_template.html').read_text()
html = (template.replace('%%SYMBOL%%', SYMBOL).replace('%%GRAIN%%', GRAIN)
        .replace('%%MARK%%', MARK).replace('%%SIZES%%', SIZES).replace('%%MINI%%', use(30, 22, 0))
        .replace('%%HERO%%', HERO).replace('%%LOCK%%', LOCK_SVG).replace('%%STEPS%%', STEPS))
assert '%%' not in html, 'unfilled placeholder'
assert chr(0x2014) not in html, 'em-dash found'
OUT.write_text(html)
print('Saved', OUT, len(html), 'bytes')
