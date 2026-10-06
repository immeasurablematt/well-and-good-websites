# Approved broader copy release

Matthew approved the exported copy and publication on October 6, 2026. The authoritative export is `approved-draft.json`, SHA-256 `60491e6491715c343e57af5d724ea70844b0c37d717b88fa0cabc46c9af431e0`.

## Implementation

- Applied 35 changed body-field instances and five metadata changes to production source. Only a trailing editor-added nonbreaking space and empty regional paragraphs were removed.
- Preserved the export's distinct homepage/Growth founder copy and main-service/local-page package notes.
- Kept all package prices, deliverables, proof, CTA destinations and form machinery unchanged.
- Broadened the shared footer and made the retained local links readable when expanded.
- Updated search and social metadata, retained specific areaServed values on four local pages, and removed the regional restriction from general pages.
- Generated the approved sharing-card text in `well-and-good-growth-social-20261006.png`; preserved the previous image.
- Rebased the local Copy Studio proposal to the approved copy. Historical approval remains in the export.

## Validation

- Production build and validator passed: 15 HTML pages, 13 indexable routes. Editor and private files excluded from output.
- Every page's main content and footer matched the approved export applied to the original source. The private preview's disabled form action was normalized for this comparison; production retains the original destination.
- All pages passed at 1280px, 390px and 320px, including the expanded local-services footer.
- Founder CTA, dialog, FAQ, mobile menu and automation picker passed browser checks without page exceptions. No enquiry was submitted.
- Search title, description and matching Open Graph values verified on all 15 pages. Local/general schema distinction verified. Sharing card inspected at 1200 by 630 pixels.
- Python compilation and Git whitespace checks passed. Independent source review found no unintended changes.

## Publication

PR #70 merged on October 6, 2026 at 20:07:57 UTC. Production commit: `469400becfd8c687ede394de78e86eaade1fc72b`. Vercel deployment `dpl_CUVxQYmeYTQWbWyju5Mc3ChfU31K` reached READY on the production target.

- Preview: https://well-and-good-websites-qev9irqxn-matthew-ok.vercel.app, source commit `2c76ed5cd5b0f719e43fceee253b96f2f261ca5b`. All pages and changed assets matched the local build byte for byte.
- Live: https://www.wellandgoodgrowth.ca/. Verified anonymously at 20:12 UTC: all 15 generated HTML pages, CSS, JavaScript, sharing image, robots.txt, sitemap.xml and llms.txt matched the verified build.
- All nine configured route redirects and the apex/legacy domains returned permanent redirects to the correct destinations. Domain redirects preserved the tested path and query string.
- Editor, private draft and repository-document URLs returned 404 on production. Live founder copy rendered correctly without browser errors. No production error/fatal runtime log groups were returned for this deployment in the preceding hour.
- The local editor remains available at http://127.0.0.1:4193/tools/copy-studio/, now served from the main project checkout. Its approved baseline starts at zero changes and its saved draft is retained.
- Original and final private review snapshots are preserved at `/Users/mbaggetta/Hermes/Workbench/well-and-good-copy-review-2026-10-06-160310`.

Rollback reference. Pre-release production commit: `bcc83cdc610e2693ea49555b856e8698c6858ca7`; deployment: `dpl_CnEFjrVRMSP8mAGnStfRDCUzpzrb`.
