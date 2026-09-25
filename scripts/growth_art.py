"""Shared drawing code for Well and Good Growth.

Holds the Welland lift bridge drawn from measurements (both towers identical,
the span symmetric about CX), the logo mark, the Great Lakes freighter symbol,
and the paper grain. Used by scripts/build_growth.py, scripts/make_brand_images.py,
the page artwork modules (art_showpieces.py and art_local.py), and the design
previews in design/rebrand-preview/ (through the bridge_geometry.py shim), so
every drawing of the bridge matches.

Inline SVG from this module colours itself with the site's CSS custom
properties (--ink, --accent, --water, --paper), so it follows style.css.
Files that cannot read those properties use the hex values in PALETTE.
Keep this file em-dash free.
"""

# ---------------------------------------------------------------- palette
# Lake & Marigold, as in docs/specs/2026-09-25-rebrand-design.md section 2.
# Same names as the CSS custom properties in site-growth/style.css.
PALETTE = {
    'paper': '#f3efe6',
    'ink': '#1c2a6b',
    'accent': '#f0a30a',       # marigold: shapes, the print echo, button shadows. Never text on paper.
    'accent-text': '#9a5a00',  # marigold text on paper
    'water': '#93a2dc',
    'soft': '#475184',         # ink 80% on paper, body text
}


# ---------------------------------------------------------------- bridge geometry
def f(n):
    return f"{n:.1f}".rstrip('0').rstrip('.')


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


# Full lattice, for illustrations.
LEFT = tower(TOWER_CENTRES[0], True)
RIGHT = tower(TOWER_CENTRES[1], True, mirror=True)
SPAN = span(True)
WATER = wave(424, 805, 662, 5, 12) + ' ' + wave(487.5, 741.5, 704, 5, 8)   # two water lines under the bridge
# The logo: one zigzag per tower and no span diagonals, so it stays clear when small.
MARK_TOWERS = tower(TOWER_CENTRES[0], False) + ' ' + tower(TOWER_CENTRES[1], False, mirror=True)
MARK_SPAN = span(False)
MARK_D = MARK_TOWERS + ' ' + MARK_SPAN
MARK_WATER = wave(424, 805, 662, 5, 12)

MARK_VB = '366 396 498 290'
MARK_AR = 498 / 290
ECHO = (9, 7)       # offset of the marigold copy under the indigo, in mark units


# ---------------------------------------------------------------- logo mark
def mark_svg(cls='brand-mark', stroke=22, echo=True):
    """The logo mark as inline, decorative SVG in two inks.

    The span sits in `.lift` groups (one in each ink) so CSS can raise it
    (motion piece 3). The marigold copy is the `.mark-echo` group; CSS hides it
    wherever the mark renders 32 px tall or smaller, as the spec asks.
    """
    echo_group = (f'<g class="mark-echo" transform="translate({ECHO[0]} {ECHO[1]})" '
                  f'style="stroke:var(--accent);mix-blend-mode:multiply;opacity:.9">'
                  f'<path d="{MARK_TOWERS}"/><g class="lift"><path d="{MARK_SPAN}"/></g></g>') if echo else ''
    return (f'<svg class="{cls}" viewBox="{MARK_VB}" aria-hidden="true" focusable="false" fill="none" '
            f'stroke-width="{stroke}" stroke-linecap="round" stroke-linejoin="round">'
            + echo_group
            + f'<g class="mark-ink" style="stroke:var(--ink)"><path d="{MARK_TOWERS}"/><g class="lift"><path d="{MARK_SPAN}"/></g></g>'
            + f'<path class="mark-water" style="stroke:var(--water)" d="{MARK_WATER}"/></svg>')


HEADER_MARK = mark_svg()


# ---------------------------------------------------------------- the freighter
# A Great Lakes freighter: long low hull, marigold stripe at the waterline,
# stern house and stack, pilothouse at the bow. The page shell puts this symbol
# in a hidden sprite once per page, so any drawing can use <use href="#ship">.
SHIP_VB = '-36 -24 72 34'
SHIP = ('<symbol id="ship" viewBox="-36 -24 72 34">'
        '<path style="fill:var(--ink)" d="M-33 -4 H30 Q34 -4 35 -6 L31 8 H-29 Q-33 8 -33 3 Z"/>'
        '<path style="fill:none;stroke:var(--accent);stroke-width:1.6" d="M-31 -0.5 H31"/>'
        '<rect style="fill:var(--paper);stroke:var(--ink);stroke-width:1.6" x="-30" y="-12" width="13" height="8"/>'
        '<rect style="fill:var(--accent);stroke:var(--ink);stroke-width:1" x="-26.5" y="-19" width="5" height="7"/>'
        '<rect style="fill:var(--paper);stroke:var(--ink);stroke-width:1.6" x="19" y="-15" width="10" height="11"/>'
        '<rect style="fill:var(--ink)" x="20.8" y="-13" width="6.4" height="2.6"/></symbol>')


def ship_use(x, y, scale=1, cls='ship'):
    """Place the freighter inside an SVG drawing: (x, y) is the waterline centre."""
    return (f'<use class="{cls}" href="#ship" x="-36" y="-24" width="72" height="34" '
            f'transform="translate({x} {y}) scale({scale})"/>')


SPRITE = ('<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false" '
          'style="position:absolute;overflow:hidden">' + SHIP + '</svg>')


# ---------------------------------------------------------------- paper grain
# SVG fractal noise as a CSS url(). style.css holds the same value as --grain.
GRAIN = ("url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E"
         "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E"
         "%3CfeColorMatrix values='0 0 0 0 .25 0 0 0 0 .2 0 0 0 0 .14 0 0 0 .9 -.25'/%3E%3C/filter%3E"
         "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")")
