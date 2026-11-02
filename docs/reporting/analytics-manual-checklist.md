# Manual analytics checklist for Well and Good Growth

Prepared November 2, 2026. The consent-control removal is ready for review, not published. Until it is published, the live site still uses its existing privacy-page opt-in.

## What the change does

It removes the privacy-page checkbox, the footer's Analytics choices link and the stored-choice gate. After publication, Google Analytics starts on production pages. Microsoft Clarity starts on supported pages. The website does not send a signal claiming that a visitor granted consent. Previous checkbox choices are no longer consulted.

The existing protections remain: no tracking on local or preview hosts, sanitized page addresses, limited enquiry categories, no form contents in analytics events, and explicit form masking for Clarity. Vercel analytics, the enquiry form and the private dashboard stay in place.

Removing a control does not establish that automatic collection is appropriate for every visitor. Review the applicable consent requirements and the service settings below before approving publication. Google's and Microsoft's regional restrictions can still limit collection.

## 1. Check the existing Google Analytics property

Open [Google Analytics](https://analytics.google.com/) using your personal Google account. Select Well and Good Growth, then open **Admin > Data streams** and select its website stream.

Match these existing identifiers:

| Item | Expected value |
| --- | --- |
| Property | `560094220` |
| Web stream | `16182626303` |
| Measurement ID | `G-9V037QTGCE` |
| Website | `https://www.wellandgoodgrowth.ca` |

Use this property rather than creating another one. The tag is already installed in the website code. Do not paste another Google tag or add a second installation through Tag Manager; that can duplicate page views. Google's [tag troubleshooting guide](https://support.google.com/analytics/answer/9311124?hl=en) shows where to find the Measurement ID.

Check the property's reporting time zone is Toronto and its currency is CAD. Keep Google Signals, advertising personalization and user-provided data collection off. Keep automatic form measurement off: the site already sends its own four enquiry-step events without sending field contents.

## 2. Check the existing Microsoft Clarity project

Open [Microsoft Clarity](https://clarity.microsoft.com/), select Well and Good Growth, and open **Settings > Setup**. Confirm the project ID is `z1rewvqi70`. Its tag is already installed, so do not add a second copy. Microsoft's [setup instructions](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup) explain this screen.

In **Settings > Masking**, keep masking set to **Strict**. Keep form fields masked.

Review the cookie setting under **Settings > Setup**. It was configured to require consent before setting cookies. Removing the website checkbox does not change that account setting, and this code does not send a consent grant. Cookie-dependent features can therefore remain limited. Microsoft enforces consent signals for full functionality in the EEA, UK and Switzerland. Follow its [consent-mode instructions](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode) for your intended collection; do not tell the service that a visitor consented when they did not.

## 3. Review and approve the website change

Check the prepared privacy-page preview. Confirm the checkbox and footer choice link are gone, and that the notice explains the new collection behaviour accurately.

Once the provider settings and collection approach are settled, approve publication of the reviewed change. The agent will handle the website release. No command-line or branch cleanup work is needed from you.

## 4. Check collection after publication

1. In Google Analytics, open **Reports > Realtime** for property `560094220`.
2. In another browser tab, open the live homepage and one service page. For this test, use a browser that permits the analytics requests. No form submission is needed.
3. Look for a page view and session activity in Realtime. Then check Clarity for the test visit, allowing for processing and the project's cookie restrictions. A tag loading alone does not prove the service received it.
4. Note the date and time of your test so those visits can be labelled as verification activity. A form open or browser return is not proof of a received enquiry.
5. Allow 24 to 48 hours for normal GA4 reports to process, then check the completed dates. Google describes that processing window in its [data-freshness guidance](https://support.google.com/analytics/answer/11198161?hl=en).

The existing private dashboard can import verified aggregate GA4 reports on its weekly refresh. It cannot reconstruct earlier uncollected visits. Clarity recordings remain in the Clarity account; an automatic Clarity dashboard export has not been connected.
