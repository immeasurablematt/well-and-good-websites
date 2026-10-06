# Private website performance dashboard

Status: done
Branch: codex/performance-dashboard
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/66
Updated: 2026-10-06 16:48 EDT by Codex on Mac

## Goal
Set up a private performance dashboard for Well and Good Growth, using the Welland Votes and Frank Baggetta dashboards as references.

## Next step
The approved tracking and privacy release is live. Continue the existing monthly private reporting refresh. Use the private deployment change log to separate verification events from business activity and preserve the current-domain measurement start. A real FormSubmit submission and inbox check still require separate permission. Private analytics hosting remains unauthorized.

## Done so far
- Released October 6: PR #66 merged as c1306c5 and Vercel production deployment dpl_9ULFAjpGV9sEt21nVKY8LCaKjPre reached READY. Live homepage, privacy, contact and thank-you pages returned HTTP 200. Deployed JavaScript matched the reviewed build. The popup opened and closed without browser errors, and production analytics recorded its verification event. No form submission or inbox access occurred. Private verification receipts and change log are in the durable backup.
- Release preparation: preserved the latest main-branch copy, homepage and current email address while resolving ignore-file and privacy-date conflicts. The 21 focused tests and public build/validation passed against that combined version.
- October 6: Matthew approved work on the measurement plan and explicitly requested subagents. Treat this very new business as an early baseline, without invented targets or strong conclusions from small samples.
- Prepared four privacy-conscious enquiry events, allowed campaign labels, production-host gating and deduplicated return signals. Native forms remain in charge. Updated the privacy notice and measurement runbook. No live submissions, event tests or deployment.
- Improved the three-view dashboard with distinct enquiry stages, honest missing-data states, explicit aggregate date windows, hostname traffic and independently sourced search audience and query-by-page detail. Private source receipts and the empty enquiry-register template stay outside Git. Original headline windows and source timestamps remain intact.
- The improved private dashboard is now served from the durable backup at the usual port 4187. Browser reload confirmed the new sections and no console errors. The prior successful backup is preserved at /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-archive-2026-10-01.
- Twenty-one focused tests and both builds passed. All three dashboard views, date filtering, query grouping, source inspection and local popup open/close were verified; no browser console errors. Narrow dashboard viewport verification remains limited because the browser override did not apply. A separate read-only mobile Lighthouse baseline for the public site found no urgent speed problem; private report saved with the visualization files. No broad copy rewrite was applied.
- October 6 preview repair: replaced the temporary command-session server with a macOS LaunchAgent named `ca.wellandgoodgrowth.performance-preview`. It serves the validated backup at `http://127.0.0.1:4187/`, binds only to loopback, starts at login, and restarts if it exits. Verified a managed restart and an HTTP response identical to the saved dashboard. Browser reload verification was blocked by the browser control policy; Matthew needs to reload the existing error tab. Report data was not refreshed or uploaded.
- October 1 monthly refresh completed locally. Both reporting sources were accessible; source totals reconciled and all three views, date filtering, source inspection, desktop/mobile charts and browser errors were checked. Detailed private receipts are in private/performance/raw/2026-10-01/. No public website change or hosted upload.
- Temporary checkout files had been cleared. Restored the saved branch and private backup into /private/tmp/wgg-performance-refresh-20261001. Use that checkout for the next refresh if it still exists; otherwise restore the branch and latest private backup. The older incomplete checkout was left untouched.
- Matthew requested monthly refreshes. Active thread automation `refresh-growth-dashboard-monthly` runs on the first of each month at 8 a.m. Toronto time. The Mac and Codex must be available. Hosting remains unauthorized; the automation refreshes the private local report and validated backup.
- Matthew approved an isolated checkout at /private/tmp/wgg-performance-dashboard. The original checkout and its untracked folders are untouched.
- Built a private three-view report: Traffic, Google Search, Site Health.
- Collected actual Vercel Analytics, Search Console daily history and five live page checks using existing authorized browser sessions and read-only HTTP requests.
- Verified desktop and narrow-screen chart rendering, source inspection, search-history filtering, no horizontal page overflow and no browser errors.
- Public website build and validation pass. No performance files enter the public output.
- Added public-safe content templates, build, health and guarded publication scripts, plus collection instructions in reporting/performance/README.md. Private data, compiled output and receipts are excluded from Git and Vercel uploads.

## Waiting on Matthew
- Only a real form-delivery/inbox test remains separately permissioned; the tracking and privacy release is approved.
- Permission to send private analytics to here.now with owner-only access. Automatic approval review required explicit destination authorization.


## Notes for the next tool
- The local preview service configuration is `~/Library/LaunchAgents/ca.wellandgoodgrowth.performance-preview.plist`. Its document root is the durable `performance-backup/dashboard/dist` directory listed below. Do not start a competing server on port 4187. Continue replacing the validated backup only after successful monthly checks. The service requires the Mac to be running and Matthew to be logged in.
- The October 1 temporary checkout also disappeared by October 6. The public-safe handoff repair was saved from `/private/tmp/wgg-preview-repair-20261006`; recover code from the branch and private files from the durable backup if temporary checkouts disappear again.
- Read reporting/performance/README.md. The completed local dashboard is under private/performance/dashboard; portable HTML is private/performance/Site Performance.html in this isolated checkout.
- The latest validated private report is backed up at /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-backup.
- The original private backup is retained at /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-archive-2026-09-25.
- Preserve the ignored private files and checkout. They are not in the public GitHub repository.
- Never commit private analytics, credentials, or client details. Never turn missing evidence into zero. Enquiries remain unmeasured and daily traffic is not imported.
- Never merge into main as part of a dashboard refresh. That publishes the public website.
