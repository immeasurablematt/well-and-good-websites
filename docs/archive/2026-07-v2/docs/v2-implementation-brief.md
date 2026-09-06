Continue the Well and Good V2 work. Build the complete static site now in `site-v2/` using the exact approved copy in `docs/well-and-good-v2-copy-deck.md`.

Important scope:

- Do not edit or overwrite the current production HTML outside `site-v2/`.
- `site-v2/` is a standalone deployment root and must work when served from that directory.
- Shared CSS already exists at `site-v2/styles.css`.
- Shared behavior exists at `site-v2/site.js` and `site-v2/dc-lite.js`.
- Assets and icons are already copied under `site-v2/assets/` and `site-v2/icons/`.
- Use those existing classes and assets. You may add CSS rules only when necessary, but do not replace the design system.
- Preserve the displayed brand **Well and Good** and every factual/copy constraint in the deck.
- Use reader-facing text from the copy deck. Do not improvise new marketing claims or proof.
- Build every page listed below. No stubs, no placeholder pages, and no omitted sections from the deck.

Create:

- `site-v2/index.html`
- `site-v2/services/index.html`
- `site-v2/services/websites/index.html`
- `site-v2/services/seo/index.html`
- `site-v2/services/aeo/index.html`
- `site-v2/services/automation/index.html`
- `site-v2/engagements/index.html`
- `site-v2/work/index.html`
- `site-v2/about/index.html`
- `site-v2/contact/index.html`
- `site-v2/affordable-website-design/index.html`
- `site-v2/one-page-websites/index.html`
- `site-v2/web-design-niagara/index.html`
- `site-v2/thank-you/index.html`
- `site-v2/404.html`
- `site-v2/robots.txt`
- `site-v2/sitemap.xml`
- `site-v2/llms.txt`

Implementation requirements:

1. Use semantic HTML5, one H1 per page, meaningful H2/H3 hierarchy, skip links, accessible labels, keyboard-safe navigation, descriptive alt text, and a responsive mobile menu.
2. Each page must include its deck-provided title, meta description, Open Graph title and description, canonical URL, favicon, Apple icon, Fraunces and Inter fonts, shared CSS, `site.js`, `dc-lite.js`, and the existing Vercel insights script.
3. Use root-relative URLs because `site-v2/` is the future deployment root. Local verification will serve that directory as `/`.
4. Use the header and footer copy from the deck consistently. The brand descriptor is `Websites, search visibility, and AI-powered operations`.
5. Contact and preview forms must use the same FormSubmit action endpoint and anti-spam pattern already present in the existing root `index.html`. Set `_next` to the future production `/thank-you/` URL and preserve honeypot fields. Do not expose any private credential.
6. Add valid JSON-LD. Use Organization or ProfessionalService at site level without dollar figures or a company-level price range. Use Service schema on service pages and FAQPage only where visible FAQ content exists. Do not invent ratings, reviews, client counts, addresses, phone numbers, founders beyond Matthew Baggetta, or results.
7. Website pricing appears only on `/services/websites/`, `/affordable-website-design/`, and `/web-design-niagara/`, exactly as the copy deck specifies. The homepage, services hub, SEO, AEO, automation, engagements, work, about, contact, schema, metadata, `llms.txt`, and footer must have no dollar figures.
8. Work page labels Frank Baggetta as the live client, Evelyn's Sandwich Factory and JK Motors as concept builds, Jetta Grove results as prior consultancy work, and automation examples as internal demonstrations.
9. Use images from `site-v2/assets/` for the three work examples. Use the existing crest/submark for brand imagery. Do not use remote stock images.
10. Every page should have a strong visual composition using the existing CSS classes: hero or page-hero, lane grid, bento, proof rows, steps, definition, answer grid, pricing cards, contact layout, and CTA band where appropriate. Avoid repetitive card-only page structures.
11. Do not include Phase 0. Do not include internal strategy notes from the deck or the final `Copy Rules Applied` section.
12. Use zero em dash characters and zero exclamation points in reader-facing content. Do not introduce the forbidden hype words from the original copy brief.
13. Create a valid sitemap containing all publishable HTML routes. `robots.txt` must point to `https://wellandgoodwebsites.ca/sitemap.xml`. `llms.txt` must use the deck's factual section, not the implementation notes.
14. Include `noindex, nofollow` on the thank-you and 404 pages. Do not include them in sitemap.
15. After writing all files, inspect them for missing copy sections, broken internal routes, dollar figures outside the three allowed pages, em dashes, exclamation points, placeholder markers, invalid heading structure, or fabricated proof. Fix issues before reporting completion.

Use the file tools to write the actual files. This is an implementation task, not a proposal. Finish the whole site. In the final response, list files created and QA checks performed. Do not ask for permission to continue.