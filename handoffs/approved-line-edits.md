# Approved September website line edits

Status: active
Branch: codex/approved-line-edits-20260925
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/63
Updated: 2026-09-25 20:10 UTC by Codex on Mac

## Goal
Apply the 40 line edits Matthew approved on September 25, preserving the new Lake and Marigold branding. Publish the completed and checked set under his earlier instruction to publish once the revisions are approved.

## Next step
Implementation and preview checks are complete. Merge pull request #63 at its checked head, then verify production. Once merged, this workstream is complete; no further copy decisions are pending.

## Done so far
- Updated from the branding release and applied all 40 approved edits in build_growth.py, art_showpieces.py, and content/privacy.html.
- Built 15 pages; route validation passed for 13 publishable routes.
- Checked every approved replacement in generated HTML and metadata and checked that replaced wording is absent.
- Compared all generated link and form destinations with the branding baseline: unchanged. Every non-HTML output file is byte-identical, including styles, scripts, fonts, and images.
- Checked all 13 main routes at 390px and 1280px, with no horizontal overflow. Inspected mobile workflow labels visually and the live service-specific enquiry note without submitting a form.
- Retained the public email address and undated io.net chart labels, which were questions rather than approved changes.

- Vercel preview succeeded and its automation page matched the local build byte for byte. The hosted preview displayed the approved heading and five workflow labels.

## Waiting on Matthew
- Nothing for the approved edits. The public email address and io.net measurement dates remain separate unresolved details.

## Notes for the next tool
- The 40-item proposal and source snapshots remain locally in writing/line-edit-2026-09-25/. They are not part of the site build.
- Preserve existing untracked .scratch/, outputs/, and writing/ material. Do not fold the closed September 19 homepage proposal into this change.
- Founder biography, testimonial, prices, metrics, review requirements, and branding remain intact.
