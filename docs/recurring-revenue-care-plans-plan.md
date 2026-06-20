# Well and Good Websites — Recurring Revenue & Care Plan Plan

Date: 2026-06-16
Status: Draft for owner review
Scope: Defines a recurring revenue model to sit alongside the existing one-time build packages.

## Why This Exists

The site and the existing planning doc only describe one-time builds:

- Starter — $497
- Standard — $997
- Premium — $1,497

There is currently **no recurring revenue stream documented anywhere** in the repo
(no hosting, maintenance, care plan, or retainer). That means:

- Revenue resets to zero after every build and depends on constant new sales.
- Clients have no clear, paid path to keep their site updated, secure, and online.
- Predictable monthly cash flow and client lifetime value are both left on the table.

This document proposes a simple, affordable recurring model that fits the brand:
fast, practical websites for owner-operated local businesses — not an agency retainer.

## Pricing Model At A Glance

Two parts to every engagement:

1. **One-time build** (unchanged): $497 / $997 / $1,497 CAD.
2. **Optional recurring care plan** (new): a monthly or annual subscription to keep the
   site live, current, and working.

The care plan is presented at handoff, not as a forced upsell. The pitch:
"Your site is built. A care plan keeps it online, secure, and updated so you never
have to think about it."

## Proposed Care Plans (Recurring)

All prices CAD. Annual is billed once and priced at ~10 months (2 months free) to
encourage prepayment and reduce churn/admin.

| Plan | Monthly | Annual | Best for |
|---|---:|---:|---|
| **Lite** (keep it online) | $25/mo | $250/yr | Starter clients who just need the site live and safe |
| **Care** (keep it current) | $49/mo | $490/yr | Standard clients who change hours, photos, services, or promos |
| **Growth** (keep it working) | $99/mo | $990/yr | Premium clients who want bookings, reviews, and local visibility maintained |

### Lite — $25/mo
- Hosting, SSL, and domain management
- Uptime monitoring and automatic backups
- Security: SSL renewal, HTTPS/headers checks, and host/platform config kept current
  (these are static one-page sites with no backend or package dependencies, so there is
  no application dependency stack to patch — the work is keeping hosting, the domain, and
  the certificate healthy)
- Small fixes (broken link, typo, hour change): up to 1 small request/month
- Email/Telegram support

### Care — $49/mo (everything in Lite, plus)
- Up to 30 minutes of content edits per month (hours, photos, services, pricing, copy)
- Quarterly review of contact/booking links to confirm everything still works
- Priority support turnaround
- One seasonal update per year (holiday hours, seasonal promo)

### Growth — $99/mo (everything in Care, plus)
- Google Business Profile maintenance (posts, hours, photos, info sync)
- Review funnel / review-highlight upkeep
- Up to 60 minutes of content/conversion edits per month
- Light monthly performance check (calls/clicks/bookings) with a short plain-English note
- Fastest turnaround on requests

## Bundling With Build Packages

Suggested natural pairing (not enforced):

| Build package | Suggested care plan |
|---|---|
| Starter ($497) | Lite ($25/mo) |
| Standard ($997) | Care ($49/mo) |
| Premium ($1,497) | Growth ($99/mo) |

Optional incentive: first month of the matching care plan included free with each build,
then it continues at the standard rate unless cancelled.

## A La Carte (One-Time, For Non-Subscribers)

For clients who decline a plan but later need work:

- Single content update: $49
- Photo/gallery refresh: $99
- Seasonal promo update: $79
- Add a section to the one-page site: from $149
- Reactivation (resume a lapsed site/hosting): $99 + back-billing or current plan rate

A la carte rates are intentionally set so the Care plan ($49/mo) is the obvious better
value for any client who needs more than one change a year.

## Economics & Margin

These are static one-page sites, so recurring costs are very low:

- Hosting: near-$0 on a host whose free tier permits commercial use — e.g., Cloudflare
  Pages — for static sites at this scale. Note: Vercel's Hobby (free) tier is
  personal/non-commercial only, so hosting paying clients there would violate its terms;
  if Vercel is preferred, budget for Vercel Pro (~$20/mo per member). Revisit hosting tier
  if a client needs commercial features or has heavy traffic.
- Domain: ~$15–$25/yr per client, passed through or absorbed into the plan.
- Main cost is the owner's time on content edits and support.

Implication: care plans are high-margin and the limiting factor is time per client, not
infrastructure. Keep monthly edit allowances capped (as above) to protect margin, and
push anything beyond the cap to a la carte or a plan upgrade.

Illustrative recurring revenue (owner sells, e.g., 20 active clients):

- 20 × Lite ($25) = $500/mo
- 10 Care ($49) + 7 Lite ($25) + 3 Growth ($99) = $490 + $175 + $297 = $962/mo

Even a modest book of clients creates a predictable monthly base that the current
build-only model does not.

## Positioning & Copy Notes

- Keep the brand promise intact: affordable, fast, practical — not an "agency retainer."
- Frame plans around outcomes owners care about: "stays online," "stays current,"
  "keeps bringing in calls and bookings."
- Be explicit that there is **no lock-in beyond the billing period** (monthly cancel
  anytime; annual is prepaid). This lowers the barrier to saying yes.
- State clearly what is and isn't included (the monthly time cap) so expectations are set
  and scope creep is contained.

## Suggested Rollout

1. Decide final plan names and prices (this doc is a starting point — adjust to taste).
2. Set up recurring billing (e.g., Stripe subscriptions or invoicing with auto-renew).
3. Add a "Care plans" / "Keep your site running" section to the homepage and the
   `/affordable-website-design/` page, mirroring the existing package card layout.
4. Add `Service`/`Offer` structured data for the recurring plans alongside the build offers.
5. Add FAQ entries: "Do you offer hosting and maintenance?", "What happens after my
   site launches?", "Can I cancel anytime?"
6. Offer the matching plan at every build handoff; default new clients to a plan with the
   first month free.

## Open Decisions For The Owner

- Final price points (the $25/$49/$99 ladder is a recommendation, not fixed).
- Whether to include the domain cost in the plan or bill it through separately.
- Whether to make a care plan mandatory for the first 12 months on new builds, or keep it
  fully optional.
- Billing tool of choice (Stripe vs. manual invoicing).
