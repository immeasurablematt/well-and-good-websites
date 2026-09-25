#!/usr/bin/env python3
"""Build the Well and Good Growth rebrand preview, round two (direction B, Canal lock).

The bridge is drawn from measurements rather than traced, so both towers are
identical and the span is symmetric. The lock drawing is generated here too;
its animation lives in preview_template.html.

Run: python3 design/rebrand-preview/build_preview.py
Output: design/rebrand-preview/well-and-good-growth-rebrand.html (the artifact page).
Keep this script em-dash free.
"""
import pathlib

HERE = pathlib.Path(__file__).parent
OUT = HERE / 'well-and-good-growth-rebrand.html'


def f(n):
    return f"{n:.1f}".rstrip('0').rstrip('.')


# ---------------------------------------------------------------- bridge
CX = 614.5                      # mirror line of the whole bridge
TOWER_CENTRES = (413.0, 816.0)  # symmetric about CX
HALF = 32.0                     # half tower width
CAP_TOP, CAP_SHOULDER, CAP_BASE = 412.0, 429.0, 441.0
LEG_TOP, LEG_BOT = 442.0, 650.0
SPAN_L, SPAN_R = 449.0, 780.0   # small clearance from each tower, as on a real lift span
DECK_Y, CHORD_END_Y, CHORD_PEAK_Y = 587.0, 539.0, 492.0
PANELS = 8


def chord_y(x):
    half = (SPAN_R - SPAN_L) / 2
    return CHORD_PEAK_Y + (CHORD_END_Y - CHORD_PEAK_Y) * ((x - CX) / half) ** 2


def tower(c, detail, mirror=False):
    l, r = c - HALF, c + HALF
    d = [f"M{f(l + 1)} {f(LEG_BOT)} L{f(l + 5)} {f(LEG_TOP)} L{f(r - 5)} {f(LEG_TOP)} L{f(r - 1)} {f(LEG_BOT)}",
         f"M{f(l)} {f(CAP_BASE)} L{f(l)} {f(CAP_SHOULDER)} L{f(l + 15)} {f(CAP_TOP)} L{f(r - 15)} {f(CAP_TOP)} "
         f"L{f(r)} {f(CAP_SHOULDER)} L{f(r)} {f(CAP_BASE)} Z"]
    if detail:
        ys = [449, 516, 583, 649]
        for a, b in zip(ys, ys[1:]):
            d.append(f"M{f(l + 6)} {a} L{f(r - 6)} {b} M{f(r - 6)} {a} L{f(l + 6)} {b}")
        for y in ys[1:-1]:
            d.append(f"M{f(l + 4)} {y} L{f(r - 4)} {y}")
    else:
        a, b = (r - 6, l + 6) if mirror else (l + 6, r - 6)
        d.append(f"M{f(a)} 449 L{f(b)} 516 L{f(a)} 583 L{f(b)} 649")
    return ' '.join(d)


def span(detail):
    xs = [SPAN_L + k * (SPAN_R - SPAN_L) / PANELS for k in range(PANELS + 1)]
    top = [(x, chord_y(x)) for x in xs]
    d = [f"M{f(SPAN_L)} {f(DECK_Y)} H{f(SPAN_R)}",
         'M' + ' L'.join(f"{f(x)} {f(y)}" for x, y in top)]
    d += [f"M{f(x)} {f(DECK_Y)} V{f(y)}" for x, y in top]
    if detail:
        mid = PANELS // 2
        for k in range(PANELS):
            (x0, y0), (x1, y1) = top[k], top[k + 1]
            d.append(f"M{f(x0)} {f(y0)} L{f(x1)} {f(DECK_Y)}" if k < mid else f"M{f(x1)} {f(y1)} L{f(x0)} {f(DECK_Y)}")
    return ' '.join(d)


def wave(x0, x1, y, amp, n):
    step = (x1 - x0) / n
    return f"M{f(x0)} {f(y)} q{f(step / 2)} {f(-2 * amp)} {f(step)} 0" + f" t{f(step)} 0" * (n - 1)


LEFT = tower(TOWER_CENTRES[0], True)
RIGHT = tower(TOWER_CENTRES[1], True, mirror=True)
SPAN = span(True)
WATER = wave(424, 805, 662, 5, 12) + ' ' + wave(487.5, 741.5, 704, 5, 8)
MARK_D = tower(TOWER_CENTRES[0], False) + ' ' + tower(TOWER_CENTRES[1], False, mirror=True) + ' ' + span(False)
MARK_WATER = wave(424, 805, 662, 5, 12)

MARK_VB = '366 396 498 290'
MARK_AR = 498 / 290

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
W, STEP, DEPTH = 120, 34, 44
FLOORS = [250 - i * STEP for i in range(5)]      # canal bed of each chamber
LOWS = [fl - DEPTH for fl in FLOORS]              # resting water level of each chamber
COPES = [fl - 96 for fl in FLOORS]                # top of the chamber walls
GATE_LIFT = 72


def stair(ys):
    d = f"M0 {ys[0]}"
    for i in range(1, 5):
        d += f" H{i * W} V{ys[i]}"
    return d + " H600"


BED = stair(FLOORS)
COPING = stair(COPES)
WALL = COPING + f" V{FLOORS[4]}" + ''.join(f" H{i * W} V{FLOORS[i - 1]}" for i in range(4, 0, -1)) + " H0 Z"
EARTH = BED + " V272 H0 Z"

waters = ''.join(f'<rect class="water" x="{i * W}" y="{LOWS[i]}" width="{W}" height="{FLOORS[i] - LOWS[i]}"/>' for i in range(5))
gates = []
for i in range(4):
    b, lo, fl = (i + 1) * W, LOWS[i + 1], FLOORS[i + 1]
    yours = ' yours' if i == 3 else ''
    gates.append(f'<g class="gate{yours}"><rect x="{b - 5}" y="{lo - 14}" width="10" height="{fl - lo + 14}" rx="1.5"/></g>')

BOAT = (f'<g class="boat" transform="translate({4 * W + W // 2} {LOWS[4]})">'
        '<path class="hull" d="M-31 -3 H32 L27 8 H-27 Z"/>'
        '<rect class="house" x="-29" y="-11" width="12" height="8"/>'
        '<rect class="stack" x="-25" y="-18" width="4" height="7"/>'
        '<rect class="house" x="18" y="-14" width="10" height="11"/></g>')

BADGE = ('<g class="badge"><circle cx="462" cy="30" r="11"/>'
         '<path class="tick" pathLength="1" d="M456.5 30 l3.8 4 l7.5 -8.5"/></g>')

LOCK_SVG = ('<svg viewBox="0 -30 600 302" role="img" aria-label="Side view of five canal locks rising left to right. '
            'A lake freighter rises lock by lock. The fourth gate, your review, waits until you approve.">'
            f'<path class="wallface" d="{WALL}"/>' + BOAT + waters
            + f'<path class="earth" d="{EARTH}"/><path class="bed" d="{BED}"/>'
            + ''.join(gates) + BADGE + '</svg>')

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
