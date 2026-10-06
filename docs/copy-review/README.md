# Broader audience copy review

This is a local workspace for reviewing and editing website copy. Matthew approved the exported revisions and publication on October 6, 2026. It shows the existing website with its current layout, offers Before and After views, and lets Matthew edit the proposed wording. The production builder and production copy remain the source of the Before view.

## Run the review

From this repository checkout:

```sh
python3 scripts/build_copy_review.py
python3 scripts/serve_copy_review.py
```

Open [the copy review](http://127.0.0.1:4193/tools/copy-studio/). The server binds to the Mac's loopback interface only. The manual command stays running until stopped with Ctrl+C. Use `--port` if the default port is already occupied. For this Mac review, a user LaunchAgent named `ca.wellandgoodgrowth.copy-review` keeps the server available on port 4193 and restarts it after login. Its configuration is `~/Library/LaunchAgents/ca.wellandgoodgrowth.copy-review.plist`; its working directory points to the checkout running this review. Do not start a second server on that port.

`docs/copy-review/broader-copy.json` contains the proposed changes and original text. After approval, the studio uses the approved production copy as its new baseline. The historical approved export is saved in `docs/copy-review/approved-draft.json`. The normal `scripts/build_growth.py` still produces the approved website in `public/`, without the studio or proposed text.

## Saved edits

The studio saves edits to `private/copy-review/drafts.json`, outside the served site and outside Git. Rebuilding replaces `private/copy-review/site/` and preserves this draft file. Keep the draft file if moving the review to another checkout. Export from the studio to keep an additional copy of the review. The export includes saved field and metadata values even when you deliberately restore proposed text to the original.

The draft API rejects malformed data and reports malformed existing saves instead of silently replacing them. It accepts JSON from this review's origin only. It does not send contact forms, proxy requests, or publish the site. Analytics scripts are removed from the private page copies.

## Proposal format

The proposal has `version: 1`, a `title`, and a `pages` list. Each page has `path`, `label`, `note`, `fields`, and optional `metadata`. Fields contain a CSS `selector`, `originalHtml`, and `currentHtml`. Metadata contains `title` and `description`, each with `original` and `current` strings. Original text is checked before applying a change so a changed source can be reviewed explicitly.

This review does not approve or publish revisions. Once the wording is approved, apply it to the production source in a separate implementation step and verify the resulting pages.

## Initial review verification

All 15 pages were checked at desktop and 390-pixel preview widths. Current/Proposed toggles retain scroll position. Body and metadata edits, reload persistence, rebuilding without losing drafts, export/import, reset, menus, FAQ, automation picker and the local-services disclosure were exercised in a real browser. The production build and route validator passed. The initial proposal contained 32 body-field changes and five metadata changes. The approved export contained 35 changed body fields and five metadata changes; the editor now starts from the approved baseline with zero changes.

The approved release also implements the schema and social-image wording. General pages no longer declare a Niagara/GTA service restriction; local pages retain their specific areas. The new sharing image uses a fresh URL. See `release.md` for release evidence.
