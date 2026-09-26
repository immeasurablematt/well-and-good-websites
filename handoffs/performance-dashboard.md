# Private website performance dashboard

Status: waiting
Branch: codex/performance-dashboard
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/66
Updated: 2026-09-26 08:00 EDT by Codex on Mac

## Goal
Set up a private performance dashboard for Well and Good Growth, using the Welland Votes and Frank Baggetta dashboards as references.

## Next step
Matthew must explicitly authorize uploading the private traffic and Search Console figures to an owner-only here.now site. The publication command was blocked by automatic approval review and did not run. When authorized, run `node scripts/publish_performance.mjs --initialize` from the isolated checkout, then verify the private hosted result and update this note. Monthly local refresh is now scheduled for the first day of each month at 8 a.m. Toronto time.

## Done so far
- Matthew requested monthly refreshes. Active thread automation `refresh-growth-dashboard-monthly` runs on the first of each month at 8 a.m. Toronto time. The Mac and Codex must be available. Hosting remains unauthorized; the automation refreshes the private local report and validated backup.
- Matthew approved an isolated checkout at /private/tmp/wgg-performance-dashboard. The original checkout and its untracked folders are untouched.
- Built a private three-view report: Traffic, Google Search, Site Health.
- Collected actual Vercel Analytics, Search Console daily history and five live page checks using existing authorized browser sessions and read-only HTTP requests.
- Verified desktop and narrow-screen chart rendering, source inspection, search-history filtering, no horizontal page overflow and no browser errors.
- Public website build and validation pass. No performance files enter the public output.
- Added public-safe content templates, build, health and guarded publication scripts, plus collection instructions in reporting/performance/README.md. Private data, compiled output and receipts are excluded from Git and Vercel uploads.

## Waiting on Matthew
- Permission to send private analytics to here.now with owner-only access. Automatic approval review required explicit destination authorization.


## Notes for the next tool
- Read reporting/performance/README.md. The completed local dashboard is under private/performance/dashboard; portable HTML is private/performance/Site Performance.html in this isolated checkout.
- The initial private report is backed up at /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-backup.
- Preserve the ignored private files and checkout. They are not in the public GitHub repository.
- Never commit private analytics, credentials, or client details. Never turn missing evidence into zero. Enquiries remain unmeasured and daily traffic is not imported.
- Never merge into main as part of a dashboard refresh. That publishes the public website.
