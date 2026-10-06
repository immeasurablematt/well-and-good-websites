# Enquiry measurement

Released October 6, 2026 through PR #66 (production merge c1306c5). The signed-in Vercel team showed Pro. Production received a popup-open verification event after release; no form was submitted or inbox accessed. Start, submission-attempt and return delivery remain unverified in production. Exclude recorded verification activity from business outcomes; private receipts and the deployment change log preserve its details.

This is a new business. Start with a reliable baseline and individual enquiries rather than a conversion-rate target. Keep monthly counts alongside their dates and small denominators. Do not treat a few visits, zero observed events, or a change in percentage as a trend by itself.

## Definitions

| Dashboard stage | Vercel event | What it measures |
| --- | --- | --- |
| Popup open | `enquiry_open` | An ordinary CTA activation that opens the enquiry dialog. Reopening counts again. |
| Form start | `enquiry_start` | First input/change in a visible form field per opening or page load. Programmatic service preselection does not count. |
| Submission attempt | `enquiry_submit_attempt` | Native-valid submit event with empty honeypot, once until reset or restored with Back. Does not prove acceptance or delivery. |
| Return signal | `enquiry_return` | Matching return fragment and same-tab marker within one hour. Consumed once. Does not prove email reached the inbox. |
| Confirmed received | No browser event | Separately count legitimate enquiries actually received, excluding tests, spam and duplicates. |

These are event counts, not distinct people. Do not divide confirmed receipts by popup opens and call that a visitor conversion rate. A visitor can open the form several times or enquire by email. Direct contact-page entries can produce a start without a popup open.

## Data boundaries and failure behavior

Only allowlisted `page`, `placement`, and `service` values enter custom event properties. No form text, email, name, business, package text, full URL, or random token enters them. The Vercel beforeSend hook retains only the exact campaign labels listed below, removes all other query parameters and fragments from event URLs, and groups unknown paths under `/other/`. Current host is retained by the analytics provider. This deliberately means arbitrary URL query values will not appear in analytics.

Custom events run only on HTTPS production domains `www.wellandgoodgrowth.ca` and `wellandgoodgrowth.ca`. All events are cancelled by beforeSend on localhost and preview hosts. Existing current-domain production pageview collection remains enabled. The former `wellandgoodwebsites.ca` and `www.wellandgoodwebsites.ca` hosts are deliberately excluded from this new measurement scope: redirected visitors are measured after arrival at the current domain. Historical all-project traffic, which included the former domain, must remain labelled separately. This change does not alter redirects, and it will omit visits that remain on a separately served former-domain page. The helper is bundled after the ordinary form code and before the Vercel deferred script, so the privacy hook is installed before analytics starts.

A return marker contains a random token, timestamp and the same allowlisted categories in sessionStorage. The hidden `_next` field adds that token as a fragment to the existing FormSubmit thank-you redirect. A return removes the marker and fragment. Direct thank-you visits, reloads, stale/malformed markers and mismatched tokens do not emit returns. Back-forward cache restoration resets the attempt guard, redirect and marker so a retry is measurable. The one-hour limit bounds matching, while an unused marker may remain until the tab session ends. This is measurement deduplication, not server-side proof of a submission.

Ad blockers, unavailable analytics, disabled JavaScript, unavailable storage, a changed tab/origin, or a redirect that does not retain the fragment can cause undercounting. Native HTML validation, FormSubmit delivery and existing motion remain unchanged. Storage/randomness failures preserve the original thank-you redirect. No tracking script waits before navigation or prevents submission. Failure to install the analytics privacy hook stops this optional helper without throwing into native site code.

## Verification and release follow-up

Run `node --test scripts/tests/enquiry-measurement.test.mjs`, `python3 scripts/build_growth.py`, and `python3 scripts/validate_growth.py`. The dependency-free mocked browser checks cover native-submit preservation, invalid/prevented/honeypot submits, deduplication, direct visits, stale markers, Back restoration, unavailable storage/analytics, production gating and data allowlists. They make no network requests and submit no forms.

Popup-open ingestion was verified at release. Verify the remaining events as organic enquiries occur. Until ingestion is observed, show measurement as unverified or unavailable, never zero. A complete controlled FormSubmit delivery test requires separate permission because it sends a real submission. That check must confirm the fragment survives the provider redirect and the enquiry arrives in the inbox. A successful build or mocked return does not verify provider delivery. Avoid changing analytics plans or settings to make the code work.

## Link tagging

For links Matthew controls, use only these exact lowercase labels. The privacy hook retains them in the analytics event URL. Unknown values, duplicated parameters, `utm_content`, `utm_term`, and all unrelated parameters are dropped. Do not put a person's name, email, or a client identifier into a link.

| Retained field | Allowed values |
| --- | --- |
| `utm_source` | `linkedin`, `facebook`, `email`, `newsletter`, `referral` |
| `utm_medium` | `organic_social`, `email`, `referral` |
| `utm_campaign` | `autumn_services`, `site_launch` |

Templates for the homepage (substitute an existing service-page path when appropriate):

- LinkedIn: `https://www.wellandgoodgrowth.ca/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=autumn_services`
- Facebook: `https://www.wellandgoodgrowth.ca/?utm_source=facebook&utm_medium=organic_social&utm_campaign=autumn_services`
- Newsletter: `https://www.wellandgoodgrowth.ca/?utm_source=newsletter&utm_medium=email&utm_campaign=site_launch`
- Ordinary email: `https://www.wellandgoodgrowth.ca/?utm_source=email&utm_medium=email&utm_campaign=site_launch`
- Referral link: `https://www.wellandgoodgrowth.ca/?utm_source=referral&utm_medium=referral&utm_campaign=site_launch`

These labels describe the currently tagged page only. They are not stored across navigation or carried into the FormSubmit return, so they do not establish first-touch or complete enquiry attribution. No campaign identifiers are added to the session marker or custom event properties. The safe URL is covered by mocked tests; verify Vercel's campaign reporting after release before reporting attribution. Adding a campaign requires an explicit catalog update rather than accepting arbitrary text.

## Sources

- [Vercel custom events](https://vercel.com/docs/analytics/custom-events): Pro or Enterprise required; checked October 6, 2026.
- [Vercel's analytics client implementation](https://github.com/vercel/analytics/blob/main/packages/web/src/generic.ts): existing `va('event', {name, data})` and `va('beforeSend', callback)` interfaces used without another package.
- [FormSubmit settings](https://formsubmit.co/): `_next` specifies the redirect after submission. Fragment survival and inbox delivery are not established by that documentation or the mocked tests.
