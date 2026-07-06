# Blackshaws Road Pharmacy — Site Status Audit

Date: 6 July 2026
Baseline commit: `55bf3b4` (Update button text color and patient count)
Baseline build: **passes** (`tsc -b && vite build`, 1.0s). Lint: **3 pre-existing errors** (see section 7).

## 1. Current tech stack

- **Framework:** React 19 + TypeScript 5.9, single-page app (no SSR)
- **Build:** Vite 8 (rolldown), `@vitejs/plugin-react`, manual vendor chunking
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config in `src/index.css`), plus a small set of hand-written utility classes (`.btn`, `.card`, `.section-label`, `.container-custom`)
- **Routing:** react-router-dom 7 (`BrowserRouter`), lazy-loaded pages, redirects from legacy `/services` routes
- **State:** zustand (cart, product cache, upload-prescription modal)
- **Integrations:**
  - Supabase (prescription upload, contact form via `send-contact` edge function) — requires `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`
  - Shopify Storefront API (`src/services/shopify.ts`) for the shop — requires `VITE_SHOPIFY_*` env vars
  - MedAdvisor (external link) for vaccination bookings
- **Icons:** lucide-react. **Fonts:** Crimson Pro (display) + Inter (body) via Google Fonts, loaded async
- **Deployment assumptions:** static SPA build (`dist/`), canonical domain `blackshawspharmacy.com.au`, needs SPA-fallback rewrites for client-side routes

## 2. Current page structure

Homepage (`/`) renders 12 stacked sections in this order:
Hero → PrescriptionPathway → TrustBar (stats) → Services → ShopCategories → ChemistCareNow → Vaccinations → GoogleReviews → PatientTrust → About → FaqPreview → HealthInfo → Location.

Other routes: `/shop` (+ product detail), `/prescriptions`, `/health-services` (+ 27 slug pages), `/chemist-care-now`, `/compounding`, `/plant-based-therapies`, `/faq`, `/patient-info`, `/learn` (+ articles), `/search`, `/contact`.

Header: top info bar + sticky nav with a 5-column mega menu (27 health-service items), cart, search, vaccination CTA. Footer: 4-column dark footer with contact, hours, resource links, and a help CTA panel. Footer/chat/cart/toasts are deferred 2 seconds after first paint.

## 3. Current design style

Navy (`#10183f`/`#1b2a6b`) + red (`#c0392b`) + cream palette; serif display headings (Crimson Pro) over Inter body; very large heading scale (h1 up to 5.8rem); pill buttons with gradient fills and soft drop shadows; 28px-radius cards; photographic hero with layered dark overlays; count-up stat animations; intersection-observer fade-ins. Overall it reads as a deliberate, fairly premium brand system — noticeably above a template.

## 4. Current strengths

- Cohesive, distinctive design system (navy/red/cream, serif + sans pairing) applied consistently across pages
- Modern, well-organised codebase: lazy routes, typed data files, sensible component split (`layout` / `sections` / `features` / `ui`)
- Real conversion paths already exist: prescription upload modal (Supabase), MedAdvisor vaccination booking, working contact form wiring, click-to-call links
- Good technical SEO bones: LocalBusiness/Pharmacy JSON-LD, sitemap, canonical, per-page SEO hook, semantic skip link, `:focus-visible` styling
- Fast build; main bundle is reasonably split (largest chunks: vendor 252KB, Contact 195KB, ServiceDetail 64KB)
- Extensive service content data already written (`src/data/services.ts`, 53KB) and a health library (`learnArticles.ts`)

## 5. Main weaknesses

**Content integrity (most serious):**
- `GoogleReviewsWidget.tsx` renders **fabricated reviews** (invented names "Sarah M.", "James T.", "Priya K.", invented quotes, a fake "4.9 (127 Google reviews)" rating). This is presented as real Google review data. It must be removed or replaced with honest content.
- `TrustBar.tsx` claims **"2,500,000+ patients served"** — an unverifiable and implausible-looking figure, animated with a count-up that churns through millions. Also "55+ years" is a stale hardcoded number (1968 to 2026 is 58 years).
- `PatientTrustSection.tsx` leaks designer meta-copy to real users: "This second layer of the homepage does the quiet trust work…" — internal notes shipped as site copy.
- `TrustBar.tsx` names a pharmacist in charge ("Tram-Anh Bui"). If accurate this is fine, but it needs owner confirmation before staying on the site.

**Copy quality:**
- Typo "personaltouch" in `AboutSection.tsx`; em dashes in body copy; phrases the brief bans ("every health journey", "comprehensive vaccination services", "national standards of excellence").
- Footer badge "Community trusted branding" is meaningless filler.
- Two membership claims that conflict in emphasis: "Alliance Pharmacy member since 1968" (footer) vs "Independent Pharmacies Australia" (footer + about). Both may be true but the copy should be consistent and verified.

**Structure and conversion:**
- Homepage is 12 sections long with overlapping jobs (TrustBar, PatientTrust, About, Reviews all do "trust"; Services, ShopCategories, ChemistCareNow, Vaccinations all do "services"). No clear narrative order; opening hours don't appear until the very bottom (Location) or footer.
- Hero has four competing CTAs of similar weight (Upload prescription, Compounding support, Book a vaccination, Call or contact). "Compounding support" is an odd second-billing choice.
- 27 health-service nav items route to `ServiceDetail`, but unknown slugs fall to generic placeholder content; the mega menu promises more depth than some pages deliver.

**Consistency and hygiene:**
- Footer/contact email is `info@blackshawsroadpharmacy.com.au` while the canonical domain is `blackshawspharmacy.com.au` — one of these is likely wrong; needs owner confirmation.
- `index.html` has two near-duplicate JSON-LD blocks (LocalBusiness + Pharmacy) with the same data.
- `README.md` describes a previous design system (Playfair Display/DM Sans, eucalyptus greens, dark mode, Framer Motion, next-themes) that no longer exists — stale and misleading.
- `remotion` (a video rendering library) is in `dependencies` but never imported anywhere in `src/` — dead weight in installs.
- `vite.config.ts` manualChunks references `graphql-request` and `framer-motion`, neither of which is installed (harmless but confusing).
- macOS AppleDouble junk files (`._*`) are committed at repo root and in `public/` and get copied into the deploy output.
- Unrelated agent-workspace files are committed in the repo root: `AGENTS.md`, `SOUL.md`, `IDENTITY.md`, `USER.md`, `TOOLS.md`, `HEARTBEAT.md`, `BOOTSTRAP.md`, `MEMORY.md`, `memory/`, `.openclaw/`, `awesome-openclaw-personas/`, `prescription-analyst/`. These are not part of the website and would confuse any collaborator or CI. (Not deleted in this pass — flagged for the owner to relocate.)
- Leftover `'use client'` directives (Next.js remnant) in a few components; dead animation scaffolding in `AboutSection` (`isIntroInView` hardcoded `true`).

**Accessibility (spot check):**
- Skip link, focus-visible outline, and labelled form fields are present — good base.
- Low-contrast text is used widely on dark sections (`text-white/58`, `/60`, `/62` on navy) — likely below WCAG AA for small text.
- `.btn { width: 100% }` on mobile is applied globally, which makes some inline button groups stack oddly.
- Count-up and fade animations don't respect `prefers-reduced-motion`.

## 6. Highest-impact opportunities

1. **Fix trust-content integrity**: remove fabricated reviews and the 2.5M stat; replace with honest trust signals (real Google reviews link, verifiable facts: est. 1968, open 7 days, AHPRA-registered pharmacists).
2. **Tighten homepage narrative**: reduce/reorder sections into the classic local-pharmacy flow (hero with hours/contact → trust strip → services → prescription support → vaccinations → visit/map → community/about → FAQ → contact CTA), each section doing one job.
3. **Sharpen hero conversion**: two clear CTAs (Upload a prescription / Book a vaccination), open-now hours snippet, phone number prominent.
4. **Surface opening hours early**: an hours/open-status element in the hero or an announcement strip, not just at page bottom.
5. **Copy pass sitewide**: shorter headings, plain English, remove banned phrases and em dashes, fix typos, consistent membership claims.
6. **Small a11y/polish pass**: contrast on dark sections, reduced-motion support, mobile button behaviour, stale README, dead dependency removal.

## 7. Risks before making changes

- **Lint baseline is not clean**: 3 pre-existing ESLint errors (`react-hooks/refs` in `src/components/ui/Button.tsx`, `react-hooks/set-state-in-effect` in `src/pages/Shop.tsx`). Any "lint must pass" gate needs these fixed or acknowledged.
- **Env-dependent features**: shop (Shopify) and forms (Supabase) silently depend on env vars; local dev without `.env` renders those features degraded. Don't mistake missing keys for regressions.
- **Facts I cannot verify from here** (need owner confirmation, marked with TODOs where relevant): pharmacist-in-charge name, Alliance Pharmacy vs IPA membership wording, correct contact email domain, mobile number 0406 692 267, exact opening hours, "Night Chemist" naming in the MedAdvisor URL.
- **Agent-workspace clutter**: deleting `.openclaw/`, `memory/`, etc. could break the owner's other tooling — documented, not touched.
- **Rewriting vs refining**: the codebase is healthy; a rebuild would be destructive and unnecessary. All changes in this upgrade are refinements within the existing framework and design system.
