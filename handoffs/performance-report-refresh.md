# Refresh private dashboard and add applicable performance reports

Status: active
Branch: codex/performance-report-refresh
Pull request: none yet
Updated: 2026-10-22 10:29 EDT by Codex on Mac

## Goal
Refresh the existing private Growth dashboard and add applicable report sections from the Welland Votes dashboard. Preserve the current view, identity, saved presentation and source provenance.

## Next step
Complete the source-backed additions and validate all three views in a separate preview. Vercel source access is blocked pending owner sign-in, so keep the successful stable report intact until the refresh is complete or Matthew accepts stale traffic.

## Done so far
- Restored a separate checkout at /private/tmp/wgg-report-refresh-20261022, preserving unrelated main-folder changes.
- Read the installed Data build-dashboard skill and refresh contract. Saved the Growth live presentation and read the Welland Votes snapshot and presentation as a reference only.
- Refreshed authorized Search Console reads and five page checks. Source receipts and the coverage plan remain private.
- Vercel analytics connector returned 404. The browser session has expired; automatic review blocked starting GitHub authentication. Asked Matthew to sign in. No credentials, tracking or source settings changed.

## Waiting on Matthew
- Sign in to Vercel, or explicitly accept a partial refresh with traffic marked stale.

## Notes for the next tool
- Private working data: private/performance/ in this checkout. Never commit analytics or generated HTML.
- Durable prior report: /Users/mbaggetta/.codex/visualizations/2026/09/26/01a0db5a-ae02-7930-bb73-b3ae9192a943/performance-backup. Stable preview port 4187 is managed by the existing LaunchAgent.
- Today's read receipts and original live presentation are in the sibling refresh-20261022 folder. Preserve the original report until collection and validation pass.
- No new hosting, public website change, main merge, form submission, inbox access or schedule change is authorized by this refresh.
