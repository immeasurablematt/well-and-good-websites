# Well and Good Growth rebrand: design

- Status: draft, waiting for Matthew's sign-off
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
| marigold text | #9a5a00 | Accent text on paper: headline emphasis, labels, "and" |
| water | #93a2dc | Water in illustrations |
| soft | ink 80% on paper (#475184) | Body text |
| rule | ink 20% on paper | Dividers |
| earth, wall | ink 12% and 6% on paper | Illustration grounds |

Contrast on paper: ink 11.5:1, body text 6.6:1, marigold text 4.8:1 (meets WCAG AA for normal text), paper on an indigo button 11.5:1. Bright marigold on paper is 1.8:1, which is why it is reserved for shapes. The site stays a single light theme: the brand commits to paper.

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
- **Header mark:** static.
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

1. **Homepage animation.** Replace the bridge video with the drawn bridge animation (recommended: lighter, sharper at any size, and it matches the new logo), or keep a video?
2. **AI automation page.** Put the lock drawing in its own section below the hero and keep the task picker (recommended), or replace the picker?
3. **Rollout.** The new colours, fonts, and logo change every page at once. Launch that way, with the new drawings on the two pilot pages first (recommended)?

## Not in scope

Copy changes, new pages, illustrations for the other pages, and domain or email changes.
