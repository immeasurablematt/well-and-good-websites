# V2 refinement brief

Approved flow: implement the taste audit fixes, review, verify a preview, merge, and verify production. Baseline: `6bc88410821b0b70a8742acb8000f16dc2a34586`. Branch: `codex/v2-refinement`.

## Scope

1. Fix the measured contrast failures: service hero labels, form boundaries, keyboard focus on light panels, and monthly price units. Text must reach 4.5:1; control boundaries and focus indicators must reach 3:1 against adjacent backgrounds.
2. Put the contact form before supporting guidance in reading order. At 390 by 844, show its first field within the initial viewport, replacing the baseline first-input position of 1231px. Keep one compact introduction.
3. Preserve the approved green, cream, coral and Fraunces identity. Shorten homepage and service introductions, reduce oversized section headings and spacing, remove redundant section labels, and give italic headings room to render. Keep primary calls to action visible at 1280 by 720 and 390 by 844.
4. Remove the decorative status dot from the illustrative workflow. Use unnumbered rows for homepage examples; retain numbers for actual process steps.

## Invariants

Preserve Agentic OS as the lead service and the broader business audience. Preserve all 17 routes, navigation labels and destinations, page metadata, sitemap, prices and plan inclusions, form fields and delivery configuration, privacy wording, and human approval boundaries. Keep Frank Baggetta identified as a live client, JK Motors and Evelyn's Sandwich Factory as concepts, and Jetta Grove as prior experience. No invented outcomes, metrics, guarantees, or integrations. A real Agentic OS demonstration is a separate task.

## Acceptance and release

Regenerate HTML and the copy inventory from their builders. Run the existing v2 validator and build. Compare the invariants against the baseline. Verify desktop, tablet, and phone layouts, contrast, keyboard focus, menu Escape behavior, service preselection, and native validation without submitting enquiries. Retry the PageSpeed mobile audit and record a rate-limit failure honestly if unavailable.

Review the exact worktree diff against the baseline on separate Standards and Spec axes before committing. The uncommitted diff is intentional: the review skill closes implementation before its commit. Fix supported findings, verify the hosted preview, merge through the existing GitHub workflow, and confirm the production deployment and browser behavior. Finish on clean, current main and remove the safely merged local branch. Retain remote branches.
