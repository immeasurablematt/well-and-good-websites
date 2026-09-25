"""Build comparison.csv for the three-service market test.

Every price range below is anchored to advertised prices in source-register.md.
Every hour figure is an assumption (no public source measures this founder's
hours). Change an input here and re-run: python3 build_comparison.py

Cash per founder hour = (cash collected minus direct costs) divided by all
founder hours: sales hours per win (including prospects who do not buy and
unpaid previews), delivery, and recurring work in the window.
"""
import csv
from pathlib import Path

USD_TO_CAD = 1.37  # Assumption for comparison only; check the day's rate before quoting.
CASES = ("low", "base", "high")

# Each row: identifiers, then per-case inputs as (low, base, high) tuples.
# upfront: one-time cash in the first 90 days (setup, project, diagnostic plus build).
# monthly: recurring fee; months_in_90d: recurring months billed inside the first 90 days.
# sales_h: founder hours per won client, including failed proposals and previews.
# delivery_h: one-time delivery hours. monthly_h: recurring hours per month.
ROWS = [
    dict(
        row_id="W1", service_line="websites",
        buyer_segment="Established owner-led local service business, 5 to 49 staff",
        geography="Niagara and GTA", channel="Warm relationships and referral partners",
        offer="Fixed-scope one-time build or redesign, free preview only after qualification",
        currency="CAD", upfront=(2500, 3500, 5000), monthly=(0, 0, 0), months_in_90d=0,
        direct_costs=(50, 50, 50), sales_h=(20, 15, 8), delivery_h=(40, 30, 22), monthly_h=(0, 0, 0),
        price_basis="Observed: Niagara floors CAD 1,750 to 2,500, typical CAD 3,500 to 8,000 (Vision, Cool Koala, Niagara Web Design)",
        proof="Partial: one completed client website (Toronto), two labelled concepts",
        reachable_now="Unknown count of warm local contacts; 13,641 Niagara employer firms with 1 to 49 staff",
        wtp_evidence="Advertised local prices; Circle designers' lowest projects average USD 2,160",
        time_to_first_cash="Deposit at signing (assumption: 2 to 6 weeks after first conversation)",
        recurring_obligation="Optional care plan; revision and support requests after launch",
        cross_sell="Website to Grow or Launch package; site gaps to automation of intake",
        confidence="Medium", key_unknown="How many previews become paid builds, and preview hours",
    ),
    dict(
        row_id="W2", service_line="websites",
        buyer_segment="Micro owner-led business, 0 to 4 staff",
        geography="Niagara", channel="Targeted outbound with free preview (CASL-compliant)",
        offer="Launch package: CAD 750 setup plus CAD 199 per month",
        currency="CAD", upfront=(750, 750, 750), monthly=(199, 199, 199), months_in_90d=3,
        direct_costs=(60, 45, 30), sales_h=(40, 25, 15), delivery_h=(14, 10, 8), monthly_h=(3, 2.5, 2),
        price_basis="Current public price (scripts/build_growth.py)",
        proof="Partial: same single client; concepts show local small-business style",
        reachable_now="High count, high objection rate: 55% of no-presence firms say digital is not relevant (CFIB)",
        wtp_evidence="Low: DIY AI builders free to USD 10/mo; US subscriptions USD 79 to 199/mo",
        time_to_first_cash="Setup fee at signing",
        recurring_obligation="Monthly posts, GBP, hosting; churn unknown",
        cross_sell="Launch to Grow upgrade (not counted here)",
        confidence="Low", key_unknown="Cold preview-to-sale rate and month-12 retention",
    ),
    dict(
        row_id="W3", service_line="websites",
        buyer_segment="US small service businesses",
        geography="United States", channel="Cold outbound or marketplace",
        offer="Productized remote build in USD",
        currency="USD", upfront=(1500, 2500, 3500), monthly=(0, 0, 0), months_in_90d=0,
        direct_costs=(50, 50, 50), sales_h=(60, 35, 20), delivery_h=(30, 25, 20), monthly_h=(0, 0, 0),
        price_basis="Observed: US subscriptions USD 79 to 199/mo; B12 USD 1,999 setup; Clutch builds mostly USD 3,000 to 12,000 (self-report)",
        proof="None in the US",
        reachable_now="Large but no relationships; many local US suppliers and platforms",
        wtp_evidence="US search about 7.5x Canada; heavy DIY and subscription price pressure",
        time_to_first_cash="Deposit at signing; cold cycle unknown",
        recurring_obligation="Support across time zones; US payment and tax setup",
        cross_sell="Weak without local presence",
        confidence="Low", key_unknown="Any response rate from cold US prospects without US proof",
    ),
    dict(
        row_id="G1", service_line="growth marketing",
        buyer_segment="Owner-led local business, 1 to 19 staff",
        geography="Niagara and GTA", channel="Warm local relationships",
        offer="Grow package: CAD 1,500 onboarding plus CAD 699 per month",
        currency="CAD", upfront=(1500, 1500, 1500), monthly=(699, 699, 699), months_in_90d=3,
        direct_costs=(150, 100, 60), sales_h=(30, 20, 12), delivery_h=(30, 22, 15), monthly_h=(16, 12, 8),
        price_basis="Current public price; Ontario single-channel rivals CAD 950 to 1,999/mo for social or SEO alone",
        proof="Weak for this buyer: B2B startup content results, one local-style website client",
        reachable_now="Unknown warm count; local SEO search about 100/mo in Niagara",
        wtp_evidence="Mixed: Yelp flat, Thryv done-for-you down 62%, Yext small customers contracting",
        time_to_first_cash="Onboarding fee at signing",
        recurring_obligation="High: 2 pages, about 12 posts, reviews, monthly report every month; SEO needs 4 to 12 months",
        cross_sell="Includes the website, so do not also count W1 revenue",
        confidence="Low to medium", key_unknown="Actual monthly delivery hours per Grow client",
    ),
    dict(
        row_id="G2", service_line="growth marketing",
        buyer_segment="Established local business with a marketing budget, 10 to 99 staff",
        geography="Niagara and GTA", channel="Warm relationships and referral partners",
        offer="Paid local search and content audit with a 90-day plan, then a scoped project",
        currency="CAD", upfront=(1000, 1500, 2500), monthly=(0, 0, 0), months_in_90d=0,
        direct_costs=(0, 0, 0), sales_h=(15, 10, 6), delivery_h=(18, 14, 10), monthly_h=(0, 0, 0),
        price_basis="Observed: audits CAD 300 to 2,000 (Wide Ripples), Storyteller CAD 1,495",
        proof="Partial: search and content expertise is real; local results limited to one client",
        reachable_now="1,765 Niagara firms with 20 to 99 staff (arithmetic on StatCan counts); many already have a provider",
        wtp_evidence="BDC 2019: 20 to 49 staff firms spend about twice the small-firm average (stale)",
        time_to_first_cash="Audit fee at signing",
        recurring_obligation="None until a follow-on project is agreed",
        cross_sell="Audit to website rebuild or retainer",
        confidence="Medium", key_unknown="Whether audits lead to paid follow-on work",
    ),
    dict(
        row_id="G3", service_line="growth marketing",
        buyer_segment="B2B tech and software companies, seed to Series B",
        geography="GTA (inside the stated service area)", channel="Existing professional network and referrals",
        offer="Defined content or positioning project, then a monthly content lead retainer",
        currency="USD", upfront=(3000, 5000, 8000), monthly=(3000, 5000, 7000), months_in_90d=2,
        direct_costs=(100, 100, 100), sales_h=(40, 25, 12), delivery_h=(35, 30, 25), monthly_h=(30, 35, 40),
        price_basis="Observed: fractional marketing USD 209/hr average; FRAK retainers mostly USD 5,000 to 8,000 (self-report); Ahrefs agency SEO retainers average USD 3,209",
        proof="Strong for this buyer: named B2B startup content and search results",
        reachable_now="Unknown: depends on how many warm contacts are hiring now",
        wtp_evidence="94% of fractional workers have won clients through network referrals (Fractional Jobs)",
        time_to_first_cash="Project deposit (assumption: 2 to 6 weeks after a warm conversation)",
        recurring_obligation="High hours per client, so capacity caps it at 2 or 3 clients",
        cross_sell="Content retainer to website rebuild or workflow automation for the same team",
        confidence="Medium", key_unknown="Whether the network has live demand this quarter",
    ),
    dict(
        row_id="G4", service_line="growth marketing",
        buyer_segment="B2B tech and software companies, seed to Series B",
        geography="Wider Canada and United States", channel="Existing professional network and referrals",
        offer="Same as G3, priced in USD",
        currency="USD", upfront=(3000, 5000, 8000), monthly=(3000, 5000, 7000), months_in_90d=2,
        direct_costs=(100, 100, 100), sales_h=(50, 30, 15), delivery_h=(35, 30, 25), monthly_h=(30, 35, 40),
        price_basis="Same as G3",
        proof="Strong for this buyer; no local presence needed",
        reachable_now="Unknown; same network, more remote",
        wtp_evidence="Early-stage VC-backed firms are 36% of fractional hiring (Fractional Jobs)",
        time_to_first_cash="Same as G3; add cross-border payment setup",
        recurring_obligation="Same as G3; time zones",
        cross_sell="Same as G3",
        confidence="Medium", key_unknown="Whether a Niagara-branded site reduces trust with non-local B2B buyers",
    ),
    dict(
        row_id="A1", service_line="AI automation",
        buyer_segment="Owner-led micro or small business, 1 to 9 staff",
        geography="Niagara", channel="Warm local relationships and existing website or marketing clients",
        offer="Paid workflow diagnostic, then one small fixed-scope build",
        currency="CAD", upfront=(3250, 4500, 6500), monthly=(0, 0, 0), months_in_90d=0,
        direct_costs=(0, 0, 0), sales_h=(45, 25, 12), delivery_h=(40, 33, 24), monthly_h=(0, 0, 0),
        price_basis="Observed: BotLogix strategy day CAD 1,000; Flowgrammer audit CAD 2,500; ChatGPT.ca builds CAD 5,000 to 15,000",
        proof="Weak: one internal workflow example, no measured client savings",
        reachable_now="Small: 10.7% of AI-using 1 to 4 staff firms used outside help (StatCan)",
        wtp_evidence="Low; built-in AI at CA$18.40 to USD 20 per seat substitutes for simple work",
        time_to_first_cash="Diagnostic fee at signing",
        recurring_obligation="Breakage and model or API changes; support not yet priced",
        cross_sell="Best sold to people who already trust Matt from a website or marketing project",
        confidence="Low", key_unknown="Diagnostic-to-build conversion and maintenance hours",
    ),
    dict(
        row_id="A2", service_line="AI automation",
        buyer_segment="Established team, 10 to 99 staff",
        geography="Niagara, GTA, and Ontario", channel="Network and partners (bookkeepers, MSPs)",
        offer="Paid diagnostic, then one production workflow, optional support",
        currency="CAD", upfront=(6500, 10000, 15000), monthly=(0, 0, 0), months_in_90d=0,
        direct_costs=(0, 0, 0), sales_h=(50, 30, 15), delivery_h=(64, 52, 45), monthly_h=(0, 0, 0),
        price_basis="Observed: Clarity audit CAD 1,500 to 2,500 and sprint CAD 7,500 to 12,500; Flowgrammer builds CAD 7,500 to 25,000",
        proof="Weak for this buyer: no production client workflow",
        reachable_now="Best-evidenced automation segment (CFIB: 60%+ of 20 to 49 staff firms use GenAI)",
        wtp_evidence="Medium: priced competitors exist; StatCan outside-help use rises with firm size",
        time_to_first_cash="Diagnostic fee at signing",
        recurring_obligation="Named-workflow support; privacy and access obligations",
        cross_sell="Automation client to website or content work",
        confidence="Low", key_unknown="Win rate against Flowgrammer and BotLogix without proof",
    ),
    dict(
        row_id="A3", service_line="AI automation",
        buyer_segment="B2B tech and software companies in the existing network",
        geography="GTA, wider Canada, and United States", channel="Existing professional network",
        offer="Fixed-price workflow sprint, for example content or research operations",
        currency="USD", upfront=(3000, 5000, 7500), monthly=(0, 0, 0), months_in_90d=0,
        direct_costs=(0, 0, 0), sales_h=(30, 20, 10), delivery_h=(35, 30, 25), monthly_h=(0, 0, 0),
        price_basis="Observed: Brothers Automate USD 1,500 to 15,000; XRay USD 250/hr",
        proof="Weak to partial: network trust plus one workflow example",
        reachable_now="Same network as G3; tech firms have the highest AI use",
        wtp_evidence="Upwork AI Strategy and Consulting volume up more than 50% (global)",
        time_to_first_cash="Sprint deposit",
        recurring_obligation="Support after handover",
        cross_sell="Overlaps G3 buyers: count one engagement per client, not both",
        confidence="Low to medium", key_unknown="Whether tech teams buy this or build it themselves",
    ),
]

EXCLUDED = [
    ("X1", "AI automation", "Enterprise", "Excluded: vendor security programs and SOC 2 (reported USD 25,000 to 50,000 first year) are out of reach for a solo founder now."),
    ("X2", "all lines", "Marketplaces (Upwork, Fiverr)", "Excluded as a primary channel: Fiverr buyers down 21.9%, global price competition, weak fit with a trusted-advisor offer."),
]


def cad(value, currency):
    return value * USD_TO_CAD if currency == "USD" else value


def economics(row, i):
    cur = row["currency"]
    cash = row["upfront"][i] + row["monthly"][i] * row["months_in_90d"]
    net = cad(cash - row["direct_costs"][i], cur)
    hours = row["sales_h"][i] + row["delivery_h"][i] + row["monthly_h"][i] * row["months_in_90d"]
    return round(cad(cash, cur)), hours, round(net / hours)


def main():
    out = Path(__file__).with_name("comparison.csv")
    header = [
        "row_id", "service_line", "buyer_segment", "geography", "channel", "offer",
        "price_currency", "upfront_low_base_high", "monthly_low_base_high", "price_basis",
        "proof_strength", "reachable_buyers_now", "willingness_to_pay_evidence",
        "sales_hours_per_win_low_base_high", "delivery_hours_low_base_high", "recurring_hours_per_month_low_base_high",
    ]
    for case in CASES:
        header += [f"cash_first_90d_cad_{case}", f"founder_hours_first_90d_{case}", f"net_cad_per_founder_hour_{case}"]
    header += [
        "time_to_first_cash", "recurring_obligation", "cross_sell_note", "confidence",
        "key_unknown", "observed_vs_assumed",
    ]
    fmt = lambda t: " / ".join(f"{v:g}" for v in t)
    with out.open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(header)
        for r in ROWS:
            line = [
                r["row_id"], r["service_line"], r["buyer_segment"], r["geography"], r["channel"], r["offer"],
                r["currency"], fmt(r["upfront"]), fmt(r["monthly"]), r["price_basis"],
                r["proof"], r["reachable_now"], r["wtp_evidence"],
                fmt(r["sales_h"]), fmt(r["delivery_h"]), fmt(r["monthly_h"]),
            ]
            for i in range(3):
                line += list(economics(r, i))
            line += [
                r["time_to_first_cash"], r["recurring_obligation"], r["cross_sell"], r["confidence"],
                r["key_unknown"],
                "Prices: observed ranges or current public price. Hours, win conditions, and exchange rate "
                f"(USD 1 = CAD {USD_TO_CAD}): assumptions. Cash is first 90 days after signing.",
            ]
            w.writerow(line)
        for row_id, line_name, segment, note in EXCLUDED:
            w.writerow([row_id, line_name, segment] + [""] * (len(header) - 5) + ["Excluded", note])
    print(f"Wrote {out}")
    for r in ROWS:
        print(r["row_id"], [economics(r, i)[2] for i in range(3)])


if __name__ == "__main__":
    main()
