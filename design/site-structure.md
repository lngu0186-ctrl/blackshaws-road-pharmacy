# Site Structure and Copy Direction

Date: 6 July 2026. Companion to `status.md`.

## Principles

- Every homepage section does exactly one job. Sections with overlapping jobs get merged or cut.
- The five facts a patient needs (who, where, hours, phone, how to get a script filled) are all visible without scrolling past the hero.
- All trust content must be verifiable. No invented reviews, ratings, counts, or staff claims.
- Copy is short, plain, and specific to Altona North. No em dashes, no marketing filler.

## Current vs proposed homepage

Current (13 sections): Hero → PrescriptionPathway → TrustBar (stats) → Services → ShopCategories → ChemistCareNow → Vaccinations → GoogleReviews (fabricated) → PatientTrust (leaked meta-copy) → About → FaqPreview → HealthInfo → Location.

Problems: four sections compete to do "trust", four compete to do "services", hours appear only at the bottom, and two sections contain content that must not ship (fake reviews, internal design notes).

### Proposed homepage order

1. **Hero** — who we are, where, hours snippet, primary and secondary CTA
2. **Trust strip** — a single quiet band of verifiable facts
3. **Services** — the six things patients actually come for
4. **Prescriptions** — practical "how to get your script filled" pathway
5. **Vaccinations + Chemist Care Now** — the two bookable services, kept as focused bands
6. **Shop** — brief category teaser for the online store
7. **Why locals trust us** — pillars plus an honest link to Google reviews (no invented data)
8. **Our story** — community section, Altona North grounding, est. 1968
9. **Visit us** — map, address, full hours table, phone, parking
10. **FAQ preview** — three common questions, link to full FAQ
11. **Footer** — contact, hours, links, health disclaimer, emergency numbers

Changes from current:
- `TrustBar` stats (2.5M patients, count-up animation) replaced by verifiable facts.
- `GoogleReviewsWidget` fabricated reviews removed; replaced by a small honest review band inside "Why locals trust us" (rating and quotes only return when real API data or owner-supplied screenshots exist).
- `PatientTrustSection` internal meta-copy removed; its four pillars merge into "Why locals trust us".
- `HealthInfoSection` leaves the homepage; its external resource links already live in the footer, and the Learn page covers the rest.
- `ShopCategories` moves below the health services content; the pharmacy's core jobs (scripts, vaccinations, advice) outrank retail.

## Section-by-section copy

Copy below is the target. Short headings, plain English, safe claims only.

### 1. Hero

- Eyebrow badges: `Est. 1968` · `Open 7 days`
- H1: **Your local pharmacy on Blackshaws Road**
- Support line: "Prescriptions, vaccinations, and practical health advice for Altona North. Family owned since 1968."
- Info chips: address · open-now status with today's hours · phone (tap to call)
- Primary CTA: **Upload a prescription**
- Secondary CTA: **Book a vaccination**
- Tertiary text link: "Or call (03) 9391 3257"

Rationale: the current hero offers four equally weighted buttons including "Compounding support", which is a niche service, not a primary conversion. Two CTAs plus a call link covers the three real patient intents.

### 2. Trust strip

One dark navy band, four short facts, no animation and no counters:

- **Since 1968** — three generations of Altona North families
- **Open 7 days** — weekdays until 9pm
- **AHPRA-registered pharmacists** — advice you can rely on
- **Independent and local** — backed by a national pharmacy network

TODO(owner): confirm the correct membership wording (Alliance Pharmacy vs Independent Pharmacies Australia) and whether to name the pharmacist in charge.

### 3. Services

Heading: **What we can help with**
Lead: "Walk in, call, or book. Most services need no appointment."

Six cards (linking to existing service pages):
1. **Prescriptions** — "New scripts, repeats, and eScripts. We will talk you through the next step."
2. **Vaccinations** — "Flu, COVID-19, and travel vaccinations by accredited pharmacist immunisers. Book online or ask in store."
3. **Medication advice** — "Speak with our pharmacists about your medicines, side effects, and repeats."
4. **Health checks** — "Blood pressure checks and everyday health monitoring, usually while you wait."
5. **Webster-paks** — "Weekly dose packing that keeps your medicines organised, for home or aged care."
6. **Compounding** — "Custom-made preparations when standard medicines do not suit."

### 4. Prescriptions

Heading: **Getting your script filled is simple**
Three steps (existing PrescriptionPathway pattern, copy tightened):
1. **Send it or bring it in** — "Upload a photo, send your eScript token, or drop the paper script at the counter."
2. **We prepare it** — "We will check it, dispense it, and call you if anything needs clarifying."
3. **Pick up or ask about delivery** — "Collect in store, or ask us about delivery options for regular medicines."
Safety line: "Questions about a new medicine? Our pharmacists will walk you through how to take it."

### 5. Vaccinations band

Heading: **Vaccinations without the wait**
Copy: "Book online through MedAdvisor or ask at the counter. Our pharmacist immunisers can vaccinate against flu, COVID-19, and a range of other conditions. Eligibility and availability vary, so call us if you are not sure."
CTA: Book a vaccination (MedAdvisor) · secondary: Call us

### 6. Why locals trust us

Pillars (from PatientTrustSection, meta-copy removed):
- AHPRA-registered pharmacists
- Independent community pharmacy
- Private consultations
- Serving local families since 1968

Review band (honest version): "Read what locals say about us on Google." with an outbound link. No invented rating, count, or quotes.

### 7. Our story

Heading: **Part of Altona North since 1968**
Copy direction: "Blackshaws Road Pharmacy has served Altona North, Brooklyn, South Kingsville, and the surrounding suburbs for over five decades. We are an independent, family-run pharmacy. Many of our customers have been coming here since they were kids, and our pharmacists know their patients by name. Whether you need a script filled, a vaccination, or honest advice about a medicine, you will get a straight answer from someone local."

### 8. Visit us

Keep existing LocationSection structure (map, address, hours table, parking). Copy tweaks only: heading **Find us on Blackshaws Road**, plus "Get directions" and "Call now" CTAs.

### 9. Footer

- Keep contact, hours, service links, resource links.
- Remove "Community trusted branding" filler badge.
- Keep the emergency line: "For urgent help after hours call NURSE-ON-CALL 1300 60 60 24. In an emergency call 000."
- Add a short general-advice disclaimer: "Information on this site is general in nature. Always follow the advice of your pharmacist or doctor."
- TODO(owner): confirm contact email domain (`blackshawsroadpharmacy.com.au` vs `blackshawspharmacy.com.au`).

## Other pages

No structural changes to Shop, Learn, FAQ, Compounding, Plant Based Therapies, Chemist Care Now, or health service pages in this pass. They inherit the copy rules (no em dashes, no banned phrases) where files are touched anyway. Deep service-page content build-out is a separate follow-up (see `status.md` opportunity list).
