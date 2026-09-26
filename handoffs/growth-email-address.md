# Use the Growth email address

Status: done
Branch: codex/growth-email-address
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/68 (merged)
Updated: 2026-09-26 13:02 EDT by Codex on Mac

## Goal
Use matt@wellandgoodgrowth.ca across the live website and verify the existing email routing.

## Next step
None. The requested website update is published and verified.

## Done so far
- Verified public MX records route both domains through Forward Email and the Growth domain already has a matt forwarding rule.
- Privately checked prior received and sent messages using the Growth address. No mailbox contents or identifiers are saved in this public note.
- Replaced the old address in the shared footer, ProfessionalService structured data, and privacy notice. Updated the notice date.
- Built the site and passed the existing validator for all 15 HTML pages and 13 publishable routes.
- Pull request #68 merged. All 14 published pages returned HTTP 200, matched the tested build exactly, and used the new address with no old address remaining.
- Compared every generated file with the baseline. Only email references and the privacy date changed; assets and the existing contact-form delivery configuration are unchanged.

## Waiting on Matthew
- Nothing required for this completed website update. A fresh test message was offered but not sent without an answer; current DNS and existing received and sent mail were checked.

## Notes for the next tool
- This address and forwarding already existed. Do not create another mailbox or rewrite DNS unnecessarily.
- Preserve the existing FormSubmit endpoint, which is separate from public email links.
- Keep unrelated draft folders and other workstream notes untouched.
