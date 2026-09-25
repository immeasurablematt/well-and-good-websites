#!/usr/bin/env python3
"""Build the Well and Good Growth motion catalogue (artifact HTML).

Seventeen proposed animations for the rebranded site, each demonstrated live
with real copy, the real photo, the real screenshot, and real results, so
Matthew can keep or cut each one before it is built into the site.

Run: python3 design/rebrand-preview/build_catalogue.py
Output: design/rebrand-preview/motion-catalogue.html
Keep this script em-dash free.
"""
import base64
import pathlib
import sys

HERE = pathlib.Path(__file__).parent
ROOT = HERE.parents[1]
OUT = HERE / 'motion-catalogue.html'
sys.path.insert(0, str(HERE))

from bridge_geometry import LEFT, RIGHT, SPAN, WATER, MARK_TOWERS, MARK_SPAN, MARK_WATER, MARK_VB  # noqa: E402


def data_uri(path, mime):
    return f'data:{mime};base64,' + base64.b64encode((ROOT / path).read_bytes()).decode()


FRANK_IMG = data_uri('site-growth/assets/frankbaggetta-20260908.webp', 'image/webp')
MATT_IMG = data_uri('site-growth/assets/matt-headshot.webp', 'image/webp')

# A Great Lakes freighter, shared by every scene that has a boat in it.
SHIP = ('<symbol id="ship" viewBox="-36 -24 72 34">'
        '<path style="fill:var(--ink)" d="M-33 -4 H30 Q34 -4 35 -6 L31 8 H-29 Q-33 8 -33 3 Z"/>'
        '<path style="fill:none;stroke:var(--accent);stroke-width:1.6" d="M-31 -0.5 H31"/>'
        '<rect style="fill:var(--paper);stroke:var(--ink);stroke-width:1.6" x="-30" y="-12" width="13" height="8"/>'
        '<rect style="fill:var(--accent);stroke:var(--ink);stroke-width:1" x="-26.5" y="-19" width="5" height="7"/>'
        '<rect style="fill:var(--paper);stroke:var(--ink);stroke-width:1.6" x="19" y="-15" width="10" height="11"/>'
        '<rect style="fill:var(--ink)" x="20.8" y="-13" width="6.4" height="2.6"/></symbol>')


def ship(x, y, scale=1, cls='ship'):
    return (f'<use class="{cls}" href="#ship" x="-36" y="-24" width="72" height="34" '
            f'transform="translate({x} {y}) scale({scale})"/>')


# ---------------------------------------------------------------- 3: header mark
HEADER_MARK = (f'<svg class="hdr-mark" viewBox="{MARK_VB}" aria-hidden="true" focusable="false">'
               f'<g transform="translate(9 7)" style="stroke:var(--accent);mix-blend-mode:multiply;opacity:.9">'
               f'<path class="ln" d="{MARK_TOWERS}"/><g class="lift"><path class="ln" d="{MARK_SPAN}"/></g></g>'
               f'<g style="stroke:var(--ink)"><path class="ln" d="{MARK_TOWERS}"/><g class="lift"><path class="ln" d="{MARK_SPAN}"/></g></g>'
               f'<path class="ln" style="stroke:var(--water)" d="{MARK_WATER}"/></svg>')

# ---------------------------------------------------------------- 16: bridge up
BRIDGE_UP = (
    '<svg class="b404" viewBox="290 380 640 350" role="img" aria-label="The lift bridge with its span raised, a flashing Bridge Up sign, and the road barrier down">'
    '<path class="road" d="M290 587 H381 M848 587 H930"/>'
    f'<path class="ln b404-water" d="{WATER}"/>'
    '<g transform="translate(6 5)" style="stroke:var(--accent);mix-blend-mode:multiply;opacity:.9;stroke-width:6">'
    f'<path class="ln" d="{LEFT}"/><path class="ln" d="{RIGHT}"/><g class="span404"><path class="ln" d="{SPAN}"/></g></g>'
    '<g style="stroke:var(--ink);stroke-width:6">'
    f'<path class="ln" d="{LEFT}"/><path class="ln" d="{RIGHT}"/><g class="span404"><path class="ln" d="{SPAN}"/></g></g>'
    '<g class="sign"><path class="post" d="M330 587 V520"/>'
    '<rect class="plate" x="294" y="490" width="72" height="30" rx="3"/>'
    '<text x="330" y="510" text-anchor="middle">BRIDGE UP</text>'
    '<circle class="lamp l1" cx="312" cy="480" r="6"/><circle class="lamp l2" cx="348" cy="480" r="6"/></g>'
    '<g class="barrier"><rect class="arm" x="312" y="571" width="62" height="7" rx="3.5"/>'
    '<path class="arm-stripes" d="M320 571 v7 M334 571 v7 M348 571 v7 M362 571 v7"/>'
    '<circle class="pivot" cx="374" cy="574.5" r="5"/></g>'
    '</svg>')

# ---------------------------------------------------------------- 15: canal map
TOWNS = [  # stylized positions from latitude and longitude, not to scale
    ('stcatharines', 'St. Catharines', 100, 112, 'end'),
    ('thorold', 'Thorold', 112, 142, 'start'),
    ('welland', 'Welland', 88, 228, 'end'),
    ('portcolborne', 'Port Colborne', 87, 300, 'start'),
    ('niagarafalls', 'Niagara Falls', 176, 160, 'start'),
    ('forterie', 'Fort Erie', 250, 296, 'end'),
]
town_svg = []
for i, (key, name, x, y, anchor) in enumerate(TOWNS):
    dx = -10 if anchor == 'end' else 10
    town_svg.append(
        f'<g class="town" data-town="{key}" style="--i:{i}"><circle class="dot" cx="{x}" cy="{y}" r="3.6"/>'
        f'<text x="{x + dx}" y="{y + 4}" text-anchor="{anchor}">{name}</text>'
        f'<g class="pin" transform="translate({x} {y})"><g class="pin-drop"><path d="M0 0 C-7 -9 -8 -14 -8 -17 A8 8 0 1 1 8 -17 C8 -14 7 -9 0 0 Z"/>'
        f'<circle cx="0" cy="-17" r="3" class="pin-eye"/></g><circle class="pulse" cx="0" cy="0" r="4"/></g></g>')
CANAL = "M102 56 C101 80 96 96 100 112 C104 126 114 132 112 142 C108 170 92 196 88 228 C86 256 88 280 87 305"
MAP = ('<svg class="map" viewBox="0 0 300 360" role="img" aria-label="Stylized map of the Niagara region: the Welland Canal runs from Lake Ontario to Lake Erie through St. Catharines, Thorold, Welland, and Port Colborne.">'
       '<path class="lake" d="M0 0 H300 V46 C262 52 226 44 190 50 C150 57 120 52 96 58 C60 64 30 55 0 60 Z"/>'
       '<path class="lake" d="M0 360 V308 C40 300 80 309 120 303 C170 296 220 306 300 298 V360 Z"/>'
       '<text class="lake-name" x="16" y="30">Lake Ontario</text><text class="lake-name" x="16" y="342">Lake Erie</text>'
       '<path class="river" d="M250 300 C240 250 200 210 176 160 C168 130 178 90 180 50"/>'
       f'<path class="canal-bank" pathLength="1" d="{CANAL}"/><path class="canal" pathLength="1" d="{CANAL}"/>'
       + ''.join(town_svg)
       + ship(102, 70, .32, 'ship map-ship')
       + '</svg>')

GRAIN = ("url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E"
         "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E"
         "%3CfeColorMatrix values='0 0 0 0 .25 0 0 0 0 .2 0 0 0 0 .14 0 0 0 .9 -.25'/%3E%3C/filter%3E"
         "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")")

template = (HERE / 'catalogue_template.html').read_text()
html = (template.replace('%%GRAIN%%', GRAIN).replace('%%SHIP%%', SHIP).replace('%%HEADER_MARK%%', HEADER_MARK)
        .replace('%%BRIDGE_UP%%', BRIDGE_UP).replace('%%MAP%%', MAP)
        .replace('%%FRANK_IMG%%', FRANK_IMG).replace('%%MATT_IMG%%', MATT_IMG)
        .replace('%%SHIP_BAR%%', ship(0, 0, .42, 'ship bar-ship'))
        .replace('%%SHIP_MINI%%', ship(0, 0, .42, 'ship bar-ship'))
        .replace('%%SHIP_ROUTE%%', ship(30, 100, .7, 'ship route-ship'))
        .replace('%%SHIP_TY%%', ship(130, 96, .8, 'ship ty-ship')))
assert '%%' not in html, 'unfilled placeholder'
assert chr(0x2014) not in html, 'em-dash found'
OUT.write_text(html)
print('Saved', OUT, len(html), 'bytes')
