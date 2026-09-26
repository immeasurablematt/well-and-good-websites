# Private website performance dashboard

Status: active
Branch: codex/performance-dashboard
Pull request: none yet
Updated: 2026-09-25 21:42 EDT by Codex on Mac

## Goal
Set up a private performance dashboard for Well and Good Growth, using the Welland Votes and Frank Baggetta dashboards as references.

## Next step
Verify Vercel Analytics and Search Console access, then build the private dashboard with real source data and explicit coverage gaps.

## Done so far
- Ran the required handoff check and reviewed both reference implementations.
- Matthew approved an isolated checkout at /private/tmp/wgg-performance-dashboard. The original checkout and its untracked folders are untouched.
- Confirmed the production site builds from scripts/build_growth.py; private reporting must stay out of its public output.
- Live homepage includes Vercel Analytics and no Google Analytics tag.

## Waiting on Matthew
- Nothing right now.

## Notes for the next tool
- Never commit private analytics, credentials, or client details to this public repository.
- Preserve missing data as unavailable, distinguish enquiries from traffic, and exclude incomplete days from comparisons.
- Do not alter other workstream notes or merge into main without publication authority.
