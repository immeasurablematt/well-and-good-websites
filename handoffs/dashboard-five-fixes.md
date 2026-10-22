# Close five dashboard measurement and usability gaps

Status: active
Branch: codex/dashboard-five-fixes
Pull request: none yet
Updated: 2026-10-22 16:13 EDT by Codex on Mac

## Goal
Resolve five gaps in the private Growth dashboard: stale tracking status, unverified received enquiries, a clearer first-screen summary, sparse referrer context, and limited page health checks. Keep private analytics out of the public repository and preserve the subtle opt-in choice.

## Next step
Review the final public-safe code diff, open and merge its pull request when checks pass, then verify repository and live local report state. The remaining received-enquiry count stays unavailable until a classified receipt register and delivery coverage are established.

## Done so far
- Started from clean isolated checkout /private/tmp/wgg-report-refresh-20261022 because the main checkout has unrelated edits. Created codex/dashboard-five-fixes from the verified current origin/main.
- The previous performance report workstream is complete. This is a separate follow-up; no other workstream note is being edited.
- A team updated the first-screen summary, referrer coverage context and the eight-page GET health collector. The private report now uses verified equal-length traffic comparisons, labels the opt-in tags as active with historical GA4 reporting pending, and keeps received enquiries unavailable after a read-only receipt audit. No form was submitted.
- The updated private dashboard was built, the previous version archived, and the usual owner-only localhost view refreshed and visually verified. Sixteen focused tests pass. The latest health sample returned successful HTML responses for all eight named pages.
- Updated the existing monthly dashboard refresh and created a separate quiet daily page-health heartbeat. The daily check is one sample, not continuous uptime monitoring.

## Waiting on Matthew
- Nothing right now.

## Notes for the next tool
- The ignored private/performance folder contains report data and receipts. Never commit it. Do not submit a live test enquiry without Matthew's specific authorization. Do not add a banner or paid analytics.
- The existing monthly dashboard refresh and the separate daily page-health monitor are active. Neither requires a paid analytics plan.
- Private working data stays in private/performance/. The previous local report is preserved at /Users/mbaggetta/.codex/visualizations/2026/10/22/01a1641d-6b11-7611-a48d-6022ac7ee00f/performance-before-five-fixes-2026-10-22.
