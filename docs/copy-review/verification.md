# Copy review verification

Verified on October 6, 2026 in the attached broader-copy-review checkout. These checks validate the private review experience; they do not approve the copy or confirm a production release.

- Production build: 15 HTML pages, 13 publishable routes. No production source, images, package prices or proof changed.
- Browser: all 15 routes at desktop and 390px, without horizontal overflow. Desktop/tablet/mobile controls exercised. Current/Proposed retained scroll at 800px.
- Editing: body text, nested headings and search metadata; read-only Current view; saved edits recovered after reload and preview rebuild.
- Drafts: whole-site export/import/reset, intentional rejection export/import, page-switch editing lock, unsafe markup and unsupported version rejection, source-conflict retention without applying mismatched body edits.
- Site controls: menus, FAQ, automation picker and the proposed local-services disclosure. Links cannot navigate the iframe; form submissions are prevented, including when copied preview pages are opened directly.
- Save API: loopback and same-origin checks, JSON shape validation, malformed existing-save preservation, stale-write rejection and atomic saves.
- Service: user LaunchAgent restarted successfully; HTTP 200 and identical saved draft bytes confirmed after restart.
- Syntax: Python compilation and Node syntax checks passed. All browser test edits were removed; the prepared draft contains 37 proposed changes.

The managed Copy Studio verification script expects different element identifiers from this repository's existing editor. Equivalent checks were run with the Playwright CLI against the actual interface. Local screenshots and QA outputs remain under ignored private/copy-review/qa/.

The social-image and schema proposals are recorded for a later implementation step. They are not applied by this review overlay.
