# Set up free GA4 and Clarity for Well and Good Growth

Status: waiting
Branch: codex/ga4-clarity-growth
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/76
Updated: 2026-10-22 11:22 EDT by Codex on Mac

## Goal
Create separate free GA4 and Microsoft Clarity projects for Well and Good Growth, add visitor-choice-based tracking, and add reviewed aggregate GA4 reporting to the private performance dashboard.

## Next step
Matthew reviews draft PR #76 after PR #75. Merging to main publishes the site, so keep #76 as a draft until he approves that release. After publication, verify consented collection without a real enquiry, update the existing monthly reporting automation, and import only verified aggregate GA4 data into the private dashboard.

## Done so far
- Inspected the active performance report handoff and confirmed with Matthew that its other editing session stopped.
- Found no existing Well and Good Growth GA4 property among the connected account summaries. An unrelated Welland Votes property must not be reused.
- Created the separate free GA4 account and property under Matthew's Google account after he approved its terms. Account ID 412915369, property ID 560094220, web stream ID 16182626303, measurement ID in `site-growth/analytics-consent.js`. Toronto reporting time and CAD are verified. Optional account sharing, enhanced measurement, Google Signals, user-provided data, and ads personalisation are off. Email and eight common URL query keys have redaction enabled.
- Created a free Microsoft Clarity project after Matthew approved its terms. Project ID is in `site-growth/analytics-consent.js`. Marketing emails were left off. Strict text masking and the consent-required cookie setting are verified. No site traffic has been collected.
- Prepared a site tracking draft that loads optional GA4 and Clarity only after a visitor allows analytics. It reuses four existing enquiry actions, limits campaign and event values, masks the form for Clarity, and adds a choice control and privacy copy. The code now has the issued IDs.
- Prepared optional GA4 sections in the private dashboard and a validation contract. No GA4 data has been collected or imported.
- The site builds and validates with 15 HTML pages. The private dashboard build succeeds against a copied private fixture. Focused consent, enquiry and dashboard tests pass. A local preview shows the consent banner and footer control.
- Reviewed the complete outgoing branch diff with the Karpathy Guidelines gate, corrected one stale documentation sentence, pushed the branch, and opened draft PR #76 against the still-open PR #75 branch. Production remains unchanged.

## Waiting on Matthew
- Final review before a production site release.

## Notes for the next tool
- This branch starts from the still-open `codex/performance-report-refresh` branch and its PR #75. Keep analytics changes in this workstream and coordinate the later merge order.
- The main checkout has unrelated uncommitted files and must remain untouched. The separate clean worktree is `/private/tmp/wgg-ga4-clarity-20261022`.
- The existing private performance backup and live local dashboard were left intact. A copy of the private fixture is ignored under this worktree's `private/performance/`; never commit private data.
- The GA4 and Clarity IDs are public tag identifiers, not credentials. No private project data or raw analytics belong in Git.
- No paid analytics plan, inbox test, real enquiry, or external publication has been authorized.
