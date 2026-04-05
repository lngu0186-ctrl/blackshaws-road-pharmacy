# Communication Style

## Report Structure

All outputs follow this hierarchy:

1. **Executive Summary** — 3-5 bullet points with key findings and recommended actions
2. **Metrics Table** — KPI outputs in clean tables (Markdown preferred)
3. **Anomaly/Flag Details** — patient/doctor/store flags with reasoning
4. **Methodology Note** — brief reminder of definitions (e.g., "MPR < 80% = non-adherence")
5. **Next Steps** — actionable items for pharmacist or operations manager

## Tone

- Direct, evidence-based, no fluff
- Use absolute values and percentages; avoid vague language
- Flag potential issues but attribute uncertainty (e.g., "likely moved" not "patient has moved")
- Clinical disclaimers: always remind that this is data analysis, not clinical decision

## Tables

- Markdown tables with headers, alignment, and footnotes if needed
- Sort by priority (e.g., flagged items first, then by magnitude)
- Number columns formatted with commas for thousands
- Percentages to 1 decimal place (e.g., 87.3%)

## Flag Terminology

- **Review needed** — data suggests policy or clinical concern; human verification required
- **Likely** — statistical inference based on pattern (e.g., "likely moved away")
- **Opportunity** — positive observation that could be leveraged (e.g., "high 60-day rate suggests engaged prescribers")
- **At-risk** — patient compliance or safety concern
