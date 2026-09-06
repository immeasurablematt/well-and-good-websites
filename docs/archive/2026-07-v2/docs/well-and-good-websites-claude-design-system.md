# Well and Good Websites Brand Design System

Use this as the source of truth for Well and Good Websites in Claude projects, website edits, landing pages, social graphics, one-page sales materials, and client-facing templates.

## Brand Snapshot

Well and Good Websites builds affordable custom one-page websites for local businesses in Niagara and Toronto. The brand should feel practical, local, handcrafted, trustworthy, fast-moving, and polished without becoming corporate or generic.

Core promise:
- Affordable custom websites for local businesses.
- Focused one-page sites that help customers call, visit, book, or request a quote.
- A practical launch partner for business owners who do not want to write, design, structure, and launch a website by themselves.

Brand personality:
- Local and approachable.
- Clear and useful.
- Handcrafted but not fussy.
- Confident without hype.
- Warm, grounded, and direct.

Avoid:
- Generic SaaS polish.
- Overly glossy agency language.
- Abstract tech/startup visuals.
- Literal bridge overuse.
- Rewriting approved site copy when the task is only visual or branding work.

## Logo And Marks

Primary assets:
- `assets/wgw-logo-primary.png` - primary square brand logo, 1254 x 1254.
- `assets/wgw-submark.png` - square submark/crest, 1254 x 1254.
- `assets/wgw-pattern-texture.png` - repeating brand texture, 1254 x 1254.

Current live header lockup:
- Circular crest on the left.
- "Well and Good" in a refined serif.
- "WEBSITES" below in coral uppercase sans serif.
- The mark combines local place cues, a simple bridge/wave motif, warm dots, and a small cursor/launch symbol.

Logo usage:
- Use the full lockup when the brand needs to be named clearly.
- Use the square submark for avatars, favicon-style placements, small badges, cards, social posts, and page previews.
- Keep the mark on warm cream or dark ink backgrounds.
- Leave clear space around the mark equal to at least 20% of the mark width.
- Do not stretch, crop, recolor randomly, add shadows directly to the logo, or place it over busy photos.
- Do not use a logo with incorrect lettering or vague initials.

## Color System

Primary palette:

| Token | Hex | Use |
|---|---:|---|
| Ink | `#0F1B2A` | Main text, dark backgrounds, deep contrast |
| Evergreen | `#1E3D34` | Brand anchor, headings, footer, dark green surfaces |
| Warm Cream | `#F6F1E6` | Main page background |
| Strong Paper | `#FFFDF7` | Cards, logo backing, elevated surfaces |
| Coral | `#E76F4F` | Primary CTA, active state, highlights |
| Coral Dark | `#C9573C` | CTA hover, stronger coral emphasis |
| Aqua | `#A9D6E2` | Soft accent, section rules, waves |
| Sage | `#7A8158` | Secondary accent, muted local/organic cue |
| Taupe | `#CDB7A1` | Muted detail, dark-theme supporting text |
| Gold | `#CDA05B` | Stars, small proof accents |
| Line | `#D8C6B3` | Borders and dividers |
| Wash | `#EFE3D3` | Warm background band |

CSS variables:

```css
:root {
  --ink: #0F1B2A;
  --ink-soft: #334438;
  --muted: #7A8158;
  --line: #D8C6B3;
  --line-soft: rgba(216, 198, 179, 0.62);
  --paper: #F6F1E6;
  --paper-strong: #FFFDF7;
  --wash: #EFE3D3;
  --navy: #1E3D34;
  --coral: #E76F4F;
  --coral-dark: #C9573C;
  --blue: #A9D6E2;
  --sage: #7A8158;
  --aqua: #A9D6E2;
  --taupe: #CDB7A1;
  --gold: #CDA05B;
  --radius: 8px;
}
```

Dark theme tokens:

```css
[data-theme="dark"] {
  --ink: #FFFDF7;
  --ink-soft: #E6DCCC;
  --muted: #CDB7A1;
  --line: rgba(216, 198, 179, 0.34);
  --line-soft: rgba(216, 198, 179, 0.18);
  --paper: #0F1B2A;
  --paper-strong: #1E3D34;
  --wash: #182A24;
  --navy: #FFFDF7;
  --coral: #E76F4F;
  --coral-dark: #FF8A6A;
  --blue: #A9D6E2;
  --sage: #CDB7A1;
  --aqua: #A9D6E2;
  --gold: #E8BF72;
}
```

Color rules:
- Use warm cream as the default canvas.
- Use evergreen/deep ink for trust, structure, headings, and footers.
- Use coral for the primary action only or for tight highlights.
- Use aqua and sage as supporting local/handcrafted cues.
- Keep borders warm, soft, and visible.
- Avoid one-note green-only layouts. The brand needs warm cream, coral, aqua, and sage to feel complete.

## Typography

Primary type pairing:
- Headings: Fraunces, fallback Georgia, serif.
- Body/UI: Inter, fallback system sans-serif.

Google Fonts import:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,650;9..144,760;9..144,850&family=Inter:wght@500;600;700;800;900&display=swap" rel="stylesheet">
```

Type rules:
- Use Fraunces for H1, H2, H3, brand name, and major proof statements.
- Use Inter for body text, navigation, buttons, labels, metadata, and uppercase category text.
- Headings should be large, confident, and slightly editorial, with `letter-spacing: 0`.
- Body copy should be compact, useful, and easy to scan.
- Use heavier Inter weights for navigation, buttons, labels, and small proof text.
- Do not use thin, delicate, futuristic, or generic geometric type as the main identity.

Suggested scale:
- H1: `clamp(3rem, 4.25vw, 4.55rem)`, Fraunces 850, line-height 1.02.
- H2: `clamp(2.2rem, 4vw, 3.45rem)`, Fraunces 850, line-height 1.02.
- H3: 1.25rem to 1.5rem, Fraunces 850.
- Body: 16px to 18px, Inter 500-700, line-height 1.6.
- Small labels: 11px to 14px, Inter 800-900, uppercase where useful.

## Layout And Shape

Layout principles:
- Lead with the actual service and the local-business outcome.
- Keep sections full-width and structured, not decorative.
- Use cards for repeated items such as services, proof, FAQ, packages, and recent builds.
- Keep cards simple: warm paper background, 1px warm border, 8px radius, soft shadow.
- Use section headers with a short aqua top rule.
- Use clear spacing, strong alignment, and practical scanning paths.

Core measurements:
- Container: `width: min(1120px, calc(100% - 40px)); margin: 0 auto;`
- Border radius: `8px`.
- Card padding: 24px to 32px.
- Section padding: 72px desktop, tighter on mobile.
- Button min-height: 48px.

Shadows:

```css
--shadow: 0 24px 70px rgba(15, 27, 42, 0.13);
--shadow-soft: 0 16px 42px rgba(15, 27, 42, 0.08);
```

## Components

Buttons:
- Primary button: coral background, coral border, white text, heavy Inter.
- Primary hover: darker coral, subtle lift or offset shadow.
- Secondary button: paper background, dark text, warm border.
- Button radius: 8px.
- Button text should be direct: "Request a website", "See recent builds", "View live site", "See packages".

Cards:
- Background: `#FFFDF7`.
- Border: `#D8C6B3`.
- Radius: 8px.
- Shadow: soft ink shadow.
- Use a small coral, aqua, sage, or evergreen accent when useful.

Navigation:
- Sticky top bar with warm paper transparency and blur.
- Brand lockup left.
- Links right: Recent Builds, Services, Process, Contact.
- Keep link text short and action-oriented.

Hero:
- H1 uses Fraunces and can highlight one key phrase in coral.
- Supporting copy explains who the brand serves and what action the website should drive.
- Primary CTA should be coral.
- Secondary CTA should be restrained.
- Visual side should use the crest, pattern texture, or a real site preview, not generic stock imagery.

Proof and trust:
- Use real local-business examples, previews, testimonials, package prices, delivery timing, and practical details.
- Star accents may use gold, but avoid making the page look like a review widget template.

Pattern and texture:
- Use `wgw-pattern-texture.png` as a subtle repeating texture behind warm cream.
- Keep opacity low by layering cream over it.
- Do not make the texture compete with text.

## Imagery Direction

Preferred imagery:
- Real local businesses.
- Actual storefronts, service photos, menus, trades, shops, and owner-provided images.
- Website previews and browser-card mockups.
- Warm, useful, grounded visuals.

Avoid:
- Abstract tech dashboards unless showing a finished website preview.
- Generic agency stock photos.
- Dark blurred backgrounds.
- Artificial people scenes unless the client specifically asks for them.
- Decorative shapes that do not support the business outcome.

## Voice And Copy Rules

Voice:
- Plainspoken, specific, useful.
- Focused on outcomes: call, visit, book, request a quote.
- Local and practical.
- Fast without sounding reckless.

Good phrases:
- "Affordable custom websites for local businesses."
- "One-page sites designed to help customers call, visit, book, or request a quote."
- "Built around your services, reviews, photos, hours, and location."
- "Live in 48 hours."
- "Clear packages and practical launch support."

Avoid:
- "Transform your digital presence."
- "Unlock your brand potential."
- "World-class digital experiences."
- "Seamless omnichannel solutions."
- Heavy marketing jargon.

Important preservation rule:
- If the task is visual branding, do not rewrite approved copy, navigation labels, CTAs, anchors, analytics, or page structure unless explicitly asked.

## Claude Usage Instructions

When using this design system in Claude:
- Keep the visual identity consistent with the tokens, typography, and component rules above.
- Prefer the existing site assets before inventing new ones.
- If creating a website or landing page, start with the usable page, not a marketing splash screen.
- Preserve the current message unless asked to do copywriting.
- Use the asset names exactly when referencing files.
- Keep the design warm, local, practical, and handcrafted.

Upload or attach these files with this document when possible:
- `wgw-logo-primary.png`
- `wgw-submark.png`
- `wgw-pattern-texture.png`
