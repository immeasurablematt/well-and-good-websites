# Compare markets across all three service lines

Status: waiting
Branch: codex/three-service-market-test
Pull request: https://github.com/immeasurablematt/well-and-good-websites/pull/65
Updated: 2026-09-26 14:20 EDT by Claude desktop

## Goal
Compare websites, growth marketing, and AI automation across local, wider Canadian, and US buyers. Recommend the next sales priority and a bounded experiment while preserving the current brand, website positioning, and three-service structure.

## Next step
Direction changed after Matthew's answers (see the September 26 update at the top of analysis.md): priority is now websites for small and medium businesses in ONE industry, sold remotely to Canada AND the US (Matthew wants the US included: bigger market, USD), at about 10 hours a week. There are no paying clients yet: the one completed site was free, for family. Next: pick the industry. Agree 3 or 4 candidate industries with Matthew, compare them with the same evidence template (reachable buyers, what a website is worth to them, what they pay now, vertical-specific competitors and platforms, fit with existing proof), recommend one, then scale experiment.md down to about 3 selling hours a week and one project at a time. Do not contact prospects, change the site, or merge until Matthew says so.

## Done so far
- Industry selection in progress (Matthew asked for a first-principles choice). Criteria and knock-out screen drafted; 8 shortlisted industries (design-build contractors, auto detailing, independent auto repair, wedding/event venues, wineries and craft beverage, event performers, small manufacturers and job shops, accounting and bookkeeping) being researched by three agents. Keyword data for their customers and owners saved in data/keyword-sample-verticals.csv (2 calls, US$0.18; workstream total US$0.54). If cut off: rerun the research using docs/strategy/three-service-market-test/target-industry/criteria.md, do not rebuy keywords.
- Matthew answered the four questions on September 26 (no income target, about 10 hours a week, no more B2B consultancy work, the one completed site was unpaid family work, so no paying clients yet; include the US). analysis.md now opens with the revised direction; the September 25 recommendation is kept below it as the record.
- Recommendation (analysis.md): initial sales priority is growth marketing for B2B tech and software teams through Matthew's professional network, GTA first, with automation needs recorded in the same conversations. Confidence low to medium and gated on a private count of qualified network contacts. Credible alternative: fixed-scope website builds (from about CAD 3,000) for established local service businesses through warm relationships and referrals, confidence medium. Local Launch/Grow/Dominate packages and standalone local automation stay available but should not lead acquisition.
- Comparable research for all three lines by three specialist agents, plus an independent cross-line challenge that changed the recommendation (research/ folder).
- comparison.csv (regenerate with python3 build_comparison.py): 10 service, buyer, and channel rows plus 2 exclusions. Prices observed; hours and exchange rate are assumptions. Base-case net CAD per founder hour, first 90 days: B2B content 130, network automation 137, local website build 78, Grow package 45, Launch by cold outreach 31.
- source-register.md: dated evidence for all three lines, evidence types separated, research costs. Total metered spend for the workstream US$0.36 (Codex US$0.18 plus Claude US$0.18 for 47 website, growth, and automation keywords in Canada and the US).
- experiment.md: six-week test with a day-60 review, gate thresholds, equal acquisition-hours caps, prospect and time-log fields, decision rules, and four draft offer outlines. Marked unlaunched.
- Codex earlier saved plan.md, claude-prompt.md, sources.md, and the automation-only keyword data, and opened draft pull request #65. No production files changed, no outreach, no merge.

## Waiting on Matthew
- Confirm the revised direction and which candidate industries to compare.

## Notes for the next tool
- Previous research centered on automation and cannot justify prioritizing that service over websites or growth marketing.
- Do not change the brand, site positioning, public pricing, or production files. Do not send outreach, buy ads, or merge this work.
- The repo is public. Keep confidential financial, client, and conversation details out of commits and pull-request text.
- Current main and live copy may change independently. Verify them before treating a saved snapshot as current.
- Follow CLAUDE.md for branch portability. If your environment cannot push this branch, include it in your allowed branch and update only this handoff with the new branch and pull request.
