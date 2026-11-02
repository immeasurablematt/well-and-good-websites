# Show dashboard breakdowns over time

Status: active
Branch: codex/dashboard-time-trends
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/83
Updated: 2026-11-02 14:52 EST by Codex on Mac

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

- Completed the November 2 refresh: Vercel through November 1 Toronto, Search Console final data through October 31 Pacific, matching browser bounce rates and hostname scope, and eight current GET checks. Independent totals and all 144 dated category reads reconcile. The 30-day source has 721 hourly rows because November 1 has 25 hours.
- Reran the three saved exact-page search detail requests. Retained original daily history, observed zeroes, source scopes and separate capture times. GA4 property 560094220 reads through October 31 returned no processed rows; Clarity and confirmed receipt remain unavailable.
- Rebuilt and verified all three periods on all three tabs, source inspection, narrow-screen rendering and live presentation preservation. The existing preview and portable HTML are refreshed; the prior successful backup is preserved in the visualization folder under performance-before-refresh-20261102.
- Updated the existing automation refresh-growth-dashboard-monthly to weekly, Mondays at 09:00 America/Toronto. Kept the same automation ID and local execution. The Mac and Codex must be available. Updated the runbook and replaced fixed traffic date captions with source-driven dates.

## Waiting on Matthew
- Nothing for the completed data refresh. The public-safe template changes remain in the existing draft pull request for review.

## Notes for the next tool
- Work lives in the isolated checkout /private/tmp/wgg-performance-refresh-20261101. Do not disturb the unrelated changes in the canonical checkout.
- Read reporting/performance/README.md for the dated history contract and collection recipe. Preserve component IDs, user presentation and source boundaries.
- The live preview remains http://127.0.0.1:4187/?view=1&tab=traffic and requires the Mac's local server. Do not start a competing server.
- Private files and receipts remain outside Git. The durable private backup is in the existing Codex visualization folder under performance-backup; the prior version is its sibling performance-before-time-trends-20261101.
- The November 2 refresh is complete. Private receipts and assembly/collection scripts are in private/performance/raw/2026-11-02; dated category receipts are in raw/2026-11-02-chart-history. The latest successful snapshot is also in the durable private backup. Future refreshes advance each source independently and must never reuse old bounce rates for newer traffic dates.
- Only the existing refresh schedule changed. No public website, tracking, account, access or hosting changes were made. Do not upload private analytics or merge main without explicit authorization.
