# Approved September website line edits

Status: done
Branch: main (implementation merged in #63)
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/63
Updated: 2026-09-25 20:13 UTC by Codex on Mac

## Goal
Apply the 40 line edits Matthew approved on September 25, preserving the new Lake and Marigold branding. Publish the completed and checked set under his earlier instruction to publish once the revisions are approved.

## Next step
None. All 40 approved edits are published and verified. The email address and io.net dates remain separate optional follow-up questions.

## Done so far
- Updated from the branding release and applied all 40 approved edits in build_growth.py, art_showpieces.py, and content/privacy.html.
- Built 15 pages; route validation passed for 13 publishable routes.
- Checked every approved replacement in generated HTML and metadata and checked that replaced wording is absent.
- Compared all generated link and form destinations with the branding baseline: unchanged. Every non-HTML output file is byte-identical, including styles, scripts, fonts, and images.
- Checked all 13 main routes at 390px and 1280px, with no horizontal overflow. Inspected mobile workflow labels visually and the live service-specific enquiry note without submitting a form.
- Retained the public email address and undated io.net chart labels, which were questions rather than approved changes.

- Vercel preview succeeded and its automation page matched the local build byte for byte. The hosted preview displayed the approved heading and five workflow labels.

- Published through pull request #63 at merge e99bded5b875f69101ce64921b3f3ee1eaf6f264. Vercel reported success. All 14 checked live pages returned HTTP 200 and matched the verified local HTML byte for byte; the live workflow labels were also read in the browser. The legacy domain returned HTTP 308 to the current homepage.

## Waiting on Matthew
- Nothing for the approved edits. The public email address and io.net measurement dates remain separate unresolved details.

## Notes for the next tool
- The 40-item proposal and source snapshots remain locally in writing/line-edit-2026-09-25/. They are not part of the site build.
- Preserve existing untracked .scratch/, outputs/, and writing/ material. Do not fold the closed September 19 homepage proposal into this change.
- Founder biography, testimonial, prices, metrics, review requirements, and branding remain intact.
