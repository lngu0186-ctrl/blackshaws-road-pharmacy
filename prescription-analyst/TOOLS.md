# Local Notes — Prescription Analyst

## Data Sources

### Fred Dispense (Common Australian system)

**Recommended reports to export:**

1. **Patient History** (Reports > Patient > Patient History)
   - Includes: patient name, prescriber name, PBS item code, drug description, quantity, script date, CTG flag, authority code, repeats.
   - Set date range (e.g., last 3 years).
   - Options: Include Drug Descriptions, Script Direction, Linked Family Members.

2. **Log of Scripts** (Reports > Dispense > Log of Scripts)
   - Line-item dispensed scripts.
   - Export via: `Reports > Last Run Report to ASCII` → saves to `C:\fredhealth\fred\reps\fredrep.rep`.
   - Import into Excel using Text Import Wizard (Data > Get Data > Legacy Wizards > From Text, Fixed width).
   - Adjust column breaks to align data.

3. **Script Analysis** (summary only, not line items) — useful for totals check.

**File format:** Fixed-width ASCII; may need cleanup. Alternatively, copy-paste into Excel and save as CSV.

---

### Z Dispense / Z Office

**Recommended reports:**

- **Script History** / **Patient History** — run with detailed columns selected.
- **Owing Scripts** — if tracking incomplete repeats.
- Use **Report Builder** to include all needed fields.

**How to export:**
1. In Report Viewer, click Export/Print > Export to Excel (or CSV).
2. Save file.

**Key fields to include** (via column chooser):
- `patient_id` (or patient name if no ID)
- `patient_dob`
- `patient_address`
- `prescription_date`
- `doctor_name`
- `doctor_id` (if available)
- `item_code` (PBS item number)
- `item_description`
- `quantity`
- `pack_size`
- `days_supply`
- `pbs_status` (PBS/Private/Under co-payment/Repat)
- `authority_type`
- `ctg_flag`
- `store_id`

---

### Generic CSV

Any custom extract that contains the Required Schema fields (see AGENTS.md). Ensure at minimum:
patient_id, prescription_date, doctor_name, store_id, item_code, quantity, pbs_status.

---

## Expected Fields (minimum viable)

| Field | Example | Notes |
|-------|---------|-------|
| patient_id | P12345 | Pseudonym; if real names, treat as PII |
| patient_dob | 1975-03-22 | Optional but useful |
| patient_address | 12 Main St, Suburb | For household linking; can be noisy |
| prescription_date | 2025-04-01 | DD/MM/YYYY or ISO |
| doctor_name | Dr Jane Smith | Variations need cleaning |
| doctor_id | DR001 | Optional; if missing, derive from name |
| store_id | STORE_A | Your pharmacy location identifier |
| item_code | 1234F | PBS item number (often 4-5 digits with F/T suffix) |
| item_description | Atorvastatin 20mg | Drug name |
| quantity | 30 | Number of units dispensed |
| pack_size | 30 | Tablets per pack; crucial for repeat detection |
| days_supply | 30 | Days of therapy; if missing, infer |
| pbs_status | PBS | One of: PBS, Private, Under co-payment, Repat |
| authority_type | Authority (ST) | Optional: Authority, Authority (PA), Authority (ST), None |
| ctg_flag | Y or 1 | Closing the Gap indicator (if present) |

---

## Field Mapping Tips

- **PBS Item Code**: May appear as `Item Code`, `PBS Code`, `Drug Code`. Usually numeric or alphanumeric (e.g., "1234F").
- **Days Supply**: Sometimes `Supply Days`, `No. Days`. If absent, compute as `quantity / (pack_size / usual_daily_dose)`. Usually pack_size = days_supply for tablets (e.g., 30 tablets = 30 days).
- **PBS Status**: May be `Claim Type`, `Benefit Type`, `PBS/Private`. Values: "PBS", "General", "Concession", "Under co-payment", "Repatriation". Normalise to our set.
- **Authority**: Look for `Auth`, `Authority Code`, `Streamlined Authority`. Presence of a code = authority script.
- **CTG**: Closing the Gap flag may be `CTG`, `CDM`, `Indigenous Health`. Treat as boolean.
- **Doctor**: Fred uses `Doctor Name`; Z uses `Prescriber`. May have `Prescriber Number`.
- **Pack size**: If missing, can often be inferred from PBS item code via lookup table; or from item description (e.g., "20mg x 30" means pack_size=30). If unsure, estimate from typical pack sizes.

---

## Report Export Recipes

### Fred Dispense → CSV (via Excel)

1. Run report (Patient History or Log of Scripts).
2. Close report preview.
3. `Reports > Last Run Report to ASCII` → file saved as `C:\fredhealth\fred\reps\fredrep.rep`.
4. Open Excel: Data > Get Data > Legacy Wizards > From Text (Legacy).
5. Select file, set original data type = Fixed width.
6. Set start import row to where column headers appear (often row 8+).
7. Adjust column breaks to align data in preview.
8. Finish import → Save As CSV.

---

### Z Dispense/Z Office → CSV

1. Run report (Report Viewer).
2. Click Export/Print > Export to Excel or CSV.
3. Choose location and save.

---

## Chronic Medication Reference (ATC Codes)

Common chronic classes to auto-detect:
- **C10** — Lipid modifying agents (statins)
- **C09** — Agents acting on renin-angiotensin system (ACE inhibitors, ARBs)
- **C07** — Beta blocking agents
- **C08** — Calcium channel blockers
- **A10** — Drugs used in diabetes (insulins, metformin, SGLT2 inhibitors)
- **R03** — Drugs for obstructive airway diseases (asthma/COPD inhalers)
- **S01** — Ophthalmologicals (eye drops)
- **N06** — Psychoanaleptics (antidepressants)
- **N05** — Psycholeptics (benzodiazepines, antipsychotics — some high-risk)
- **B01** — Antithrombotic agents (warfarin, DOACs, antiplatelets)
- **L04** — Immunosuppressants
- **J01** — Antibacterials for systemic use (watch for overuse)

These can be mapped from `item_code` via PBS item database or ATC crosswalk if available; otherwise, use keyword matching on `item_description`.

---

## High-Risk Medications (Australian context)

- **Warfarin** (C01AA01, B01AA03)
- **DOACs**: apixaban, rivaroxaban, dabigatran, edoxaban
- **Insulins** (all) and sulfonylureas (glibenclamide, gliclazide)
- **Opioids**: all Schedule 8 (oxycodone, morphine, fentanyl), plus tramadol, codeine compounds
- **Benzodiazepines**: diazepam, alprazolam, lorazepam, clonazepam
- **Methotrexate** (L04AX03)
- **Digoxin** (C01AA05)
- **Lithium** (N05AN01)
- **Antimicrobials**: vancomycin, gentamicin, meropenem, linezolid

Use ATC codes where possible; otherwise, match on item description keywords.

---

## PBS Rules Reference (quick)

- **Standard PBS**: max 30-day supply per prescription unless authority.
- **60-day scripts**: Allowed under:
  - Authority prescription with repeats authorising 60-day repeats
  - Chronic Disease Management (CDM) items (some have 60-day max)
  - Private prescription (no PBS limit)
- **Under co-payment**: patient pays full price; may be misclassified as Private.
- **Repatriation (Repat)**: separate pricing category.
- **Authority types**: "Authority", "Authority (PA)", "Authority (ST)", "None".
- **CTG** (Closing the Gap): Co-payment relief for eligible Indigenous patients; flagged on script.

---

## Output Conventions

- CSV files: UTF-8, comma-delimited, header row.
- Patient identifiers in flag reports: use `patient_id` (pseudonym) only unless real names explicitly required and authorised.
- Date formats: ISO 8601 (YYYY-MM-DD) for machine-readability; DD/MM/YYYY acceptable in human-facing reports.
- Flags: boolean columns `flag` or categorical `risk_level` (low/medium/high/critical).

---

## Database Connections (optional)

If connecting directly to a database, store connection string securely (e.g., in environment variable `PRESCRIPTION_DB_URL`). Read-only only. Typical schema table name: `dispensing` or `prescriptions`.

---

## Privacy Notes

- De-identify before analysis if dataset includes real names/addresses.
- Store intermediate files in encrypted location if required by pharmacy policy.
- Reports with patient-level flags should be delivered via secure channel (not unencrypted email).
