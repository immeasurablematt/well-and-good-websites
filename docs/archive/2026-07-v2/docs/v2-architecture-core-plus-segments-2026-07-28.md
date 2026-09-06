# V2 Architecture Rework: Core Services + Segment Landings

**Date:** 2026-07-28  
**Status:** Proposal for approval. No live site or Reddit research changes yet.  
**Question answered:** How do we stop putting all messaging eggs in auto repair without becoming generic again?

---

## Bottom line

Yes. Raise the homepage and core service pages one level above any single trade. Put the sharp, research-backed language on dedicated segment pages.

That keeps the brand sellable to more than one vertical while preserving the conversion edge that generic local-agency copy loses.

The working model:

1. **Core pages** sell the offer in plain local-business language.
2. **Segment pages** sell one buyer, one pain story, one proof shape, and one next step.
3. **Search landing pages** catch generic queries and route into the core or a segment.
4. **Automation** stays a separate arm with its own buyer and CTA.

Do not make lawyers, HVAC, dental, or any unresearched vertical look equal to auto repair until that segment has pipeline fit, economics, and voice-of-customer evidence.

---

## Why this is the right move

### Evidence

- The live Niagara hot-lead set is **not** auto-only:
  - Appointment and personal care: **31** leads
  - Food and custom-order: **19** leads
  - Auto repair: **7** leads
  - All website gaps are Social only / No site / Weak-defunct
- Auto repair still has the strongest **ability to pay** and the only completed Reddit VOC + messaging matrix.
- Abstract market attractiveness ranked HVAC, dental, and family law highly, but those are expansion hypotheses, not the current acquisition system.
- Custom automation already has a different first-client signal: real-estate workflow work, not repair-shop websites.

### Inference

A mechanic-only homepage and mechanic-only service spine overfits one strong wedge and underuses the rest of the pipeline. A fully generic homepage without segment pages will recreate the old vague copy problem.

### Decision rule

| Layer | Specificity |
|---|---|
| Homepage and core service pages | Local owner-led businesses in Niagara and the GTA |
| Segment pages | One named buyer and one workflow |
| Proof labels | Exact and honest: live client, concept, prior consultancy, internal demo |
| Automation | Separate buyer, separate discovery, separate CTA |

---

## Recommended message hierarchy

### Brand-level promise

**Owned websites and local growth that turn reputation into the right next customer action.**

Not:

- Mechanic-only brand
- "AI operations company"
- One bundled system every client must buy

### Offer ladder

1. **First purchase:** Owned website
2. **Expansion:** Ongoing growth for more qualified enquiries, appointments, and sales
3. **Separate arm:** Custom automation for one repetitive workflow

AEO, structured data, Google Business Profile, analytics, and tracking stay functionality under Growth. They are not standalone products on the main nav.

---

## Recommended main service lines: 4

Keep the spine short. Four is enough.

| # | Service line | URL | What the client buys | What stays underneath |
|---|---|---|---|---|
| 1 | **Websites** | `/services/websites/` | An owned site that makes the business clear and easy to contact or book | Mobile build, services, proof, hours, location, forms, tap-to-call, GBP link, hosting options |
| 2 | **Growth** | `/services/growth/` or keep `/services/seo/` | More qualified local enquiries, appointments, and sales over time | SEO, local pages, GBP, conversion work, AEO, monitoring, call/request tracking |
| 3 | **One-page websites** | `/one-page-websites/` | A focused one-page site for simple appointment or single-offer businesses | Booking-link wrap, services, proof, policies, mobile actions |
| 4 | **Custom automation** | `/services/automation/` | One repetitive workflow handled with rules, integrations, or AI, with human approval where needed | Discovery, process map, integrations, monitoring |

### Why not 5+

Do not promote these as top-level services:

- **AEO alone** → section inside Growth
- **Care / maintenance alone** → package inside Websites
- **Social alone** → optional Growth component, not a nav item
- **Ads alone** → optional add-on note under Growth or Websites pricing

If a fifth line is ever added, the only coherent candidate is a packaged **Local Care** plan after Care is selling repeatedly. Not now.

### Naming note

Prefer public labels:

- Websites
- Growth
- One-page websites
- Automation

Avoid nav labels that force jargon: Agentic Operations, AEO, SEO-only.

Keep technical terms inside page body where they earn their place.

---

## Recommended architecture

```text
Homepage (/)
│
├── CORE SERVICE PAGES
│   ├── Websites (/services/websites/)
│   ├── Growth (/services/growth/ or /services/seo/)
│   ├── One-page websites (/one-page-websites/)
│   └── Custom automation (/services/automation/)
│
├── SEGMENT PAGES  /for/{segment}/
│   ├── Auto-repair shops (/for/auto-repair/)
│   ├── Appointment businesses (/for/appointment-businesses/)
│   ├── Local food and custom-order (/for/local-food/)
│   └── [Later] HVAC, family law, dental, real estate automation
│
├── SEARCH / INTENT LANDINGS
│   ├── Web design Niagara (/web-design-niagara/)
│   └── Affordable website design (/affordable-website-design/)
│
├── TRUST AND PROCESS
│   ├── Work (/work/)
│   ├── About (/about/)
│   ├── How It Works (/engagements/)
│   └── Contact (/contact/)
│
└── UTILITY
    ├── Privacy
    ├── Thank you
    └── 404
```

### Header

`Websites | Growth | Automation | Work | About | Get a free website prototype`

Optional later, once two or more segment pages exist:

`Industries` dropdown under footer or secondary nav, not cluttering the primary header until there are at least three live segment pages.

### Services hub

`/services/` becomes a thin router only:

- One sentence for each core service
- Links out
- No full sales argument

Or redirect `/services/` to `/services/websites/`.

### AEO route

`/services/aeo/` becomes either:

1. Redirect into Growth with an AEO section anchor, or
2. A short educational page that ends on Growth

Do not keep AEO as a peer product in the main offer set.

---

## What each core page must say

### Homepage

**Job:** Orient a local business owner and route them.

**Signposts:**
1. Owned website turns reputation into a clear next step for local customers
2. Growth comes after the site is live
3. Who this is for, at category level, not one trade only
4. One proof block with honest labels
5. Segment links for visitors who want their trade
6. Automation is available, separate

**Primary CTA:** Get a free website prototype  
**Secondary CTA:** See website plans  
**Do not:** Lead with mechanics only, or force every visitor through auto-repair language

### Websites

**Job:** Sell the first purchase.

**Signposts:**
1. Highly reviewed local businesses still lose searchers without an owned site
2. The site shows services, proof, expectations, and one clear action
3. Published pricing
4. Prototype before purchase
5. Links into segment pages for trade-specific examples

### Growth

**Job:** Sell the expansion after launch.

**Signposts:**
1. Client capability: more qualified enquiries, appointments, and sales
2. Mechanisms: SEO, local pages, GBP, conversion paths, AEO, tracking
3. Measurement by customer actions, not vanity activity alone
4. Honest limits: no guaranteed rankings, citations, or revenue
5. Starts from the services the business wants more of

### One-page websites

**Job:** Sell the simple lane.

**Signposts:**
1. Best when one offer, one area, one main action
2. Keeps the existing booking system
3. Services, proof, policies, booking link, call, directions
4. When one page is not enough, route to full Websites

### Automation

**Job:** Sell a separate arm.

**Signposts:**
1. One repetitive workflow first
2. Map before build
3. Human approval around judgment, money, and customer communication
4. Different discovery and pricing from websites
5. Internal demos and first-client categories only when labelled honestly

---

## Target audiences

### A. Website and growth arm

Use two layers: a **shared buying condition**, then **named segments**.

#### Shared buying condition

Established, highly reviewed local businesses in Niagara and the GTA that already get demand from referrals, Google, or social, but lack a strong owned website that turns that demand into clear enquiries, bookings, or sales conversations.

This condition unifies the pipeline better than forcing one industry label onto the whole brand.

#### Segment priority

| Priority | Segment | Why now | Page status | Entry offer |
|---|---|---|---|---|
| **1. Build first** | **Independent auto-repair shops** | Best economics, 7 active hot leads, completed VOC and matrix, clear demo wedge | Segment page ready to write from existing research | Multi-page or standard website + later growth |
| **2. Build second** | **Appointment businesses** (barbers, salons, groomers, nail, esthetics) | Largest pipeline cluster (31), simple platform-wrap story, lower ticket | Segment page after auto-repair | One-page website wrapping existing booking tools |
| **3. Build third** | **Local food and custom-order businesses** | Second pipeline cluster (19), order/call path is concrete | Segment page after appointment | One-page or small site with menu/order/call path |
| **4. Next research** | **Residential HVAC** | Highest abstract market score and strongest full-funnel workflow fit | No page until local validation | Website + growth, later ops add-ons only if wanted |
| **5. Next research** | **Small family-law firms** | High CPC, weaker website adoption, real intake gaps; higher compliance burden | No page until legal-marketing-safe messaging is defined | Trust/intake website + growth, not aggressive claims |
| **6. Watch** | **Independent dental** | Huge demand, mature sites, mixed capacity; easy to overpromise leads | Later | Only if underbooked clinics are reachable |
| **7. Watch** | **Roofing** | Strong project demand, weaker repeat cycle than HVAC | Later | Reputation + estimate-conversion site |

#### Explicit non-homepage audiences

These can appear as links or later pages. They should not own the homepage:

- Catholic Web Stewardship / mission sites: parked specialty
- Generic "any small business anywhere": too broad
- Enterprise ops buyers: automation arm only if validated separately

### B. Automation arm

| Priority | Segment | Why | Page status |
|---|---|---|---|
| **1. Starting hypothesis** | Real-estate agents / brokerages with repetitive admin workflows | First-client signal already exists | Keep under Automation page until more than one proof point exists |
| **2. Later** | Other professional services with intake, reporting, or follow-up loops | Natural adjacency | Only after repeated deals or strong discovery pattern |

Do not make auto-repair the automation hero. Do not make real estate the website hero.

---

## Segment page template

Every `/for/{segment}/` page should use the same skeleton and different evidence.

1. **Named buyer** and current reality
2. **Pain** in their words
3. **Capability** the buyer gets
4. **What the site or growth work includes** for that workflow
5. **Vision of use**
6. **Proof** relevant to that segment, labelled honestly
7. **Pricing path** link to core Websites or One-page page, not a duplicated full price table unless needed
8. **CTA:** free website prototype for that segment
9. **What we do not claim**

Auto-repair can be written now from the approved matrix.  
Appointment and food pages need their own VOC pass before final copy.  
Lawyers and HVAC need research before any public segment page.

---

## Primary visitor flows

### Flow 1: Generic local owner

```text
Homepage
→ Websites
→ Prototype form
→ Thank you
```

### Flow 2: Segment-aware owner

```text
Homepage or ads/search
→ /for/auto-repair/  (or appointment / food)
→ Prototype form
→ Thank you
→ Optional Growth later
```

### Flow 3: Existing site, wants more demand

```text
Homepage or Growth
→ Growth
→ Contact with Growth preselected
```

### Flow 4: Ops buyer

```text
Header Automation
→ Automation
→ Contact / discovery
```

### Flow 5: Search intent

```text
"web design Niagara" or "affordable website"
→ Intent landing
→ Core Websites or relevant segment
→ Prototype
```

---

## What changes from the current mechanic-centred map

| Current | Proposed |
|---|---|
| Homepage sells auto repair | Homepage sells owned websites + growth for local businesses |
| Websites page is auto-repair sales page | Websites page is core offer; auto repair moves to `/for/auto-repair/` |
| Growth explained in auto-repair terms only | Growth explained as more enquiries, appointments, and sales |
| One-page is a side note | One-page is a real product line for appointment businesses |
| AEO is a peer service | AEO folds under Growth |
| Pipeline segments underused | Appointment and food get dedicated landings after auto repair |
| Lawyers/HVAC mentioned casually | Parked until researched |

---

## Build order after architecture approval

1. Freeze this architecture.
2. Rewrite homepage and four core service pages at the higher level.
3. Create `/for/auto-repair/` from the approved matrix and existing VOC.
4. Keep current Websites pricing as the canonical price source.
5. Then VOC + matrix + page for appointment businesses.
6. Then VOC + matrix + page for local food.
7. Only then research HVAC / family law / dental for expansion segment pages.
8. Keep automation on its own track with real-estate as a labelled starting hypothesis.

---

## Recommendation

Approve this structure:

- **4 core services:** Websites, Growth, One-page websites, Automation
- **3 near-term segment pages:** Auto repair, Appointment businesses, Local food
- **2 intent landings:** Web design Niagara, Affordable website design
- **Homepage one level higher** than any single trade
- **No lawyer/HVAC/dental public segment pages yet**

### Why this set

- Matches the real lead list instead of only abstract CPC
- Keeps the strongest-paying wedge (auto repair) without trapping the brand there
- Gives the high-volume appointment cluster a true product path
- Leaves room for high-value professional and trades expansion later
- Preserves the hard-won rule that automation is a different buyer

---

## Decision needed from Matt

1. **Approve the 4 core service lines?** Websites / Growth / One-page / Automation  
2. **Approve first three segment pages?** Auto repair, Appointment businesses, Local food  
3. **Growth URL:** rename to `/services/growth/` or keep `/services/seo/` with Growth as the public name?  
4. **Segment URL pattern:** `/for/{segment}/` or `/industries/{segment}/`?

Once those four answers are in, the homepage markdown draft should be rewritten to the higher-level brand frame, and auto repair becomes the first segment page rather than the whole site voice.
