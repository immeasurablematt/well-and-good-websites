# Remove site consent controls and document manual analytics setup

Status: waiting
Branch: codex/remove-consent-controls
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/84
Updated: 2026-11-02 15:20 EST by Codex on Mac

## Goal
Matthew explicitly selected removal of only the consent controls, keeping GA4, Clarity, Vercel and the existing dashboard. Provide a clear manual checklist so he understands the existing accounts, settings and production verification.

## Next step
Matthew reviews the prepared privacy-page preview and manual checklist, including the unchanged Clarity cookie setting, then approves publication. Only after that approval, release this branch and verify live collection. Do not treat the local preview as published.

## Done so far
- Created a separate clean checkout at /private/tmp/wgg-remove-consent-20261102 from verified GitHub main 3f207879ab1dc3940424bab46c98209826a662cc. The dashboard checkout and unrelated canonical work were preserved.
- Removed the privacy checkbox, footer choice link, consent-specific styles, local-storage choice gate, and Google/Microsoft consent commands. Renamed the loader and focused tests to analytics.js and analytics.test.mjs.
- Kept the existing public tag IDs, production-host restrictions, URL sanitization, categorical enquiry events, ad-personalization restrictions and Clarity form masking. No forced consent grant is sent. The old stored choice is no longer consulted.
- Left all provider account settings unchanged. Clarity's consent-required cookie setting can still restrict cookie-dependent features. Removing the website control is not a legal-compliance determination.
- Updated the privacy notice and reporting documentation for the changed behaviour, while retaining the historical opt-in coverage boundary until actual release.
- Wrote docs/reporting/analytics-manual-checklist.md with the existing property and project IDs, manual account checks, duplicate-tag avoidance and production verification steps.
- Passed 17 focused analytics/enquiry tests and the 16-page production build and validation. Verified the rendered privacy page, missing checkbox/footer link, no console errors, and no optional tags on the loopback preview. No form submitted.
- Local review preview: http://127.0.0.1:4198/privacy/. Screenshot saved in the existing private visualization folder as consent-controls-removed-preview.png.

## Waiting on Matthew
- Manual review of provider settings and approval to publish the prepared removal. The live site still uses the prior consent controls.

## Notes for the next tool
- This is separate from draft dashboard pull request 83. Do not merge or replace that workstream and do not alter its note.
- Keep the existing GA4 property 560094220, web stream 16182626303 and Clarity project z1rewvqi70. The tag IDs are public identifiers, not credentials.
- The November 2 read-only diagnosis verified that opted-in production traffic reaches the correct GA4 stream. It did not establish that historical absence is a code fault. The user then explicitly chose removal of the controls.
- Do not add another tag installation, a consent grant on behalf of visitors, a paid analytics service, a new schedule, a form submission or mailbox access.
- After approved release, record its actual timestamp and update the existing weekly dashboard refresh to distinguish historical opt-in coverage from the new regime. Exclude controlled verification activity where the source permits. Do not claim complete capture or backfill.
