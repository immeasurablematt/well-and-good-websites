# V2 Architecture Revision: V1 Base, Core Services, Better Segments

**Date:** 2026-07-28  
**Status:** Proposal for approval. No live HTML changes yet.  
**Inputs:** Live v1 site structure, existing segment research, hot-lead pipeline, Matt's corrections

---

## Direct answers

### 1. Websites vs one-page websites

**You are right. That is a weak top-level split.**

On the live v1 site, one-page is already treated as a **size/package**, not a different product:

- Launch plan = one-page website + growth foundation
- Express/Starter one-time builds = simpler sites
- Separate `/one-page-websites/` page is mainly an SEO/intent landing page

**Difference in plain terms:**

| | Full website | One-page website |
|---|---|---|
| **What it is** | Multiple pages when services, proof, or locations need room | Everything useful on one scroll |
| **Best for** | Multi-service trades, professional firms, shops with several offers | Single-offer or booking-platform businesses |
| **Buyer difference** | Needs room to explain services and earn trust | Needs one clear action: call, book, order |
| **Should it be a nav service?** | Yes | No |

**Decision:**  
One-page is a **website package / landing page**, not a fourth service line.

Keep `/one-page-websites/` only if it earns search traffic. Do not put it in the primary service architecture beside Websites and Growth.

---

### 2. Is local food worth a segment page?

**No.** Drop it.

Reasons:

- Lower ticket and messier creative needs (menus, photos, hours, seasonal items)
- Weaker fit for the growth expansion story you care about
- You explicitly do not want those guys
- Pipeline volume is not enough reason when economics and focus are weak

---

### 3. Which segments are worth testing instead?

Use two filters:

1. **Can they pay for a real website + growth?**
2. **Does the workflow make the offer coherent?** discovery → trust → enquiry/booking → follow-through → repeat/review

| Segment | Worth targeting? | Best arm | Why | Main risk |
|---|---|---|---|---|
| **Auto-repair shops** | **Yes. Near-term segment #1** | Websites + Growth | Active hot leads, strongest absolute economics in current pipeline, completed VOC + matrix | Small local pool |
| **Residential HVAC** | **Yes. Near-term segment #2 to research next** | Websites + Growth | Highest prior market score, urgent search behavior, service/repair/replace/maintenance loop, strong ability to pay | No current hot-lead cluster; need local list + VOC |
| **Small family-law firms** | **Yes, but third and careful** | Websites + Growth | High CPC, weaker website maturity, real intake/response gaps | Marketing rules, confidentiality, slower sales, no current pipeline |
| **Bookkeepers / CPAs** | **Maybe later, not first three** | Websites + light Growth | Trust, services, seasonal demand, local professionals can buy | Crowded template market, lower urgency than trades emergencies, no current research or pipeline |
| **Real-estate agents** | **Yes, but mostly for Automation first** | Automation primary; website secondary | First automation client signal; repetitive admin/follow-up workflows | Agent website market is saturated; do not make RE the website brand hero |
| **Appointment businesses** | **Secondary package audience, not brand hero** | One-page website package | Largest current lead count | Lower absolute profit pool |
| **Local food** | **No** | — | Dropped | — |

### Recommended segment set

**Public segment pages to plan for:**

1. `/for/auto-repair/`
2. `/for/hvac/`
3. `/for/family-law/` later, after compliance-safe messaging is defined

**Not a website segment hero:**

- Real-estate agents → featured use case on **Automation**
- Bookkeepers/CPAs → only after HVAC and auto-repair are live and selling
- Appointment businesses → handled through one-page package + maybe a thin landing later
- Food → out

---

## What the live v1 site actually is

### V1 architecture

```text
Homepage (/)                    single long sales page
├── #services                   website + growth plans
├── #options                    one-time website builds
├── #recent / work examples
├── #about
├── #contact / prototype CTA
├── /web-design-niagara/        location SEO landing
├── /affordable-website-design/ price SEO landing
├── /one-page-websites/         format SEO landing
└── /frank-baggetta/            live client proof
```

### What works in v1 and should survive

- **Loved H1 energy:**  
  `Your next customer is Googling you, and calling someone else.`  
  Keep this brand-level idea. It is higher-level than any trade and still sharp.
- Published pricing
- Website first, growth as the package around it
- Free prototype / low-friction start
- Local Niagara proof and Matt as the person doing the work
- Simple intent landings instead of a giant service encyclopedia
- Honest labels on concept vs live work

### What v1 is missing

- No focused service-line pages with a real messaging matrix
- No segment pages, so every trade gets the same generic pitch
- Growth, SEO, social, and website blur into one package story
- Automation is absent or underdeveloped as a separate arm
- Too easy for the page to stay broad and salesy without a named buyer

---

## Revised V2 architecture

Use v1's simple spine. Add only the pages that create focus.

```text
Homepage (/)
│
├── CORE SERVICE LINES
│   ├── Websites (/services/websites/)
│   ├── Growth (/services/growth/)
│   └── Automation (/services/automation/)
│
├── SEGMENT PAGES
│   ├── Auto-repair (/for/auto-repair/)
│   ├── HVAC (/for/hvac/)
│   └── Family law (/for/family-law/)   [after research + compliance check]
│
├── INTENT LANDINGS from v1
│   ├── Web design Niagara
│   ├── Affordable website design
│   └── One-page websites   [package/SEO page, not core service]
│
├── TRUST
│   ├── Work
│   ├── About
│   ├── How It Works
│   └── Contact
│
└── UTILITY
    ├── Privacy
    ├── Thank you
    └── 404
```

### Header

`Websites | Growth | Automation | Work | About | Get a free website prototype`

### Why only 3 core services

| Service | Client capability | Not the capability |
|---|---|---|
| **Websites** | Own a site that turns reputation into the right next customer action | "Having pages" |
| **Growth** | Get more qualified local enquiries, appointments, and sales over time | SEO activity reports |
| **Automation** | Remove one repetitive workflow without losing control of judgment | "AI transformation" |

One-page, Care, social, AEO, ads = packages or functionality under those three.

---

## Service-line messaging matrix

This is the core matrix the homepage and service pages should follow. Segment pages specialize it.

### Row 1: Websites

| Cell | Message |
|---|---|
| **Pain point** | Local customers already search, read reviews, and compare options. If the business has no clear owned site, the next competitor gets the call. |
| **Capability** | You can make your reputation, services, and next step obvious before the customer contacts you. |
| **Functionality** | Owned mobile website with services, proof, location, expectations, and one clear action such as call, book, request, or enquire. Google Business Profile connection, fast load, and clean structure included as needed. One-page or multi-page depending on the offer. |
| **Vision of use** | A customer searches, opens your site from Google or your profile, understands what you do and why you are trustworthy, and takes the next step the same day. |
| **Benefit** | More of the right local customers choose you instead of the easier-to-understand competitor. |

**Status quo beaten:** Facebook page, directory listing, or weak site that does not convert.

**Packages underneath, not separate services:**
- One-page
- Standard multi-page
- Premium multi-page
- Optional Care

### Row 2: Growth

| Cell | Message |
|---|---|
| **Pain point** | The website launches, then sits there while competitors keep showing up for the searches and neighbourhoods that create real work. |
| **Capability** | You can turn more local searches into qualified enquiries, appointments, and sales. |
| **Functionality** | Ongoing local SEO, service/location pages, Google Business Profile work, conversion improvements, structured data, analytics, call/request tracking, and AEO monitoring where useful. |
| **Vision of use** | Over time, more of the services you want to sell are findable. The right customer reaches a page that explains the offer and makes contact easy. |
| **Benefit** | A steadier flow of appropriate new business beyond referrals alone. |

**Status quo beaten:** Set-and-forget website, or marketing reports disconnected from customer actions.

**Important:** Rankings, citations, appointments, and sales are not guaranteed.

### Row 3: Automation

| Cell | Message |
|---|---|
| **Pain point** | A repetitive workflow eats hours every week: intake, follow-up, research, reporting, document prep, or handoffs between tools. |
| **Capability** | You can take one repetitive process off your plate while keeping human approval where judgment, money, or client communication matters. |
| **Functionality** | Discovery, process mapping, rules/integrations/AI where each fits, monitoring, and approval steps at risk points. |
| **Vision of use** | The routine work moves through the system. You review only the steps that need a person. |
| **Benefit** | Time back, fewer dropped balls, and a process that does not depend on memory. |

**Status quo beaten:** Manual copy-paste work across inbox, CRM, docs, and spreadsheets.

**Separate arm rule:** Different buyer, discovery, pricing, and proof from Websites/Growth.

---

## Homepage direction from v1 + new focus

### Keep

**H1 (v1, brand-level):**  
Your next customer is Googling you, and calling someone else.

This is better than a mechanic-only homepage headline. Keep it.

### Homepage job

1. State the brand problem and outcome
2. Offer Websites as the first purchase
3. Show Growth as the expansion
4. Point to 2–3 segment paths
5. Keep Automation visible but separate
6. Proof with honest labels
7. Prototype CTA

### Homepage should not

- Be only about auto repair
- Sell one-page as a separate philosophy
- Bundle automation into the main website promise
- Repeat full pricing three times

### Suggested homepage skeleton

1. Hero with v1 H1 + prototype CTA  
2. What you get: Website, then Growth  
3. Who it is for: local service and professional businesses, with segment links  
4. How it works: Understand → Build → Grow  
5. Proof  
6. Plans teaser linking to Websites page  
7. Final prototype CTA  
8. Quiet Automation link for the other arm

---

## Segment vs core: who speaks how

| Page type | Voice |
|---|---|
| Homepage / Websites / Growth | Local business owner language. No single trade owns it. |
| `/for/auto-repair/` | Mechanic/shop owner language from approved matrix |
| `/for/hvac/` | Home-service contractor language after VOC |
| `/for/family-law/` | Solo/small-firm lawyer language after VOC + compliance review |
| Automation | Workflow owner language; real-estate as current example, not only example |
| One-page landing | "Simple offer, one action" package language |

---

## Segment research priority from here

No Reddit work in this step. Order if you approve:

| Order | Segment | Why next | First research goal |
|---|---|---|---|
| 1 | Auto-repair | Already researched enough to write the page | Convert approved matrix into `/for/auto-repair/` |
| 2 | Residential HVAC | Best economics/workflow upside among non-food alternatives | Local Niagara/GTA list quality + owner VOC |
| 3 | Family law | Strong commercial gap if messaging can stay safe | Confirm local firm gaps + non-negotiable claim limits |
| 4 | Bookkeepers/CPAs | Only if trades/professional intake pages are converting | Test whether they buy websites or only templates |
| — | Real estate | Parallel track under Automation | Workflow inventory from first client, not a website segment push |

---

## Final recommendation

### Approve this model

1. **3 core services only:** Websites, Growth, Automation  
2. **One-page:** package + SEO landing, not a core service  
3. **Drop food**  
4. **Near-term segments:** Auto-repair, then HVAC  
5. **Later segment:** Family law  
6. **Automation example segment:** Real-estate agents  
7. **Park bookkeepers/CPAs** until the first two segments are live  
8. **Base structure on v1:** simple homepage spine + intent landings + focused service/segment pages  
9. **Brand display name is always Well & Good Growth**
10. **Homepage H1:** keep the v1 problem energy; prefer a sharper brand-level line if one wins review
11. **Use the 3-row service matrix above** as the core messaging system

### Why this is better than the last map

- Stops fake differentiation between website and one-page
- Stops over-fitting the whole brand to mechanics
- Stops wasting a segment slot on food
- Puts HVAC and family law in the right "research then page" lane
- Puts real estate in the right arm
- Stays close to the live v1 site you already like

---

## Decisions needed

1. Confirm **3 core services**: Websites / Growth / Automation  
2. Confirm **one-page is not a core service**  
3. Confirm **drop food**  
4. Confirm near-term segments: **Auto-repair + HVAC**, family law later  
5. Confirm homepage H1 stays the v1 line:  
   **Your next customer is Googling you, and calling someone else.**  
6. Growth URL preference: `/services/growth/` or keep `/services/seo/`?

After that, next writing step is:

1. Homepage markdown draft at brand level with the v1 H1  
2. Core service matrix pages  
3. `/for/auto-repair/` from the approved matrix  
4. HVAC research brief before any HVAC page copy
