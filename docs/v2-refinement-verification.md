# V2 refinement verification

September 6, 2026. Baseline `6bc8841`; scope in [the refinement brief](v2-refinement-brief.md).

## Local acceptance

The HTML builder, copy inventory builder, v2 validator, and public build passed. All 17 HTML pages and 15 publishable routes validated. A baseline comparison confirmed unchanged page metadata, structured data, form markup and delivery configuration, header and footer navigation, plan prices and inclusions, sitemap, robots, llms, privacy content, and JavaScript.

Browser checks used the built public output at localhost. All 17 routes loaded without horizontal overflow at 320px and 1280px. A long email address exposed a privacy-grid overflow at 320px; `min-width: 0` and text wrapping fixed it while preserving the notice. All six articles now fit the 284px content column.

| Measured item | Before | After |
| --- | --- | --- |
| Contact first input, 390 by 844 | 1231px from page top | 480px |
| Homepage primary CTA bottom, 390 by 844 | 582px | 497px |
| Agentic OS primary CTA bottom, 390 by 844 | 678px | 494px |
| Homepage primary CTA bottom, 1280 by 720 | 611px | 604px |
| Websites primary CTA bottom, 1024 by 768 | 623px | 469px |
| Service hero label contrast | 2.25:1 | 7.56:1 |
| Form border against panel | 1.63:1 | 3.63:1 |
| Submit keyboard outline against panel | 1.54:1 | 11.65:1 |
| Monthly price unit contrast | 4.04:1 | 5.20:1 |
| Homepage decorative section labels | 6 | 2 |

Keyboard Tab reached the submit button with a visible 3px dark outline. The mobile menu opened, closed on Escape, and returned focus to its button with a light outline on green. Empty required inputs and malformed email were invalid using native browser validation. The Agentic OS link preselected Agentic OS on contact. No enquiry was submitted.

The mobile PageSpeed API retry returned HTTP 429. No Lighthouse score or Core Web Vitals improvement is claimed. Screenshots confirmed the desktop homepage and phone homepage, Agentic OS, and contact layouts.

## Standards

Independent read-only review found no supported documented-standard breaches or actionable code smells. The builder owns copy and markup; shared CSS owns presentation. Optional labels and numbered rows serve current requirements. Generated repetition is intentional. The follow-up privacy wrapping change also passed Standards review.

## Spec

Independent read-only review found no implementation defects, missing code requirements, or material scope creep. Subsequent browser measurements met the specified field-position, CTA-visibility, and contrast thresholds. The privacy fix preserved wording and fit the responsive verification scope. The PageSpeed retry was recorded as unavailable.

Review totals: Standards 0 findings; Spec 0 findings. Hosted-preview and production verification follow through the pull request and deployment receipts; local acceptance alone is not publication evidence.
