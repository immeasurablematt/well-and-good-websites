# Rebrand the site with a new look, animations, and custom graphics

Status: waiting
Branch: claude/copy-optimization-skills-2xydff
Pull request: #61 (draft)
Updated: 2026-09-25 03:32 UTC by Claude cloud

## Goal
Matthew wants a more creative new look and feel for wellandgoodgrowth.ca: animations, custom graphics made in code (SVG, some of them moving), and a fresh visual identity. He wants to workshop the direction together before anything is built.

## Next step
Workshop phase, one question at a time (brainstorming approach: no site code changes until Matthew approves a written design). Questions 1 (how deep), 2 (mood), and 3 (pages first) are answered, see "Decisions". Question 4, the last one, has been asked: what survives in the redrawn logo. Options offered: (1) keep the lift bridge as the one symbol, drop the browser dots and cursor; (2) keep the bridge and the cursor, drop the dots; (3) keep all three, redrawn simpler; (4) start fresh with a new mark, no bridge. Recommended to him: 1 (the bridge is local and distinctive; the dots and cursor say "websites", which the new name moved past; a single-line bridge suits the crafted mood and can draw itself, with the deck rising as a quiet nod to Growth). Record his answer under "Decisions". Then show 2 or 3 visual directions as live preview pages on this branch (homepage hero and an AI automation page section, with real animated SVGs), get his pick, write the design to `docs/specs/2026-09-25-rebrand-design.md`, get his approval, and only then build the pilot.

## Done so far
- Reviewed the current production site (built from `scripts/build_growth.py` and `site-growth/`), the brand crest (`assets/wgw-logo-primary.png`), and the bridge motion piece in `motion/bridge-magic/`.
- At Matthew's request, updated `CLAUDE.md` to the current name: Well and Good Growth at www.wellandgoodgrowth.ca (confirmed in the production build). It notes the old name so tools don't rename older files. Other sessions only see this once PR #61 merges.

## Waiting on Matthew
- Answer to workshop question 4: what survives in the redrawn logo (options 1 to 4).

## Decisions
- How deep (2026-09-25, option 2): keep the name Well and Good Growth, redraw the logo too, and reinvent the look, animations, and custom graphics. Which parts of the current crest survive the redraw is still an open question.
- Mood (2026-09-25, option 1 plus diagrams): warm and crafted as the base (editorial serif type, paper-and-ink feel, line illustrations that draw themselves as you scroll), with animated system diagrams on the service pages (a search becomes a visit, then a booking, then an automated follow-up).
- Pages first (2026-09-25, option 2): pilot the new look on the homepage plus the AI automation page, then roll it out to the rest of the site.

## Notes for the next tool
- Current look: forest green, cream, and coral; Fraunces headings and Inter body text; a repeating bridge pattern behind the hero; one fade-in animation. Tokens are at the top of `site-growth/style.css`.
- Brand assets: the circular crest shows the Welland lift bridge over water, three "browser window" dots, and an orange clicking cursor. Colours in the crest: forest #17463d, orange #fa7042, olive #7b7d48, aqua #9cc8c8, cream #fffaf2. Details: a double ring (forest outside, olive inside), the bridge drawn as two lattice towers and a truss span in olive, two aqua wave lines, the three dots top left, the cursor with click lines top right. The wordmark under it is "Well and Good" in a heavy serif with "and" in orange italic and an underline swoosh, then "WEBSITES" in spaced capitals between olive rules. That descriptor is out of date: the redraw must read Well and Good Growth.
- The site brand is "Well and Good Growth" (domain wellandgoodgrowth.ca). Copy rules in `CLAUDE.md` still apply to any new text (no em dashes, no invented proof, mention Claude with ChatGPT).
- Production copy and the founder bio are approved. This workstream is about visuals and motion; do not rewrite copy unless Matthew asks.
- Merging to `main` publishes the site. Build previews on this branch only.
