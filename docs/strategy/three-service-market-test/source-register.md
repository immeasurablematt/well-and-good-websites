# Source register: three-service market test

Compiled September 25, 2026 by Claude desktop. All URLs were accessed on that date unless a row says otherwise. Full specialist notes, with longer source tables, are in `research/websites.md`, `research/growth-marketing.md`, and `research/automation.md`. The cross-line challenge is in `research/challenge.md`.

## How to read this register

Evidence types are kept separate. A row labelled one type is not evidence of another.

| Label | Meaning | What it cannot show |
|---|---|---|
| Adoption | Share of businesses using something (official or association survey) | Willingness to pay an outside provider |
| Search | Google Ads keyword estimates | Qualified buyers, conversion, or sales |
| Seller claim | A supplier's own marketing statement | Verified outcomes |
| Price | An advertised price on the date observed | What buyers actually paid |
| Transaction | Public-company results, marketplace volume, or buyer self-reported spend | This business's win rate or margin |
| Program | Government program status | Future intake or eligibility for this business |
| Assumption | A judgment made in this analysis | Anything, until tested |

Quality flags: **High** (official statistics, audited filings), **Medium** (named survey with a stated sample), **Low** (vendor marketing, undisclosed method, search-snippet only).

## Research costs

| Item | Cost | Notes |
|---|---|---|
| Codex keyword pull (automation only), September 25 | US$0.18 | Two DataForSEO calls, recorded in `sources.md` |
| Claude keyword pull (websites, growth, extra automation terms), September 25 | US$0.18 | Two DataForSEO calls through treg, 47 phrases each for Canada (2124) and the US (2840), English, September 2025 to August 2026, search partners excluded |
| Web research by four agents | US$0.00 metered | Public web pages only; no paid databases |
| **Total metered spend for this workstream** | **US$0.36** | Paid from existing promotional treg credit |

## Search data (all three lines, same method)

Files: `data/keyword-sample.csv` (automation, Codex), `data/keyword-sample-three-lines.csv` (all lines, Claude), raw JSON beside them.

Caveats that apply to every row: Google Ads groups close variants, so "web design", "website design", and "website designer" return the same 6,600 in Canada and must not be added together. Unavailable values are not zero. Searchers include students, marketers, and job seekers. Paid-search competition is not service-market competition.

| Comparison (monthly average, Sep 2025 to Aug 2026) | Canada | US | Reading |
|---|---:|---:|---|
| Core service term: "web design" / "seo services" / "ai automation agency" | 6,600 / 6,600 / 480 | 49,500 / 60,500 / 4,400 | Websites and SEO have similar national search interest; automation-specific terms are about a tenth of either |
| Niagara local terms: web design (niagara + st catharines + welland) | 340 combined | n/a | Only line with measurable local search |
| Niagara local terms: seo niagara + seo st catharines + digital marketing niagara | 100 combined | n/a | Small |
| Niagara local terms: ai automation niagara / welland / near me | unavailable | n/a | Too low to report |
| Toronto terms: "web design toronto" / "seo toronto" | 4,400 / 4,400 | n/a | GTA is where local search volume is |
| DIY substitute: "website builder" | 9,900 | 201,000 | DIY interest is larger than service interest |
| Buyer-vocabulary check: "growth marketing agency" | 70 | 1,900 | Buyers search "SEO" and "digital marketing", not "growth marketing" |
| AI search: "ai seo" + "generative engine optimization" | 880 + 590 | 6,600 + 4,400 | Real interest, likely many marketers learning the term |

## Cross-line evidence

| Claim | Source | Type | Quality | Caveat |
|---|---|---|---|---|
| 78% of Canadian small businesses have a website; 70% of firms with 0 to 4 staff; 66% name lack of time as the top barrier | [CFIB SME digital presence](https://www.cfib-fcei.ca/en/research-economic-analysis/sme-digital-presence), survey Sept 2025, n=2,478 | Adoption | Medium | Member panel, not random |
| Niagara has 14,458 businesses with employees, 13,641 with 1 to 49 staff | [Niagara Economic Development, regional quick facts](https://niagaracanada.com/data/regional-quick-facts/) citing StatCan Business Counts 2025 | Adoption (counts) | High | Counts, not buyers |
| Upwork total volume fell 4% while AI Strategy and Consulting grew more than 50%; SMB "Business Plus" volume up 174% from a small base | [Upwork Q2 2026 release (SEC)](https://www.sec.gov/Archives/edgar/data/1627475/000162747526000046/upwork2q26-pressrelease.htm) | Transaction | High | Global; category definitions not public |
| Fiverr active buyers down 21.9% in Q2 2026, weakness in categories most exposed to AI | [Fiverr Q2 2026](https://www.globenewswire.com/news-release/2026/07/29/3334963/0/en/Fiverr-Announces-Second-Quarter-2026-Results.html) | Transaction | High | Global marketplace |
| CASL implied consent by conspicuous publication requires a published address, no "no unsolicited messages" statement, and relevance to the recipient's role; sender carries the burden of proof | [CRTC CASL FAQ](https://crtc.gc.ca/eng/com500/faq500.htm), [ISED consent guidance](https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en/getting-consent-send-email) | Regulation | High | Not legal advice; confirm per campaign |
| CDAP and Digital Main Street Ontario grants are closed | [Digital Main Street](https://digitalmainstreet.ca/ontariogrants/), [GrantHub summary](https://granthub.ca/guide/cdap-canada) | Program | High / Low | No grant-driven demand to rely on |
| GST/HST small supplier threshold CAD 30,000; most services to non-residents are zero-rated | [CRA RC4022](https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/rc4022/general-information-gst-hst-registrants.html) | Regulation | High | Service-specific conditions not verified |

## Websites

| Claim | Source | Type | Quality | Caveat |
|---|---|---|---|---|
| Among Canadian firms with no digital presence, 55% say it is not relevant and 38% see no real need | [CFIB](https://www.cfib-fcei.ca/en/research-economic-analysis/sme-digital-presence) | Adoption | Medium | The no-website segment mostly does not want one |
| 83% of US small businesses have a site; 41% on DIY builders; 45% outsourced the build | [Clutch](https://clutch.co/press-releases/smb-websites-2025), n=406, Aug 2025 | Adoption | Low to medium | Lead-selling directory |
| Wix Partners revenue (agencies, freelancers, resellers) up 17% to US$213.8M in Q2 2026 | [Wix Q2 2026](https://www.globenewswire.com/news-release/2026/08/04/3338018/0/en/wix-reports-second-quarter-2026-results.html) | Transaction | High | Includes resellers such as Vistaprint |
| Wix's AI builder is included on every plan, including free | [Wix Harmony release](https://www.globenewswire.com/news-release/2026/01/21/3222826/0/en/Wix-Launches-Wix-Harmony-the-AI-Website-Builder-that-Merges-Human-and-Artificial-Intelligence-Reinventing-Web-Creation.html) | Seller claim | Medium | Via search summary |
| GoDaddy Airo bookings run rate US$50M, 5x in a quarter; about 85% annual customer retention | [GoDaddy Q2 2026 8-K](https://www.sec.gov/Archives/edgar/data/0001609711/000160971126000087/gddyex991-20260630xq2earni.htm), [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1609711/000160971126000010/gddy-20251231.htm) | Transaction | High | All products, global |
| Designers' lowest-priced projects average US$2,160, highest US$8,179; average designer gross just under US$50,000 a year | [Squarespace Circle 2026](https://pros.squarespace.com/blog/2026-report-money-business), n=1,034 | Transaction (self-report) | Medium | Squarespace designers, global |
| Agencies with typical projects under US$5,000 are less often consistently profitable; agencies with no recurring revenue were rarely or never profitable 58.3% of the time | [The Admin Bar 2026 survey](https://theadminbar.com/2026-survey/), n=622 | Adoption (survey) | Medium | WordPress agencies, 51 countries |
| Word of mouth is agencies' primary lead source | Same | Survey | Medium | |
| Vision Web Design: from $2,500, most clients $3,500 to $8,000 | [Vision Web Design](https://visionwebdesign.ca/web-design-niagara/) | Price | Medium | Currency implied CAD |
| Cool Koala Creative: from $2,500, most $3,500 to $6,000 | [Cool Koala](https://www.coolkoalacreative.com/niagara-web-design) | Price | Medium | |
| Niagara Web Design: $1,750 plus $50/mo (3 pages) to $4,500 | [Niagara Web Design pricing](https://www.niagarawebsitedesign.ca/web-design-pricing.html) | Price | Medium | Undated |
| CanadaWebPro: now from $2,900 to $6,000 CAD (June figures $1,899 to $3,399 no longer shown) | [CanadaWebPro pricing](https://canadawebpro.ca/website-pricing/) | Price | Medium | Conflicts with its own blog |
| Cedar + Mint "from $5,400": not verified; no price shown | [Cedar + Mint](https://cedarandmint.co/web-branding-services) | Price (absent) | n/a | Do not reuse the June figure |
| B12: US$1,999 setup plus US$199/mo | [B12 support](https://support.b12.io/en/b12-website-subscription-plans-and-pricing), updated Aug 18 2026 | Price | Medium | Main pricing page inconsistent |
| US "$0 down" subscription sites at US$79 to US$199/mo, often 12-month minimums | [Golden Coast Digital](https://goldencoastdigital.com/), [SiteMonth](https://www.sitemonth.com/) | Price | Low | Small sellers, weak proof |
| A competitor offers free hosting to members of four Niagara chambers | [Epoch Avenue](https://www.epochavenue.com/Niagara-Chamber-Members) | Price | Low | Undated |
| Care-plan or website-subscription churn for small providers | No evidence found | n/a | n/a | Must come from own records |

## Growth marketing

| Claim | Source | Type | Quality | Caveat |
|---|---|---|---|---|
| Thryv done-for-you marketing services revenue down 62% year over year; SaaS seasoned net revenue retention 90% | [Thryv Q2 2026](https://investor.thryv.com/news/news-details/2026/Thryv-Reports-Second-Quarter-2026-Results-and-Launches-Thryv-Growth-Platform/default.aspx) | Transaction | High | Decline partly a planned print exit |
| Yelp services advertising flat; management expects a challenging environment for local businesses | [Yelp Q2 2026 letter](https://www.sec.gov/Archives/edgar/data/0001345016/000134501626000059/yelpq22026ex992lettertos.htm) | Transaction | High | US-heavy |
| Yext ARR down about 1% from contraction among smaller customers | [Yext Q2 FY2027](https://investors.yext.com/news-events/press-releases/detail/391/yext-announces-second-quarter-fiscal-2027-results) | Transaction | High | Via search summary |
| Fractional workers: 94% have won clients through network referrals; 72% found the first client through their personal network; marketing roles average US$209/hr; early-stage VC-backed firms are 36% of fractional hiring | [Fractional Jobs, Fractional Work Report 2026](https://www.fractionaljobs.io/the-fractional-work-report) | Survey / Price | Medium | Platform community sample |
| Fractional retainers: 29.5% under US$5,000/mo, 40% US$5,000 to 8,000 | [FRAK 2024](https://www.prnewswire.com/news-releases/first-ever-report-on-fractional-industry-released-302214599.html), n=250 | Price (self-report) | Low to medium | 2024, all functions, US |
| SEO pricing: agency average retainer US$3,209/mo; 79.1% of US and Canada providers charge at least US$1,001/mo | [Ahrefs SEO pricing](https://ahrefs.com/blog/seo-pricing/), n=439 | Price (self-report) | Medium | 2023 to 2024 data |
| Asset Digital (Toronto) social CAD 1,500 to 1,999/mo for 6 to 12 posts; local SEO CAD 2,500+ | [Asset Digital social](https://assetdigitalcom.com/social-media-packages-pricing/), [SEO](https://assetdigitalcom.com/seo-pricing/) | Price | Medium | June "CAD 795 SEO" not found |
| Cool Koala social from CAD 950/mo, 2-month minimum | [Cool Koala social](https://www.coolkoalacreative.com/social-media-marketing) | Price | Medium | |
| Digital Estate Media (Mississauga): local SEO CAD 1,500/mo; GEO CAD 1,500/mo; month-to-month | [Digital Estate Media pricing](https://www.digitalestatemedia.com/pricing) | Price | Medium | |
| CheckSite (St. Catharines): SEO from CAD 30 to 55/mo | [CheckSite](https://checksite.ca/business-website-seo/) | Price | Low | Scope unclear; low local anchor |
| Storyteller Media CAD 285/mo is managed Google Business Profile, not full SEO; company is in Nova Scotia | [Storyteller pricing](https://storytellermedia.ca/our-services/pricing/) | Price | Medium | Corrects the June document |
| BrightLocal Managed SEO US$1,299/mo; Merchynt GBP management US$449/mo; Localo software US$39 to 49/mo | [BrightLocal](https://www.brightlocal.com/pricing/), [Merchynt](https://www.merchynt.com/google-business-pro), [Localo](https://localo.com/pricing) | Price | Medium | |
| Google says SEO typically needs four months to a year to show benefit | [Google guidance via SEM Post](http://www.thesempost.com/google-seos-need-4-months-year-seo-changes-ranks/) | Delivery | Medium | Current page wording not re-confirmed |
| Annual churn: SEO 38%, social 46% | [Focus Digital](https://focus-digital.co/average-marketing-agency-churn/) | Survey | Low | Method and sample undisclosed |
| 45% of US consumers used AI tools to find local businesses | [BrightLocal consumer survey](https://www.brightlocal.com/research/local-consumer-review-survey/), n=1,002 | Consumer demand | Medium | Vendor research |
| AI referrals about 1% of site sessions | [Conductor via Search Engine Land](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653), [BrightEdge](https://www.brightedge.com/news/press-releases/brightedge-data-finds-ai-accounts-less-1-search-organic-traffic-continues) | Consumer behaviour | Medium | 2025 data |
| Share of Canadian SMBs paying for GEO or outside marketing | No evidence found | n/a | n/a | |

## AI automation

| Claim | Source | Type | Quality | Caveat |
|---|---|---|---|---|
| 19.2% of Canadian businesses used AI to produce goods or deliver services (Q2 2026); 40.0% say AI is not relevant | [StatCan Q2 2026 analysis](https://www150.statcan.gc.ca/n1/pub/11-621-m/11-621-m2026010-eng.htm) | Adoption | High | Wording undercounts admin use |
| Of AI-using firms, 10.7% with 1 to 4 staff used external consultants or vendors, against 30.2% with 100+ staff | Same | Adoption | High | Best official signal on willingness to pay; denominator is AI users |
| 52.7% of employer businesses have no AI plans; 79.1% of those say AI is not relevant | [StatCan Q3 2026](https://www150.statcan.gc.ca/n1/daily-quotidien/260831/dq260831a-eng.htm) | Adoption | High | No size split |
| Nearly 45% of Canadian businesses use GenAI in operations; 39% under 5 staff, 60%+ at 20 to 49 | [CFIB AI adoption](https://www.cfib-fcei.ca/en/research-economic-analysis/ai-adoption) | Adoption | Medium | Broader wording |
| US firms under 20 staff: under 20% AI use | [US Census BTOS](https://www.census.gov/library/stories/2026/05/ai-use-businesses.html) | Adoption | High | Two-week recall window |
| 6% of AI-using US small-business workers use AI for workflow automation | [US Chamber Foundation](https://www.uschamberfoundation.org/workforce/half-of-small-business-workers-use-ai-most-to-boost-productivity-not-automate-jobs), n=1,070 | Adoption | Medium | Workers, not owners |
| More SMEs say GenAI reduced contractor reliance (14%) than increased it (6.3%) | [OECD](https://www.oecd.org/en/publications/generative-ai-and-the-sme-workforce_2d08b99d-en.html) | Adoption | Medium | 2024 survey; figures via excerpt |
| Flowgrammer: audit CAD 2,500, builds from CAD 7,500 (typical 12,500 to 25,000), fractional from CAD 3,000/mo; markets to Niagara | [Flowgrammer](https://flowgrammer.ca/services) | Price | Medium | Direct competitor |
| BotLogix: on-site strategy day CAD 1,000 across Niagara | [BotLogix Niagara](https://botlogix.ca/locations/niagara) | Price | Medium | Direct competitor |
| Clarity: audit CAD 1,500 to 2,500, sprint CAD 7,500 to 12,500, support CAD 500 to 10,000+/mo | [Clarity pricing](https://www.clarityeng.ca/pricing) | Price | Medium | Changed from seed values |
| ChatGPT.ca (Markham): projects CAD 5,000 to 15,000 plus client tool fees | [ChatGPT.ca](https://chatgpt.ca/services/automation) | Price | Medium | Claims unverified |
| XRay.Tech US$250/hr; Brothers Automate US$1,500 to 15,000 projects, US$3,500/mo retainer | [XRay](https://www.xray.tech/xray-hourly), [Brothers Automate](https://brothersautomate.com/how-much-does-ai-automation-cost) | Price | Medium | US |
| Built-in substitutes: Gemini in Workspace Business Standard CA$18.40/user; Claude Team US$20/seat; HubSpot agents priced per result | [Google Workspace](https://workspace.google.com/pricing), [Claude pricing](https://claude.com/pricing), [HubSpot](https://www.hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete) | Price | Medium | |
| Ontario DMAP funds up to CAD 15,000 for a plan, but its consultant roster is closed to new applicants; FedDev RAII closed | [OCI DMAP](https://www.oc-innovation.ca/programs/digital-competence-centre/), [FedDev RAII](https://feddev-ontario.canada.ca/en/funding-southern-ontario/regional-artificial-intelligence-initiative-southern-ontario) | Program | High | Could reopen |
| MIT NANDA "95% of pilots no P&L impact", RAND "80%+ fail", Gartner "40% of agentic projects cancelled by 2027" | [Fortune on MIT NANDA](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/), [RAND](https://www.rand.org/pubs/research_reports/RRA2680-1.html), [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) | Research | Low for SMB use | Enterprise or predictions; none measure SMB workflow projects |
| Conversion from diagnostic to build to retainer; maintenance hours | No evidence found | n/a | n/a | Must come from own records |

## Internal evidence (this repository)

| Item | Source | What it shows | What it does not show |
|---|---|---|---|
| One completed website client | `frank-baggetta/`, `docs/frank-performance-2026-09-14/PERFORMANCE-UPDATE.md` | Search clicks 25 to 51 between two 28-day windows; client reported three enquiries in the first month | Bookings, revenue, or how the client was acquired |
| Prior content and growth results | Live `/services/growth/` page, Jetta Grove portfolio | B2B tech-startup content, social, and organic results (SeamlessFi, io.net) | Local small-business marketing results |
| One automation project example | Live `/services/automation/` page | An AI-assisted interview and project-update workflow was built | Measured client time or cost savings |
| Public prices and packages | `scripts/build_growth.py` | Current offers as displayed September 25, 2026 | Delivery hours per client |
| June 2026 competitor document | `docs/competitor-pricing-analysis-2026-06-16.md` | Historical leads | Current prices: several figures have changed or could not be verified (see above) |
