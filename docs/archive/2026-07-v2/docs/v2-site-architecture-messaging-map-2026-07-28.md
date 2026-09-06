# Well and Good V2 Site Architecture and Messaging Map

**Date:** 2026-07-28  
**Status:** Working architecture for copy reduction  
**Source:** Live files in `site-v2/` and the approved auto-repair product messaging matrix

## 1. The message architecture

The site has three commercial ideas. They should appear in this order and should not be given equal weight on every page.

1. **Initial purchase:** An owned, search-ready website for an established independent Niagara auto-repair shop.
2. **Expansion:** Ongoing growth that produces more service appointments and ultimately more repair sales.
3. **Separate service line:** Custom automation for a specific repetitive workflow, scoped through its own discovery, pricing, and proof.

The supporting functions sit underneath those ideas:

- Website functionality: services, reviews, photos, diagnostic expectations, Google Business Profile connection, mobile actions, and service-request forms.
- Growth functionality: SEO, service and location pages, Google Business Profile work, structured data, analytics, call and request tracking, conversion improvements, and AEO monitoring.
- Automation functionality: process mapping, rules, integrations, AI where appropriate, monitoring, and human approval.

## 2. Current site architecture

```text
Homepage (/)
├── Services hub (/services/)
│   ├── Websites (/services/websites/)
│   ├── Ongoing search growth (/services/seo/)
│   ├── AEO and AI visibility (/services/aeo/)
│   └── Custom automation (/services/automation/)
├── How It Works (/engagements/)
├── Work (/work/)
├── About (/about/)
├── Contact (/contact/)
├── Search landing pages
│   ├── Web design Niagara (/web-design-niagara/)
│   ├── Affordable website design (/affordable-website-design/)
│   └── One-page websites (/one-page-websites/)
└── Utility
    ├── Privacy (/privacy/)
    ├── Thank you (/thank-you/)
    └── 404 (/404.html)
```

### Current header

`Services | Automation | Work | How It Works | About | Get a free website prototype`

### Current copy load

- Total reader-facing main copy across 16 pages: **7,767 words**
- Publishable marketing pages: **7,259 words**
- Homepage, services hub, websites, web-design Niagara, and affordable website pages: **3,066 words** explaining substantially the same website offer
- SEO and AEO pages: **1,329 words** separating two mechanisms that support the same growth capability
- Longest page: `/services/websites/` at **910 words**

## 3. Architectural problems causing verbosity

### 3.1 The same website offer is explained five times

The homepage, services hub, websites page, web-design Niagara page, and affordable website page repeat the same audience, search problem, trust logic, pricing, growth path, and prototype CTA.

### 3.2 AEO is presented as a product instead of functionality

The approved matrix says the client buys more appointments and ultimately more sales. AEO, structured data, and monitoring support that result. A standalone AEO service page gives the mechanism equal weight with the capability and forces the site to explain the distinction repeatedly.

### 3.3 The services hub adds a routing step without adding a decision

Automation already has its own header item. The services hub repeats the website, growth, and automation distinction before sending visitors to the actual service pages.

### 3.4 Pricing appears in three nearly identical sales pages

`/services/websites/`, `/web-design-niagara/`, and `/affordable-website-design/` all reproduce plans, one-time pricing, FAQs, and prototype forms. This increases maintenance risk and makes the site feel longer than the offer is.

### 3.5 Supporting pages restate positioning instead of supplying evidence

About, Work, and How It Works repeat the full website-growth-automation architecture. Their jobs should be narrower:

- Work proves the claims.
- About explains why Matthew is credible and accountable.
- How It Works explains what happens after the visitor chooses a service.

## 4. Recommended architecture

```text
Homepage (/)
├── Websites for repair shops (/services/websites/)
│   ├── Web design Niagara (/web-design-niagara/) [search landing page]
│   ├── Affordable website design (/affordable-website-design/) [price-intent landing page]
│   └── One-page websites (/one-page-websites/) [secondary audience landing page]
├── Ongoing growth (/services/seo/)
│   └── AEO and AI visibility [section within Growth]
├── Custom automation (/services/automation/)
├── Work (/work/)
├── About (/about/)
├── How It Works (/engagements/) [footer and contextual links]
├── Contact (/contact/)
└── Utility
    ├── Privacy (/privacy/)
    ├── Thank you (/thank-you/)
    └── 404 (/404.html)
```

### Route decisions

- **Retire `/services/` as a required navigation step.** Replace the header link with direct links to Websites and Growth. The route can redirect to Websites or remain as a short unlinked index for compatibility.
- **Merge `/services/aeo/` into `/services/seo/`.** Preserve the old URL with a redirect or retain it only as a concise educational landing page that points to Growth. Do not sell AEO as a fourth service line.
- **Keep the three search landing pages, but make them short.** Each should answer its distinct search intent and point to the canonical website offer instead of duplicating the full pricing and prototype experience.
- **Keep How It Works out of the primary header.** Link it from service pages and the footer when a visitor wants process detail.

## 5. Recommended header and footer

### Header

`Websites | Growth | Automation | Work | About | Get a free website prototype`

This gives the primary offer two direct destinations, keeps automation visibly separate, and preserves a single rightmost CTA.

### Footer

**Services**

- Websites for repair shops
- Ongoing growth
- One-page websites
- Custom automation

**Company**

- How It Works
- Work
- About
- Contact

**Local pages**

- Web design Niagara
- Affordable website design

**Legal**

- Privacy

## 6. Primary visitor flows

### Flow A: Repair shop without a website

```text
Search, referral, or direct visit
→ Homepage
→ Websites for repair shops
→ Pricing or prototype
→ Prototype form
→ Thank you
→ Purchase decision
```

**Message progression:**

1. Your reviews show that drivers trust the work.
2. An owned website makes that trust persuasive during an urgent search.
3. The site shows services, proof, expectations, and one clear next step.
4. See a prototype built around the real shop.

### Flow B: Existing client ready for growth

```text
Direct visit or contextual link
→ Ongoing growth
→ Growth scope and supporting functions
→ Contact with Growth preselected
→ Growth conversation
```

**Message progression:**

1. Launching the website is not the end of the work.
2. Ongoing growth creates more service appointments and ultimately more repair sales.
3. SEO, Google Business Profile, service content, AEO, and tracking support that result.
4. Start with the repair services the shop wants more work for.

### Flow C: Business with repetitive operational work

```text
Direct visit or header link
→ Custom automation
→ One workflow and evidence of fit
→ Contact with Automation preselected
→ Discovery
```

**Message progression:**

1. One repetitive workflow is wasting time or creating avoidable mistakes.
2. Map the process before choosing the technology.
3. Automate routine steps and keep human approval around risk.
4. Discovery determines whether the workflow is worth automating and what it should cost.

### Flow D: Search landing page visitor

```text
Google landing page
→ Short answer to the exact query
→ Canonical Websites page
→ Pricing or prototype
```

The landing page should not reproduce the entire canonical sales page.

## 7. Page-by-page messaging signposts

| Page | Role in the flow | Required messaging signposts | Primary next step | Current words | Target words |
|---|---|---|---|---:|---:|
| **Homepage** `/` | Orient the primary audience and route them to Websites | 1. Auto-repair audience. 2. Owned website outcome. 3. Three-step search-to-appointment path. 4. One proof signal. 5. Growth as the next stage. 6. Automation as a separate link, not a homepage section. | Get a free website prototype | 613 | 300–400 |
| **Services hub** `/services/` | Currently repeats routing already handled by navigation | If retained: one sentence per service line and direct links only. No definitions, process explanation, or final CTA section. | Websites or Growth | 333 | 100–150 |
| **Websites** `/services/websites/` | Main website sales page | 1. Strong reputation but no owned site. 2. Booked repair-work outcome. 3. What the site contains. 4. One-time pricing. 5. What happens after purchase. 6. Prototype form. | Get a free website prototype | 910 | 500–650 |
| **Growth** `/services/seo/` | Main expansion sales page | 1. More appointments and repair sales. 2. Growth begins after launch. 3. SEO, Google Business Profile, service pages, conversion work, tracking, and AEO as supporting functions. 4. What is measured. 5. Honest limits. | Discuss growth | 624 | 400–500 |
| **AEO** `/services/aeo/` | Supporting mechanism currently presented as a product | Merge the useful definition, structured-data explanation, monitoring, and citation limitation into Growth. If the URL remains, answer “What is AEO?” in one short page and link to Growth. | See ongoing growth | 705 | 0 after merge, or 200–300 as a search landing page |
| **Automation** `/services/automation/` | Separate service line | 1. Repetitive workflow problem. 2. One workflow first. 3. Map before building. 4. Rules, integrations, or AI as mechanisms. 5. Human approval. 6. Internal proof. 7. Discovery CTA. | Discuss one workflow | 747 | 400–500 |
| **How It Works** `/engagements/` | Explain delivery after a visitor chooses a path | 1. Website prototype and build. 2. Growth after launch. 3. Automation discovery. 4. What determines cost. 5. What happens next. Avoid repeating service definitions. | Choose a starting point | 539 | 300–400 |
| **Work** `/work/` | Prove claims without overextending them | 1. Frank as live website client. 2. JK Motors and Evelyn's as concepts. 3. Jetta Grove as prior consultancy evidence. 4. Automation as internal demonstrations. Keep labels, remove repeated offer explanations. | Get a website prototype | 428 | 300–400 |
| **About** `/about/` | Establish accountability and relevant experience | 1. Matthew in Welland. 2. One person responsible. 3. Website and growth experience. 4. Jetta Grove evidence. 5. Plain-language working principles. The service architecture needs one sentence, not a full recap. | See Work or get a prototype | 381 | 250–325 |
| **Contact** `/contact/` | Route two different enquiry types | 1. Website prototype uses the dedicated prototype form. 2. Growth and automation use the general form. 3. Service choice preselected. 4. Expected response. | Submit the relevant enquiry | 217 | 150–225 |
| **Web design Niagara** `/web-design-niagara/` | Location-intent search landing page | 1. Niagara repair-shop audience. 2. Owned website outcome. 3. Local proof and mobile action. 4. Link to canonical website pricing. Do not repeat all plans or the full form. | See websites for repair shops | 610 | 250–350 |
| **Affordable website design** `/affordable-website-design/` | Price-intent search landing page | 1. One-time builds start at $297. 2. Affordable means focused scope, not generic work. 3. Link to full website comparison. Do not repeat all monthly plans or the full form. | Compare website options | 600 | 225–325 |
| **One-page websites** `/one-page-websites/` | Secondary appointment-business lane | 1. Barbers, salons, groomers, and similar businesses. 2. Existing booking system stays. 3. Services, proof, policies, and booking link on one page. 4. When one page is not enough. | Get a one-page prototype | 552 | 300–400 |
| **Privacy** `/privacy/` | Legal utility | Collection, use, processors, security, choices, and contact. | None | 261 | Keep as needed |
| **Thank you** `/thank-you/` | Confirm submission and set expectations | Confirmation, response timing, next step for the selected service, and two useful links. | Work or How It Works | 187 | 100–150 |
| **404** `/404.html` | Recover a broken path | State the problem and offer Home, Websites, Growth, and Contact. | Return to a useful route | 60 | 50–80 |

## 8. Copy compression rules

Apply these rules while rewriting each page:

1. **One page, one job.** If a paragraph belongs to another page's job, link to that page instead of repeating it.
2. **One capability statement.** Lead with what the client gets. Put tactics underneath it once.
3. **One proof block.** Use only the evidence relevant to that page.
4. **One primary CTA.** A secondary CTA may support comparison, but should not introduce another funnel.
5. **No duplicate pricing tables.** Keep the complete pricing source on the canonical Websites page.
6. **No duplicate forms.** Keep the repair-shop prototype form on Websites. Search landing pages link to it.
7. **No mechanism promoted above the outcome.** SEO, AEO, structured data, analytics, and tracking remain beneath appointments and sales.
8. **FAQs earn their space.** Keep only objections not already answered in the body.
9. **Short paragraphs.** One idea per paragraph, usually one or two sentences.
10. **Stop after the decision is possible.** Do not keep explaining once the visitor knows who it is for, what they get, why to trust it, what it costs, and what to do next.

## 9. Recommended copy-editing order

1. Homepage
2. Websites
3. Growth, including the AEO merge
4. Automation
5. Work
6. About
7. How It Works
8. Contact and Thank You
9. Web design Niagara
10. Affordable website design
11. One-page websites
12. Services hub retirement or compression

This sequence locks the core message once, then makes every supporting page point back to it instead of recreating it.
