#!/usr/bin/env python3
"""Make the Well and Good Growth logo files, icons, and social image.

Writes to site-growth/assets/:
  logo-mark.svg      the two-ink bridge mark
  logo-lockup.svg    mark plus wordmark, the wordmark outlined from Besley
  favicon.svg        the mark alone, no marigold echo, heavy strokes for 16 px
  favicon-32.png     favicon.svg at 32 px
  apple-touch-icon.png   180 px, paper background
  well-and-good-growth-social-20260925.png   1200 by 630 social image

The SVGs are written here. The PNGs are rendered from HTML by headless Chromium
through Node Playwright (scripts/render_brand_images.js), using the self-hosted
fonts in site-growth/fonts/, so Besley renders exactly as on the site.

Needs: pip install fonttools brotli uharfbuzz, and Node Playwright
(found through NODE_PATH, which this script sets from `npm root -g`).
Run: python3 scripts/make_brand_images.py
Keep this script em-dash free.
"""
import io
import json
import os
import pathlib
import subprocess
import tempfile

import growth_art as art

ROOT = pathlib.Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'site-growth' / 'assets'
FONTS = ROOT / 'site-growth' / 'fonts'
SOCIAL = 'well-and-good-growth-social-20260925.png'
C = art.PALETTE
NAME = 'Well and Good Growth'


def mark_group(stroke, echo=True):
    """The mark in hex colours for standalone files, in mark coordinates."""
    ex, ey = art.ECHO
    out = f'<g fill="none" stroke-width="{stroke}" stroke-linecap="round" stroke-linejoin="round">'
    if echo:
        out += (f'<path transform="translate({ex} {ey})" stroke="{C["accent"]}" opacity=".9" '
                f'style="mix-blend-mode:multiply" d="{art.MARK_D}"/>')
    out += f'<path stroke="{C["ink"]}" d="{art.MARK_D}"/><path stroke="{C["water"]}" d="{art.MARK_WATER}"/></g>'
    return out


def svg_file(viewbox, body, title=NAME):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-labelledby="title">'
            f'<title id="title">{title}</title>{body}</svg>\n')


# ---------------------------------------------------------------- wordmark outlines
class PathPen:
    """Collects glyph outlines as SVG path data, scaled and flipped to page units."""

    def __init__(self, scale, x, y):
        self.d, self.scale, self.x, self.y = [], scale, x, y

    def p(self, pt):
        return f'{self.x + pt[0] * self.scale:.2f} {self.y - pt[1] * self.scale:.2f}'

    def moveTo(self, pt):
        self.d.append('M' + self.p(pt))

    def lineTo(self, pt):
        self.d.append('L' + self.p(pt))

    def qCurveTo(self, *pts):
        # TrueType implied on-curve points between consecutive off-curve points.
        *offs, end = pts
        for i, c in enumerate(offs):
            nxt = end if i == len(offs) - 1 else ((c[0] + offs[i + 1][0]) / 2, (c[1] + offs[i + 1][1]) / 2)
            self.d.append('Q' + self.p(c) + ' ' + self.p(nxt))

    def curveTo(self, *pts):
        self.d.append('C' + ' '.join(self.p(pt) for pt in pts))

    def closePath(self):
        self.d.append('Z')

    endPath = closePath


def load_font(path, wght=None):
    import uharfbuzz as hb
    from fontTools.ttLib import TTFont
    ttf = TTFont(path)
    ttf.flavor = None
    data = io.BytesIO()
    ttf.save(data)
    face = hb.Face(data.getvalue())
    font = hb.Font(face)
    if wght:
        font.set_variations({'wght': wght})
    return font, face.upem


def outline(runs, size, x, baseline, tracking=-0.015):
    """Shape runs of (text, font file, weight, colour) and return SVG paths and the end x."""
    import uharfbuzz as hb
    paths = []
    for text, file, wght, colour in runs:
        font, upem = load_font(FONTS / file, wght)
        scale = size / upem
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(font, buf, {'kern': True, 'liga': True})
        d = []
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            pen = PathPen(scale, x + pos.x_offset * scale, baseline - pos.y_offset * scale)
            font.draw_glyph_with_pen(info.codepoint, pen)
            d += pen.d
            x += pos.x_advance * scale + tracking * size
        if d:
            paths.append(f'<path fill="{colour}" d="{"".join(d)}"/>')
    return ''.join(paths), x


# ---------------------------------------------------------------- SVG files
def logo_mark():
    x, y, w, h = map(float, art.MARK_VB.split())
    pad = 12
    return svg_file(f'{x - pad:g} {y - pad:g} {w + 2 * pad:g} {h + 2 * pad:g}', mark_group(12))


def logo_lockup():
    # Mark coordinates throughout: the mark keeps its own viewBox units.
    x, y, w, h = map(float, art.MARK_VB.split())
    size = 134                      # wordmark size, as in the approved preview (mark 230 px wide, name 62 px)
    gap = 84
    cap = size * 1500 / 2000        # Besley cap height
    centre = 541                    # visual centre of the towers and water
    baseline = centre + cap / 2
    text_x = x + w + gap
    words, end = outline([('Well ', 'besley.woff2', 800, C['ink']),
                          ('and', 'besley-italic.woff2', None, C['accent-text']),
                          (' Good Growth', 'besley.woff2', 800, C['ink'])], size, text_x, baseline)
    pad = 12
    return svg_file(f'{x - pad:g} {y - pad:g} {end - x + 2 * pad:.0f} {h + 2 * pad:g}', mark_group(12) + words)


# The favicon crops close to the bridge so it fills the square at 16 px.
FAVICON_VB = '361 287 507 507'


def favicon():
    body = (f'<rect x="361" y="287" width="507" height="507" rx="88" fill="{C["paper"]}"/>'
            + mark_group(34, echo=False))
    return svg_file(FAVICON_VB, body)


# ---------------------------------------------------------------- PNG pages
FONT_FACE = f'''@font-face{{font-family:Besley;src:url("{(FONTS / 'besley.woff2').as_uri()}") format("woff2");font-weight:700 800}}
@font-face{{font-family:Besley;src:url("{(FONTS / 'besley-italic.woff2').as_uri()}") format("woff2");font-weight:600;font-style:italic}}
@font-face{{font-family:"Libre Franklin";src:url("{(FONTS / 'libre-franklin.woff2').as_uri()}") format("woff2");font-weight:400 700}}'''

# Paper with the grain at 30%, as on the site.
PAPER_BG = (f'background-color:{C["paper"]};'
            f'background-image:linear-gradient(rgb(243 239 230 / .7),rgb(243 239 230 / .7)),{art.GRAIN}')


def base(background=PAPER_BG):
    return (f'<!doctype html><meta charset="utf-8"><style>{FONT_FACE}'
            f':root{{--paper:{C["paper"]};--ink:{C["ink"]};--accent:{C["accent"]};--water:{C["water"]}}}'
            f'*{{margin:0;box-sizing:border-box}}html,body{{width:100%;height:100%;overflow:hidden}}'
            f'body{{{background};color:{C["ink"]};font-family:"Libre Franklin",sans-serif;-webkit-font-smoothing:antialiased}}</style>')


def inline_mark(width, stroke, echo=True):
    return (f'<svg viewBox="{art.MARK_VB}" width="{width}" style="display:block;overflow:visible">'
            + mark_group(stroke, echo) + '</svg>')


def icon_page(size):
    return (base() + f'<body style="display:grid;place-items:center">'
            f'<div style="width:{size * .84:.0f}px;transform:translate(-1.5%,-1%)">{inline_mark(size * .84, 16)}</div></body>')


def favicon_png_page():
    return (base('background:transparent') + '<body>'
            + (ASSETS / 'favicon.svg').read_text().replace('<svg ', '<svg width="32" height="32" style="display:block" ', 1)
            + '</body>')


def social_page():
    ship = (f'<svg viewBox="{art.SHIP_VB}" width="92" style="position:absolute;left:760px;bottom:61px;overflow:visible">'
            f'<use href="#ship" x="-36" y="-24" width="72" height="34"/></svg>')
    return (base() + f'<style>.wrap{{position:relative;height:100%;display:grid;justify-items:center;align-content:center;gap:0;text-align:center;padding-bottom:40px}}'
            f'.name{{font:800 84px/1 Besley,serif;letter-spacing:-.012em;margin-top:34px}}'
            f'.name i{{font-style:italic;font-weight:600;color:{C["accent-text"]}}}'
            f'.line{{font-size:31px;font-weight:500;color:{C["soft"]};margin-top:26px}}'
            f'.where{{font-size:19px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:{C["accent-text"]};margin-top:18px}}'
            f'.canal{{position:absolute;left:0;right:0;bottom:62px;height:4px;background:{C["water"]}}}'
            f'.bank{{position:absolute;left:0;right:0;bottom:0;height:62px;background:color-mix(in srgb,{C["ink"]} 6%,transparent);border-top:2px solid {C["ink"]}}}'
            f'</style><body>{art.SPRITE}<div class="wrap">'
            f'{inline_mark(330, 11)}'
            f'<p class="name">Well <i>and</i> Good Growth</p>'
            f'<p class="line">AI automation, websites and growth marketing</p>'
            f'<p class="where">Niagara and the GTA</p>'
            f'<div class="canal"></div><div class="bank"></div>{ship}</div></body>')


def main():
    files = {'logo-mark.svg': logo_mark(), 'favicon.svg': favicon(), 'logo-lockup.svg': logo_lockup()}
    for name, text in files.items():
        assert chr(0x2014) not in text
        (ASSETS / name).write_text(text)
        print('Saved', ASSETS / name)
    pages = [('favicon-32.png', favicon_png_page(), 32, 32),
             ('apple-touch-icon.png', icon_page(180), 180, 180),
             (SOCIAL, social_page(), 1200, 630)]
    with tempfile.TemporaryDirectory() as tmp:
        jobs = []
        for name, html, width, height in pages:
            assert chr(0x2014) not in html
            src = pathlib.Path(tmp) / (name + '.html')
            src.write_text(html)
            jobs.append({'html': str(src), 'out': str(ASSETS / name), 'width': width, 'height': height})
        job_file = pathlib.Path(tmp) / 'jobs.json'
        job_file.write_text(json.dumps(jobs))
        node_path = subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip()
        subprocess.run(['node', str(ROOT / 'scripts' / 'render_brand_images.js'), str(job_file)],
                       check=True, env={**os.environ, 'NODE_PATH': node_path})


if __name__ == '__main__':
    main()
