# Implementation Plan

Date: 6 July 2026. Executes `design/site-structure.md` + `design/component-upgrade-plan.md`.

Ground rules: stay inside the existing Tailwind v4 + custom-utility design system; no new dependencies; every step leaves the build green; commits grouped by stage.

## Step 1 — Content integrity fixes (highest priority)

Files: `src/components/sections/TrustBar.tsx`, `GoogleReviewsWidget.tsx` (delete), `PatientTrustSection.tsx`, `src/App.tsx`

1. TrustBar: replace stats array (drop 2,500,000 figure and count-up) with four verifiable facts; remove `useCountUp` usage; TODO(owner) on pharmacist-in-charge chip.
2. Delete GoogleReviewsWidget and its import/usage.
3. PatientTrustSection: rewrite heading/lead (remove leaked meta-copy); add honest "Read our reviews on Google" outbound link row.

## Step 2 — Shared pharmacy info module

Files: new `src/data/pharmacyInfo.ts`; consumers `HeroSection.tsx`, `Header.tsx`, `Footer.tsx`, `LocationSection.tsx`, `Contact.tsx`

1. Create typed info + `getOpenStatus()` helper (handles open/closed and today's hours).
2. Swap hardcoded values in consumers; LocationSection highlights today's row.

## Step 3 — Homepage restructure and copy pass

Files: `src/App.tsx`, `HeroSection.tsx`, `ServicesSection.tsx`, `PrescriptionPathwaySection.tsx`, `VaccinationsSection.tsx`, `AboutSection.tsx`, `FaqPreviewSection.tsx`

1. App.tsx homepage order: Hero → TrustBar → Services → PrescriptionPathway → Vaccinations → ChemistCareNow → ShopCategories → PatientTrust → About → Location → FaqPreview. HealthInfoSection removed.
2. Hero: new H1 + support line, open-now chip, CTA reduction (Upload primary, Book vaccination secondary, call link tertiary).
3. Services: six primary linked cards + compact specialty row; new copy per site-structure.md.
4. PrescriptionPathway / Faq / About / Vaccinations: copy replacement per site-structure.md; remove dead animation scaffolding in About.

## Step 4 — Header and Footer

1. Header: fix `\search` link bug; top bar open-status text.
2. Footer: remove filler badge, add disclaimer line, TODO(owner) email domain, consume pharmacyInfo.

## Step 5 — Global styles and housekeeping

1. `index.css`: h1 clamp max 4.8rem; `prefers-reduced-motion` block.
2. `index.html`: remove duplicate JSON-LD.
3. `npm uninstall remotion`; clean stale manualChunks in `vite.config.ts`.
4. Delete `._*` junk files and `.write-test`; rewrite `README.md`.

## Step 6 — Lint baseline fixes (best effort)

1. `Button.tsx` react-hooks/refs: refactor `asChild` handling.
2. `Shop.tsx` set-state-in-effect: derive page from searchParams instead of mirroring into state.
If either fix risks behaviour, revert and record in test-results.md.

## Step 7 — Verify

1. `npm run lint`, `npm run build`.
2. `npm run dev` + preview at 375 / 768 / 1280 widths; check header nav, hero CTAs, service cards, forms, tel/map links, footer links, focus states, overflow.
3. Screenshots to `design/screenshots/`; results to `design/test-results.md`; summary to `design/upgrade-summary.md`.

## Verification gates

- Build must pass after every step.
- No banned copy phrases (checked by grep: "seamless", "comprehensive", "journey", "cutting-edge", "revolution", em dash character in touched copy).
- No fabricated facts anywhere on the site after Step 1.
