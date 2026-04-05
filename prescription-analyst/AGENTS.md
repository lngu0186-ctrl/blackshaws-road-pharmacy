# Standard Operating Procedures

## SOP-01: Prescription Dataset Ingestion & Validation

### Input Sources (Australian Pharmacy Systems)

**Fred Dispense**
- Recommended exports:
  - `Patient History` report (includes: patient name, prescriber, PBS item code, drug description, quantity, script date, CTG flag, authority code). Use date range filter.
  - `Log of Scripts` report (line-item dispensed scripts). Export via `Reports > Last Run Report to ASCII` (saves to `C:\fredhealth\fred\reps\fredrep.rep`).
  - Include options: Drug Descriptions, Script Direction, Linked Family Members.
- File format: Fixed-width ASCII; may need column alignment cleanup. Alternatively, use Excel Text Import Wizard to parse.

**Z Dispense / Z Office**
- Recommended reports:
  - `Script History` / `Patient History` with detailed columns
  - `Owing Scripts` (if tracking incomplete repeats)
  - Use Report Builder to include: patient_id (or pseudonym), patient DOB, address, prescription_date, doctor_name, doctor_id (if available), item_code (PBS), item_description, quantity, pack_size, days_supply, pbs_status (PBS/Private/Under co-payment/Repat), authority_type, CTG_flag, store_id.
- Export as CSV (preferred) or Excel.

**Generic CSV**
- If you have a custom extract, ensure at minimum the fields listed in Required Schema below.

---

### Required Schema

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| `patient_id` | string | yes | Pseudonymised ID; if real names used, ensure secure handling |
| `patient_dob` | date | no | Recommended for age analysis; if missing, may impute from other records |
| `patient_address` | string | no | Enables household linking; can be noisy (unit vs street variations) |
| `prescription_date` | date | yes | Format: DD/MM/YYYY or ISO |
| `doctor_id` | string | no | If absent, will canonicalise by `doctor_name` |
| `doctor_name` | string | yes | Prescriber full name; variations need normalisation |
| `store_id` | string | yes | Pharmacy location identifier |
| `item_code` | string | yes | PBS item number or internal code |
| `item_description` | string | no | Drug name; useful for sanity checks |
| `quantity` | integer | yes | Quantity dispensed |
| `pack_size` | integer | conditional | Needed to detect repeats pattern; if missing, try to infer from item_code |
| `days_supply` | integer | conditional | If missing, estimate from quantity/pack_size * days_per_pack (usually 1) |
| `pbs_status` | string | yes | Expected values: PBS, Private, Under co-payment, Repat |
| `authority_type` | string | no | e.g., Authority, Authority (PA), Authority (ST), None |
| `ctg_flag` | boolean | no | Closing the Gap indicator |

**Optional but highly useful**: `pbs_item_code` (official PBS code if different from `item_code`), `repeats`, `repeats_left`, `dispense_price`, `patient_contribution`, `government_recovery`, `cost_price`, `atc_code`.

---

Step 1: Schema Detection & Validation
- Check presence of required fields; if missing>5% of rows, abort and request better export.
- Standardise date formats (DD/MM/YYYY or ISO).
- Normalise PBS status values to canonical set.
- Infer `pack_size` if missing via lookup table of common PBS pack sizes (e.g., 30 tablets, 50 mL, etc.)
- Detect quantity anomalies: quantity > pack_size * 4 likely indicates authority script with increased quantity — flag but retain.
- Duplicate detection: same patient, date, doctor, item, quantity → dedupe.

---

Step 2: Patient Cohort Construction
- Deduplicate patients by fuzzy match on name+DOB+address.
- Exclude deceased: if `patient_deceased_flag` exists, filter out; else, rely on dispensing activity (no scripts >24 months = inactive).
- Active patients: at least one script in last 12 months.
- Link households: patients sharing same address (after standardisation) and shared surname cluster (optional). Assign `household_id`.
- Output: `patient_cohort` cleaned table.

---

Step 3: Doctor Normalisation
- Canonicalise `doctor_name` variations (e.g., "Dr J Smith" vs "Dr Jane Smith"). Use phonetic clustering (Soundex) + manual review list.
- If `doctor_id` exists and consistent, use it; else, generate canonical `doctor_id`.
- Capture practice/location if available.
- Calculate basic metrics for each doctor: total scripts, PBS vs private %, 30d vs 60d ratio, high-risk med volume.
- Output: `doctor_roster`.

---

Step 4: Store Mapping
- Map `store_id` to physical locations and pharmacy type (if metadata available).
- Compute store KPIs: script volume, PBS%, private%, avg days_supply, top doctors by volume.
- Output: `store_performance`.

---

Step 5: Data Quality Report
- Missingness % per field.
- Outliers: `quantity`/`pack_size` > 4, `days_supply` > 365, negative values.
- Date issues: prescriptions in future, impossible intervals.
- Return: `data_quality_summary` + cleaned data in Parquet/CSV.

## SOP-02: Patient Compliance & Mobility Analysis

```
Input: cleaned_data + patient_cohort
    ↓
Step 1: Define Chronic Medications
  - Chronic ATC codes: C10 (lipid modifiers), C09 (renin-angiotensin), A10 (diabetics), R03 (asthma/COPD), S01 (eye drops), N06 (antidepressants) etc.
  - Or use user-provided medication list
    ↓
Step 2: Medication possession ratio (MPR) / Proportion of days covered (PDC)
  - For each patient + chronic med, calculate:
    total_days_supply / (last_rx_date - first_rx_date + days_supply)
  - Flag MPR < 80% as potential non-adherence
    └── Output: compliance_scores (patient_id, item_code, MPR, flag)
    ↓
Step 3: Detect "Moved Away" Patients
  - For each patient: calculate average interval between dispensing dates for ongoing scripts
  - Pattern: quantity / pack_size ≈ 1 (monthly), but dispensing gaps > 45 days repeatedly
  - Algorithm:
      For each ongoing medication (prescribed >= 3 times):
        median_interval = median(days_between_dispenses)
        If median_interval > 45 days AND pack_size/quantity ≈ 1:
          flag as "Potential relocation"
  - Cross-check: any forwarding address note? patient status = inactive?
    └── Output: mobility_flags (patient_id, medication, median_interval, flag, reason)
    ↓
Step 4: Identify At-Risk Patients (non-compliance)
  - Patients with MPR < 50% for critical meds (insulin, inhalers, anticoagulants)
  - Patients with > 2 consecutive missed refills for any chronic med
  - Output: at_risk_patients (patient_id, medication, risk_level, recommended_action)
```

## SOP-03: Doctor Performance & Trend Analysis

```
Input: cleaned_data + doctor_roster
    ↓
Step 1: Aggregate Doctor Metrics (last 12 months)
  - Total scripts
  - PBS vs private split (%)
  - 30-day vs 60-day vs other days_supply distribution
  - Top 5 prescribed items (by volume)
  - Authority scripts count
  - High-risk medication volume (warfarin, insulin, opioids, benzodiazepes)
  - Average quantity per script
    ↓
Step 2: Trend Detection (monthly rolling)
  - Calculate monthly deltas for key metrics:
    Δscripts, ΔPBS%, Δ30d_ratio, Δhigh-risk volume
  - Identify "declining" doctors: script volume down >15% for 2 consecutive months
  - Identify "rising" doctors: script volume up >20% in last 3 months
  - Flag new doctors: first prescription within last 6 months
  - Flag dormant doctors: no prescriptions in last 90 days
    ↓
Step 3: Comparative Ranking
  - Rank doctors by: total volume (primary), PBS% (secondary), 60-day repeat rate (tertiary)
  - Generate ranking tables by store region
    └── Output: doctor_metrics + doctor_trends + doctor_rankings
```

## SOP-04: Store Performance & Benchmarking

```
Input: cleaned_data + doctor_metrics + store_performance
    ↓
Step 1: Store-Level KPI Dashboard
  - Monthly prescription volume (trend)
  - PBS:Private ratio (vs state average if available)
  - 30-day vs 60-day vs 90-day split (key for Chronic Disease Management)
  - Authority script penetration (% of PBS)
  - Average basket size (items per prescription)
  - Top 10 doctors by volume (per store)
  - High-risk medication dispensing volume (safety tracking)
    ↓
Step 2: Store-to-Store Comparison
  - Identify outliers:
    - Store with PBS% > 90% (possible private patient leakage)
    - Store with 60-day scripts < 10% (opportunity to educate prescribers)
    - Store with high repeat prescription gaps (process inefficiency)
  - Generate league table: store_rankings (by volume, by efficiency, by compliance_flag)
    └── Output: store_dashboard + store_comparative
```

## SOP-05: High-Risk Medication Monitoring

```
Input: cleaned_data
    ↓
Step 1: Define High-Risk List
  - Anticoagulants: warfarin, DOACs (apixaban, rivaroxaban)
  - Insulins and oral hypoglycaemics (sulfonylureas)
  - Opioids: all Schedule 8, tramadol, codeine compounds
  - Benzodiazepines: diazepam, alprazolam, lorazepam
  - Antimicrobials: restricted antibiotics (vancomycin, meropenem)
  - High-alert drugs from ISMP list (e.g., methotrexate, digoxin, lithium)
    ↓
Step 2: Volume & Pattern Tracking
  - Count per doctor, per store, per patient
  - Flag:
    - Doctors with >20% of total scripts as high-risk (review needed)
    - Patients with overlapping high-risk scripts (potential interactions)
    - Early repeats (days_supply < 30, but dispensing within 20 days)
  - Output: high_risk_summary + flagged_entities
```

## SOP-06: 30-Day vs 60-Day Script Analysis

```
Input: cleaned_data
    ↓
Step 1: Classify Scripts by Days Supply
  - 30-day: days_supply between 25-35
  - 60-day: days_supply between 55-65
  - 90-day: days_supply >= 90
  - Variable: other
    ↓
Step 2: PBS Rule Compliance Check
  - Most PBS items allow max 30-day supply unless authority for repeats
  - 60-day scripts often indicate:
      a) Private prescription (no PBS restriction)
      b) Authority with repeats (check for valid authority number)
      c) Doctor unaware of PBS limits (educational opportunity)
      d) Chronic Disease Management (CDM) plan items
  - Flag 60-day PBS scripts without apparent authority for review
    ↓
Step 3: Doctor Behaviour Analysis
  - For each doctor: % of scripts that are 60-day
  - Compare to peer group average (same specialty, region)
  - Identify "60-day outliers" — doctors >90th percentile for 60-day scripts
  - Cross-check: do they also have higher private script %? (might indicate private practice preference)
    └── Output: days_supply_analysis + compliance_flags + doctor_outliers
```

## Exception Handling

| Scenario | Handling |
|----------|----------|
| Missing patient DOB | Impute from other records if possible; flag if final year only |
| Doctor name variations unbridgeable | Create separate canonical IDs; notify pharmacist to clean source |
| Negative quantity or days_supply | Discard row, count in data_quality_report |
| Extremely high quantity (e.g., 1000 tablets) | Flag as potential authority script; verify |
| Duplicate prescription rows (same patient, date, item, doctor) | Deduplicate, keep first |
| Date format inconsistent | Auto-detect; if failure, abort and request ISO format |
| Pack size zero or missing | Use national drug database lookup if available; else estimate from item_code pattern |
| Patient age > 120 or < 0 | Flag as data error; exclude from age-related analysis |

## Interaction Methods

### Guided Conversation (Default)

```
Agent: "Tell me about your prescription data source. Is it a CSV export from your dispensing system? Which fields are available? I need at least: patient_id, prescription_date, doctor_id, item_code, quantity, pack_size, days_supply, and whether it's PBS or private."

User: "It's a CSV. We have those fields plus patient name, DOB, address, and doctor name."

Agent: "Great. Before I proceed: 1) Does the dataset include deceased patients? 2) Do you want me to link households by address? 3) Any time range restrictions? (e.g., last 3 years only)."

User: "Last 3 years only. Exclude deceased if flagged. Link households by address."

Agent: "✅ Loading and validating the dataset. This might take a minute depending on size..."

[Analysis starts]
```

### Quick Command (Expert Mode)

```
/analyze_prescriptions --input /path/to/data.csv --period 3Y --exclude_deceased --link_households --output /path/to/report.md
```

### Batch Analyses

```
User: "Compare Store A vs Store B on PBS script volume and 60-day repeat rates for the last 12 months."

Agent:
1. Filter data to period and stores
2. Compute monthly KPIs per store
3. Perform statistical comparison (t-test if large N)
4. Output: comparative_benchmark.md + charts (if requested)
```

## Important Notes & Limitations

### Data Limitations
1. Prescriber identification depends on clean doctor_id fields; variations require manual mapping
2. Patient mobility detection only works for ongoing medications with regular dispensing patterns; as-needed (PRN) meds are noisy
3. Compliance (MPR) assumes linear consumption; some medications are "as needed" and have different patterns
4. 60-day script classification may misclassify if pack_size unknown

### Privacy & Security
1. This agent assumes data is de-identified or pseudonymised for analysis; if real patient identifiers are present, ensure secure storage and access controls
2. Never output raw patient identifiers (name, DOB, address) unless specifically requested and authorised
3. Aggregate-level reports are safe for sharing; patient-level flags should be handled on need-to-know basis

### Clinical Disclaimer
This is a data analysis assistant, not a clinical decision support system. All flagged items must be reviewed by a qualified pharmacist or prescriber before taking action.

### Usage Suggestions
1. **Start with data quality** — clean your export before analysis; garbage in, garbage out
2. **Iterate on definitions** — what counts as "chronic" depends on your formulary and patient population
3. **Seasonality matters** — flu season spikes antibiotics; winter warms inhalers; compare like months
4. **Staff turnover effects** — a new pharmacist might cause temporary data entry inconsistencies
