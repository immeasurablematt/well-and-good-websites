#!/usr/bin/env python3
"""Build the COPY-EDITS-ONLY recommendations tracker as .xlsx and .csv.
Structural/technical actions live separately (see build_actions.py)."""
import pathlib, csv
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

HEADERS = ["#", "Page", "Element", "Current copy", "Proposed copy",
           "Why (principle)", "Priority", "Status", "Your notes"]

# Copy edits only: changes to the actual words on the page.
# Status: READY (decided) / TEST (A/B variant) / OPEN (needs your input) / VERIFY (confirm live state)
rows = [
    ["Homepage", "Hero H1 (control)",
     "Get found by local customers, and chosen before your competitors.",
     "No website? Your next customer is Googling you, and calling someone else.",
     "Names the missed opportunity: high-intent searchers you can't capture yet, not existing customers. Pain-led.",
     "High", "READY", ""],
    ["Homepage", "Hero subhead (pairs with H1)",
     "Get a custom website that shows up on Google, ChatGPT, and social for 80% less than agencies charge.",
     "Get a custom site live in 24 hours, for 80% less than an agency.",
     "Carries the speed and price proof under the hook; tighter rhythm.",
     "High", "READY", ""],
    ["Homepage", "Hero H1 (challenger, A/B)",
     "(tested against the control above)",
     "Get found by the customers searching for you right now.",
     "Positive capture framing. Test against the pain-led control.",
     "Test", "TEST", ""],
    ["Homepage", "Primary CTA button",
     "[CONFIRM actual button label, not readable from the page]",
     "Get my free preview",
     "CTA = action verb + what they get. Put the free, no-commitment hook in the button.",
     "High", "OPEN", ""],
    ["Homepage", "About-Matt closing CTA",
     "If you want to see what I can do for your business, let's chat.",
     "See a free preview of your site, no commitment.",
     "Replace the weak, vague \"let's chat\" with the same concrete, zero-risk action used elsewhere.",
     "Med", "READY", ""],
    ["Homepage", "Eyebrow / bundle line",
     "Everything other agencies upsell you on - website, SEO, social, reviews - in one low monthly price.",
     "Everything agencies sell you separately, website, SEO, social, reviews, in one monthly price from $99.",
     "Specificity ($99 beats \"low\"); \"sell you separately\" lands the bundle contrast.",
     "Med", "READY", ""],
    ["Homepage", "Duplicate tagline",
     "\"Agency results, a fraction of the price\" appears twice on the page.",
     "Keep it once as a section divider; remove the duplicate.",
     "One idea per section; repetition dilutes.",
     "Low", "READY", ""],
    ["Homepage", "Frank testimonial label",
     "Accordion player · Toronto",
     "Reconcile the location to match how Frank is referenced elsewhere (Niagara / his own site).",
     "Honest, consistent detail. The testimonial wording itself is strong, leave it.",
     "Low", "OPEN", ""],
    ["One-Page page", "Hero H1",
     "[CONFIRM live H1, may be \"When a one-page website works well.\"]",
     "One-page websites that make the next step obvious.",
     "Keyword plus outcome-led H1 for \"one-page websites\" search intent.",
     "Med", "VERIFY", ""],
    ["Homepage", "Meta title (SEO copy)",
     "Custom Websites in 24 Hours + Local Growth Marketing | Well and Good Websites (77 chars)",
     "Custom Websites in 24 Hours | Well & Good Websites",
     "Avoids truncation in Google results (keep under ~65 chars).",
     "Med", "READY", ""],
]

# ---- xlsx ----
wb = openpyxl.Workbook(); ws = wb.active; ws.title = "Copy Edits"
thin = Side(style="thin", color="D9D9D9"); border = Border(left=thin, right=thin, top=thin, bottom=thin)
header_fill = PatternFill("solid", fgColor="1A534F")
status_fills = {
    "READY": PatternFill("solid", fgColor="E2EFDA"),
    "TEST": PatternFill("solid", fgColor="DDEBF7"),
    "OPEN": PatternFill("solid", fgColor="FFF2CC"),
    "VERIFY": PatternFill("solid", fgColor="FCE4D6"),
}
ws.append(HEADERS)
for c in ws[1]:
    c.font = Font(bold=True, color="FFFFFF"); c.fill = header_fill
    c.alignment = Alignment(vertical="center", horizontal="left", wrap_text=True); c.border = border
for i, r in enumerate(rows, start=1):
    ws.append([i] + r)
widths = [4, 16, 26, 48, 50, 40, 9, 9, 22]
for idx, w in enumerate(widths, start=1):
    ws.column_dimensions[get_column_letter(idx)].width = w
for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
    for c in row:
        c.alignment = Alignment(vertical="top", wrap_text=True); c.border = border
    st = row[7].value
    if st in status_fills:
        row[7].fill = status_fills[st]; row[7].font = Font(bold=True)
ws.freeze_panes = "A2"; ws.auto_filter.ref = f"A1:I{ws.max_row}"

leg = wb.create_sheet("How to use")
leg["A1"] = "Copy-edits tracker"; leg["A1"].font = Font(bold=True, size=14)
for i, n in enumerate([
    "", "This tab is copy edits only: changes to the actual words on the page.",
    "Structural and technical items (booking, FAQ, CTA repetition, review stars, sub-page proof blocks,",
    "image alt, analytics) are tracked separately in the Actions Plan.", "",
    "Status: READY = decided, implement as written. TEST = A/B variant. OPEN = needs your input.",
    "VERIFY = confirm the current live wording first.", "",
    "Columns D and E are the side-by-side: current copy vs proposed copy.",
], start=2):
    leg[f"A{i}"] = n
leg.column_dimensions["A"].width = 90

base = pathlib.Path(__file__).parent
xlsx_out = base / "Well-and-Good-Websites-Copy-Recommendations-Tracker.xlsx"
wb.save(xlsx_out)

# ---- csv (for import into Google Sheets) ----
csv_out = base / "Well-and-Good-Websites-Copy-Edits.csv"
with open(csv_out, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(HEADERS)
    for i, r in enumerate(rows, start=1):
        w.writerow([i] + r)

print("Saved:", xlsx_out.name, "and", csv_out.name, "| rows:", len(rows))
