# Set up free GA4 and Clarity for Well and Good Growth

Status: done
Branch: codex/ga4-clarity-growth
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/76
Updated: 2026-10-22 12:03 EDT by Codex on Mac

## Goal
Create separate free GA4 and Microsoft Clarity projects for Well and Good Growth, add visitor-choice-based tracking, and prepare reviewed aggregate GA4 reporting in the private performance dashboard when data becomes available.

## Next step
No release step remains. The existing monthly reporting automation should import only verified aggregate GA4 data after it becomes available, and describe the limited coverage caused by quiet opt-in.

## Done so far
- Inspected the active performance report handoff and confirmed with Matthew that its other editing session stopped.
- Found no existing Well and Good Growth GA4 property among the connected account summaries. An unrelated Welland Votes property must not be reused.
- Created the separate free GA4 account and property under Matthew's Google account after he approved its terms. Account ID 412915369, property ID 560094220, web stream ID 16182626303, measurement ID in `site-growth/analytics-consent.js`. Toronto reporting time and CAD are verified. Optional account sharing, enhanced measurement, Google Signals, user-provided data, and ads personalisation are off. Email and eight common URL query keys have redaction enabled.
- Created a free Microsoft Clarity project after Matthew approved its terms. Project ID is in `site-growth/analytics-consent.js`. Marketing emails were left off. Strict text masking and the consent-required cookie setting are verified.
- Published tracking that loads optional GA4 and Clarity only after a visitor allows analytics. It reuses four existing enquiry actions, limits campaign and event values, masks the form for Clarity, and adds a choice control and privacy copy.
- Prepared optional GA4 sections in the private dashboard and a validation contract. GA4 ingestion has not yet been verified and no aggregate GA4 data has been imported.
- The site builds and validates with 15 HTML pages. The private dashboard build succeeds against a copied private fixture. Focused consent, enquiry and dashboard tests pass.
- Reviewed the complete outgoing branch diff with the Karpathy Guidelines gate, corrected one stale documentation sentence, pushed the branch, and opened draft PR #76 against the still-open PR #75 branch. That PR was later merged and deployed.
- Matthew explicitly approved going live on October 22 and asked for no banner. After seeing the dialog preview, he asked for the least intrusive treatment. The site now links from the footer to an inline checkbox on the privacy page. Both tags stay off until a visitor turns it on. The privacy notice and reporting caveat reflect this quiet opt-in. The 28 focused tests and 15-page build and validation pass. A local browser preview shows only the inline checkbox with no overlay or automatic prompt.
- Reviewed and merged PR #75, which changes private dashboard templates and runbook material. Retargeted PR #76 to main and verified its file list contains only the analytics workstream. Its Vercel checks pass.
- Merged PR #76 to main. Vercel production deployment `dpl_8zArgmyoSnGBXoLMn9AcXuhY7GrN` is ready at commit `fd9cab2cc6860fbdceccad52777ca6d4d2c4922d`.
- Verified the live site: a small footer link leads to the inline privacy-page checkbox, with no banner, popup, or automatic prompt. Neither GA4 nor Clarity loaded before opt-in. Both loaded on a normal home page after opt-in. After opt-out and reload, neither loaded.
- The controlled browser check produced a few test pageviews on October 22. It did not submit a form or create a real enquiry. The private release receipt is in `private/performance/raw/2026-10-22/ga4-clarity-release-verification.json` in the existing private performance backup, not in Git.
- Updated the existing monthly reporting automation to use the merged main version, seek verified GA4 data only after October 22, exclude controlled test activity from business outcomes, and report the quiet opt-in coverage limit. Its schedule is unchanged.

## Waiting on Matthew
- Nothing for this approved release.

## Notes for the next tool
- This branch started from `codex/performance-report-refresh`. PR #75 and PR #76 are merged into main. Keep the private release receipt out of Git.
- The main checkout has unrelated uncommitted files and must remain untouched. The separate clean worktree is `/private/tmp/wgg-ga4-clarity-20261022`.
- The existing private performance backup and live local dashboard were left intact. A copy of the private fixture is ignored under this worktree's `private/performance/`; never commit private data.
- The GA4 and Clarity IDs are public tag identifiers, not credentials. No private project data or raw analytics belong in Git.
- No paid analytics plan, inbox test, or real enquiry has been authorized. Matthew authorized this site release on October 22, with no banner.
