# Well and Good Growth rebrand: design

- Status: approved 2026-09-25 and built on the preview branch (pull request #61), waiting for Matthew to review the preview
- Date: 2026-09-25
- Workstream: `handoffs/rebrand-look-and-feel.md` (pull request #61)
- Preview: https://claude.ai/artifact/DHDY3gazersy8Q374mdtVs (private to Matthew's account). Source: `design/rebrand-preview/`

## Summary

The name stays **Well and Good Growth**. The new identity is the "Canal lock" direction: a two-ink print look, indigo and marigold on warm paper, built around a redrawn Welland lift bridge. The AI automation page gets an animated flight of canal locks that explains the service in one picture: the routine steps run themselves, and the job only moves past the fourth gate once Matthew has reviewed it.

## Decisions from the workshop

| Question | Answer |
|---|---|
| How deep | Keep the name, redraw the logo, reinvent the look, motion, and graphics |
| Mood | Warm and crafted, with animated system diagrams on service pages |
| Pages first | Homepage and the AI automation page |
| Logo | The Welland lift bridge is the only symbol. The browser dots and cursor are gone |
| Direction | B, Canal lock (two-ink print, Besley and Libre Franklin, paper grain) |
| Palette | Lake & Marigold |
| Bridge | Both towers identical, whole bridge symmetric |
| Lock drawing | Approved after round four: water behaves like water, every gate taller than the water it holds |

## 1. Logo

- **Mark:** the symmetric lift bridge (two identical lattice towers, an arched truss span, one water line). It is drawn from measurements in `design/rebrand-preview/build_preview.py`: tower centres at x 413 and 816, span from x 449 to 780, deck at y 587, arch peak at y 492. The logo uses a simplified bridge (one zigzag per tower, no span diagonals) so it stays clear at small sizes. Illustrations use the full lattice.
- **Two inks:** the mark prints in indigo with a marigold copy offset by (9, 7) underneath, blended with multiply, like a slightly misregistered print. The marigold copy is dropped at 32 px and below.
- **Wordmark:** "Well and Good Growth" in Besley ExtraBold (800), with "and" in Besley italic 600 in text marigold (#9a5a00). The name always appears in full. "Growth" is never set as a smaller descriptor.
- **Lockups:** horizontal (mark left, wordmark right) for the header and footer. The mark alone for the favicon and social avatars.
- **Files to produce:** `site-growth/assets/logo-mark.svg`, `logo-lockup.svg`, `favicon.svg`, plus `favicon-32.png`, `apple-touch-icon.png` (180 px), and a 1200 by 630 social image.
- **Retired:** the crest PNGs (`assets/wgw-logo-*.png`) and the bridge video poster used as the header emblem.

## 2. Colour: Lake & Marigold

| Token | Value | Use |
|---|---|---|
| paper | #f3efe6 | Page background |
| ink | #1c2a6b | Text, lines, structure |
| marigold | #f0a30a | Fills, the print echo, button shadow, the review gate. Never text on paper |
| marigold text | #8c5100 on the site (#9a5a00 in the logo files) | Accent text on paper: headline emphasis, labels, "and" |
| water | #93a2dc | Water in illustrations |
| soft | ink 80% on paper (#475184) | Body text |
| rule | ink 20% on paper | Dividers |
| earth, wall | ink 12% and 6% on paper | Illustration grounds |

Contrast on paper: ink 11.5:1, body text 6.6:1, marigold text 4.6:1 or better on the grained paper (meets WCAG AA for normal text; the first value, #9a5a00, measured about 4.2:1 once the grain was added, so the site uses #8c5100), paper on an indigo button 11.5:1. Bright marigold on paper is 1.8:1, which is why it is reserved for shapes. The site stays a single light theme: the brand commits to paper.

## 3. Type

- **Besley** for headings and the wordmark (700, 800, italic 600).
- **Libre Franklin** for body text and interface (400 to 700).
- Both are under the SIL Open Font License. Self-host the woff2 files in `site-growth/fonts/` with their licence files, replacing Fraunces and Inter.
- Headlines: letter spacing -0.012em. Section labels: uppercase, 0.14em tracking, marigold text.

## 4. Texture and components

- **Paper grain:** a fine noise overlay (SVG fractal noise, multiply, 30% opacity) on the page background.
- **Primary button:** solid indigo, paper text, a 4 px marigold offset shadow (the print echo), 2 px corners.
- **Header and footer:** the new horizontal lockup. Navigation items stay as they are.
- **Rules and labels:** thin rules at ink 20%, section labels in marigold text.

## 5. Motion

- **Homepage hero:** the bridge draws itself in both inks, then the span lifts and settles back, once, the first time it is on screen. This replaces the six-second video ident (see open question 1).
- **Header mark:** static at rest; the span lifts on hover, focus, or tap (section 8, piece 3).
- **AI automation page:** the canal lock animation, described below.
- **Reduced motion:** every animation shows its finished state instead, and nothing loops.

## 6. The canal lock (AI automation page)

**Steps.** Five locks, one per step: 1 A new enquiry arrives. 2 Research prepared. 3 Follow-up drafted. 4 You review (Matthew's gate). 5 Sent, and records updated.

**What happens.**
- A Great Lakes freighter waits in lock 1. The chamber fills through the sluices at its upper gate: fast at first, slowing as the levels meet. The surface churns near the inflow and bubbles rise.
- The upper gate lifts with a small overshoot and drips. The freighter moves into the next lock, bobbing and leaving a wake. The gate drops behind it with a small splash, and the chamber drains, leaving a wet mark on the wall that fades.
- At gate 4 the job waits. The gate pulses, a ring fills around the review badge, the tick lands, and only then does the gate open.

**Geometry rules.**
- Each chamber fills to the next chamber's resting level.
- Every gate reaches the top of the higher chamber's wall, at least 12 units above the highest water on either side. The build asserts this, so water can never rise above a gate.
- Closed end gates sit at both ends of the flight.

**Layout.** The step labels are an HTML list under the drawing, not text inside it. On wide screens each label sits under its lock. On phones they stack. Caption: "Illustrative example. Each lock lifts the job one step while the routine work runs itself. The fourth gate is yours: it stays shut until you have checked the work."

**Performance.** The simulation runs only while the drawing is on screen and pauses when the tab is hidden.

**Placement.** A section of its own below the hero. The "I need a hand with…" task picker stays in the hero (see open question 2).

## 7. Rollout

- The site shares one stylesheet, so colour, type, header, footer, and buttons change on every page at once. The pilot therefore means the new system site-wide, with the new artwork (bridge hero and canal lock) on the homepage and AI automation page. Other pages get the new look without new illustrations, and their artwork follows in a later round.
- All approved copy stays unchanged.
- Nothing is published until Matthew merges pull request #61. Review on the Vercel preview first, on phone and desktop.
- `motion/bridge-magic/` stays in the repository, but its video is no longer used on the homepage.

**Build order (for the implementing tool).**
1. Fonts and colour tokens in `site-growth/style.css`, replacing the "Restore the original Well and Good brand" block.
2. Logo SVGs, favicon, touch icon, and social image.
3. Header and footer markup in `scripts/build_growth.py`.
4. Homepage hero: inline bridge SVG and its animation in `site-growth/site.js`.
5. AI automation page (`services/automation/index.html`): the lock section and its script, ported from `design/rebrand-preview/`.
6. Run `python3 scripts/build_public.py` and `python3 scripts/validate_growth.py`.
7. Check the Vercel preview on phone and desktop, with and without reduced motion.
8. Sweep for em-dashes in every changed file.

## Open questions for Matthew

1. **Homepage animation.** Answered 2026-09-25: yes, replace the bridge video with the drawn bridge animation.
2. **AI automation page.** Answered 2026-09-25: yes, the lock drawing gets its own section below the hero and the task picker stays.
3. **Rollout.** Answered 2026-09-25: Matthew approved all 17 pieces of the motion catalogue (section 8) and asked for the whole site to be rebuilt on the preview branch. Nothing goes live until he merges pull request #61.

## 8. Motion layer (approved 2026-09-25, all 17 pieces)

Reference implementations for every piece are in `design/rebrand-preview/catalogue_template.html` (demo sections `#m1` to `#m17`, CSS and JS in the same file) and `build_catalogue.py` (the SVG for the ship, header mark, bridge up, and map). The lock simulation's reference is `design/rebrand-preview/preview_template.html`.

| # | Piece | Where on the site | Trigger |
|---|---|---|---|
| 1 | Headlines print in: marigold copy slides into register under the indigo | Every H1 on load, section H2s when they enter the screen | Load, scroll |
| 2 | Letterpress buttons: the marigold shadow closes on hover, the button presses in on click | Every `.button` | Hover, press |
| 3 | Header bridge span lifts | Header and footer logo | Hover, focus, tap |
| 4 | Ink underline draws under text links | `.text-link` and links in paragraphs | Hover, focus |
| 5 | Canal reading bar: a thin water line with a freighter at the top edge | Every page | Scroll |
| 6 | Enquiry form: fields draw an ink line on focus, a freighter casts off on send | Dialog form and contact page | Focus, submit |
| 7 | FAQ icons are lift gates that rise when a question opens | Every FAQ | Click |
| 8 | Process step numbers fill like lock chambers in turn | Every `.process-list` | Scroll |
| 9 | Launch, Grow, Dominate as three rising water levels | Every pricing section | Scroll |
| 10 | Real results fill water columns and count up | Growth marketing case results, Frank's case stats | Scroll |
| 11 | Portfolio screenshots glide and tilt toward the pointer | Every portfolio grid | Hover, pointer |
| 12 | Founder photo develops from an indigo and marigold duotone to colour | Founder section | Scroll, hover |
| 13 | Service drawings draw themselves | Homepage services list | Scroll, hover |
| 14 | Boat journey: Find you, See the fit, Get in touch | Growth marketing and Niagara SEO heroes (replaces `.growth-art`) | Scroll |
| 15 | Welland Canal map with the page's town pinned | Niagara, Welland, and St. Catharines website design pages | Scroll, click |
| 16 | Bridge up: sign, lamps, and barrier lower when you reach for Back to home | 404 page | Hover, focus, tap |
| 17 | A freighter passes through a last lock | Thank-you page | Load |

Also built in this round, from sections 5 and 6: the homepage hero bridge (draws, then the span lifts, replacing the video) and the AI automation lock section.

**Rules for every piece.**
- Content is complete at rest. Nothing sits at opacity 0 waiting for a script. Animations start from a visible state or add detail to one.
- Reduced motion (`prefers-reduced-motion: reduce`) shows the finished state immediately and nothing loops.
- Every hover effect has a focus and a tap equivalent, or is purely decorative.
- Loops (`requestAnimationFrame`) run only while their element is on screen and the tab is visible.
- No libraries. No layout shift. No blocking of reading, navigation, or sending an enquiry: the send animation never delays the form by more than it takes to submit.
- Real data only. Numbers come from the approved copy (SeamlessFi 1,412 to 3,871 views per post; io.net 5,097 to 27,022 estimated monthly visits; Frank nearly 3 times the organic traffic from Google).
- Decorative SVG is `aria-hidden="true"`. SVG that carries meaning has `role="img"` and an `aria-label`.

**Code layout.**
- `site-growth/style.css` holds tokens, type, and components. Each piece adds its own partials in `site-growth/motion/`, named `NN-name.css` and `NN-name.js` (NN is the piece number, `00` for shared helpers, `20` and up for the hero bridge and the lock). The build concatenates `style.css` plus the CSS partials in name order into the one hashed stylesheet, and `site.js` plus the JS partials into the one hashed script.
- `site-growth/motion/00-core.js` defines `window.WG`: `reduce` (reduced motion flag), `onceInView(el, fn, threshold)`, `whileVisible(el, start, stop)`, `tween(ms, fn, ease)`, `ease` (out, inOut, backOut), `wait(ms)`.
- Shared drawing code lives in `scripts/growth_art.py` (bridge geometry, the ship symbol, the logo mark). The page shell includes one hidden SVG sprite with the ship symbol so any page can use it. Page artwork lives in its own modules (`scripts/art_showpieces.py` for the homepage, automation, 404, and thank-you pages; `scripts/art_local.py` for the journey, map, and results).

**New wording in this round.** Approved copy stays unchanged. The few new labels (for example the heading above the lock drawing, image descriptions, and the BRIDGE UP sign) are written in the house style and listed in pull request #61 for Matthew to check.

## Not in scope

Copy changes, new pages, illustrations for the other pages, and domain or email changes.
