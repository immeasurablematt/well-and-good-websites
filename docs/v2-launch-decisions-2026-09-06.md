# V2 launch decisions

## Release direction

Matthew requested branch consolidation and a v2 that gives Agentic OS more prominence. The review preview leads with Agentic OS for owner-led businesses, retaining websites and search as supporting services. Matthew approved the preview on September 6, 2026 ("I love it") in response to the audience and homepage hierarchy review. The approved v2 is selected for production publication.

Keep the existing green, cream, and coral visual identity, the Well and Good display name, and wellandgoodwebsites.ca. No legal rename or domain migration is part of this release.

## Copy platform

| Element | Decision and evidence |
| --- | --- |
| Audience | Business owners with recurring work across inboxes, documents, meetings, and existing tools. Broad business audience approved by Matthew. |
| Reader problem | Manually gathering context, preparing replies, and carrying tasks between tools. An audience hypothesis, not a measured customer finding. |
| Offer | Custom Agentic OS service, starting with a scoped workflow. Existing project marketing context lists intake, research, reporting, document, knowledge, and meeting workflows. |
| Promise | Prepare routine work for review and reduce manual handoffs. No quantified savings, response-time promise, or autonomous customer sending. |
| Difference | Matthew designs the workflow around the business's existing tools, with explicit permissions and human approval. |
| Proof | Frank Baggetta is a live website client. Jetta Grove is prior consultancy experience. JK Motors and Evelyn's are concept builds. Workflow diagrams are illustrative, not client results or a live product UI. |
| Pricing | Live main at 88cdecb supplies website plan prices: Launch 199/month plus 750 setup; Grow 699/month plus 1500 onboarding; Dominate 1299/month plus 2500 onboarding, all CAD. Do not revive the July 99/399/899 prices. Agentic OS is scoped, with no invented price. |
| Action | Discuss a workflow through the contact form; Matthew replies to arrange the next step. The form requests a call, it does not book a calendar slot. Website visitors can request a free preview. |
| Constraints | No invented proof, client outcomes, time savings, new guarantees, or legal identity. No em dashes or exclamation points in visible copy. Pair Claude with ChatGPT. |

## Branch decisions

- PR 27: retain the revised positioning plan with a historical-status note.
- PR 28: retain the original A/B deck and builder as history. Its rename, old prices, and unverified claims do not become current policy.
- PR 29: already merged. Preserve the useful Agentic Ops intent and Copy Studio work. Replace unsupported timing and inbox-volume claims in the v2 public copy.
- Five local emdash branches: all tips are ancestors of origin/main at 88cdecb. No unique commits require another merge.
- Old remote Claude branches correspond to merged PRs, often squash merges. Keep remote branches unless their deletion is explicitly authorized.
- Untracked July research is preserved under docs/archive/2026-07-v2 and in the external backup. The July site snapshot is in the backup.

## Recovery

Before changes, all refs were saved to `/Users/mbaggetta/Archive/well-and-good-cleanup-2026-09-06/all-branches.bundle`. All 95 untracked files in the main checkout and 55 in the competitor worktree were archived with SHA-256 verification alongside manifests in that directory.

The pre-v2 production baseline is 368601e (deployment dpl_F6amoS9r47eGn5Qu43agBHu5C4Qm). To recover the v1 build through Git, restore `SOURCE = ROOT` in `scripts/build_public.py` and deploy the reviewed change. Publication must use the verified Vercel project prj_EPl9SoTk0Yg8LfWdXroL1KBPuSGC in matthew-ok, which owns wellandgoodwebsites.ca. The old local project-name alias resolves to this same project ID.

## Preview and verification

V2 preview: https://well-and-good-websites-j104eze85-matthew-ok.vercel.app

Vercel deployment dpl_3oKnrtK8YAzRRTUGuiNSAbm5Mjgg is READY, target preview, in the verified existing project. The approved v2 source is now selected by `scripts/build_public.py`; the root v1 pages remain available for recovery.

The 17-page structural validator checks routes and anchors, assets and stylesheets, canonical URLs, metadata, JSON-LD, form labels and delivery settings, pricing scope, punctuation, and sitemap coverage. Repeated builds produce identical files. Mobile menu, Escape dismissal, service preselection, plan links, invalid-email handling, and layouts have been checked in the browser. No form submission was sent, so inbox delivery has not been retested.
