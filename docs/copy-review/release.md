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

Pending the verified Vercel preview and approved merge of PR #70. Pre-release production commit: `bcc83cdc610e2693ea49555b856e8698c6858ca7`; deployment: `dpl_CnEFjrVRMSP8mAGnStfRDCUzpzrb`.
