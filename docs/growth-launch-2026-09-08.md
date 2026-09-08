# Approved Growth site release

Matthew approved shipping the reviewed site on September 8, 2026. The release preserves the cream, green, and coral design, full Well and Good Growth name, broad homepage positioning, three separate service pages, website and growth packages, bespoke Agentic Ops, fresh Frank Baggetta screenshot, and restored case study.

## Production changes

- Production copy and markup: `scripts/build_growth.py`. Design assets: `site-growth/`.
- The existing Vercel build entrypoint creates only public site files. Research, comparison options, and review controls are excluded.
- CSS and JavaScript URLs include content hashes, preserving the warm-cache fix.
- Enquiry forms POST to the existing FormSubmit destination with service and package fields kept separate, a honeypot, and the existing thank-you return URL. A regular contact page provides a fallback without JavaScript.
- The existing privacy notice is retained. Canonical URLs, Open Graph metadata, business schema, robots, sitemap, and Vercel Web Analytics are enabled.
- Nine older routes redirect permanently to the corresponding service, homepage section, or contact page. The Frank case study retains its original route. Previous source content remains in Git and `site-v2/`.

## Verification

The existing structural validator is reused for the production output. It checks nine pages, seven indexable routes, local links and assets, metadata, schema, form destinations, and pricing boundaries.

Chrome checks covered eight routes at 1440, 1009, 390, and 320 pixels, four service prefills, six package prefills, service switching, invalid email validation, and the contact fallback with JavaScript disabled. The native POST payload and thank-you return URL were verified by intercepting the browser request before delivery. No test email was sent; inbox delivery was not independently verified.

## Recovery

The pre-release production deployment is `dpl_9W19fzxS5iMKcB5FpwsPZ8UUHqgu`, available at `https://well-and-good-websites-m0j1f3qc1-matthew-ok.vercel.app`. It belongs to the existing Vercel project `prj_EPl9SoTk0Yg8LfWdXroL1KBPuSGC`, which owns wellandgoodwebsites.ca. The pre-release main commit is `3756a55`.

For an urgent recovery, roll back the verified Vercel project to that deployment. For a source-level recovery, revert the release commit and deploy the reviewed result. The approved prototype history remains preserved separately.
