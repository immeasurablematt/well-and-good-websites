# Niagara SEO review and proposed change

September 26, 2026. Review proposal only; no production code changed.

## Recommendation

Keep this as a local SEO service page and make it easier for a business with an existing website to enquire. The most concrete defect is the mismatch between the service being sought and the first action offered: a free website preview currently leads to a form with Growth marketing selected. Standalone SEO is available, but readers must reach the FAQ to learn that it can be purchased separately.

The proposed copy is in [revision.md](revision.md). Exact private Search Console observations and the measurement baseline are stored locally under the ignored `private-data/positioning/niagara-seo-review/` directory. They are not part of this public proposal.

## Priorities and evidence

| Priority | Observed issue | Proposed action | Dependency and assessment |
| --- | --- | --- | --- |
| High | The primary hero action offers a website preview on an SEO service page. Both hero actions open Growth marketing. | Make Discuss your local SEO the primary action and add a section link as the secondary action. | Requires copy approval. Check the rendered action and service selection after implementation. Enquiry improvement remains a hypothesis. |
| High | The page explains standalone SEO only after the website and marketing package cards. | Explain a separately scoped project before the cards. | Uses the existing approved offer. If enquiries continue to confuse SEO projects with website subscriptions, this clarification has not resolved the problem. |
| Medium | The cost FAQ presents bundled prices as its answer to an SEO-only cost question. | Distinguish custom SEO scope from the unchanged website and marketing packages. | Do not invent a standalone price or change package terms. Review actual enquiry questions after release. |
| Medium | The page says available data guides the work, but does not explain what the customer will assess. | Add a short measurement answer distinguishing visibility, visits and enquiries. | Tracking availability must be checked per engagement. Do not promise attribution or data that is unavailable. |
| Low | Broad growth and local SEO pages use overlapping search language. | Preserve the existing link from Growth to Niagara SEO and keep this page focused on local SEO. | No evidence establishes harmful competition between the pages. Do not merge pages or change canonicals without query-level evidence. |

## What already works

- Descriptive existing title and URL; retain both.
- One visible H1 and a coherent heading hierarchy.
- Self-referencing canonical and `index,follow` robots directive.
- Main copy delivered in HTML, with an accessible rendered version observed.
- Public robots.txt allows crawling, and the SEO URL appears in the sitemap.
- A contextual inbound link from the Growth service page, plus shared footer links.
- Existing ProfessionalService structured data, not a reason to add speculative AI markup.
- A named, inspectable client case study with attributed outcomes and a location distinct from Niagara.
- Transparent package terms and explicit limits on ranking guarantees.

The audit did not measure Core Web Vitals, backlink strength, Business Profile ownership or local map positions. It does not assign an overall SEO score from this incomplete scope. No keyword-density or minimum-word-count target is used as a ranking requirement.

## Competing pages

Discovery used a web search for Niagara SEO services, followed by reading the providers' own pages. These are qualitative comparisons, not a location-controlled Google ranking capture.

- [Mango Media](https://mangomedia.ca/) explains how it works with existing websites, gives scope and pricing context, and puts case studies near its service explanation. Its reported results are the provider's claims, not independently verified benchmarks or proof available to Well and Good Growth.
- [Niagara SEO's technical service page](https://niagaraseo.ca/seo/technical-seo/) makes the audit and implementation steps explicit. That supports clearer scope as a useful buyer aid. Its detailed technical language and performance claims are not copied or endorsed.

The useful lesson is to make the service, proof and buying route specific. Neither source establishes that a longer page, bought placements or a new AI-focused package would improve this site's rankings.

## Sources and claim boundaries

- [Current Niagara SEO page](https://www.wellandgoodgrowth.ca/niagara-seo/), [Growth service page](https://www.wellandgoodgrowth.ca/services/growth/) and [contact destination](https://www.wellandgoodgrowth.ca/contact/?service=Growth+marketing), read September 26.
- [Frank Baggetta case study](https://www.wellandgoodgrowth.ca/frank-baggetta/), read September 26. Preserve the first-month enquiry attribution. Do not imply it proves an SEO-only intervention caused the outcome or that he is a Niagara client.
- `.agents/product-marketing.md` and `docs/agents/domain.md`: current service definitions, offer boundaries, approved biography protection and customer-first copy direction.
- [Google's AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features): existing SEO fundamentals apply; no special AI markup is required. The separate AI report's absence from this property's navigation is not evidence of zero AI exposure.

## Release and measurement

1. Matthew reviews the proposed copy. This proposal does not authorize publication.
2. Implement approved blocks in the builder, preserving the shared pricing component. Regenerate and run the Growth validator. Inspect desktop and mobile, section links, pricing and the SEO enquiry route. Do not submit a test enquiry without the appropriate authorization.
3. After explicit publication approval, verify the live page and record the release date. Use that date for the measurement window, not this draft date.
4. Review after four complete weeks, allowing for Search Console reporting lag. Compare the same URL, search type and core query set. Keep country/device changes and the recent domain migration in view.
5. Track search impressions, positions, clicks and qualified enquiries separately. With a small baseline, a percentage lift from one or two clicks is not persuasive evidence. If exposure and rankings remain weak, investigate authority, competing pages and technical evidence before expanding the content programme.

No recurring automation has been created. The next audit should check whether the relevant query set gains visibility, whether visitors use the SEO enquiry route, and whether actual enquiry questions show that the standalone offer is understood.
