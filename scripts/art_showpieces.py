"""Page showpiece artwork for the Well and Good Growth build.

Inline SVG for:
- HERO_BRIDGE: the homepage hero, the full-lattice lift bridge in two inks
  (motion: site-growth/motion/20-hero-bridge.css and .js).
- SERVICE_GLYPHS: the small drawings on the homepage service cards, motion piece 13
  (13-services.css and .js).
- LOCK_SECTION: the AI automation canal lock, with its step list and caption
  (21-lock.css and .js). The simulation reads the geometry from the SVG's
  data-geometry attribute, so the numbers live only here.
- BRIDGE_UP: the 404 page's raised bridge, sign, lamps, and barrier, piece 16
  (16-bridge-up.css and .js).
- THANK_YOU_LOCK: the thank-you page's last lock, piece 17 (17-thank-you.css and .js).

Ported from the approved references in design/rebrand-preview/ (build_preview.py
and build_catalogue.py). Every drawing's static markup is its finished state, so
the page is complete without scripts and under reduced motion. Class names carry
a prefix per drawing (hb-, sg-, cl-, bu-, ty-) so they never meet another piece's
styles. Shared geometry, the ship, and the mark come from growth_art.py.
build_growth.py imports this module as `showpieces`. Keep this file em-dash free.
"""
import json
import math

import growth_art as art

# ---------------------------------------------------------------- homepage hero bridge
# build_preview.py HERO: the marigold plate is offset (6, 5) under the indigo and
# multiplied. Each line draws itself (--d delay, --t duration), the water after the
# towers, then the span lifts and settles back once.


def _bridge_plate(ink, delay):
    d = delay
    return (f'<g class="hb-plate hb-{ink}">'
            f'<path class="hb-line hb-draw" pathLength="1" style="--d:{d:.2f}s;--t:1.3s" d="{art.LEFT}"/>'
            f'<path class="hb-line hb-draw" pathLength="1" style="--d:{d + .2:.2f}s;--t:1.3s" d="{art.RIGHT}"/>'
            f'<g class="hb-span"><path class="hb-line hb-draw" pathLength="1" style="--d:{d + .8:.2f}s;--t:1.4s" d="{art.SPAN}"/></g></g>')


HERO_BRIDGE = ('<div class="hero-bridge">'
               '<svg class="hero-bridge-art" viewBox="366 380 510 350" role="img" '
               'aria-label="The Welland lift bridge, drawn in indigo and marigold.">'
               '<g class="hb-echo" transform="translate(6 5)">' + _bridge_plate('accent', .15) + '</g>'
               f'<path class="hb-line hb-draw hb-water" pathLength="1" style="--d:1.5s;--t:1.2s" d="{art.WATER}"/>'
               + _bridge_plate('ink', 0) + '</svg></div>')

# ---------------------------------------------------------------- 13: service drawings
# From the catalogue (#m13), drawn in a 72 by 48 box. The static markup is each
# drawing's finished state: the boat has been lifted through the gate, the page
# is laid out, and the search has found its pin.
_GLYPH_OPEN = '<svg class="service-glyph sg-{}" viewBox="0 0 72 48" aria-hidden="true" focusable="false">'
# The web page frame as a path (a rect's pathLength is not supported everywhere).
_FRAME = 'M7 3 H65 A4 4 0 0 1 69 7 V41 A4 4 0 0 1 65 45 H7 A4 4 0 0 1 3 41 V7 A4 4 0 0 1 7 3 Z'
SERVICE_GLYPHS = {
    # A lock lifts a boat: the chamber fills, the boat rises, the gate lifts, and it sails through.
    'automation': (_GLYPH_OPEN.format('automation')
                   + '<path class="sg-line" d="M4 44 H42 V30 H68"/>'
                   '<rect class="sg-water sg-rise" x="6" y="20" width="34" height="23"/>'
                   '<rect class="sg-water" x="42" y="24" width="26" height="6"/>'
                   '<g class="sg-gate"><rect class="sg-acc" x="39.5" y="15" width="5" height="16" rx="1"/></g>'
                   '<g class="sg-boat">' + art.ship_use(22, 34, .26, 'sg-ship') + '</g></svg>'),
    # A page lays itself out: the frame draws, then the heading, image, text, and button arrive.
    'websites': (_GLYPH_OPEN.format('websites')
                 + f'<path class="sg-line sg-frame" pathLength="1" d="{_FRAME}"/>'
                 '<path class="sg-line" d="M3 11 H69"/>'
                 '<rect class="sg-fill sg-pop" style="--d:.55s" x="9" y="16" width="54" height="5" rx="1"/>'
                 '<rect class="sg-water sg-pop" style="--d:.75s" x="9" y="25" width="24" height="14" rx="1"/>'
                 '<path class="sg-line sg-pop" style="--d:.95s" d="M38 27 H62 M38 31.5 H57"/>'
                 '<rect class="sg-acc sg-pop" style="--d:1.15s" x="38" y="35" width="14" height="5" rx="1"/></svg>'),
    # A search finds a pin: the magnifier travels along the route and the pin drops.
    'growth': (_GLYPH_OPEN.format('growth')
               + '<path class="sg-line sg-route" d="M4 42 C20 32 34 40 50 26 C56 21 62 18 68 14"/>'
               '<g class="sg-pin"><path class="sg-acc sg-pin-shape" d="M58 20 C53 14 52 11 52 9 A6 6 0 1 1 64 9 C64 11 63 14 58 20 Z"/></g>'
               '<g class="sg-mag"><circle class="sg-line sg-lens" cx="0" cy="0" r="7"/><path class="sg-line" d="M5 5 L11 11"/></g></svg>'),
}

# ---------------------------------------------------------------- the canal lock (AI automation)
# build_preview.py, round four (approved). Static markup is the resting state: the
# job has passed every lock. 21-lock.js runs the simulation over the same geometry.
W, STEP, DEPTH, LIFT = 120, 34, 44, 72
FLOORS = [250 - i * STEP for i in range(5)]      # canal bed of each chamber
LOWS = [fl - DEPTH for fl in FLOORS]              # resting water level of each chamber
COPES = [fl - 96 for fl in FLOORS]                # top of the chamber walls


def _stair(ys):
    d = f"M0 {ys[0]}"
    for i in range(1, 5):
        d += f" H{i * W} V{ys[i]}"
    return d + " H600"


_BED = _stair(FLOORS)
_WALL = _stair(COPES) + f" V{FLOORS[4]}" + ''.join(f" H{i * W} V{FLOORS[i - 1]}" for i in range(4, 0, -1)) + " H0 Z"
_EARTH = _BED + " V272 H0 Z"
_COPINGS = ' '.join(f"M{i * W} {COPES[i]} H{(i + 1) * W}" for i in range(5))


def _surf0(i, x):
    """Resting surface: the same gentle ripple the animation starts from."""
    return LOWS[i] + 0.9 * math.sin(0.085 * x + i) + 0.45 * math.sin(0.19 * x)


_water, _surfaces, _ripples, _wets, _numbers = [], [], [], [], []
for _i in range(5):
    _x0, _x1 = _i * W, (_i + 1) * W
    _pts = [(x, _surf0(_i, x)) for x in range(_x0, _x1 + 1, 5)]
    _water.append(f'<path class="cl-water" d="M{_x0} {FLOORS[_i]} ' + ' '.join(f'L{x} {y:.2f}' for x, y in _pts) + f' L{_x1} {FLOORS[_i]} Z"/>')
    _surfaces.append('<path class="cl-surf" d="M' + ' L'.join(f'{x} {y:.2f}' for x, y in _pts) + '"/>')
    _ripples.append(f'<path class="cl-rip" d="M{_x0 + 12} {LOWS[_i] + 13} H{_x1 - 12}"/><path class="cl-rip" d="M{_x0 + 12} {LOWS[_i] + 27} H{_x1 - 12}"/>')
    _wets.append(f'<rect class="cl-wet" x="{_x0}" y="{LOWS[_i]}" width="{W}" height="{FLOORS[_i] - LOWS[_i]}"/>')
    _numbers.append(f'<text class="cl-locknum" x="{_x0 + 14}" y="{COPES[_i] + 14}">LOCK {_i + 1}</text>')


def _gate(b, top, sill, cls):
    """A lift gate in three braced panels, like the bridge towers."""
    h = sill - top
    d = []
    for p in range(3):
        y0, y1 = top + p * h / 3, top + (p + 1) * h / 3
        d.append(f"M{b - 3.5} {y0 + 2:.1f} L{b + 3.5} {y1 - 2:.1f} M{b + 3.5} {y0 + 2:.1f} L{b - 3.5} {y1 - 2:.1f}")
        if p:
            d.append(f"M{b - 5} {y0:.1f} H{b + 5}")
    return (f'<g class="{cls}"><rect x="{b - 5}" y="{top}" width="10" height="{h}" rx="1.2"/>'
            f'<path class="cl-rib" d="{" ".join(d)}"/></g>')


# Every gate reaches the top of the higher chamber's wall, 12 above the highest
# level on either side (a chamber fills to the next chamber's resting level),
# so filled water never rises above the gate on a chamber's low side.
_gates = [_gate((i + 1) * W, COPES[i + 1] + 6, FLOORS[i + 1], 'cl-gate cl-yours' if i == 3 else 'cl-gate') for i in range(4)]
# Closed end gates give the first and last locks a proper wall on the outside.
_END_GATES = _gate(5, COPES[0] + 6, FLOORS[0], 'cl-gate-end') + _gate(595, COPES[4] + 6, FLOORS[4], 'cl-gate-end')
for _i in range(5):
    _highest = LOWS[min(_i + 1, 4)]    # a chamber fills to the next chamber's resting level
    _low_side_gate_top = COPES[_i] + 6  # the end gate for lock 1, otherwise the shared gate below
    assert _low_side_gate_top <= _highest - 12, f'lock {_i + 1}: water would rise above its low-side gate'

# A Great Lakes freighter: long low hull, stripe at the waterline, stern house and stack, pilothouse at the bow.
_BOAT = (f'<g class="cl-boat" transform="translate({4 * W + W // 2} {LOWS[4]})"><g class="cl-rock">'
         '<path class="cl-hull" d="M-33 -4 H30 Q34 -4 35 -6 L31 8 H-29 Q-33 8 -33 3 Z"/>'
         '<path class="cl-stripe" d="M-31 -0.5 H31"/>'
         '<path class="cl-hatch" d="M-12 -4 V-6 M-4 -4 V-6 M4 -4 V-6 M12 -4 V-6"/>'
         '<rect class="cl-house" x="-30" y="-12" width="13" height="8"/>'
         '<rect class="cl-stack" x="-26.5" y="-19" width="5" height="7"/>'
         '<rect class="cl-house" x="19" y="-15" width="10" height="11"/>'
         '<rect class="cl-win" x="20.8" y="-13" width="6.4" height="2.6"/>'
         '<path class="cl-mast" d="M24 -15 V-21"/></g></g>')

# The review badge above your gate: a ring fills while the job waits, then the tick lands.
_BADGE = ('<g class="cl-badge"><circle class="cl-ring" pathLength="1" cx="456" cy="30" r="15" transform="rotate(-90 456 30)"/>'
          '<circle class="cl-disc" cx="456" cy="30" r="10.5"/>'
          '<path class="cl-tick" pathLength="1" d="M450.8 30.2 l3.6 3.8 l7.2 -8.2"/></g>')

_DEFS = ('<defs>'
         '<linearGradient id="cl-water-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--water)"/>'
         '<stop offset="1" style="stop-color:var(--water-deep)"/></linearGradient>'
         '<pattern id="cl-hatching" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
         '<line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--ink);stroke-width:1.2;opacity:.2"/></pattern>'
         '<pattern id="cl-masonry" width="24" height="24" patternUnits="userSpaceOnUse">'
         '<path d="M0 11.5 H24 M0 23.5 H24 M6 0 V11.5 M18 12 V23.5" style="fill:none;stroke:var(--ink);stroke-width:.8;opacity:.08"/></pattern>'
         '</defs>')

_GEOMETRY = json.dumps({'w': W, 'floors': FLOORS, 'depth': DEPTH, 'lift': LIFT}, separators=(',', ':'))

LOCK_SVG = ('<svg class="cl-art" viewBox="0 -60 600 332" role="img" '
            f"data-geometry='{_GEOMETRY}' "
            'aria-label="Side view of five canal locks rising left to right. A lake freighter rises lock by lock '
            'as each chamber fills. The fourth gate, your review, waits until you approve.">'
            + _DEFS
            + f'<path class="cl-wallface" d="{_WALL}"/><path class="cl-masonry" d="{_WALL}"/>'
            + ''.join(_wets) + ''.join(_numbers) + f'<path class="cl-coping" d="{_COPINGS}"/>'
            + _BOAT + ''.join(_water) + ''.join(_surfaces) + ''.join(_ripples) + '<g class="cl-fx"></g>'
            + f'<path class="cl-earth" d="{_EARTH}"/><path class="cl-hatch-fill" d="{_EARTH}"/><path class="cl-bed" d="{_BED}"/>'
            + ''.join(_gates) + _END_GATES + _BADGE + '</svg>')

_STEPS = ['A new enquiry arrives.', 'Research prepared.', 'Follow-up drafted.', 'You review.', 'Sent, and records updated.']
LOCK_STEPS = ('<ol class="cl-steps">' + ''.join(
    f'<li class="is-done{" cl-yours" if n == 4 else ""}"><span class="cl-n">{n}</span><span class="cl-t">{text}</span></li>'
    for n, text in enumerate(_STEPS, 1)) + '</ol>')

LOCK_SECTION = ('<section class="lock-section container section" aria-labelledby="lock-heading">'
                '<p class="label">How a workflow runs</p>'
                '<h2 id="lock-heading">The routine work runs itself.<br>You approve what goes out.</h2>'
                '<figure class="lock-figure is-approved">' + LOCK_SVG + LOCK_STEPS
                + '<figcaption><span>Illustrative example.</span> Each lock lifts the job one step while '
                'the routine work runs itself. The fourth gate is yours: it stays shut until you have checked the work.</figcaption></figure>'
                '<button class="cl-replay" type="button" hidden>Watch again</button></section>')

# ---------------------------------------------------------------- 16: bridge up (404)
# build_catalogue.py BRIDGE_UP: the span is raised, the sign flashes, the barrier is down.
BRIDGE_UP = (
    '<svg class="bu-art" viewBox="290 380 640 350" role="img" '
    'aria-label="The lift bridge with its span raised, a flashing Bridge Up sign, and the road barrier down.">'
    '<path class="bu-road" d="M290 587 H381 M848 587 H930"/>'
    f'<path class="bu-line bu-water" d="{art.WATER}"/>'
    '<g class="bu-echo" transform="translate(6 5)">'
    f'<path class="bu-line" d="{art.LEFT}"/><path class="bu-line" d="{art.RIGHT}"/><g class="bu-span"><path class="bu-line" d="{art.SPAN}"/></g></g>'
    '<g class="bu-ink">'
    f'<path class="bu-line" d="{art.LEFT}"/><path class="bu-line" d="{art.RIGHT}"/><g class="bu-span"><path class="bu-line" d="{art.SPAN}"/></g></g>'
    '<g class="bu-sign"><path class="bu-post" d="M330 587 V520"/>'
    '<rect class="bu-plate" x="290" y="490" width="80" height="30" rx="3"/>'
    '<text x="330" y="510" text-anchor="middle">BRIDGE UP</text>'
    '<circle class="bu-lamp" cx="312" cy="480" r="6"/><circle class="bu-lamp bu-lamp-2" cx="348" cy="480" r="6"/></g>'
    '<g class="bu-barrier"><rect class="bu-arm" x="312" y="571" width="62" height="7" rx="3.5"/>'
    '<path class="bu-stripes" d="M320 571 v7 M334 571 v7 M348 571 v7 M362 571 v7"/>'
    '<circle class="bu-pivot" cx="374" cy="574.5" r="5"/></g>'
    '</svg>')

# ---------------------------------------------------------------- 17: through the last lock (thank-you)
# build_catalogue.py #m17. The static markup is the finished state: the chamber is
# full, the freighter has sailed out into the upper reach, and the tick has landed.
TY_LOW, TY_HIGH = 100, 70          # chamber level before and after it fills
TY_START_X, TY_END_X = 140, 270    # freighter in the chamber, then out in the upper reach


def ty_surface(y, t=0.0, amp=.8):
    """The chamber's surface line, as 17-thank-you.js draws it (x from 70 to 210)."""
    return ' L'.join(f'{x} {y + amp * math.sin(.12 * x + t * 2):.2f}' for x in range(70, 211, 5))


_TY_SURF = 'M' + ty_surface(TY_HIGH)
THANK_YOU_LOCK = (
    '<svg class="ty-art" viewBox="0 0 320 160" aria-hidden="true" focusable="false">'
    '<path class="ty-wall" d="M70 44 H320 V110 H210 V140 H70 Z"/>'
    + art.ship_use(TY_END_X, round(TY_HIGH + .8 * math.sin(.12 * TY_END_X) - 4, 1), .8, 'ty-ship')
    + '<path class="ty-water" d="M0 100 H70 V140 H0 Z"/>'
    f'<path class="ty-water ty-chamber" d="M70 140 L{ty_surface(TY_HIGH)} L210 140 Z"/>'
    '<path class="ty-water" d="M210 70 H320 V110 H210 Z"/>'
    f'<path class="ty-surf" d="{_TY_SURF}"/>'
    '<path class="ty-earth" d="M0 140 H210 V110 H320 V160 H0 Z"/><path class="ty-bed" d="M0 140 H210 V110 H320"/>'
    '<g class="ty-gate"><rect x="65" y="58" width="10" height="82" rx="1.2"/></g>'
    '<g class="ty-gate ty-gate-up"><rect x="205" y="58" width="10" height="52" rx="1.2"/></g>'
    '<g class="ty-badge"><circle cx="270" cy="30" r="12"/><path class="ty-tick" pathLength="1" d="M264 30.5 l4 4.2 l8 -9"/></g>'
    '</svg>')
# The upper gate must stand at least 12 above the upper reach, and the lower gate above the full chamber.
assert 58 <= TY_HIGH - 12

for _name, _svg in [('HERO_BRIDGE', HERO_BRIDGE), ('LOCK_SECTION', LOCK_SECTION), ('BRIDGE_UP', BRIDGE_UP),
                    ('THANK_YOU_LOCK', THANK_YOU_LOCK)] + list(SERVICE_GLYPHS.items()):
    assert chr(0x2014) not in _svg, f'{_name}: em-dash found'
