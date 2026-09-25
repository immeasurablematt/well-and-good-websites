# Rebrand the site with a new look, animations, and custom graphics

Status: waiting
Branch: claude/copy-optimization-skills-2xydff
Pull request: #61 (draft)
Updated: 2026-09-25 03:37 UTC by Claude cloud

## Goal
Matthew wants a more creative new look and feel for wellandgoodgrowth.ca: animations, custom graphics made in code (SVG, some of them moving), and a fresh visual identity. He wants to workshop the direction together before anything is built.

## Next step
Workshop phase, one question at a time (brainstorming approach: no site code changes until Matthew approves a written design). All four workshop questions are answered, see "Decisions". Now show 3 visual directions on one private preview page on claude.ai (an Artifact), not on the site, so nothing reaches the live site. Each direction shows: the redrawn bridge mark with the Well and Good Growth wordmark; the homepage hero with its real copy and the bridge drawing itself; and an AI automation section with an animated system diagram. Build the bridge from the traced geometry in `motion/bridge-magic/src/paths.json` (left tower, span, right tower, water). Get his pick, write the design to `docs/specs/2026-09-25-rebrand-design.md`, get his approval, and only then build the pilot.

## Done so far
- Reviewed the current production site (built from `scripts/build_growth.py` and `site-growth/`), the brand crest (`assets/wgw-logo-primary.png`), and the bridge motion piece in `motion/bridge-magic/`.
- At Matthew's request, updated `CLAUDE.md` to the current name: Well and Good Growth at www.wellandgoodgrowth.ca (confirmed in the production build). It notes the old name so tools don't rename older files. Other sessions only see this once PR #61 merges.

## Waiting on Matthew
- Nothing yet. Next ask: pick one of the 3 visual directions once the preview page is up.

## Decisions
- How deep (2026-09-25, option 2): keep the name Well and Good Growth, redraw the logo too, and reinvent the look, animations, and custom graphics. Which parts of the current crest survive the redraw is still an open question.
- Mood (2026-09-25, option 1 plus diagrams): warm and crafted as the base (editorial serif type, paper-and-ink feel, line illustrations that draw themselves as you scroll), with animated system diagrams on the service pages (a search becomes a visit, then a booking, then an automated follow-up).
- Pages first (2026-09-25, option 2): pilot the new look on the homepage plus the AI automation page, then roll it out to the rest of the site.
- Logo (2026-09-25, option 1): the Welland lift bridge is the one symbol. The browser dots and the cursor are dropped. The wordmark reads Well and Good Growth.

## Notes for the next tool
- Current look: forest green, cream, and coral; Fraunces headings and Inter body text; a repeating bridge pattern behind the hero; one fade-in animation. Tokens are at the top of `site-growth/style.css`.
- Brand assets: the circular crest shows the Welland lift bridge over water, three "browser window" dots, and an orange clicking cursor. Colours in the crest: forest #17463d, orange #fa7042, olive #7b7d48, aqua #9cc8c8, cream #fffaf2. Details: a double ring (forest outside, olive inside), the bridge drawn as two lattice towers and a truss span in olive, two aqua wave lines, the three dots top left, the cursor with click lines top right. The wordmark under it is "Well and Good" in a heavy serif with "and" in orange italic and an underline swoosh, then "WEBSITES" in spaced capitals between olive rules. That descriptor is out of date: the redraw must read Well and Good Growth.
- The site brand is "Well and Good Growth" (domain wellandgoodgrowth.ca). Copy rules in `CLAUDE.md` still apply to any new text (no em dashes, no invented proof, mention Claude with ChatGPT).
- Production copy and the founder bio are approved. This workstream is about visuals and motion; do not rewrite copy unless Matthew asks.
- Merging to `main` publishes the site. Build previews on this branch only.
- Live palette (bottom of `site-growth/style.css`, which overrides the older tokens at the top): cream #f6f1e6, sand #efe3d3, paper #fffdf7, forest #1e3d34, coral #b8472f, light coral #ff9275, aqua #a9d6e2. Fraunces and Inter are self-hosted in `site-growth/fonts/`.
- Real hero copy. Homepage H1: "Running your business shouldn't mean doing everything yourself." AI automation H1: "Get the recurring work off your list." Use the real copy in previews; copy is approved.
- The homepage plays a six-second video ident (`motion/bridge-magic/`, Remotion) that assembles the old crest, including the dots and cursor. Matthew revised it many times, see its `design/SPEC.md`. The new mark means it must be redone or replaced; raise this with him rather than deciding.
- The AI automation page once had a flowchart that was replaced by the task picker (comment in `site-growth/style.css`). Keep the new diagram illustrative, not a box flowchart, let it sit alongside the picker, and confirm with Matthew.
