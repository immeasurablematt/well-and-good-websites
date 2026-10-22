# Refresh private dashboard and add applicable performance reports

Status: active
Branch: codex/performance-report-refresh
Pull request: none yet
Updated: 2026-10-22 10:44 EDT by Codex on Mac

## Goal
Refresh the private Growth dashboard and add applicable report sections from Welland Votes, preserving its view, identity, presentation and source provenance.

## Next step
The local refresh is complete. Review this workstream's public-safe template changes before any merge. Continue monthly refreshes using the durable backup and the updated runbook from this branch until merged. Free GA4 plus optional Clarity is recommended for future measurement; installing tracking or connecting a received-enquiry source is separate work.

## Done so far
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
- Review of public-safe report additions before any website-branch merge. The local dashboard is already usable.

## Notes for the next tool
- Private working data: private/performance/ in this checkout. Never commit analytics, source receipts or generated HTML.
- Durable current report: /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-backup. Its raw/2026-10-22 folder contains successful source requests. The final validation receipt and live context are beside snapshot.json.
- Local preview: http://127.0.0.1:4187/?view=1&tab=traffic. It requires the Mac and existing preview server to be running. Do not start another server on that port.
- The separate refresh-20261022 folder preserves the read-only Welland Votes reference and original Growth presentation. Do not copy Welland Votes analytics into Growth.
- Vercel CLI uses OData filter text, not JSON. Maximum dimension limit100; hourly requests at most168 hours. Check effective returned bounds. Follow reporting/performance/README.md for all scopes and unavailable-data rules.
- No new hosting, main merge, form submission, inbox access or schedule change was performed.
