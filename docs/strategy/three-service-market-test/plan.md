# Three-service market analysis and test plan

Prepared September 25, 2026. Status: analysis brief, not an approved market pivot or launched experiment.

## Decision to make

Determine how Well and Good Growth should allocate its next sales effort across **websites, growth marketing, and AI automation**, considering local, wider Canadian, and US buyers. Identify the best initial service, buyer, offer, and acquisition route, plus a credible alternative. A conclusion that the present local approach is best is acceptable if evidence supports it.

The existing brand name, design, positioning, service pages, and public prices remain unchanged during this analysis and the proposed initial test. Targeted private offer documents, demonstrations, and conversations can test a service without repositioning the whole business. Such collateral can be drafted as part of analysis; sending, paid campaigns, and prospect contact require a separate instruction.

## Corrections to the initial research

Earlier research mainly evaluated AI automation. It does not establish demand, pricing, buyer fit, or acquisition economics for websites or growth marketing. It also does not establish that automation deserves most sales attention. Treat its conclusions as one service-line input.

Separate five choices: brand identity, stated service territory, buyer size, service offer, and acquisition channel. A local identity can coexist with remote delivery. A large buyer is not automatically profitable or accessible. Local familiarity is a potential advantage to measure, not a proven conversion benefit.

## Phase 1: Establish the current business and evidence

Read CLAUDE.md, the workstream handoff, README.md, .agents/product-marketing.md, the current production builder, and relevant existing pricing/proof documents. Verify the live pages before describing current positioning. Some documents and saved snapshots describe older releases. Do not silently substitute old packages or claims for current ones.

Inventory the three lines separately:

| Service | Questions the analysis must answer |
|---|---|
| Websites | Which buyers need a new site or replacement? What do they pay for strategy, copy, design, build, maintenance, and ownership? How do DIY tools, freelancers, and agencies change the offer? What are acquisition effort, revisions, support, and retention economics? |
| Growth marketing | Which buyer has an established offer, sufficient demand or traffic, and budget for recurring work? Compare search, content, AI visibility, and other actually supported services without treating them as interchangeable. Establish attribution limits, time to outcomes, reporting effort, and recurring margin. |
| AI automation | Which repeated process has enough value and an accountable owner? Compare existing-tool configuration, custom implementation, training, and ongoing support. Account for access, review, failures, maintenance, and actual adoption. |

For each, distinguish completed client proof, prior consultancy experience, community projects, concepts, illustrative workflows, and unverified claims. Do not borrow proof from one line to claim results in another. A website enquiry is not a completed sale; an automation demo is not measured client ROI.

Request only consequential missing inputs: desired monthly owner income or revenue, available weekly hours, deadline for income, and any usable recent lead/project records. Keep revenue and owner income distinct. If unanswered, proceed with explicit scenarios rather than inventing the founder's circumstances. Do not access financial accounts or private client systems merely to fill these gaps.

## Phase 2: Comparable external research

Give all three service lines a comparable initial research budget. Use parallel specialists if available, one per line, plus a cross-line challenger after initial findings. Require the same evidence template so the most heavily researched category does not automatically win.

For each line:

1. Define the buyer's problem, purchase trigger, decision-maker, realistic first engagement, and principal substitute, including doing nothing.
2. Collect current purchase evidence where possible. Separate adoption, search interest, seller claims, advertised prices, actual transactions, and addressable revenue.
3. Inspect 4-6 relevant suppliers across local and remote markets. Record scope, currency, billing terms, proof, ongoing obligations, and uncertainty. Do not average incomparable packages.
4. Sample relevant search terms consistently in Canada and the US. Explain intent, missing values, geography, period, and limitations. Search volume is not qualified demand or a sales forecast.
5. Evaluate qualified local relationships, wider professional relationships, targeted outbound, referrals/partners, marketplaces, and inbound search. Identify which are realistically available now.
6. Evaluate small owner-led firms, established teams, and enterprise buyers separately. Use workflow value, budget, access, and buying authority alongside headcount.
7. Record dated primary links, denominators, scope, and counterevidence. Never manufacture conversion rates, typical deal sizes, sales cycles, or outcomes.

Use sources.md and data/ as seed material. The existing search sample is automation-only. Add evidence for the other lines before reaching a portfolio recommendation. Search current information; reuse still-relevant sources without paying to duplicate the same query. Disclose metered research costs before spending and stay with modest bounded requests.

## Phase 3: Compare economics and portfolio fit

Build one matrix containing all three services, with rows for plausible buyer/channel combinations. Include:

- Accessible qualified buyers and strength of existing relationships.
- Strength and relevance of current proof.
- Urgency, willingness-to-pay evidence, and purchasing friction.
- Fees, payment timing, direct costs, and margin assumptions.
- All founder hours: prospecting, failed proposals, discovery, delivery, revisions, reporting, administration, and support.
- Time to first collected cash, recurring obligations, retention assumptions, concentration risk, and delivery capacity.
- Fit with experience, enjoyment/capacity if supplied, reuse potential, and dependencies on client action.
- Confidence level and the specific missing fact most likely to change the conclusion.

Use cash collected minus direct costs per total founder hour as one comparison, not the sole definition of success. Model low/base/high scenarios when inputs are unknown. Keep currency, tax treatment, setup fees, subscriptions, client ad spend, and pass-through software costs explicit. Do not confuse total client budget with service revenue.

Evaluate cross-selling in both directions without assuming it happens: websites to marketing, marketing to website improvements, and either to automation. Account for overlapping package revenue once. Compare one focused acquisition offer with maintaining three independent funnels. A sensible result may prioritize one line for acquisition while keeping all three available for qualified work.

Do not force an arbitrary numerical score to imply precision. If weights are used, label them judgment calls and test whether a different reasonable weighting changes the winner.

## Phase 4: Design the smallest fair commercial experiment

Design, but do not launch, a six-week prospecting experiment with a day-60 review. Timelines, sample counts, and thresholds are proposed learning limits, not market benchmarks.

Start with comparable discovery across all three lines. Approximately 4-5 substantive conversations per line can expose obvious mismatches, but cannot establish conversion rates. Where possible use existing reachable relationships. Only then recommend one primary paid-offer test and one comparison lane that fit actual founder capacity.

For the initial paid-offer test, aim for 10-15 qualified conversations, subject to capacity. Use a service-specific offer document and relevant proof while leaving the website intact. Prospects may receive the existing site for background. If geography is raised, explain actual remote availability truthfully rather than inventing existing national clients.

Avoid changing service, price, buyer size, geography, and channel together and then claiming to know what caused the result. Record each factor. Compare local and non-local prospects with similar economic eligibility when practical; label unavoidable confounding. The early test is directional learning, not a randomized market experiment.

Specify in advance:

- What qualifies a buyer for this particular service.
- The offer, exclusions, proposed price and basis, proof, and next buying step.
- An acquisition-hours cap and delivery-capacity limit.
- Success signals involving money collected and viable delivery economics, not likes or polite interest.
- Failure and revision signals, plus how insufficient reach differs from offer rejection.
- How long the service reasonably needs to demonstrate results. A marketing engagement may require an outcome-measurement window beyond the initial sales test.
- What evidence would justify changing geographic copy later, and what would justify retaining the current approach.

A paid diagnostic may suit automation or strategic marketing, but it is not a mandatory entry offer for every line. Do not force website buyers through an automation-style process. Existing website previews also have a founder-time cost that must be counted.

## Deliverables for Claude

Save public-safe outputs beside this plan:

1. `analysis.md`: direct recommendation, strongest objections, alternatives, confidence, and what would change the recommendation.
2. `comparison.csv`: comparable service/buyer/channel rows, observed inputs versus assumptions, economics, and evidence links.
3. `source-register.md`: dated evidence and caveats for all three lines, with research costs.
4. `experiment.md`: executable proposed test, measures, limits, draft offer outlines, and decision rules. Mark outreach as unlaunched.
5. Update only `handoffs/three-service-market-test.md`, commit and push the analysis to the workstream branch, and update the same pull request according to repo rules.

Keep confidential pipeline records, financial details, client information, and private messages out of this public repository. If private evidence is supplied, analyze it in an appropriate local-only location and publish only an approved or non-sensitive abstraction. Do not include the original conversation screenshot.

Completion means a defensible comparison of all three service lines and a concrete proposed test. It does not require changing the website, sending outreach, buying ads, changing pricing, building a new offer-delivery system, or merging a pull request.
