# Rebrand the site with a new look, animations, and custom graphics

Status: waiting
Branch: claude/copy-optimization-skills-2xydff
Pull request: #61 (draft)
Updated: 2026-09-25 03:31 UTC by Claude cloud

## Goal
Matthew wants a more creative new look and feel for wellandgoodgrowth.ca: animations, custom graphics made in code (SVG, some of them moving), and a fresh visual identity. He wants to workshop the direction together before anything is built.

## Next step
Workshop phase, one question at a time (brainstorming approach: no site code changes until Matthew approves a written design). Questions 1 (how deep) and 2 (mood) are answered, see "Decisions". Question 3 has been asked: which pages come first. Options offered: (1) homepage first, the rest follow its look later; (2) homepage plus the AI automation page as a pilot, so the warm look and a system diagram are proven together before rolling out; (3) the whole site in one go. Recommended to him: 2. Record his answer under "Decisions", then ask the last question: what must survive in the redrawn logo (the lift bridge, the cursor, the browser dots). After the questions, show 2 or 3 visual directions as live preview pages with real animated SVGs, get his pick, write the design to `docs/specs/2026-09-25-rebrand-design.md`, and only then build.

## Done so far
- Reviewed the current production site (built from `scripts/build_growth.py` and `site-growth/`), the brand crest (`assets/wgw-logo-primary.png`), and the bridge motion piece in `motion/bridge-magic/`.
- At Matthew's request, updated `CLAUDE.md` to the current name: Well and Good Growth at www.wellandgoodgrowth.ca (confirmed in the production build). It notes the old name so tools don't rename older files. Other sessions only see this once PR #61 merges.

## Waiting on Matthew
- Answer to workshop question 3: which pages come first (options 1, 2, or 3).

## Decisions
- How deep (2026-09-25, option 2): keep the name Well and Good Growth, redraw the logo too, and reinvent the look, animations, and custom graphics. Which parts of the current crest survive the redraw is still an open question.
- Mood (2026-09-25, option 1 plus diagrams): warm and crafted as the base (editorial serif type, paper-and-ink feel, line illustrations that draw themselves as you scroll), with animated system diagrams on the service pages (a search becomes a visit, then a booking, then an automated follow-up).

## Notes for the next tool
- Current look: forest green, cream, and coral; Fraunces headings and Inter body text; a repeating bridge pattern behind the hero; one fade-in animation. Tokens are at the top of `site-growth/style.css`.
- Brand assets: the circular crest shows the Welland lift bridge over water, three "browser window" dots, and an orange clicking cursor. Colours in the crest: forest #17463d, orange #fa7042, olive #7b7d48, aqua #9cc8c8, cream #fffaf2.
- The site brand is "Well and Good Growth" (domain wellandgoodgrowth.ca). Copy rules in `CLAUDE.md` still apply to any new text (no em dashes, no invented proof, mention Claude with ChatGPT).
- Production copy and the founder bio are approved. This workstream is about visuals and motion; do not rewrite copy unless Matthew asks.
- Merging to `main` publishes the site. Build previews on this branch only.
