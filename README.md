# Well and Good Growth

Websites, growth marketing, and custom AI automation with Matthew Baggetta in Welland, Ontario.

The production site follows the approved September 8, 2026 review. Its copy and shared markup live in `scripts/build_growth.py`; styles, browser behavior, images, and fonts live in `site-growth/`.

## Local preview

```bash
python3 scripts/build_public.py
python3 scripts/validate_growth.py
python3 -m http.server 4175 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:4175/`. Edit source files, then rebuild. Generated `public/` is not committed.

## Release

Vercel uses `scripts/build_public.py` and publishes only `public/`. The build creates versioned CSS and JavaScript, canonical metadata, a sitemap, and indexing rules. Forms use the existing FormSubmit destination. The contact page remains usable without JavaScript.

Validate the build and browser behavior, review a Vercel preview, then merge the approved release. Check the live domain and legacy redirects after deployment.

`site-v2/`, `build_site_v2.py`, and the root HTML are retained historical sources. They are not the current production build. The privacy content is retained in `content/privacy.html`. Release verification and recovery details: `docs/growth-launch-2026-09-08.md`.
