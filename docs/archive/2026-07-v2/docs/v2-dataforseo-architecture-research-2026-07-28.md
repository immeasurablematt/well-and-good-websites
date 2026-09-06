# DataForSEO Technical + Keyword Research for V2 Architecture

**Date:** 2026-07-28 (America/Toronto)  
**Status:** Keyword volume, difficulty, and live-site technical audit complete. Fresh SERP task queue still pending at time of write.  
**Market:** Canada, English, Google Ads / DataForSEO Labs  
**Source:** DataForSEO via Composio (`keywords_for_keywords` live + `bulk_keyword_difficulty` live)  
**Site crawled:** production `https://wellandgoodwebsites.ca/`

---

## Why this research was run

Before freezing website architecture and the Growth URL, check:

1. Which service and landing pages have real search demand
2. Which terms are realistic to rank for soon
3. Whether one-page, AEO, Growth, and segment pages deserve dedicated URLs
4. What technical SEO the live v1 site already has or lacks

---

## Executive conclusion

1. **Keep the v1 local + affordable website wedge as the SEO spine.**  
   `web design niagara` (210/mo, KD 24) and `affordable website design` (70/mo, KD 23) remain the best near-term commercial targets.

2. **Do not make Toronto the first SEO battle.**  
   `web design toronto` is 3,600/mo but KD 92.

3. **One-page should stay a package/SEO landing page, not a core service.**  
   `one page website design` is only 20/mo. Useful support page, weak primary bet.

4. **Growth should be a real service page, but not named only for AEO.**  
   `answer engine optimization` has surprising volume (260/mo, KD 44) and should be a section or supporting page under Growth. Public nav label should still be Growth, not AEO.

5. **Google Business Profile language belongs on Websites and Growth pages.**  
   `google business profile manager` is 2,900/mo and `google business profile management` is 110/mo. That demand supports service copy and FAQ, not a standalone product line.

6. **Segment pages are justified more by sales focus than by high head-term volume.**  
   Exact phrases like `auto repair website design` (10) and `hvac website design` (70, KD 1) are small, but low difficulty and high commercial fit. Segment pages should target local + service intent clusters, not only “{trade} website design.”

7. **Live v1 technical foundation is mostly in place.**  
   HTTPS, canonicals, robots, sitemap, OG, JSON-LD, and single H1s are present on crawled pages. Main gaps: thin sitemap (only 4 URLs), no `llms.txt`, homepage brand punctuation inconsistency (`Well & Good` in title), and no dedicated service/segment URL inventory yet.

---

## Keyword evidence (Canada)

### Core commercial opportunities

| Keyword | Vol/mo | CPC | Comp | KD | Architecture implication |
|---|---:|---:|---|---:|---|
| web design toronto | 3,600 | $16.85 | LOW* | 92 | Later/secondary only |
| website design toronto | 3,600 | $16.85 | LOW* | — | Same |
| google business profile manager | 2,900 | $22.53 | LOW | — | Content/FAQ theme, not a nav product |
| web design agency toronto | 2,400 | $15.27 | LOW* | — | Too broad/competitive for first wedge |
| answer engine optimization | 260 | $17.31 | MED | 44 | Supporting Growth/AEO content |
| web design niagara | 210 | $6.75 | LOW | 24 | **Primary location landing** |
| website design niagara | 210 | $6.75 | LOW | — | Same cluster |
| niagara web design | 210 | $6.75 | LOW | — | Same cluster |
| small business website design | 210 | $11.39 | LOW | 22 | Strong homepage/Websites support phrase |
| web design for small businesses | 210 | $11.39 | LOW | — | Same |
| google business profile management | 110 | $25.18 | LOW | 50 | Growth/Websites functionality language |
| affordable website design | 70 | $16.80 | LOW | 23 | **Primary price-intent landing** |
| hvac website design | 70 | $3.79 | — | 1 | Strong early HVAC segment support term |
| affordable website design for small business | 20 | $11.06 | — | — | Supporting FAQ/copy |
| one page website design | 20 | — | LOW | 29 | Keep as package landing only |
| single page website design | 20 | — | LOW | 29 | Same |
| family law website | 20 | — | LOW | n/a | Weak head term; segment still possible via local lawyer intent |
| seo services niagara | 10 | — | LOW | n/a | Thin alone; use broader local SEO framing |
| auto repair website design | 10 | — | — | — | Segment page should target repair intent language, not only this phrase |
| local seo niagara | n/a in set | — | — | n/a | No clean volume hit; do not bet architecture on this exact string |

\*Google Ads “competition” can read LOW even when SEO difficulty is extreme. Prefer KD + SERP reality for organic planning.

### Difficulty summary

| Keyword | KD |
|---|---:|
| hvac website design | 1 |
| hvac marketing | 10 |
| auto repair website | 20 |
| small business website design | 22 |
| affordable website design | 23 |
| web design niagara | 24 |
| family lawyer near me | 27 |
| one page website design | 29 |
| answer engine optimization | 44 |
| google business profile management | 50 |
| web design toronto | 92 |

### Demand shape that matters for architecture

```text
Highest near-term SEO ROI
1. Location commercial: web design niagara
2. Price commercial: affordable website design / small business website design
3. Growth-adjacent education: answer engine optimization + GBP language
4. Vertical support terms: hvac website design (easy), auto repair website (small but fit)
5. Avoid as primary: Toronto head terms
```

---

## Live-site technical SEO audit

### What is already good

| Check | Result |
|---|---|
| HTTPS + HSTS | Present |
| Homepage 200 | Yes |
| Canonical on homepage and landings | Self-referencing |
| robots.txt | Allows all, points to sitemap |
| sitemap.xml | Present |
| Meta title + description | Present on crawled pages |
| Open Graph | Present |
| Viewport | Present |
| Single H1 | Yes on homepage and three landings |
| JSON-LD | Present (1 block/page observed) |

### Issues and architecture impact

| Issue | Impact | Fix in v2 architecture |
|---|---|---|
| Sitemap only has 4 URLs (home + 3 landings) | New service/segment pages will not be discovered cleanly unless added | Every publishable v2 route must enter sitemap |
| No `llms.txt` | Minor AEO signal gap | Add when service IA is frozen |
| Title uses `Well & Good` while brand is often `Well and Good` | Brand inconsistency | Standardize to **Well and Good** |
| Homepage packages website + local SEO + social into one blob | Harder to rank distinct intents and explain offers | Separate Websites and Growth pages; keep package pricing on Websites |
| No `/services/*` or `/for/*` URLs live | No dedicated ranking assets for Growth or segments | Add only pages with a clear keyword or sales job |
| `one-page-websites` exists despite low volume | Acceptable support page | Keep, but do not elevate to core service |
| Thin local SEO exact-match demand | A `/services/seo/` URL optimized only for “SEO Niagara” is weak | Prefer `/services/growth/` public concept, with SEO/AEO/GBP inside |
| SERP tasks still queued | Competitor URL list not refreshed in this run | Use June 15 SERP snapshot + new keyword data; refresh SERP before content write |

### June 15 competitor snapshot still useful

For `web design niagara`, prior DataForSEO SERP showed local agencies such as:

- niagarawebsitedesign.ca
- tenpine.ca
- doncor.com
- coolkoalacreative.com
- visionwebdesign.ca

For `affordable website design`, prior SERP mixed specialists and publishers:

- affordablewebdesign.ca
- affordablesites.ca
- forbes.com
- joycegrace.ca

Implication: Niagara is a local-agency SERP. Affordable is a mixed national SERP. Segment pages should not try to win national “website design” head terms first.

---

## Architecture recommendations from the data

### Confirmed page set

```text
Homepage (/)
├── Websites (/services/websites/)
├── Growth (/services/growth/)
├── Automation (/services/automation/)
├── Intent landings
│   ├── /web-design-niagara/          primary SEO
│   ├── /affordable-website-design/   primary SEO
│   └── /one-page-websites/           support SEO only
├── Segments
│   ├── /for/auto-repair/
│   ├── /for/hvac/
│   └── /for/family-law/              later
├── Work / About / How It Works / Contact
└── Utility
```

### URL decision: Growth

**Recommendation: `/services/growth/`**

Reasons:

- Exact “local seo niagara” / “seo services niagara” demand is weak or tiny
- Buyers buy outcomes (more enquiries/appointments/sales), not “SEO” as the product name
- AEO has real educational demand and should live under Growth, not replace it
- `/services/seo/` over-narrows the page around one mechanism

If an old `/services/seo/` draft exists in v2 files, redirect it to `/services/growth/` at launch.

Optional later support page:

- `/services/growth/aeo/` or a blog/guide only if you want to capture `answer engine optimization` informational demand without cluttering nav

### One-page

Keep `/one-page-websites/` because it already exists and supports a clear package story.  
Do not create a fourth core service around it. Volume does not justify that.

### Segment pages

| Segment | SEO case | Sales case | Decision |
|---|---|---|---|
| Auto-repair | Small exact volume, good fit language | Strongest current pipeline + VOC | Build |
| HVAC | `hvac website design` 70/mo, KD 1 | Strong economics/workflow research | Build after auto-repair, with VOC |
| Family law | Weak exact “website” volume; stronger local lawyer intent likely | High CPC market, compliance cost | Later |
| Bookkeepers/CPAs | No strong hits in this pull | Unproven | Park |
| Real estate websites | Not a priority SEO wedge here | Automation arm first | No website segment hero |
| Food | Dropped | Dropped | Out |

Segment pages should target clusters like:

- `{trade} in Niagara` customer-side terms only where ethical and relevant for proof/examples
- “website for {trade}”
- service + local trust language on the page
- not thin doorway pages

### Homepage SEO role

Homepage should rank/support:

- small business website design
- affordable custom websites
- Niagara local business websites

It should not try to rank for every trade. Trades get `/for/*`.

---

## Technical SEO checklist before v2 launch

### Must ship with architecture

1. Full sitemap of all indexable routes
2. robots.txt unchanged pattern, updated if needed
3. Self-canonical on every page
4. Unique title + meta description per route
5. One H1 per page
6. JSON-LD:
   - Organization/ProfessionalService sitewide
   - Service on Websites/Growth/Automation
   - FAQ only where visible FAQs exist
   - BreadcrumbList on nested routes
7. Internal links:
   - Homepage → Websites, Growth, key segments, Niagara, Affordable
   - Segment → Websites + prototype
   - Growth → Websites
   - Intent landings → Websites
8. Noindex thank-you and 404
9. Consistent brand string: Well and Good
10. Add `llms.txt` after IA freeze

### Do not do yet

- Toronto-first content hubs
- Standalone AEO product in primary nav
- Standalone GBP product
- Food segment pages
- Thin `/seo-niagara/` page with no unique offer

---

## Fresh SERP status

Created 2026-07-28 task IDs, still `Task Handed` at write time:

- web design niagara: `07290456-1014-0066-0000-b1342bb95a05`
- affordable website design: `07290456-1014-0066-0000-394a688c224d`
- small business website design: `07290456-1014-0066-0000-a2db8561dc71`
- local seo services: `07290456-1014-0066-0000-a78ccbd74de8`
- hvac website design: `07290456-1014-0066-0000-039d61da4fc3`
- answer engine optimization: `07290456-1014-0066-0000-22a3641f84a4`

These should be pulled before writing final on-page title/H1 variants for those URLs.

---

## Decision lock from this research

| Decision | Lock |
|---|---|
| Core services | Websites, Growth, Automation |
| Growth URL | `/services/growth/` |
| One-page | Landing/package only |
| Primary SEO landings | Niagara + Affordable |
| First segments | Auto-repair, then HVAC |
| Family law | Later |
| Food | Out |
| AEO | Under Growth |
| Brand display name | Always **Well & Good Growth** |
| Homepage H1 | Locked: **Your next customer found someone else first.** |

---

## Next step after approval of this research brief

1. Freeze architecture from this doc
2. Pull the queued SERP results when ready
3. Rewrite homepage markdown at brand level with v1 H1
4. Write core service pages from the 3-row matrix
5. Write `/for/auto-repair/` from the approved matrix
6. HVAC VOC/research before HVAC page copy
