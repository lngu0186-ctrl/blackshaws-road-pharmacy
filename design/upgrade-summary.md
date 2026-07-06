# Upgrade Summary

Date: 6 July 2026. Covers commits from `2383ce8` (status audit) through the Stage 6 fixes.

## 1. What changed

**Content integrity (the most important change):**
- Deleted the fabricated Google reviews section (invented reviewer names, quotes, a 4.9 rating, and a 127-review count).
- Replaced the "2,500,000+ patients served" statistic and its count-up animation with four verifiable facts (since 1968, open 7 days, AHPRA-registered pharmacists, independent and local).
- Removed internal design notes that had shipped as user-facing copy in four sections (e.g. "This second layer of the homepage does the quiet trust work").
- Added an honest review path: a "read our reviews on Google" outbound link instead of invented quotes.

**Structure:**
- Homepage reordered from 13 sections to 11, following the classic local-pharmacy flow: hero → trust strip → services → prescriptions → vaccinations → Chemist Care Now → shop → why locals trust us → our story → visit us → FAQ.
- Hero rebuilt around one message ("Your local pharmacy on Blackshaws Road"), a live open-now chip, and a clear CTA hierarchy (Upload a prescription, Book a vaccination, call link) instead of four equal buttons.
- New `src/data/pharmacyInfo.ts`: single source of truth for address, phone, email, and hours, with an open-status helper used by the header, hero, visit section, and footer.

**Fixes:**
- Header horizontal overflow at every desktop width (nav never fit its container) fixed with a proper responsive plan.
- App-wide crash on /contact when Supabase env vars are missing fixed; forms now degrade gracefully.
- All 3 pre-existing lint errors fixed; lint is now clean.

**Copy:**
- Plain-English rewrite of hero, services, prescriptions, vaccinations lead, about, FAQ preview, and footer copy. Em dashes removed from site copy, "comprehensive" and similar filler removed, typos fixed ("personaltouch"), stale "55+ years" replaced with non-expiring phrasing.

**Hygiene:**
- Unused `remotion` dependency removed; stale vite chunk rules cleaned; duplicate JSON-LD block removed from index.html; committed macOS junk files deleted; README rewritten to describe the actual stack; `prefers-reduced-motion` support added; oversized h1 scale trimmed.

## 2. Why it improves the site

The site already had a strong visual system. What held it back was credibility and focus: invented trust content a local could disprove in one Google search, internal notes visible to patients, four sections competing to do the same job, hours buried at the bottom of the page, and a header that overflowed on desktop. The upgrade makes every claim on the site true, puts who/where/hours/phone within the first screen, and gives each section one job.

## 3. Level movement

- **Before (Level 3, generously):** polished surface with template-grade content honesty, no live hours, diluted CTAs, a broken desktop header layout, and a route that could crash the whole app.
- **After (Level 4+):** verifiable trust signals, live open-now status in three places, single-purpose sections in a persuasive order, a clear conversion hierarchy, clean lint/build, graceful degradation without backend keys, and maintainable single-source contact data. Level 5 requires real photography, real review data, and deep content on the 27 service pages (see below).

## 4. Sections upgraded

Hero, trust strip (TrustBar), services grid, prescription pathway, vaccinations lead, why-locals-trust-us (PatientTrustSection), our story (AboutSection), visit us (LocationSection), FAQ preview, header, footer, health services hub hero. Removed: fake reviews section, homepage HealthInfo section (links live in the footer).

## 5. Assets still placeholders

- The "1968" graphic card in the story section is a styled placeholder for a real team/shop photo (TODO in code).
- Existing hero photo (`hero-pharmacy.webp`) appears real and was kept.
- No new generated imagery was added, deliberately (see `design/visual-assets-plan.md`).

## 6. Replace with real photography later

In priority order (details and shot notes in `design/visual-assets-plan.md`):
1. Shopfront exterior (visit section, beside the map)
2. Team photo with consent (our story section)
3. Dispensary close-up (prescriptions band)
4. Pharmacist consultation (services or vaccinations band)

## 7. Recommended next steps

1. Confirm the `TODO(owner)` facts: pharmacist-in-charge name, membership wording (Alliance vs IPA), email domain, mobile number, and the service prices listed in `src/data/services.ts`.
2. Fix the hours shown by the external upload app (`blackshawsrx.lovable.app`), which contradict the site.
3. Write real content for the highest-traffic health service pages (vaccinations, MedsCheck, dose administration aids) using the existing `services.ts` data as the base; remove `noindex` as pages become real.
4. Supply real photography (list above).
5. If real Google review data is wanted on-page, add a Places API key and rebuild the widget against live data only.
6. Consider moving the OpenClaw agent-workspace files (`SOUL.md`, `memory/`, `.openclaw/`, `awesome-openclaw-personas/`, `prescription-analyst/`, etc.) out of this repo; they are unrelated to the website.

## Before / after: homepage

**Before:** Hero with four equal CTAs and no hours → prescription pathway with meta-copy → animated stats claiming 2.5M patients → "Comprehensive Pharmacy Services" (10 unlinked cards) → shop categories → Chemist Care Now → vaccinations → fabricated Google reviews → trust section opening with internal design notes → about (typos, stale numbers) → FAQ preview with meta-copy → health info links → map/hours. Horizontal scrollbar on desktop from the header.

**After:** Hero with one headline, live "Open now, closes 9:00 pm" chip, address and phone chips, and two CTAs plus a call link → quiet band of four verifiable facts → "What we can help with" (6 linked cards + 3 specialty links) → three-step prescription pathway in plain English → vaccinations with eligibility caveat → Chemist Care Now → shop teaser → trust pillars with an honest Google reviews link → grounded local story naming the suburbs served → map with hours table highlighting today → FAQ preview. No overflow at any width; reduced-motion respected.
