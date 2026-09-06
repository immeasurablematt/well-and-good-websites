# On-Page SEO Report: Homepage

**Page:** `/` (analysis run against `01-homepage-v3.md`)
**Date:** 2026-07-29
**Data source:** DataforSEO, Google Ads search volume and live SERP, Ontario / Canada, English

**Target keyword:** web design welland / website design welland
**Search intent:** commercial investigation, local
**Current score:** 62 / 100
**Estimated after fixes:** 84 / 100

Scored against what this page can control. The ceiling is capped by an off-page factor described below, which is worth more than everything else in this document combined.

## The finding that matters most

For "web design niagara" and every local variant of it, **Google shows a local pack in positions one, two, and three.** Three map results with photos, ratings, and phone numbers sit above the first organic result. No title tag, heading, or word count moves a page into that block. Google Business Profile, review count, proximity, and NAP consistency do.

The three businesses currently holding it:

| Local pack position | Domain | Reviews |
|---|---|---:|
| 1 | websitedesignniagara.ca | 5 |
| 2 | niagarawebsitedesign.ca | 2 |
| 3 | tenpine.ca | 49 |

Two of the three are holding top-three placement on **two and five reviews**. That is a very low bar, and it is the single highest-return action available: a complete, correctly categorised Google Business Profile pinned to Welland, with ten or so genuine reviews, will outperform any amount of homepage copy work for these terms.

Note the top two are exact-match domains. That is not reproducible here, and it does not need to be, because they are also winning on almost no review volume.

## Keyword decision

| Keyword | Volume / mo | Competition index | Assigned to |
|---|---:|---:|---|
| web design niagara | 170 | 10 | `/web-design-niagara/` |
| website design niagara | 170 | 10 | `/web-design-niagara/` |
| **web design st catharines** | **70** | **11** | **nothing. See gaps.** |
| web design welland | 30 | 6 | `/` homepage |
| website design welland | 30 | 6 | `/` homepage |
| web design niagara falls | 20 | low | nothing |
| affordable website design | 10 | 51 | `/affordable-website-design/` |
| web design company niagara | 10 | 4 | nothing |
| web designer welland | no data | - | - |
| local seo niagara | no data | - | - |

The homepage takes Welland rather than Niagara on purpose. The regional term is more than five times the volume, but it belongs to the dedicated landing page, and the live SERP confirms that architecture: organic position one for "web design niagara" is `coolkoalacreative.com/niagara-web-design`, a landing page, not a homepage. Pointing both at the same term would have them competing with each other.

Welland is also the right fit for other reasons. The domain already contains the string. The business is physically there, so the local pack is winnable. And competition index 6 is close to uncontested.

## Fixes applied

### Title tag

**Before:** `Well & Good Growth | Websites and Local Growth for Niagara Businesses` (68 characters)
**After:** `Welland Web Design, Prices Published | Well & Good Growth` (57 characters)

The original ran long enough to truncate, led with a brand nobody is searching for yet, and spent its keyword on Niagara, which is the landing page's term. The replacement leads with the target term, uses the differentiator as the click hook, and keeps the brand string intact.

### Meta description

**Before:** 192 characters, truncates at roughly 160.
**After:** `See your new website before you pay for it. Web design in Welland and across Niagara, with every price published and a free private prototype first.` (146 characters)

Leads with the offer, because "see it before you pay" is a stronger click argument than any of the competing descriptions on that SERP, none of which offer anything free.

### Headings

The locked H1, "Your next customer found someone else first.", contains no keyword. **Leave it alone.** For a page whose target terms are dominated by a local pack, the H1 keyword is close to irrelevant, the title tag and profile carry the terms, and the headline is doing real conversion work. Do not trade a good headline for a checklist item.

The keyword load moves to the H2 layer instead. One change applied:

**Before:** `Who this is built for`
**After:** `Who I build websites for in Welland and across Niagara`

A service-area line was also added under that heading naming St. Catharines, Niagara Falls, Thorold, Port Colborne, Fonthill, and Grimsby. Competitors on this SERP already do this. `cedarandmint.co` lists six Niagara municipalities on one page and ranks organic position three.

## Content gaps

**St. Catharines is unclaimed, and it is the biggest miss in the pack.**
70 searches per month, competition index 11, and nothing in the 14-page architecture targets it. That is more than double Welland's volume and it is the largest city in the region. Recommendation: build `/web-design-st-catharines/` as a direct mirror of the Niagara landing page. This is the highest-value new page available.

**"Web design niagara free" is a related search, and nobody is answering it.**
It appears in Google's own related searches for the head term. Every competitor on that SERP sells a quote process. Well & Good Growth gives away a working prototype. That is an exact match to a real query with zero competition for it, and the pack currently never uses the word "free" in a title or meta description outside the CTA.

**Reddit ranks on this SERP.**
Two r/stcatharinesON threads asking who the best Niagara web design companies are appear in a discussions block on page one. The brief puts Reddit research out of scope, so this is flagged rather than actioned, but it is a live visibility surface for the exact buying question.

**No pricing is exposed to search.**
Published pricing is the strongest differentiator on the site and no competitor on page one shows a number. Structured data can surface it. See the schema below.

## Schema markup

None is currently specified anywhere in the pack. For a local service business chasing a local pack, this is not optional. Add to the homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://wellandgoodwebsites.ca/#business",
  "name": "Well & Good Growth",
  "url": "https://wellandgoodwebsites.ca/",
  "description": "Web design, local search growth, and workflow automation for businesses in Welland and the Niagara region.",
  "founder": { "@type": "Person", "name": "Matthew Baggetta" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Welland",
    "addressRegion": "ON",
    "addressCountry": "CA",
    "streetAddress": "[NEEDED: street address, or omit if not publishing one]",
    "postalCode": "[NEEDED]"
  },
  "telephone": "[NEEDED]",
  "email": "[NEEDED]",
  "priceRange": "$297-$1497",
  "areaServed": [
    { "@type": "City", "name": "Welland" },
    { "@type": "City", "name": "St. Catharines" },
    { "@type": "City", "name": "Niagara Falls" },
    { "@type": "City", "name": "Thorold" },
    { "@type": "City", "name": "Port Colborne" },
    { "@type": "AdministrativeArea", "name": "Niagara Region" }
  ],
  "sameAs": ["[NEEDED: Google Business Profile URL, LinkedIn, Facebook]"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Website design" },
        "price": "297",
        "priceCurrency": "CAD",
        "description": "One-time website builds from $297. Website plus growth plans from $99 per month."
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Local search growth" },
        "description": "Ongoing local search, content, conversion, and tracking work."
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Workflow automation" },
        "description": "Custom automation for one repetitive business process, with human approval retained."
      }
    ]
  }
}
```

Every `[NEEDED]` value must be filled or the property removed. Do not ship placeholder text in production schema.

Critical: the `name`, `address`, and `telephone` values must match the Google Business Profile **character for character**. NAP inconsistency is a common reason a local pack placement fails to stick.

Also worth adding: `FAQPage` schema on `/services/websites/`, which already carries three questions in the v3 copy and is a genuine featured-snippet opportunity.

## Internal linking

Already good. The v3 homepage carries nine internal links with descriptive anchor text and no "click here". Two refinements:

- `See websites` → `See website design and published pricing`
- `See growth` → `See local search growth`

Add a link to `/web-design-st-catharines/` from the homepage service-area section once that page exists.

## What I could not check

This analysis ran against the markdown copy spec, not the built page. Before launch, the following still need auditing against the real HTML: image alt text and file names, hero image presence and compression, Core Web Vitals, canonical tags, mobile rendering, and the XML sitemap. None of them can be assessed from a copy document, and claiming otherwise would be guessing.

## Priority order

1. Google Business Profile: complete it, pin it to Welland, and get to roughly ten genuine reviews. Beats everything below it.
2. Build `/web-design-st-catharines/`. 70 searches per month currently going to competitors.
3. Ship the title tag, meta description, and heading changes already applied to `01-homepage-v3.md`.
4. Add the schema above, with real values.
5. Work "free website prototype" into a title or meta somewhere, since a related search is asking for exactly that.
6. Audit the built HTML for the items listed under "What I could not check".
