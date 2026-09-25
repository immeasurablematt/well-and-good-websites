#!/usr/bin/env python3
"""Build the Well and Good Growth rebrand directions preview (artifact HTML).

Bridge geometry comes from motion/bridge-magic/src/paths.json so every
direction draws the same traced Welland lift bridge.
"""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
SRC = HERE.parents[1] / 'motion' / 'bridge-magic' / 'src' / 'paths.json'
OUT = HERE / 'well-and-good-growth-rebrand.html'

raw = json.loads(SRC.read_text())


def fmt(n):
    return f"{n:.1f}".rstrip('0').rstrip('.')


def to_d(subpaths, step=1):
    out = []
    for sp in subpaths:
        segs = sp
        if step > 1 and len(sp) > 8:
            segs = [sp[0]] + sp[1:-1][::step] + [sp[-1]]
        for seg in segs:
            out.append(seg[0] + ' '.join(fmt(n) for n in seg[1:]))
    return ' '.join(out)


LEFT = to_d(raw['left'])
RIGHT = to_d(raw['right'])
SPAN = to_d(raw['span'])
WATER = to_d(raw['water'], step=4)
# Simplified mark: tower outline, cap and one zigzag each; arch, deck and verticals; one water line.
MARK_D = to_d(raw['left'][:3] + raw['right'][:3] + raw['span'][:3])
MARK_WATER = to_d(raw['water'][:1], step=4)


def hero_paths(width, water_style, delay=0.0, cls='b-ink'):
    """Full-detail bridge with draw classes and a lifting span group."""
    d = delay
    return (
        f'<g class="{cls}" style="stroke-width:{width}">'
        f'<path class="ln draw" pathLength="1" style="--d:{d:.2f}s;--t:1.3s" d="{LEFT}"/>'
        f'<path class="ln draw" pathLength="1" style="--d:{d + .2:.2f}s;--t:1.3s" d="{RIGHT}"/>'
        f'<g class="span-lift"><path class="ln draw" pathLength="1" style="--d:{d + .8:.2f}s;--t:1.4s" d="{SPAN}"/></g>'
        f'</g>'
        + (f'<path class="ln draw" pathLength="1" style="--d:{d + 1.5:.2f}s;--t:1.2s;{water_style}" d="{WATER}"/>' if water_style else '')
    )


# ---------------------------------------------------------------- marks
A_VB, A_AR = '315 265 600 600', 1.0
B_VB, B_AR = '366 395 498 335', 498 / 335
C_VB, C_AR = '331 360 568 405', 568 / 405

SYMBOLS = f'''<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<symbol id="mk-a" viewBox="{A_VB}"><g class="ln" style="stroke:var(--ink);stroke-width:var(--mw)"><circle cx="615" cy="565" r="282"/><path d="{MARK_D}"/></g><path class="ln" style="stroke:var(--water);stroke-width:var(--mw)" d="{MARK_WATER}"/></symbol>
<symbol id="mk-b" viewBox="{B_VB}"><g class="ln" transform="translate(9 7)" style="stroke:var(--accent);stroke-width:var(--mw);opacity:var(--echo,.9);mix-blend-mode:multiply"><path d="{MARK_D}"/></g><path class="ln" style="stroke:var(--ink);stroke-width:var(--mw)" d="{MARK_D}"/><path class="ln" style="stroke:var(--accent);stroke-width:var(--mw)" d="{MARK_WATER}"/></symbol>
<symbol id="mk-c" viewBox="{C_VB}"><rect x="345" y="383" width="540" height="358" class="ln" style="stroke:var(--ink);stroke-width:calc(var(--mw) * .55)"/><path class="ln" style="stroke:var(--ink);stroke-width:var(--mw)" d="{MARK_D}"/><path class="ln" style="stroke:var(--water);stroke-width:var(--mw)" d="{MARK_WATER}"/></symbol>
</svg>'''


def use(letter, h, mw, ar, echo=None):
    w = round(h * ar)
    extra = f';--echo:{echo}' if echo is not None else ''
    return (f'<svg width="{w}" height="{h}" style="--mw:{mw}{extra}" aria-hidden="true" focusable="false">'
            f'<use href="#mk-{letter}" width="100%" height="100%"/></svg>')


def sizes(letter, ar, mws, echo_small=False):
    cells = []
    for h, mw in zip((56, 32, 18), mws):
        echo = 0 if (echo_small and h <= 32) else None
        cells.append(f'<span>{use(letter, h, mw, ar, echo)}{h} px</span>')
    return '<div class="sizes" aria-label="The mark at small sizes">' + ''.join(cells) + '</div>'


MARK_A = (f'<svg class="mark" viewBox="{A_VB}" role="img" aria-label="Direction A mark: the lift bridge inside a fine ring">'
          f'<circle class="ln draw" pathLength="1" style="--t:1.2s;stroke:var(--ink);stroke-width:5" cx="615" cy="565" r="282"/>'
          f'<path class="ln draw" pathLength="1" style="--d:.3s;--t:1.5s;stroke:var(--ink);stroke-width:6.5" d="{MARK_D}"/>'
          f'<path class="ln draw" pathLength="1" style="--d:1.1s;--t:1s;stroke:var(--water);stroke-width:6.5" d="{MARK_WATER}"/></svg>')
MARK_B = (f'<svg class="mark" viewBox="{B_VB}" role="img" aria-label="Direction B mark: the lift bridge printed in forest and coral">'
          f'<g transform="translate(9 7)" style="mix-blend-mode:multiply;opacity:.9"><path class="ln draw" pathLength="1" style="--d:.15s;--t:1.5s;stroke:var(--accent);stroke-width:11" d="{MARK_D}"/></g>'
          f'<path class="ln draw" pathLength="1" style="--t:1.5s;stroke:var(--ink);stroke-width:11" d="{MARK_D}"/>'
          f'<path class="ln draw" pathLength="1" style="--d:1s;--t:1s;stroke:var(--accent);stroke-width:11" d="{MARK_WATER}"/></svg>')
MARK_C = (f'<svg class="mark" viewBox="{C_VB}" role="img" aria-label="Direction C mark: the lift bridge in a drawing frame">'
          f'<rect class="ln draw" pathLength="1" style="--t:1s;stroke:var(--ink);stroke-width:3.5" x="345" y="383" width="540" height="358"/>'
          f'<path class="ln draw" pathLength="1" style="--d:.3s;--t:1.5s;stroke:var(--ink);stroke-width:6" d="{MARK_D}"/>'
          f'<path class="ln draw" pathLength="1" style="--d:1.1s;--t:1s;stroke:var(--water);stroke-width:6" d="{MARK_WATER}"/></svg>')

# ---------------------------------------------------------------- heroes
HERO_A = (f'<svg viewBox="366 380 498 352" role="img" aria-label="The Welland lift bridge drawn in a fine ink line">'
          + hero_paths(2.6, 'stroke:var(--water);stroke-width:2.6') + '</svg>')

HERO_B = ('<svg viewBox="366 380 510 360" role="img" aria-label="The Welland lift bridge printed in two inks">'
          '<g transform="translate(6 5)" style="mix-blend-mode:multiply;opacity:.9">'
          + hero_paths(7, None, delay=.15, cls='b-accent') + '</g>'
          + f'<path class="ln draw" pathLength="1" style="--d:1.5s;--t:1.2s;stroke:var(--accent);stroke-width:7" d="{WATER}"/>'
          + hero_paths(7, None) + '</svg>')

HERO_C = ('<svg viewBox="356 376 552 360" role="img" aria-label="An elevation drawing of the Welland lift bridge with construction lines">'
          '<g class="construct fade"><line x1="360" y1="654" x2="890" y2="654"/><line x1="413" y1="394" x2="413" y2="728"/><line x1="816" y1="394" x2="816" y2="728"/></g>'
          '<text class="cl fade" x="413" y="389" text-anchor="middle">CL</text><text class="cl fade" x="816" y="389" text-anchor="middle">CL</text>'
          + hero_paths(2.2, 'stroke:var(--water);stroke-width:2.2')
          + '<g class="dim"><line x1="852" y1="587" x2="886" y2="587"/><line x1="852" y1="549" x2="886" y2="549"/>'
            '<line x1="876" y1="553" x2="876" y2="583"/><path d="M872 558 L876 551 L880 558 M872 578 L876 585 L880 578"/>'
            '<text x="897" y="568" transform="rotate(-90 897 568)" text-anchor="middle">LIFT</text></g>'
          + '</svg>')

# ---------------------------------------------------------------- diagrams
DIAG_A = '''<svg viewBox="0 0 360 540" role="img" aria-label="A line runs through five steps: a new enquiry arrives, research prepared, follow-up drafted, you review, then sent and records updated.">
<path class="route" pathLength="1" d="M70 50 C130 85 10 125 70 160 C130 195 10 235 70 270 C130 305 10 345 70 380 C130 415 10 455 70 490"/>
<g class="stn reached" data-x="70" data-y="50"><circle cx="70" cy="50" r="8"/><text class="main" x="104" y="56">A new enquiry arrives</text></g>
<g class="stn reached" data-x="70" data-y="160"><circle cx="70" cy="160" r="8"/><text class="main" x="104" y="166">Research prepared</text></g>
<g class="stn reached" data-x="70" data-y="270"><circle cx="70" cy="270" r="8"/><text class="main" x="104" y="276">Follow-up drafted</text></g>
<g class="stn reached ok" data-x="70" data-y="380"><circle cx="70" cy="380" r="8"/><text class="main" x="104" y="386">You review</text><text class="sub" x="104" y="406">your checkpoint</text><path class="tick" pathLength="1" d="M200 377 l7 8 l15 -17"/></g>
<g class="stn reached" data-x="70" data-y="490"><circle cx="70" cy="490" r="8"/><text class="main" x="104" y="496">Sent, and records updated</text></g>
<circle class="dot" cx="70" cy="490" r="6.5"/>
</svg>'''

labels_b = [('A new enquiry', 'arrives'), ('Research', 'prepared'), ('Follow-up', 'drafted'),
            ('You review', 'the lock gate'), ('Sent, and', 'records updated')]
chambers = []
for i, (l1, l2) in enumerate(labels_b):
    x0, floor, w = 14 + i * 22, 528 - i * 100, 118
    top, level = floor - 60, floor - 36
    lx = x0 + w + 16
    ok = ' ok' if i == 3 else ''
    tick = f'<path class="tick" pathLength="1" d="M{lx + 102} {level - 9} l6 7 l13 -15"/>' if i == 3 else ''
    chambers.append(
        f'<g class="chamber{ok}" data-bx="{x0 + w / 2:g}" data-by="{level}">'
        f'<rect class="water" x="{x0 + 4}" y="{level}" width="{w - 8}" height="{floor - level - 3}"/>'
        f'<path class="wall" d="M{x0} {top} V{floor} H{x0 + w} V{top}"/>'
        f'<g class="lbl on"><text class="num" x="{lx}" y="{level - 2}">{i + 1}</text>'
        f'<text class="main" x="{lx + 20}" y="{level - 2}">{l1}</text>'
        f'<text class="sub" x="{lx + 20}" y="{level + 16}">{l2}</text>{tick}</g></g>')
bx4, by4 = 14 + 4 * 22 + 59, 528 - 400 - 36
DIAG_B = ('<svg viewBox="0 0 380 560" role="img" aria-label="A boat rises through five canal locks: a new enquiry arrives, research prepared, follow-up drafted, you review at the lock gate, then sent and records updated.">'
          + ''.join(chambers)
          + '<rect class="gate" x="78" y="165" width="122" height="6" style="transform:translateX(-76px)"/>'
          + f'<g class="boat" transform="translate({bx4} {by4})"><rect class="cabin" x="-10" y="-13" width="16" height="10"/><path class="hull" d="M-22 -3 H22 L15 8 H-15 Z"/></g>'
          + '</svg>')

labels_c = ['NEW ENQUIRY ARRIVES', 'RESEARCH PREPARED', 'FOLLOW-UP DRAFTED', 'YOU REVIEW', 'SENT, RECORDS UPDATED']
ys_c = [48, 138, 228, 318, 408]
c_parts = []
for i, (lbl, y) in enumerate(zip(labels_c, ys_c)):
    c_parts.append(
        f'<g class="balloon reached" data-y="{y}"><circle cx="64" cy="{y}" r="15"/><text x="64" y="{y + 5}">{i + 1}</text></g>'
        f'<line class="leader" x1="79" y1="{y}" x2="104" y2="{y}"/><text class="clbl" x="112" y="{y + 5}">{lbl}</text>')
DIAG_C = ('<svg viewBox="0 0 380 560" role="img" aria-label="An engineering-style drawing of five numbered steps: new enquiry arrives, research prepared, follow-up drafted, you review at a hold point, then sent and records updated.">'
          '<line class="cline" pathLength="1" x1="64" y1="18" x2="64" y2="440"/>'
          + ''.join(c_parts)
          + '<g transform="rotate(-3 186 348)"><g class="stamp"><rect x="112" y="333" width="148" height="30"/><text x="186" y="353" text-anchor="middle">HOLD POINT</text></g></g>'
          + '<path class="tick" pathLength="1" d="M216 310 l6 7 l13 -15"/>'
          + '<circle class="marker" r="21" transform="translate(64 408)"/>'
          + '<g class="tblock"><rect x="140" y="470" width="232" height="78"/>'
            '<line x1="140" y1="490" x2="372" y2="490"/><line x1="140" y1="509" x2="372" y2="509"/><line x1="140" y1="528" x2="372" y2="528"/><line x1="262" y1="509" x2="262" y2="548"/>'
            '<text class="big" x="148" y="484">WELL AND GOOD GROWTH</text>'
            '<text x="148" y="503">DWG: AI FOLLOW-UP WORKFLOW</text>'
            '<text x="148" y="522">SCALE: NTS</text><text x="270" y="522">SHEET 2 OF 2</text>'
            '<text x="148" y="541">DRAWN: M. BAGGETTA</text><text x="270" y="541">WELLAND, ON</text></g>'
          + '</svg>')

GRAIN = ("url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E"
         "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E"
         "%3CfeColorMatrix values='0 0 0 0 .25 0 0 0 0 .2 0 0 0 0 .14 0 0 0 .9 -.25'/%3E%3C/filter%3E"
         "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")")

HOME_H = 'Running your business shouldn’t mean <em>doing everything yourself.</em>'
HOME_P = ('Free up your time with AI automation, and turn more interest into enquiries with a website and marketing '
          'built around your customers. Put a decade of marketing experience and today’s technology to work for your business.')
AUTO_P = ('Spend less time preparing research, drafting follow-ups, and updating records. '
          'Get AI workflows built around your business, with clear points for review.')


def site_bar(letter, ar, mw, echo=None):
    return (f'<div class="site-bar" aria-hidden="true"><span class="mini">{use(letter, 30, mw, ar, echo)}'
            f'<span>Well <i>and</i> Good Growth</span></span>'
            '<span class="links"><span>Websites</span><span>Growth marketing</span><span>AI automation</span><span>Meet Matt</span></span>'
            '<span class="pill">Contact</span></div>')


def sheet(letter, mark, wordmark_extra, sizes_html, bar, hero, hero_extra, diagram, caption):
    return f'''<div class="sheet sheet-{letter}">
<div class="part anim" data-part="mark"><p class="part-tag">The mark</p>
<div class="lockup">{mark}<div><p class="wordmark">Well <i>and</i> Good Growth</p>{wordmark_extra}</div></div>{sizes_html}</div>
<div class="part"><p class="part-tag">Homepage</p>{bar}
<div class="hero"><div class="copy"><h3 class="hl">{HOME_H}</h3><p>{HOME_P}</p><span class="btn">Choose a service <span aria-hidden="true">↗</span></span></div>
<div class="art anim" data-part="hero">{hero}{hero_extra}</div></div></div>
<div class="part"><p class="part-tag">AI automation page</p>
<div class="auto-grid"><div class="copy"><p class="eyebrow">AI automation · Niagara &amp; GTA</p><h3 class="hl">Get the recurring work off your list.</h3><p>{AUTO_P}</p></div>
<figure class="diagram anim" data-part="diagram" data-kind="{letter}">{diagram}<figcaption><span>Illustrative example.</span> {caption}</figcaption></figure></div></div>
</div>'''


SHEET_A = sheet('a', MARK_A, '', sizes('a', A_AR, (18, 30, 46)), site_bar('a', A_AR, 30), HERO_A, '', DIAG_A,
                'The line stops where you review, then carries on.')
SHEET_B = sheet('b', MARK_B, '', sizes('b', B_AR, (16, 24, 34), echo_small=True), site_bar('b', B_AR, 24, 0), HERO_B, '', DIAG_B,
                'Each lock lifts the job one step. Yours is the gate, and it opens when you have checked the work.')
SHEET_C = sheet('c', MARK_C, '<p class="place">Welland, Ontario</p>', sizes('c', C_AR, (12, 20, 32)), site_bar('c', C_AR, 20), HERO_C,
                '<p class="elev">Elevation · not to scale</p>', DIAG_C,
                'A hold point is where the work stops until it is checked. Here, that is you.')

template = (HERE / 'preview_template.html').read_text()
html = (template.replace('%%SYMBOLS%%', SYMBOLS).replace('%%GRAIN%%', GRAIN)
        .replace('%%SHEET_A%%', SHEET_A).replace('%%SHEET_B%%', SHEET_B).replace('%%SHEET_C%%', SHEET_C))
assert '%%' not in html, 'unfilled placeholder'
assert chr(0x2014) not in html, 'em-dash found'
OUT.write_text(html)
print('Saved', OUT, len(html), 'bytes')
