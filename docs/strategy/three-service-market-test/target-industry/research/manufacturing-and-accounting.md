# Vertical research: small manufacturers and accounting firms

Researched 2026-09-26. All URLs accessed 2026-09-26 unless noted. Labels: [A] assumption or derived estimate, [NE] no evidence found, [LQ] low-quality source (vendor or agency marketing, self-reported, or unverified). Currency is USD for US figures and CAD for Canadian figures unless stated.

Business names and URLs for the website sample are in a private file kept outside this repository.

---

## Industry 1: Small manufacturers and industrial job shops

NAICS codes used: 332710 machine shops; 3323 architectural and structural metals (fabrication); 3261 plastics products. Contract manufacturers are spread across many codes and are not counted separately [NE].

### A. Size

**United States, County Business Patterns 2023 (establishments with paid employees)**
Source: US Census Bureau, CBP 2023, table CB2300CBP, https://data.census.gov/table/CBP2023.CB2300CBP?codeset=naics~332710 (swap the NAICS code in the URL for others).

| NAICS | All | <5 | 5 to 9 | 10 to 19 | 20 to 49 | 50 to 99 | 100 to 249 | 250+ | 5 to 99 subtotal [A, summed] |
|---|---|---|---|---|---|---|---|---|---|
| 332710 Machine shops | 17,156 | 7,877 | 3,632 | 2,775 | 1,992 | 614 | 245 | 21 | 9,013 |
| 3323 Architectural and structural metals | 14,533 | 4,706 | 2,592 | 2,457 | 2,685 | 1,204 | 685 | 204 | 8,938 |
| 3261 Plastics products | 9,636 | 1,794 | 1,064 | 1,362 | 1,965 | 1,538 | 1,363 | 550 | 5,929 |

**Canada, Canadian Business Counts, December 2025 (locations with employees)**
Source: Statistics Canada Table 33-10-1095-01, released 2026-02-13, https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3310109501 (queried through the StatCan Web Data Service).

| NAICS | Canada total | 1 to 4 | 5 to 9 | 10 to 19 | 20 to 49 | 50 to 99 | 100 to 499 | 5 to 99 subtotal [A] | Ontario total | Ontario 5 to 99 [A] |
|---|---|---|---|---|---|---|---|---|---|---|
| 332710 Machine shops | 2,403 | 907 | 621 | 426 | 319 | 86 | 44 | 1,452 | 1,009 | 591 |
| 3323 Architectural and structural metals | 2,376 | 600 | 433 | 436 | 531 | 230 | 141 | 1,630 | 869 | 595 |
| 3261 Plastics products | 1,807 | 371 | 257 | 294 | 358 | 285 | 225 | 1,194 | 829 | 535 |

Non-employer machine shops (3327 group, Canada): 1,702 (ISED Canadian Industry Statistics, reference year 2025, https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/3327).

Read: about 24,000 US and 4,300 Canadian establishments in the 5 to 99 employee band across these three codes alone [A, summed]. Ontario holds about 41% of Canadian employer establishments in fabricated metal products (ISED, NAICS 332, reference year 2025, https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/332).

### B. Value per customer

- **Direct evidence on annual value of a new OEM account: [NE].** No public benchmark found for revenue per customer at small job shops.
- **Shop revenue (Canada):** small businesses in NAICS 3327 (revenue CAD 30K to 5M, 3,043 businesses) averaged CAD 923,900 revenue and CAD 150,200 net profit when profitable; 73.4% were profitable. Reference year 2024. ISED Financial Performance, https://ised-isde.canada.ca/app/ixb/cis/performance/3327
- **Shop revenue (US):** machine shops had USD 44.73B receipts across 17,163 establishments in 2022, about USD 2.6M per establishment [A, derived average, skewed by larger shops]. Economic Census 2022, EC2231BASIC, https://data.census.gov/table/ECNBASIC2022.EC2231BASIC?codeset=naics~332710
- **Marketplace proxy:** Xometry reported 81,821 active marketplace buyers at 2025-12-31 and Q4 2025 marketplace revenue of USD 178M; only 1,760 accounts spent USD 50,000 or more in the prior 12 months. Xometry Q4 and FY2025 results, https://investors.xometry.com/news-releases/news-release-details/xometry-reports-record-fourth-quarter-and-strong-full-year-2025 (figures via search summary; the release page timed out on direct fetch). Annualizing Q4 gives roughly USD 8,700 per active buyer per year [A, rough run-rate].

**Payback math [A]:** a USD 3,000 to 5,000 site pays back if it produces incremental gross profit of that amount. Using the Canadian profitable-shop net margin of about 16% (150,200 / 923,900) as a conservative floor, that is USD 18,000 to 31,000 of new annual revenue. At a 30% contribution margin on incremental work [A], it is USD 10,000 to 17,000. In plain terms: one small repeat account, or two to four buyers at the Xometry-average spend. One new OEM account likely covers it, but this is inference, not measured.

### C. Website role

- 73% of technical buyers "routinely turn to vendor websites and online technical publications"; supplier/vendor websites are the top information source; buyers do about 60% of the buying process online before contacting a supplier; technical buyers are almost twice as likely to see a strong website as a sign of credibility than a trade show sponsorship; 15% list generative AI platforms as a routine source. Over 1,000 respondents, global, electronics-heavy. TREW Marketing and GlobalSpec, 2025 State of Marketing to Engineers, published 2025-03-04, https://advertising.globalspec.com/wp-content/uploads/2025/02/SMTE_2025.pdf and https://www.trewmarketing.com/blog/2025-state-of-marketing-to-engineers-research [LQ: sponsored by an agency and a directory, sample skews to electronics engineers, not job-shop buyers].
- Thomas survey of 400+ buyers: top shortlisting factors are lead times, price, current quality certifications, and consistent company information across directories; buyers expect quote replies within 24 hours. Published 2021-05-27, https://blog.thomasnet.com/what-industrial-buyers-care-most-about-when-shortlisting-new-suppliers [LQ: platform vendor, dated].
- What the site must do [A, from the sources above and the sample]: plain list of processes and materials, equipment list with envelope sizes and tolerances, certifications (ISO 9001, AS9100, CWB, CSA N299 for nuclear), industries served, photos of real parts and the shop floor, and an RFQ form that accepts drawings (STEP, PDF) with fast reply.

### D. Platform lock-in

- **Thomasnet:** free listing; paid "Verified" tiers add direct RFQs, visitor identification and premium placement. Thomas claims 2.2M registered users and 1.4M active buyers, and sells "Website Design & SEO" services. No public prices. https://business.thomasnet.com/programs [LQ: vendor claims, undated]. Third-party reports of USD 3,000 to 8,000 per year for paid programs are [LQ] (https://www.topbubbleindex.com/blog/thomasnet-pricing-reviews/).
- **Xometry:** a marketplace that wins the buyer, then routes jobs to shops as suppliers. It owns Thomas. It competes for the customer relationship rather than giving the shop a site.
- **Hubs (Protolabs Network):** ranks a page for "CNC machining service Hamilton" (seen in search, https://www.hubs.com/cnc-machining/canada/hamilton/). Marketplaces compete for local search terms.
- **Good-enough verdict [A]:** none of these hands a shop its own credible website. They are lead channels that sit alongside a site. Low lock-in.

### E. Website quality sample (n = 10)

Method: Google Maps searches "machine shop Hamilton ON" and "machine shop Columbus OH", taken in listed order, skipping automotive engine machine shops (out of scope). Rated on a mobile viewport plus page source checks. Maps order favors listings with reviews, so this is not random; n = 10 is directional only.

| Band | Hamilton ON (5) | Columbus OH (5) | Total |
|---|---|---|---|
| No website listed | 1 | 2 | 3 |
| Weak (0 to 5) | 0 | 0 | 0 |
| OK (6 to 9) | 3 | 3 | 6 |
| Strong (10 to 12) | 1 | 0 | 1 |

Patterns: sites are usually functional and mobile-responsive but dated. Common gaps: vague service copy ("custom machining"), stale facts (one site says "13 years of experience" while also saying "since 2002"), no RFQ file upload, few or no reviews, Gmail addresses on the site, heavy page builders that render blank for seconds on mobile. The one strong site appeared newly built with niche positioning (crane and hoist components). The 3 no-website shops had few or no Google reviews. The no-website share is the clearest visible pain.

### F. Vertical specialists

| Vendor | Published price and scope | Source |
|---|---|---|
| Machining Partner (US, remote) | Compact site USD 749; starter USD 1,500; standard USD 1,499 promo (regular 2,499); extra pages from USD 149; blog setup USD 699 | https://machiningpartner.com/web-design-solutions-for-manufacturing-companies/ |
| Creative Canvas Web | Manufacturing websites "starting at" USD 2,499 (via search summary) | https://creativecanvasweb.com/services/manufacturing-website-design-agency/ |
| MFG Web Design (Bootstrap Creative, Michigan) | No prices published; RFQ automation, industrial SEO, CRM integration | https://mfgwebdesign.com/industries/machine-shop-web-design |
| Gorilla 76 (US) | Full programs USD 200K to 300K per year including media; lighter year-one USD 50K to 100K; clients are OEMs and contract manufacturers | https://www.gorilla76.com/industrial-marketing-services/ (via search summary) |
| Thomas (Xometry) | Website Design & SEO offered; no public prices | https://business.thomasnet.com/programs |

Read [A]: the market has a cheap template tier and an expensive program tier. The USD 3,000 to 8,000 strategy-plus-copy-plus-build tier for 10 to 50 person shops looks thin.

### G. Reachability

- **Associations:** NTMA about 1,000 member companies, 26 chapters (https://ntma.org/); PMA more than 1,100 member companies including suppliers (https://www.pma.org/about/), with public chapter member lists such as https://www.pma.org/cleveland/member-list.asp; PMPA about 400 members (search summary, https://www.pmpa.org/membership-directory/, [LQ]); CTMA (Canada) member search at https://ctma.com/membership/member-search/, about 190 to 200 members (search summary [LQ]); CME claims 2,500 direct members, 85% SMEs (search summary [LQ]).
- **Directories:** Thomasnet, Macrae's Blue Book, state manufacturing directories, Google Maps "Machine shop" category, Canadian Metalworking directory.
- **Trade shows and publications:** IMTS (Chicago), FABTECH, CMTS (Toronto); Modern Machine Shop, The Fabricator, Canadian Metalworking, Shop Metalworking Technology [A, well known, dates not checked].
- **Emails:** in the sample, sites mostly publish a phone number and a generic or Gmail address. Owner names often appear. [A]
- **CASL/CAN-SPAM:** Canadian cold email needs consent; implied consent can apply to a conspicuously published business address when the message relates to the recipient's role and no "no unsolicited messages" notice is shown (CRTC CASL FAQ, https://crtc.gc.ca/eng/com500/faq500.htm). US cold B2B email is allowed with accurate headers, a physical address and opt-out (FTC, https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).

### H. Budget evidence

- **Canada (best evidence):** small NAICS 3327 businesses spend on average 0.7% of revenue on advertising and promotion (0.6% top quartile, 0.9% bottom quartile), reference year 2024. ISED, https://ised-isde.canada.ca/app/ixb/cis/performance/3327. On CAD 923,900 average revenue, that is about CAD 6,500 per year [A, derived].
- **US:** machine shops bought USD 81.3M of advertising and promotional services in 2022 across 17,163 establishments, about USD 4,700 per establishment and 0.18% of receipts [A, derived]. Structural metals: USD 301.0M across 14,826 establishments, about USD 20,300 each. Economic Census 2022 (field PCHADVT), https://data.census.gov/table/ECNBASIC2022.EC2231BASIC?codeset=naics~332710
- Gartner's 9.5% of revenue for manufacturing marketing is enterprise-weighted and irrelevant here [LQ for this use].
- Read: a USD 3,000 to 5,000 site is roughly a full year of a typical shop's advertising spend. Affordable, but a real decision, not an impulse.

### I. Fit

- **Copy and capability explanation:** high value. Most sites list machines but do not explain what problems they solve, for whom, at what volumes.
- **Search and AI visibility:** niche capability searches ("5-axis", "AS9100", "large-diameter turning") matter; marketplaces already compete for local terms. Only 15% of engineers routinely use generative AI for sourcing today (TREW/GlobalSpec 2025).
- **Photo dependence:** medium to high. Real shop and part photos are the proof; the owner must supply them or allow a shoot.
- **Seasonality:** low [A].
- **Compliance:** low for advertising. Subset issue: shops making defense parts are under ITAR and, since 2025-11-10, CMMC contract clauses (48 CFR rule published 2025-09-10, summarized at https://www.preveil.com/blog/cmmc-final-rule-published/ [LQ: vendor summary]). An RFQ form that accepts controlled drawings needs care about where files are stored.
- **Cross-sell:** strong. RFQ intake, drawing capture, quote follow-up and CRM hand-off are a natural automation layer; capability-page SEO is a natural content layer.
- **Does it feel like the B2B work to avoid?** Partly. Buyers are engineers and procurement, so the content is technical B2B. But the client is an owner-operator, not a startup marketing team: no content calendars, no MQL reporting, short scopes. It is closer to "explain a trade business clearly" than to SaaS content marketing. Honest caveat: selling capability content to engineers is the same skill set Matthew used for B2B tech.

### J. Counterevidence and risks

- Repeat business and relationships drive much job-shop work; Thomas's own list puts lead times and price above anything a website controls.
- Low marketing spend (0.2 to 0.7% of revenue) signals owners who do not see marketing as a growth lever [A].
- Shops with no website at all tend to be the least reachable by email and least likely to buy.
- Marketplaces (Xometry, Hubs) capture first-time buyers and teach them to buy through a platform.
- Photo and technical detail require owner time, which owners on the shop floor lack [A].
- Customer concentration in a few OEMs means some shops do not want new customers [A].

### K. Scores (1 to 5)

| # | Criterion | Score | Why |
|---|---|---|---|
| 1 | Website visibly makes money | 4 | One new account covers the site; 73% of technical buyers use vendor sites. Relationship buying tempers it. |
| 2 | Owner can say yes | 4 | Family-owned, owner-led; site cost is about one year of ad spend, so it is a considered yes. |
| 3 | Pain visible from outside | 3 | 3 of 10 had no site; the rest were OK but dated. Pain is real but not dramatic. |
| 4 | No platform bundles a site | 4 | Thomas and Xometry are lead channels, not site replacements. |
| 5 | Findable and reachable | 4 | About 28,000 in-band establishments across US and Canada; association lists; emails less consistent. |
| 6 | Low compliance friction | 4 | No advertising regime; ITAR and CMMC only for a defense subset. |
| 7 | Matthew's strengths matter | 4 | Capability explanation and niche search are the gap in most sites. |
| 8 | Room to grow into other services | 5 | RFQ intake and follow-up automation is an obvious next step. |
| 9 | Proof transfers | 2 | Performer, auto repair and sandwich concepts do not resemble it; the enquiry-form pattern partly transfers. |
| 10 | Competition proves demand, door open | 4 | Cheap templates and expensive programs exist; the middle looks thin. |

---

## Industry 2: Small accounting, tax and bookkeeping firms

NAICS codes: US 541211 (offices of CPAs), 541213 (tax preparation), 541219 (other accounting, including bookkeepers); Canada 541212 (offices of accountants), 541213 (tax preparation), 541215 (bookkeeping, payroll and related). Payroll processors (US 541214) are excluded.

### A. Size

**United States, CBP 2023** (https://data.census.gov/table/CBP2023.CB2300CBP?codeset=naics~541211)

| NAICS | All | <5 | 5 to 9 | 10 to 19 | 20 to 49 | 50+ | 1 to 19 subtotal [A] |
|---|---|---|---|---|---|---|---|
| 541211 Offices of CPAs | 55,052 | 35,650 | 10,334 | 5,089 | 2,386 | 1,593 | 51,073 |
| 541213 Tax preparation | 28,762 | 19,876 | 6,010 | 2,092 | 651 | 132 | 27,978 |
| 541219 Other accounting | 47,699 | 37,450 | 6,201 | 2,370 | 1,122 | 556 | 46,021 |

Note: 541213 includes franchised tax-prep offices (for example H&R Block locations), which are not prospects [A].

**Canada, Canadian Business Counts, December 2025** (Table 33-10-1095-01, https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3310109501)

| NAICS | Canada total | 1 to 4 | 5 to 9 | 10 to 19 | 20 to 49 | 50+ | Ontario total |
|---|---|---|---|---|---|---|---|
| 541212 Offices of accountants | 14,437 | 10,516 | 2,040 | 1,019 | 554 | 308 | 5,009 |
| 541213 Tax preparation | 1,961 | 1,237 | 360 | 223 | 107 | 34+ (some suppressed) | 940 |
| 541215 Bookkeeping, payroll and related | 6,460 | 5,319 | 747 | 228 | 84 | 82 | 2,424 |

Plus 39,313 non-employer or indeterminate establishments in the Canadian 5412 group (ISED, reference year 2025, https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/5412). 74.9% of Canadian employer establishments in 5412 have 1 to 4 employees.

Read: well over 100,000 US and about 21,700 Canadian employer establishments in the 1 to 19 band [A, summed], plus a large solo tail.

### B. Value per customer

- **Individual returns (US):** average base Form 1040 fee USD 280 for CPAs, USD 228 for EAs; a Schedule C adds about USD 123 to 135; business returns start at an average minimum of USD 634. NATP 2025 Fee Study, 3,400+ preparers, https://www.natptax.com/news-insights/blog/how-much-do-tax-professionals-charge-in-2025-insights-from-natp-s-fee-study/ (page blocked direct fetch; figures via search summary, [LQ] until verified).
- **Monthly accounting clients (US):** CAS practices report a median average annual revenue per client of USD 17,867 (top performers USD 23,129), typical monthly fee USD 3,000, median 69 clients, 14 new clients a year, 10% client turnover. CPA.com and AICPA 2024 CAS Benchmark Survey, 200+ responses, published 2024-12, https://www.cpa.com/sites/cpa/files/2024-12/2024-CAS-Benchmark-Survey.pdf. Caveat: these are CAS practices inside firms with a median CAS revenue of USD 1.6M, larger than the target [A].
- **Firm economics (Canada):** small 5412 businesses (revenue CAD 30K to 5M, 36,704 businesses) averaged CAD 261,400 revenue and CAD 103,900 net profit when profitable; 87.7% were profitable. Reference year 2024. https://ised-isde.canada.ca/app/ixb/cis/performance/5412

**Payback math [A]:** USD 3,000 to 5,000 equals 11 to 18 new individual CPA-prepared returns in year one, or 5 to 8 small business return clients, or about 1 to 2 months of one monthly accounting client. Because clients renew for years (10% CAS turnover implies multi-year average tenure [A]), one or two new business clients a year covers it. Margins are high (about 40% net for profitable Canadian small firms, derived).

### C. Website role

- 57% of US businesses (revenue USD 1M to 100M, n = 350) found their current accounting firm through a peer referral; 3% through advertising. Businesses will pay up to a 25% premium for niche specialists; 98% of those that left a generalist moved to another specialist. TaxDome 2025 Niche Business Accounting Report, via CPA Practice Advisor, 2025-08-19, https://www.cpapracticeadvisor.com/2025/08/19/survey-of-smbs-shows-how-they-choose-and-evaluate-their-accounting-firm/167532/ [LQ: commissioned by a practice-software vendor].
- Evidence that prospects check the website after a referral: Hinge Research Institute reports on this topic (822 buyers in its accounting report), but the figures could not be verified from the landing page, https://hingemarketing.com/library/article/how_buyers_buy_accounting_finance_services [NE for a verified number].
- What the site must do [A]: say who the firm serves (niche), list services and how pricing works, show credentials and people, reviews, a booking or consultation path, and a client portal link.

### D. Platform lock-in

- **CPA Site Solutions:** USD 90, 111, 137 and 166.50 per month tiers; 69 to 160+ templates, 3,000+ page content library, monthly client newsletter, secure portal; claims 10,000+ firms. https://www.cpasitesolutions.com/pricing.php [firm count is a vendor claim, LQ].
- **Build Your Firm:** USD 85.50 per month base; USD 108 per month niche or custom (one-time setup fee); content library, newsletter, secure file exchange, payments. https://www.buildyourfirm.com/websites/accounting-website-types
- **TaxDome:** practice-management platform with a website builder (200+ templates), free hosting for subscribers, white-label portal. https://help.taxdome.com/article/96-how-to-add-taxdome-login-link-to-your-website and search summary of https://taxdome.com/website-branding (page blocked direct fetch).
- **Good-enough verdict [A]:** yes for many micro firms. A templated site with a content library, newsletter and portal for about USD 1,000 to 2,000 a year, bundled with tools they need anyway, is a strong substitute. The weakness is sameness: templated copy and no niche positioning.

### E. Website quality sample (n = 10)

Method: Google Maps searches "accounting firm London ON" and "accounting firm Indianapolis IN", taken in listed order, skipping sponsored listings. Same six-point rubric.

| Band | London ON (5) | Indianapolis IN (5) | Total |
|---|---|---|---|
| No website listed | 1 | 0 | 1 |
| Weak (0 to 5) | 1 | 1 | 2 |
| OK (6 to 9) | 1 | 2 | 3 |
| Strong (10 to 12) | 2 | 2 | 4 |

Patterns: top Maps listings are review-rich and marketing-active, and 4 of 10 sites were strong (modern builders, booking CTAs, hundreds of reviews). Weak sites were older, cluttered, or a hero image plus menu. Stale content appeared (a "2024 tax checklist" in late 2026). Several London listings used out-of-area phone numbers (Montreal, Saskatchewan and Toronto area codes), and one had no web presence found; these may be virtual practices or lead-generation listings [A]. Pain is less visible than in manufacturing.

### F. Vertical specialists

| Vendor | Published price and scope | Source |
|---|---|---|
| CPA Site Solutions | USD 90 to 166.50 per month, template sites plus content, newsletter, portal | https://www.cpasitesolutions.com/pricing.php |
| Build Your Firm | USD 85.50 to 108 per month plus setup for custom | https://www.buildyourfirm.com/websites/accounting-website-types |
| TaxDome | Website builder bundled into practice software | https://taxdome.com/website-branding (search summary) |
| MITCO Digital | From USD 499 for a 3-page SEO site; custom quotes | https://mitco.tech/websites-for-accountants/ |
| Hinge Marketing | Accounting and finance branding agency; no public prices | https://hingemarketing.com/industries/accounting-finance |

Read [A]: crowded at the low end, with template vendors that also bundle content and portals. A newcomer must sell niche positioning and copy, not a site.

### G. Reachability

- **Associations:** AICPA more than 412,000 members (search summary of https://www.aicpa-cima.com/about/landing/about [LQ until verified]); CPA Canada over 217,000 members (search summary, https://cpa.ca/docs/File/Governance/Annual%20Report%202025-2026-EN-Final.pdf); CPA Ontario more than 100,000 members; NATP 23,000+ members (https://www.natptax.com/about-natp/, search summary).
- **Public lists:** CPA Ontario publishes a Public Accounting Licence directory and a firm directory (https://www.cpaontario.ca/protecting-the-public/directories); US state boards publish licensee lookups [A]; chamber directories list firms (London Chamber lists 25 in its accounting category, https://business.londonchamber.com/list/category/accounting-taxation-bookkeeping-2394).
- **Communities and publications:** CPA Practice Advisor, Accounting Today, CPA Trendlines, AICPA ENGAGE, Scaling New Heights [A, well known].
- **Emails:** firm sites commonly publish emails and staff names [A, from sample].
- **CASL/CAN-SPAM:** as in Industry 1. Accountants also receive heavy vendor solicitation [A].

### H. Budget evidence

- **Canada (best evidence):** small 5412 businesses spend on average 1.8% of revenue on advertising and marketing, reference year 2024 (https://ised-isde.canada.ca/app/ixb/cis/performance/5412). On CAD 261,400 average revenue, about CAD 4,700 per year [A, derived].
- **US:** offices of CPAs had USD 144.73B receipts across 49,807 firms in 2022 (about USD 2.9M per firm, heavily skewed by large firms) and about USD 244,000 per employee [A, derived]. Economic Census 2022, EC2254BASIC, https://data.census.gov/table/ECNBASIC2022.EC2254BASIC?codeset=naics~541211. Small-firm marketing spend in the US: [NE] from a primary source; the AICPA MAP survey (2025, 1,073 firms, median net client fees up 6.7%, https://www.aicpa-cima.com/news/article/cpa-firms-report-steady-growth-in-revenue-and-profit-aicpa-research-finds) keeps expense detail behind membership.

### I. Fit

- **Copy and positioning:** high value where a firm wants to own a niche (the 25% premium and specialist-switching findings). Low value for generalist firms that grow by referral.
- **Search and AI visibility:** matters for validation and niche queries ("accountant for dentists London Ontario"). Referral still dominates discovery.
- **Photo dependence:** low (team headshots).
- **Seasonality:** strong. Canadian personal tax deadline April 30 (June 15 for self-employed); US April 15, extensions October 15. Owners are unreachable January to April [A]. Selling window is roughly May to December.
- **Compliance:** moderate, manageable. CPA Ontario Rule 217 bans false or misleading claims, statements that cannot be substantiated, claims of superiority over other firms, implying the practice is larger than it is, and misleading fee references such as "from $X" when unrepresentative; "specialist" claims must be substantiated; members are responsible for their agents' work (CPA Ontario Code of Professional Conduct, Rule 217 and guidance, https://assets.cpaontario.ca/members/regulations-guidance/pdfs/CPA-Ontario-Code-of-professional-conduct.pdf). AICPA Code 1.600 bars false, misleading or deceptive advertising. IRS Circular 230 section 10.30 governs tax practitioners' solicitation (https://www.ecfr.gov/current/title-31/subtitle-A/part-10/subpart-B/section-10.30).
- **Cross-sell:** intake, onboarding and document collection automations are a fit, but practice-management software (TaxDome and peers) already sells portals, intake forms and reminders. Content and newsletters are already bundled by template vendors.
- **Does it feel like the B2B work to avoid?** Less than manufacturing in content style (owner-led, local, plain language). But it is still B2B professional services marketing, and the buyer is often a numbers-first owner who questions marketing ROI [A].

### J. Counterevidence and risks

- Referral-driven: 57% referral vs 3% advertising (TaxDome 2025 [LQ]).
- Cheap, bundled substitutes at about USD 85 to 170 per month with content and portals.
- Top Maps listings already have strong sites; the visibly weak ones are the least marketing-minded.
- Tax season blocks four months of selling.
- Advertising rules add review steps for claims, testimonials and fee statements.
- Consolidation: private equity buying CPA firms is a known trend [A, not researched here], which would remove owner-led buyers over time.

### K. Scores (1 to 5)

| # | Criterion | Score | Why |
|---|---|---|---|
| 1 | Website visibly makes money | 3 | High client value, but referral dominates; site mostly validates. |
| 2 | Owner can say yes | 4 | Owner-led micro firms; cost equals about a year of their ad spend. |
| 3 | Pain visible from outside | 2 | 4 of 10 sampled sites were strong; weak ones are the least likely buyers. |
| 4 | No platform bundles a site | 2 | CPA Site Solutions, Build Your Firm and TaxDome supply good-enough sites cheaply. |
| 5 | Findable and reachable | 5 | Very large counts, public licensee and firm directories, published emails. |
| 6 | Low compliance friction | 3 | Professional advertising rules are real but manageable. |
| 7 | Matthew's strengths matter | 4 | Niche positioning copy and search matter for firms choosing a niche. |
| 8 | Room to grow into other services | 3 | Automation overlaps with practice software; content overlaps with bundled libraries. |
| 9 | Proof transfers | 2 | Existing work does not resemble it. |
| 10 | Competition proves demand, door open | 2 | Crowded low end plus established specialist agencies. |

---

## Cross-industry notes

- **Manufacturing looks stronger on the criteria that decide a solo builder's first vertical:** low platform capture, visible gaps (including no-website shops), a thin mid-price tier, and a natural automation follow-on (RFQ intake). Accounting wins only on reachability and client lifetime value.
- **Budgets are similar in size:** about CAD 4,700 to 6,500 a year in advertising for a typical small firm in either industry (ISED 2024). A USD 3,000 to 5,000 site is a full year of marketing spend in both. Payment plans or a smaller first scope may matter [A].
- **Sample bias:** Google Maps ordering favors review-rich listings, so both samples overstate quality. Manufacturing still showed 3 of 10 with no site; accounting showed mostly OK to strong.
- **AI-built sites are arriving:** one new strong machine-shop site looked recently generated with niche positioning [A]. Owners and cheap vendors can now produce decent-looking sites, so the differentiator is positioning, capability copy, RFQ workflow and search, not visuals.
- **Maps listing quality:** several accounting listings used out-of-area phone numbers, suggesting virtual or lead-generation listings [A]. Worth watching if outreach lists come from Maps.
- **Evidence gaps to close before committing:** direct data on job-shop customer value [NE]; verified US small-firm marketing spend for accountants [NE]; Xometry full-year numbers (fetch failed).
