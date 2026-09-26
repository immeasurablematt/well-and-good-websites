# Use the Growth email address

Status: active
Branch: codex/growth-email-address
Pull request: none yet
Updated: 2026-09-26 13:00 EDT by Codex on Mac

## Goal
Use matt@wellandgoodgrowth.ca across the live website and verify the existing email routing.

## Next step
Create the pull request, check deployment, and publish the requested email replacement. A fresh test email is optional and awaits Matthew's answer in chat.

## Done so far
- Verified public MX records route both domains through Forward Email and the Growth domain already has a matt forwarding rule.
- Privately checked prior received and sent messages using the Growth address. No mailbox contents or identifiers are saved in this public note.
- Replaced the old address in the shared footer, ProfessionalService structured data, and privacy notice. Updated the notice date.
- Built the site and passed the existing validator for all 15 HTML pages and 13 publishable routes.
- Compared every generated file with the baseline. Only email references and the privacy date changed; assets and the existing contact-form delivery configuration are unchanged.

## Waiting on Matthew
- Optional permission to send one fresh test message to his new address. Existing received and sent mail provide prior operational evidence.

## Notes for the next tool
- This address and forwarding already existed. Do not create another mailbox or rewrite DNS unnecessarily.
- Preserve the existing FormSubmit endpoint, which is separate from public email links.
- Keep unrelated draft folders and other workstream notes untouched.
