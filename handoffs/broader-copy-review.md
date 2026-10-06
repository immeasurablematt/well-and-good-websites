# Broader website copy with an editable comparison preview

Status: active
Branch: codex/broader-copy-review
Pull request: none yet
Updated: 2026-10-06 11:46 EDT by Codex on Mac

## Goal
Draft broader geographic website copy while retaining the current benefits, three services, prices and factual proof. Let Matthew review current and proposed wording on the actual site and edit the proposal before approving any release.

## Next step
Finish the scoped proposal manifest and local Copy Studio comparison preview, then verify all-page review, editable proposed text, durable local saves, import/export and mobile rendering. Production publication is not authorized.

## Done so far
- Investigated the recently saved performance workstream. Its Codex chat is idle; the prepared tracking and privacy changes are on a separate branch. Keep those changes separate.
- Created a clean managed checkout from origin/main at /Users/mbaggetta/.codex/worktrees/broader-copy-review/well-and-good-websites. The original main checkout and its unsaved folders remain untouched.
- Matthew authorized subagents. Copy review, the existing Copy Studio interface and the local preview pipeline have separate responsibilities.
- Scope preserves the four local landing pages, factual business and case-study locations, core headlines, prices, package deliverables and proof. Only the geographic sentence in the founder bio is proposed for revision.

## Waiting on Matthew
- Nothing required to prepare the draft. Approval is required before applying or publishing reviewed copy.

## Notes for the next tool
- Proposal source: docs/copy-review/broader-copy.json. The production copy builder stays unchanged during this review.
- Preview tooling: tools/copy-studio and scripts/build_copy_review.py plus scripts/serve_copy_review.py.
- Local preview root and edited drafts: private/copy-review, ignored by Git and deployment. Keep draft saves outside the rebuilt site folder.
- Use port 4193 for this copy review. Do not interfere with the private performance dashboard on port 4187.
- Do not merge the tracking branch, deploy, submit the live form, or publish private edits as part of this workstream.
