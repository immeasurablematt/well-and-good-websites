"""Local page artwork for the Well and Good Growth build.

Three drawings, each ported from the approved motion catalogue
(design/rebrand-preview/catalogue_template.html and build_catalogue.py):

- JOURNEY (motion piece 14): the customer's journey for the Growth marketing and
  Niagara SEO heroes. A canal route with three stops and a freighter; the stop
  labels are a real HTML list. site-growth/motion/14-journey.* scrub it by scroll.
- canal_map() (piece 15): a stylized Niagara map with the Welland Canal, the
  Niagara River, both lakes, and six towns, for the three location pages. The town
  names are HTML buttons over the drawing, so moving the pin works by keyboard.
  site-growth/motion/15-map.* animate it.
- RESULTS_GROWTH and RESULTS_FRANK (piece 10): water columns that restate the
  results already written on the page, drawn to scale. site-growth/motion/10-results.*
  fill them and count the numbers up.

Every drawing is complete as written here: the markup is the finished state, which
is what visitors see without scripts and with reduced motion. Shared geometry, the
ship, and the palette come from growth_art.py. build_growth.py imports this module
as `local`. Keep this file em-dash free.
"""
import math

from growth_art import f

EM_DASH = chr(0x2014)


# ---------------------------------------------------------------- cubic paths
def path_d(start, segments):
    """An SVG path from a start point and a list of cubic segments (c1, c2, end)."""
    return f'M{f(start[0])} {f(start[1])} ' + ' '.join(
        'C' + ' '.join(f'{f(x)} {f(y)}' for x, y in seg) for seg in segments)


def cubic_point(p0, seg, t):
    """Point and heading (degrees) at t on one cubic segment."""
    (x1, y1), (x2, y2), (x3, y3) = seg
    x0, y0 = p0
    u = 1 - t
    x = u ** 3 * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x3
    y = u ** 3 * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y3
    dx = 3 * u * u * (x1 - x0) + 6 * u * t * (x2 - x1) + 3 * t * t * (x3 - x2)
    dy = 3 * u * u * (y1 - y0) + 6 * u * t * (y2 - y1) + 3 * t * t * (y3 - y2)
    return x, y, math.degrees(math.atan2(dy, dx))


def ship(x, y, angle, scale, cls):
    """The freighter from the page sprite, waterline centre at (x, y)."""
    return (f'<use class="{cls}" href="#ship" x="-36" y="-24" width="72" height="34" '
            f'transform="translate({f(x)} {f(y)}) rotate({f(angle)}) scale({scale})"/>')


# ---------------------------------------------------------------- 14: the customer's journey
# The catalogue's route, lowered 10 units to make room for larger stop badges in the hero.
ROUTE_START = (30, 110)
ROUTE_SEGS = [((60, 80), (80, 90), (100, 98)), ((160, 120), (240, 120), (300, 100)),
              ((360, 80), (440, 80), (500, 98)), ((530, 106), (555, 110), (575, 106))]
ROUTE = path_d(ROUTE_START, ROUTE_SEGS)
BADGE_Y, BADGE_R = 44, 24
# Stop icons, drawn around the badge centre: a magnifier (find), a page (see the fit), an envelope (get in touch).
STOP_ICONS = [
    '<circle cx="-3.5" cy="-3.5" r="8.5"/><path d="M2.8 2.8 L10 10"/>',
    '<rect x="-11" y="-13" width="22" height="26" rx="2"/><path d="M-6 -6 H6 M-6 0 H6 M-6 6 H1"/>',
    '<rect x="-14" y="-10" width="28" height="20" rx="2"/><path d="M-13 -8.5 L0 2 L13 -8.5"/>',
]
STOP_LABELS = ['Find you.', 'See the fit.', 'Get in touch.']   # approved copy


def _journey():
    stops = []
    for (_, _, (x, y)), icon in zip(ROUTE_SEGS, STOP_ICONS):
        post_end = y - 4.5 - BADGE_Y - 2      # stop just short of the route's ink bank
        stops.append(
            f'<g class="journey-stop is-reached" data-x="{x}" data-y="{y}" transform="translate({x} {BADGE_Y})">'
            f'<path class="journey-post" d="M0 {BADGE_R + 3} V{f(post_end)}"/>'
            f'<circle r="{BADGE_R}"/><g class="journey-icon">{icon}</g></g>')
    end = ROUTE_SEGS[-1][2]
    svg = ('<svg class="journey-art" viewBox="0 14 600 110" aria-hidden="true" focusable="false">'
           f'<path class="journey-bank" d="{ROUTE}"/><path class="journey-route" d="{ROUTE}"/>'
           f'<path class="journey-done" pathLength="1" d="{ROUTE}"/>'
           + ''.join(stops)
           + ship(end[0], end[1] - 3, 0, .8, 'journey-ship')
           + '</svg>')
    labels = ''.join(f'<li class="is-reached">{label}</li>' for label in STOP_LABELS)
    # The figure keeps the aria meaning of the block it replaces; the labels are real text.
    return (f'<figure class="journey" aria-label="Find you, understand the offer, get in touch">{svg}'
            f'<ol class="journey-stops">{labels}</ol></figure>')


JOURNEY = _journey()


# ---------------------------------------------------------------- 15: your town on the canal
# Stylized, not to scale: positions follow latitude and longitude loosely (the catalogue's
# map, moved 34 units east and widened so every town name fits beside its dot).
MAP_W, MAP_H = 340, 360
LAKE_ONTARIO = 'M0 0 H340 V46 C300 52 260 44 224 50 C184 57 154 52 130 58 C94 64 50 55 0 60 Z'
LAKE_ERIE = 'M0 360 V308 C50 300 94 309 146 303 C200 296 250 306 340 298 V360 Z'
CANAL_START = (136, 54)     # just inside Lake Ontario
CANAL_SEGS = [((135, 80), (130, 96), (134, 112)), ((138, 126), (148, 132), (146, 142)),
              ((142, 170), (126, 196), (122, 228)), ((120, 256), (122, 282), (121, 310))]   # ends inside Lake Erie
CANAL = path_d(CANAL_START, CANAL_SEGS)
RIVER = 'M284 306 C274 250 234 210 210 160 C202 130 212 90 214 46'
# key, name, x, y, which side of the dot the name sits on. Listed north to south, the tab order.
TOWNS = [
    ('stcatharines', 'St. Catharines', 134, 112, 'end'),
    ('thorold', 'Thorold', 146, 142, 'end'),
    ('niagarafalls', 'Niagara Falls', 210, 160, 'start'),
    ('welland', 'Welland', 122, 228, 'end'),
    ('forterie', 'Fort Erie', 283, 296, 'end'),
    ('portcolborne', 'Port Colborne', 121, 300, 'end'),
]
TOWN_AT = {key: (x, y) for key, _, x, y, _ in TOWNS}
TOWN_NAME = {key: name for key, name, *_ in TOWNS}
PIN = 'M0 0 C-7 -9 -8 -14 -8 -17 A8 8 0 1 1 8 -17 C8 -14 7 -9 0 0 Z'
MAP_SHIP_SCALE = .38   # 15-map.js uses the same scale while the freighter sails
MAP_LABEL = ('Stylized map of the Niagara region, not to scale. The Welland Canal runs from Lake Ontario '
             'to Lake Erie through St. Catharines, Thorold, Welland, and Port Colborne. The Niagara River '
             'runs past Niagara Falls and Fort Erie.')


def _water_names():
    # "Welland Canal" beside the straight reach above Port Colborne, reading upward.
    canal = '<text class="map-water-name" transform="translate(137 265) rotate(-90)" text-anchor="middle">Welland Canal</text>'
    # "Niagara River" along the river between Niagara Falls and Fort Erie, on its east bank.
    river = '<text class="map-water-name" transform="translate(255.7 228.7) rotate(58.5)" text-anchor="middle">Niagara River</text>'
    return canal + river


def _pin_body():
    return f'<g class="map-pin-body"><path d="{PIN}"/><circle class="map-pin-eye" cy="-17" r="3"/></g>'


def canal_map(pin, also=()):
    """The map figure with `pin` holding the movable pin and `also` marked with small fixed pins."""
    assert pin in TOWN_AT and all(key in TOWN_AT for key in also)
    label = MAP_LABEL
    if also:
        # The fixed pins stay put when a visitor moves the main pin, so the label stays true.
        names = [TOWN_NAME[key] for key in also]
        label += ' Pins mark ' + (', '.join(names[:-1]) + ', and ' if len(names) > 1 else '') + names[-1] + '.'
    dots = ''.join(
        f'<circle class="map-dot{" is-pinned" if key == pin or key in also else ""}" data-town="{key}" cx="{x}" cy="{y}" r="3.6"/>'
        for key, _, x, y, _ in TOWNS)
    also_pins = ''.join(
        f'<g class="map-pin is-also{" is-under" if key == pin else ""}" data-town="{key}" style="--pd:{.14 * (i + 1):.2f}s" '
        f'transform="translate({TOWN_AT[key][0]} {TOWN_AT[key][1]}) scale(.78)">{_pin_body()}</g>'
        for i, key in enumerate(also))
    px, py = TOWN_AT[pin]
    primary = (f'<g class="map-pin is-primary" transform="translate({px} {py})">'
               f'<circle class="map-pulse" r="4"/>{_pin_body()}</g>')
    # At rest the freighter works north between Welland and Thorold. On the map it stays upright, like an
    # illustrated map's boat, and faces the way it travels (east while heading north).
    sx, sy, _ = cubic_point(CANAL_SEGS[1][2], CANAL_SEGS[2], .5)
    svg = (f'<svg class="map-art" viewBox="0 0 {MAP_W} {MAP_H}" role="img" aria-label="{label}" focusable="false">'
           f'<path class="map-lake" d="{LAKE_ONTARIO}"/><path class="map-lake" d="{LAKE_ERIE}"/>'
           '<text class="map-lake-name" x="16" y="30">Lake Ontario</text><text class="map-lake-name" x="16" y="342">Lake Erie</text>'
           f'<path class="map-river" d="{RIVER}"/>'
           f'<path class="map-canal-bank" pathLength="1" d="{CANAL}"/><path class="map-canal" pathLength="1" d="{CANAL}"/>'
           + _water_names() + dots
           + ship(sx, sy, 0, MAP_SHIP_SCALE, 'map-ship')
           + also_pins + primary + '</svg>')
    buttons = ''.join(
        f'<button type="button" class="map-town is-{side}" data-town="{key}" data-x="{x}" data-y="{y}" '
        f'aria-pressed="{"true" if key == pin else "false"}" '
        f'style="--x:{100 * x / MAP_W:.2f}%;--y:{100 * y / MAP_H:.2f}%">{name}</button>'
        for key, name, x, y, side in TOWNS)
    return (f'<figure class="canal-map" data-home="{pin}"><div class="map-stage">{svg}'
            f'<div class="map-towns" role="group" aria-label="Move the pin to a town">{buttons}</div></div>'
            '<figcaption>Stylized, not to scale.</figcaption></figure>')


# ---------------------------------------------------------------- 10: real results rise
def _column(when, height, delay, value=None, after=False):
    """One water column. height is the level in percent of the tank; value (if any) is printed above it."""
    number = f'<span class="rise-val" data-count="{value}">{value:,}</span>' if value is not None else ''
    return (f'<div class="rise-col{" is-after" if after else ""}" style="--h:{height}%;--d:{delay}ms">{number}'
            f'<span class="rise-tank"><span class="rise-level"></span></span><span class="rise-when">{when}</span></div>')


def rise_chart(name, metric, before, after, when_before, when_after):
    """A before and after pair, drawn to scale: the taller column is full and the other is before / after of it."""
    assert 0 < before < after
    level = round(100 * before / after, 1)
    return (f'<div class="rise"><p class="rise-title"><strong>{name}</strong> <span>{metric}</span></p>'
            f'<div class="rise-cols">{_column(when_before, level, 150, before)}'
            f'{_column(when_after, 100, 650, after, after=True)}</div></div>')


# The Jetta Grove results on the Growth marketing page, restating the sentences above them
# (aria-hidden, since those sentences already give every number). The periods match the copy:
# SeamlessFi between April and November 2025; the io.net copy gives no dates, so Before and After.
RESULTS_GROWTH = ('<div class="rise-group results-rise" aria-hidden="true">'
                  + rise_chart('SeamlessFi social content', 'Average views per post', 1412, 3871, 'April 2025', 'November 2025')
                  + rise_chart('io.net organic search', 'Estimated monthly organic visits', 5097, 27022, 'Before', 'After')
                  + '</div>')

# Frank's "Nearly 3x": a 1 to nearly 3 pair with no invented figure. The before column is
# 35% of the after column (about 1 to 2.9), and only Before and After are printed.
RESULTS_FRANK = ('<div class="rise-group rise-frank" aria-hidden="true"><div class="rise-cols">'
                 + _column('Before', 35, 150) + _column('After', 100, 650, after=True)
                 + '</div></div>')


for _html in (JOURNEY, canal_map('welland'), RESULTS_GROWTH, RESULTS_FRANK):
    assert EM_DASH not in _html, 'em-dash in local artwork'
