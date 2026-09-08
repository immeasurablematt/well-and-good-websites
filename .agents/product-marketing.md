# Well and Good product marketing context

Matthew Baggetta runs Well and Good Growth from Welland, serving Niagara and the GTA. The production origin is https://www.wellandgoodgrowth.ca. The former wellandgoodwebsites.ca domain redirects permanently to the new domain. This is the website brand and domain, not evidence of a legal business rename.

## Current release status

The September 8, 2026 approved Growth release supersedes the September 6 hierarchy. Production copy and markup live in `scripts/build_growth.py`, with assets in `site-growth/`. See `docs/growth-launch-2026-09-08.md` and `README.md`. `site-v2/` and root HTML are retained historical sources.

## Approved v2 direction

The broad homepage introduces three services: websites, growth marketing, and Agentic Ops. Each has a separate service page. Agentic Ops is a custom service connecting AI agents and existing business tools into repeatable workflows. Start with one process and agree inputs, access, outputs, testing, and human approval. Examples include lead intake, draft replies, research, documents, and task follow-up.

Websites, SEO, and AI visibility support the same business audience. Website visitors can request a free preview. Workflow visitors can request a conversation. The form sends an enquiry; it does not reserve a calendar slot.

The broader business audience is approved for v2. The old auto-repair-only homepage is preserved in the external July snapshot and is not the default for new v2 edits.

## Evidence and offers

Frank Baggetta is a live website client. Jetta Grove is Matthew's prior consultancy experience. Evelyn's Sandwich Factory and JK Motors are concept builds. Workflow diagrams are illustrative, not live client demonstrations or measured results.

Never invent client counts, response times, savings, rankings, revenue, endorsements, or automation outcomes. Do not present old draft claims as verified facts.

The approved shared website and growth packages are Launch $199/month plus $750 setup, Grow $699/month plus $1,500 onboarding, and Dominate $1,299/month plus $2,500 onboarding, all CAD. Packages appear on both website and growth service pages. Agentic Ops and standalone search engagements are scoped separately, with no invented package price. The Growth builder holds the displayed plan details and terms.

## Voice and writing workflow

Use writing-desk and its current managed copywriting specialist. Write concrete business copy. Explain the workflow and the next step before adding technical detail. Preserve factual limits and human approval requirements. No em dashes or exclamation points. Mention Claude alongside ChatGPT in visible copy and metadata.

For production copy, edit `scripts/build_growth.py` and regenerate with `python3 scripts/build_public.py`. Shared styles and behaviour are in `site-growth/style.css` and `site-growth/site.js`. Run `python3 scripts/validate_growth.py` and inspect the affected rendered pages before release.
