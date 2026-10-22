# Show form sending state and prevent duplicate submissions

Status: active
Branch: codex/enquiry-sending-feedback
Pull request: none yet
Updated: 2026-10-22 16:25 EDT by Codex on Mac

## Goal
Make the enquiry form clearly show that a valid submission is in progress, so a slow redirect does not invite another click. Preserve native FormSubmit delivery and the existing thank-you page.

## Next step
Review the exact diff, push this branch, open and merge its pull request, then check the production asset and thank-you route without sending another form submission.

## Done so far
- Matthew submitted his own labelled test on production and reached the thank-you page. Read-only inbox verification found delivery.
- Added a sending label and status message, blocked repeat submit events, and restored the button after a form reset or Back navigation.
- The first submit still uses native form navigation. The focused tests pass, and the 15-page build and site validator pass. A local browser check posted dummy values only to a localhost endpoint and confirmed native POST navigation. No new production form was submitted during verification.

## Waiting on Matthew
- Nothing right now.

## Notes for the next tool
- Source: `site-growth/motion/06-form.js`. Focused check: `scripts/tests/form-submission-feedback.test.mjs`.
- Keep this branch separate from unrelated uncommitted work in the main checkout. Do not put private form contents or inbox details in this public note.
