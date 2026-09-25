# Rebrand the site with a new look, animations, and custom graphics

Status: waiting
Branch: claude/copy-optimization-skills-2xydff
Pull request: #61 (draft)
Updated: 2026-09-25 03:29 UTC by Claude cloud

## Goal
Matthew wants a more creative new look and feel for wellandgoodgrowth.ca: animations, custom graphics made in code (SVG, some of them moving), and a fresh visual identity. He wants to workshop the direction together before anything is built.

## Next step
Workshop phase, one question at a time (brainstorming approach: no site code changes until Matthew approves a written design). Question 1 (how deep) is answered, see "Decisions". Question 2 has been asked: mood and personality. Options offered: (1) warm and crafted: editorial serif type, paper-and-ink feel, line illustrations that draw themselves as you scroll; (2) precise and systems-minded: clean geometry, tighter grid, animated diagrams of a search turning into a visit, a booking, and an automated follow-up; (3) bright and playful local: bolder colour, illustrated Niagara landmarks with character, bouncy small animations. Recommended to him: 1 as the base, with the animated diagrams from 2 on the service pages. Record his answer under "Decisions", then ask the next questions one at a time: which pages come first, then what must survive in the redrawn logo (the lift bridge, the cursor, the browser dots). After the questions, show 2 or 3 visual directions as live preview pages with real animated SVGs, get his pick, write the design to `docs/specs/2026-09-25-rebrand-design.md`, and only then build.

## Done so far
- Reviewed the current production site (built from `scripts/build_growth.py` and `site-growth/`), the brand crest (`assets/wgw-logo-primary.png`), and the bridge motion piece in `motion/bridge-magic/`.

## Waiting on Matthew
- Answer to workshop question 2: mood and personality (options 1, 2, 3, or a mix).

## Decisions
- How deep (2026-09-25, option 2): keep the name Well and Good Growth, redraw the logo too, and reinvent the look, animations, and custom graphics. Which parts of the current crest survive the redraw is still an open question.

## Notes for the next tool
- Current look: forest green, cream, and coral; Fraunces headings and Inter body text; a repeating bridge pattern behind the hero; one fade-in animation. Tokens are at the top of `site-growth/style.css`.
- Brand assets: the circular crest shows the Welland lift bridge over water, three "browser window" dots, and an orange clicking cursor. Colours in the crest: forest #17463d, orange #fa7042, olive #7b7d48, aqua #9cc8c8, cream #fffaf2.
- The site brand is "Well and Good Growth" (domain wellandgoodgrowth.ca). Copy rules in `CLAUDE.md` still apply to any new text (no em dashes, no invented proof, mention Claude with ChatGPT).
- Production copy and the founder bio are approved. This workstream is about visuals and motion; do not rewrite copy unless Matthew asks.
- Merging to `main` publishes the site. Build previews on this branch only.
