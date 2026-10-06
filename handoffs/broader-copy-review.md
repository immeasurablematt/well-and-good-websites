# Broader website copy with an editable comparison preview

Status: active
Branch: codex/broader-copy-review
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/70
Updated: 2026-10-06 16:03 EDT by Codex on Mac

## Goal
Draft broader geographic website copy while retaining the current benefits, three services, prices and factual proof. Let Matthew review current and proposed wording on the actual site and edit the proposal before approving any release.

## Next step
Review the Vercel preview of the implemented copy, then merge PR #70 and verify all live pages and redirects. Matthew explicitly authorized publication with "lets ship it" on October 6, 2026. Preserve his exact per-page edits, including differing founder and pricing variants.

## Done so far
- Investigated the recently saved performance workstream. Its Codex chat is idle; the prepared tracking and privacy changes are on a separate branch. Keep those changes separate.
- Created a clean managed checkout from origin/main at /Users/mbaggetta/.codex/worktrees/broader-copy-review/well-and-good-websites. The original main checkout and its unsaved folders remain untouched.
- Matthew authorized subagents. Copy review, the existing Copy Studio interface and the local preview pipeline have separate responsibilities.
- Scope preserves the four local landing pages, factual business and case-study locations, core headlines, prices, package deliverables and proof. Only the geographic sentence in the founder bio is proposed for revision.

- Completed the manifest: all 15 routes, 32 body-field changes and five search-title/description changes. Core messaging broadens customer fit; four local landing pages and local package obligations stay explicit. Schema and social-image changes are recorded as follow-up proposals only.
- Built the local same-origin comparison editor with page selection, Current/Proposed, editable body text and metadata, change highlights, responsive widths, durable saves, export/import and reset.
- Verified all 15 pages at desktop and 390px; scroll stays at 800px across toggles. Browser checks passed edit/reload/rebuild persistence, export/import/reset, source-conflict retention, intentional rejection export/import, page-switch editing lock, heading formatting, menus, FAQ, automation picker and the local-services disclosure. Form submissions are blocked in the editor and on direct preview pages. Production build and route validation passed.
- Installed and restarted the local user LaunchAgent ca.wellandgoodgrowth.copy-review. Its config is /Users/mbaggetta/Library/LaunchAgents/ca.wellandgoodgrowth.copy-review.plist. It serves only 127.0.0.1:4193 and preserves saved drafts across restart.

- Saved the review package in draft PR #70. The in-app browser shows the prepared proposal, Saved on this Mac, 37 changes and all 15 page choices. Keep this checkout while review is in progress.

- Applied the approved export to source: 35 body-field instances plus five metadata changes, with per-page founder/pricing variants preserved. Build/validator, 45 responsive page views, widgets, full source comparison and independent review passed. Schema and sharing-card updates are implemented. Next is the Vercel preview and approved publication.

- Preserved the complete private review, draft saves and QA artifacts outside the checkout at /Users/mbaggetta/Hermes/Workbench/well-and-good-copy-review-2026-10-06-160310.

## Waiting on Matthew
- Nothing. The exported copy and publication are approved.

## Notes for the next tool
- Approved export: docs/copy-review/approved-draft.json. Production source implements its per-page edits; docs/copy-review/broader-copy.json now starts with zero changes against the approved baseline.
- Preview tooling: tools/copy-studio and scripts/build_copy_review.py plus scripts/serve_copy_review.py.
- Local preview root and edited drafts: private/copy-review, ignored by Git and deployment. Keep draft saves outside the rebuilt site folder.
- Use port 4193 for this copy review. Do not interfere with the private performance dashboard on port 4187.
- Do not merge the separate tracking branch or submit the live enquiry form. Publication of this approved copy is now authorized. Private draft saves remain excluded.
