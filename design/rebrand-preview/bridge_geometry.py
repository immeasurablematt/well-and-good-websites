"""The Well and Good Growth lift bridge, drawn from measurements.

Both towers are identical and the span is symmetric about CX. Shared by the
rebrand preview, the motion catalogue, and (later) the live site build, so
every drawing of the bridge matches. Keep this file em-dash free.
"""


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


LEFT = tower(TOWER_CENTRES[0], True)
RIGHT = tower(TOWER_CENTRES[1], True, mirror=True)
SPAN = span(True)
WATER = wave(424, 805, 662, 5, 12) + ' ' + wave(487.5, 741.5, 704, 5, 8)
MARK_TOWERS = tower(TOWER_CENTRES[0], False) + ' ' + tower(TOWER_CENTRES[1], False, mirror=True)
MARK_SPAN = span(False)
MARK_D = MARK_TOWERS + ' ' + MARK_SPAN
MARK_WATER = wave(424, 805, 662, 5, 12)

MARK_VB = '366 396 498 290'
MARK_AR = 498 / 290
