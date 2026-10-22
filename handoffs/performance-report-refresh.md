# Refresh private dashboard and add applicable performance reports

Status: done
Branch: codex/performance-period-controls
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/78
Updated: 2026-10-22 12:55 EDT by Codex on Mac

## Goal
Refresh the private Growth dashboard and add applicable report sections from Welland Votes, preserving its view, identity, presentation and source provenance.

## Next step
No further report setup is required. The existing monthly automation will refresh the three period views. Preserve the main checkout's unrelated dirty files. The usual private localhost report is already updated and verified.

## Done so far
- October 22 follow-up: Matthew asked for Week, Month and All time across the report and a plain explanation of `No referrer recorded`. Continued in a clean isolated checkout from latest main because the original pull request was merged and the main checkout has unrelated changes.
- Read separate Vercel Production totals, breakdowns and browser bounce rates for seven days, 30 days and available history beginning June 1, all ending October 21. The exact page-view breakdowns and daily or monthly trends reconcile. All time is labelled with its available-history limit. Counts and source receipts remain in ignored private files.
- Added shared Period controls on Traffic, Google Search and Site Health. Search uses the latest complete source day, October 20, and Health history uses its latest check. Static hostname and undated aggregate windows are visibly labelled as separate. The report now explains that an absent referrer can come from bookmarks, typed URLs, email or apps, and browser privacy settings.
- Twelve focused tests pass. Built the private report and verified Traffic Week, Month and All time plus Search and Health controls in a separate local preview on port 4189. Replaced and reloaded the durable report on port 4187 after archiving its previous state at /Users/mbaggetta/.codex/visualizations/2026/10/22/01a1641d-6b11-7611-a48d-6022ac7ee00f/performance-archive-before-periods-2026-10-22. Preserved the private release log and prior raw receipts.
- Opened pull request 78 for the public-safe report template and validation code. GitHub reports it is mergeable. The existing monthly automation remains active and now instructs the refresh to collect Week, Month and All time, without creating another schedule.
- Restored /private/tmp/wgg-report-refresh-20261022 and preserved all unrelated main-folder changes.
- Used the Data build-dashboard workflow. Read Welland Votes through Sites as a report reference only; its Site was not changed. Saved and verified the Growth presentation and original Traffic view.
- Refreshed every existing query. Added daily traffic, recorded-referrer acquisition coverage, daily search-click trend, selected-date page/query discovery, landing-page performance and retained page-check history.
- The authenticated Vercel CLI works although the connector returned 404. Used four hourly batches to respect API limits and Toronto day boundaries. Period, hourly and referrer page views reconciled. Browser supplied bounce rate, rounded shares and hostname scope. Matthew restored the browser login himself.
- Search Console final-day property totals reconciled independently; all prior daily history retained. Exact requests, capture times, row limits, source aggregation and transformations remain private.
- Recorded enquiry events only after the release-test day. Missing stages and received enquiries remain unavailable. No forms submitted or inbox accessed.
- Nine focused tests passed. Built both the local app and portable HTML. Verified three views, seven-day filtering and reset, matching filtered source rows, query grouping/reset, rendered desktop and narrow search charts, no page overflow at 400 CSS pixels and no browser errors.
- Replaced the durable backup only after validation. Verified the usual localhost address shows the new timestamp, unchanged artifact identity, same presentation and original Traffic view. The existing LaunchAgent still serves port 4187.
- Previous successful report preserved at /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-archive-2026-10-06.
- Vercel campaign dimensions returned a paid-plan restriction. Matthew declined paid analytics. The coverage table identifies that gap and the free-source recommendation. No paid add-on, new tracking, hosting or public website change.

## Waiting on Matthew
- Nothing. The private report is usable now.

## Notes for the next tool
- Private working data: private/performance/ in this checkout. Never commit analytics, source receipts or generated HTML.
- Durable current report: /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-backup. Its raw/2026-10-22 folder contains successful source requests. The final validation receipt and live context are beside snapshot.json.
- Durable local preview: http://127.0.0.1:4187/?view=1&tab=traffic. It requires the Mac and existing preview server to be running. Do not start another server on that port. The temporary verification preview for this follow-up is on port 4189.
- The separate refresh-20261022 folder preserves the read-only Welland Votes reference and original Growth presentation. Do not copy Welland Votes analytics into Growth.
- Vercel CLI uses OData filter text, not JSON. Maximum dimension limit100; hourly requests at most168 hours. Check effective returned bounds. Follow reporting/performance/README.md for all scopes and unavailable-data rules.
- No new hosting, form submission, inbox access or additional schedule was created. The existing monthly automation was updated for these period views.
