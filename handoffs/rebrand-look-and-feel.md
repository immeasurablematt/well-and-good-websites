# Rebrand the site with a new look, animations, and custom graphics

Status: waiting
Branch: claude/copy-optimization-skills-2xydff
Pull request: #61 (draft)
Updated: 2026-09-25 03:15 UTC by Claude cloud

## Goal
Matthew wants a more creative new look and feel for wellandgoodgrowth.ca: animations, custom graphics made in code (SVG, some of them moving), and a fresh visual identity. He wants to workshop the direction together before anything is built.

## Next step
Workshop phase, one question at a time (brainstorming approach: no site code changes until Matthew approves a written design). The first question has been asked: how deep the rebrand goes. Options offered: (1) keep the name and bridge crest, reinvent everything around it; (2) keep the name, redraw the logo too; (3) full rebrand including name. Record his answer under "Decisions" below, then ask the next question (likely: mood and personality, then which pages first). After the questions, show 2 or 3 visual directions as live preview pages with real animated SVGs, get his pick, write the design to `docs/specs/2026-09-25-rebrand-design.md`, and only then build.

## Done so far
- Reviewed the current production site (built from `scripts/build_growth.py` and `site-growth/`), the brand crest (`assets/wgw-logo-primary.png`), and the bridge motion piece in `motion/bridge-magic/`.

## Waiting on Matthew
- Answer to the first workshop question: how deep should the rebrand go.

## Decisions
- None yet.

## Notes for the next tool
- Current look: forest green, cream, and coral; Fraunces headings and Inter body text; a repeating bridge pattern behind the hero; one fade-in animation. Tokens are at the top of `site-growth/style.css`.
- Brand assets: the circular crest shows the Welland lift bridge over water, three "browser window" dots, and an orange clicking cursor. Colours in the crest: forest #17463d, orange #fa7042, olive #7b7d48, aqua #9cc8c8, cream #fffaf2.
- The site brand is "Well and Good Growth" (domain wellandgoodgrowth.ca). Copy rules in `CLAUDE.md` still apply to any new text (no em dashes, no invented proof, mention Claude with ChatGPT).
- Production copy and the founder bio are approved. This workstream is about visuals and motion; do not rewrite copy unless Matthew asks.
- Merging to `main` publishes the site. Build previews on this branch only.
