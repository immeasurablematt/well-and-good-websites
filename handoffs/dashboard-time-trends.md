# Show dashboard breakdowns over time

Status: active
Branch: codex/dashboard-time-trends
Pull request: none yet
Updated: 2026-11-01 14:02 EST by Codex on Mac

## Goal
Show how the existing private performance dashboard values change over time while preserving its three views, layout, identity and reviewed source evidence.

## Next step
Review the pull request for the public-safe chart templates. The private local dashboard already uses the verified build. Do not merge main without Matthew's authorization.

## Done so far
- Changed five traffic breakdown charts to daily page-view series for Week and Month, and monthly series for All time. Categories rank inside the selected dates.
- Changed search page and query charts to daily impression series using retained dated history.
- Preserved observed zeroes and rendered missing observations as gaps. Source inspection keeps actual rows, without synthetic gap rows.
- Added an optional trafficHistory contract with per-day and per-month reconciliation for pages, referrers, devices and countries. Aggregate charts remain available when no dated history is imported.
- Collected and reconciled the historical breakdowns for the existing saved windows. Existing totals, queries, capture timestamps and reporting dates were preserved.
- Passed 13 focused tests and the private dashboard build. Verified Week, Month and All time for traffic and search, the health view, source inspection and the existing presentation in the browser.
- Updated the private local preview and portable HTML only after validation. Archived the previous successful private backup before replacement.

## Waiting on Matthew
- Nothing for this chart update. The separate monthly refresh still needs the authorized Vercel browser source for matching bounce-rate reads.

## Notes for the next tool
- Work lives in the isolated checkout /private/tmp/wgg-performance-refresh-20261101. Do not disturb the unrelated changes in the canonical checkout.
- Read reporting/performance/README.md for the dated history contract and collection recipe. Preserve component IDs, user presentation and source boundaries.
- The live preview remains http://127.0.0.1:4187/?view=1&tab=traffic and requires the Mac's local server. Do not start a competing server.
- Private files and receipts remain outside Git. The durable private backup is in the existing Codex visualization folder under performance-backup; the prior version is its sibling performance-before-time-trends-20261101.
- This is a chart update using existing report dates, not completion of the separate monthly refresh. Never combine pending newer traffic totals with the older browser bounce rates.
- No public website, tracking, account, access, hosting or schedule changes were made. Do not upload private analytics or merge main without explicit authorization.
