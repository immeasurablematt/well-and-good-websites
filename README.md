# Well and Good Websites

Well and Good, run by Matthew Baggetta in Welland. Websites, search, and Agentic OS services.

The root pages are the current production site. The complete v2 preview lives in `site-v2/`, with Agentic OS leading the homepage. Its audience and hierarchy are awaiting Matthew's review before production publication.

## Local Preview

```bash
python3 build_site_v2.py
python3 scripts/validate_v2.py
python3 -m http.server 4175 --bind 127.0.0.1 --directory site-v2
```

Then open `http://127.0.0.1:4175/`.

## Copy and release

- Edit v2 copy and shared layout in `build_site_v2.py`, then regenerate. The preserved privacy text is in `content/privacy.html`.
- Shared v2 styles and browser behaviour are in `site-v2/styles.css` and `site-v2/site.js`.
- `python3 scripts/build_site_v2_copy.py` exports the implemented copy to `site-v2-copy.md`.
- Vercel builds only the explicit public website files via `scripts/build_public.py`. Research, documents, instructions, and Copy Studio are outside the public output.
- To release v2 after review, set `SOURCE = ROOT / "site-v2"` in `scripts/build_public.py`, run both validators, review the preview deployment, and merge.
- July copy and research are historical. See `docs/copy-deck-status.md` and `docs/archive/2026-07-v2/README.md`.
- Current decisions and recovery information: `docs/v2-launch-decisions-2026-09-06.md`.
