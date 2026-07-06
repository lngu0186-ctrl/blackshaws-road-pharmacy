# Component Upgrade Plan

Date: 6 July 2026. Companion to `design/site-structure.md`.

Approach: refine within the existing design system (Tailwind v4 tokens, `.card`/`.btn`/`.section-label` utilities, navy/red/cream palette). No new UI libraries. No half-conversion to another design system.

A recurring defect across sections: **internal design rationale shipped as user-facing copy** (sentences like "This second layer of the homepage does the quiet trust work" and "designed for convenience without sounding like medicine is guaranteed before review"). Every touched section gets a copy pass to remove these.

## 1. Shared data: `src/data/pharmacyInfo.ts` (new)

- **Current problem:** address, phone, email, and opening hours are hardcoded separately in Header, Footer, LocationSection, Contact, and index.html. A future hours change means five edits.
- **Target UX:** one source of truth, plus an "Open now / Opens at" status computed from the visitor's clock.
- **Approach:** small typed module exporting `pharmacyInfo` (address, phone, phoneHref, email, hours per weekday) and helpers `getTodayHours()` / `getOpenStatus(date)`.
- **Accessibility:** status text is plain text, not colour-only.

## 2. HeroSection

- **Current problem:** four equal-weight CTAs (including niche "Compounding support"), no hours signal, no supporting sentence under the very large H1.
- **Target UX:** who/where/hours/phone answered in five seconds; one primary action (Upload a prescription), one secondary (Book a vaccination), one quiet call link.
- **Component pattern:** existing photographic hero retained; add an "Open now · closes 9:00 pm" live chip beside address and phone chips.
- **Styling:** keep overlay treatment; H1 max size reduced slightly (5.8rem is oversized against the chip row); support paragraph in white/85 for contrast.
- **Accessibility:** phone chip stays an `<a href="tel:">`; open-status chip includes the actual closing time as text.

## 3. TrustBar (trust strip)

- **Current problem:** fabricated-feeling stats ("2,500,000+ patients served") with a distracting count-up through millions; stale "55+ years".
- **Target UX:** a quiet, factual band a sceptical local would believe.
- **Component pattern:** four static fact cards: Since 1968 / Open 7 days / AHPRA-registered pharmacists / Independent and local.
- **Approach:** remove `useCountUp`; plain text values, no animation.
- **Styling:** same navy gradient band; slightly higher text contrast (white/74 → white/85 for body).
- **Accessibility:** removes an animation that ignored `prefers-reduced-motion`.

## 4. ServicesSection

- **Current problem:** heading uses banned word ("Comprehensive"); lead sentence is meta-copy; 10 cards of varying depth; most cards link nowhere despite detail pages existing.
- **Target UX:** six primary cards, each answering "what is it, and what do I do next", each clickable; a compact secondary row for the three specialty offerings (Plant Based Therapies, Compounding, Practitioner-only range).
- **Component pattern:** existing `Card` grid; whole-card link with visible "Learn more" affordance.
- **Styling:** unchanged card system; icons from lucide (already installed).
- **Accessibility:** cards become real links with focus-visible outline; icon is decorative (`aria-hidden`).

## 5. PrescriptionPathwaySection

- **Current problem:** leaked meta-copy in the lead paragraph; step copy is wordy.
- **Target UX:** three plain steps a patient can repeat back: send it, we prepare it, pick it up.
- **Approach:** copy replacement only; layout retained (it works well).
- **Accessibility:** unchanged; steps stay as headed cards, no ordered-number decoration needed beyond what exists.

## 6. VaccinationsSection

- **Current problem:** content generally fine; needs copy check for banned phrases and eligibility caveat.
- **Approach:** light copy pass only; keep MedAdvisor booking CTA. Add "eligibility and availability vary" safety line if missing.

## 7. GoogleReviewsWidget — removed from homepage

- **Current problem:** invents reviewer names, quotes, a 4.9 rating, and a 127-review count. Must not ship.
- **Target UX:** honesty. A single-line review invitation with an outbound Google link ("Read what locals say about us on Google") inside the trust section below.
- **Approach:** remove section from `App.tsx`; delete the component. If the owner later supplies a Places API key or real screenshots, a live widget can return.

## 8. PatientTrustSection → "Why locals trust us"

- **Current problem:** internal design notes shipped as heading/lead copy; overlaps with TrustBar and About.
- **Target UX:** four believable pillars plus the honest Google-reviews link (absorbing the deleted reviews widget's one legitimate element).
- **Approach:** rewrite copy; add review CTA row; drop the decorative floating logo pill (noise).
- **Accessibility:** outbound link marked with external-link icon and `rel="noopener noreferrer"`.

## 9. AboutSection ("Our story")

- **Current problem:** typo "personaltouch"; em dash in copy; banned phrases ("every health journey", "national standards of excellence"); dead animation scaffolding (`isIntroInView` hardcoded); stale "55+ years".
- **Target UX:** grounded local story naming Altona North and neighbouring suburbs, est. 1968, independent and family-run.
- **Approach:** copy rewrite, remove dead refs/styles, keep the 1968 visual card (it's a nice signature) with a TODO slot for a real team photo.

## 10. FaqPreviewSection

- **Current problem:** lead sentence is meta-copy ("A cleaner FAQ helps reduce friction before patients call").
- **Approach:** copy pass only. Heading: "Questions we hear a lot".

## 11. HealthInfoSection — removed from homepage

- **Current problem:** twelfth section on an overlong page; its external resource links duplicate the footer.
- **Approach:** remove from `App.tsx` route element. File kept (harmless) unless nothing else imports it, in which case deleted.

## 12. LocationSection ("Visit us")

- **Current problem:** solid section, but hardcoded hours and no open-now status; heading "Find us in Altona North" fine.
- **Approach:** consume `pharmacyInfo`; highlight today's row in the hours table; keep map iframe (lazy-loaded).
- **Accessibility:** today's row highlighted with bold text and a label, not colour alone.

## 13. Header

- **Current problem:** `Link to="\search"` (backslash) renders a broken route on mobile search icon. Top bar says "Community pharmacy care, 7 days" where actual hours would be more useful.
- **Approach:** fix the search link; top bar shows open-now status from `pharmacyInfo`. No structural nav changes (mega menu works and is out of scope).

## 14. Footer

- **Current problem:** "Community trusted branding" filler badge; duplicated hardcoded hours; no general-advice disclaimer; email domain inconsistency.
- **Approach:** remove filler badge; consume `pharmacyInfo`; add one-line disclaimer; TODO(owner) on email domain.

## 15. Global styles (`index.css`)

- Reduce h1 max clamp from 5.8rem to ~4.8rem.
- Add `@media (prefers-reduced-motion: reduce)` block: disable smooth scroll, fade-in-up animation, and `.btn`/`.card` hover transforms.
- Raise the most-used low-contrast dark-section text steps (components move from white/58–62 to white/70+ where text is informational).

## 16. Housekeeping (code, not design)

- `index.html`: remove the duplicate LocalBusiness JSON-LD block (keep the `Pharmacy` one).
- `package.json`: remove unused `remotion` dependency.
- `vite.config.ts`: drop manualChunks entries for libraries not installed (`graphql-request`, `framer-motion`).
- Delete committed macOS junk files (`._*` at root and in `public/`, `.write-test`).
- `README.md`: rewrite to describe the actual stack and design system.
- Attempt fixes for the 3 pre-existing lint errors (Button ref, Shop setState-in-effect); if a fix is risky it is documented in `design/test-results.md` instead.

## Explicitly out of scope for this pass

- Header mega menu restructure (works; large surface, low return).
- Deep content for all 27 health-service pages (content project, not a design one).
- Shop/ProductDetail merchandising upgrades.
- New imagery (see `design/visual-assets-plan.md`; TODO slots only).
- FAQ accordion conversion (current always-open cards are friendlier for older readers than a tap-to-reveal accordion; four items don't need collapsing).
