# Test Results

Date: 6 July 2026. Environment: Windows 11, Node/npm, no `.env` file (Shopify and Supabase keys absent, which mirrors a fresh checkout).

## Commands run

| Command | Result |
|---|---|
| `npm run lint` | **Pass, 0 errors** (baseline before this work had 3 errors) |
| `npm run build` (`tsc -b && vite build`) | **Pass**, ~0.9s, no warnings |
| `npm run dev` + browser preview | Pass, checked at 375px, 768px, 1280px |

## Checks performed in the browser

| Check | Result |
|---|---|
| Horizontal overflow at 375 / 768 / 1280 | **0px overflow at all three** (was 394px+ at tablet/desktop before the header fix) |
| Header navigation (desktop nav, mega menu trigger, hamburger, drawer) | Pass. Full nav fits at 1280+; hamburger + drawer used below that; drawer includes search and all links |
| Hero CTAs | Pass. Upload opens the prescription modal; Book a vaccination opens MedAdvisor in a new tab; call link is `tel:` |
| Open-now status | Pass. Top bar, hero chip, and visit section all show live "Open now, closes 9:00 pm" from shared hours data |
| Service cards | Pass. All six primary cards and three specialty links route to existing pages (slugs verified against nav data) |
| Prescription upload modal | Opens and loads the external secure form; close button and Escape work |
| Contact page | **Fixed during testing.** Previously crashed the whole app when Supabase env vars were absent (client threw at module load). Now renders; form shows a friendly "call us" error when the backend is unconfigured |
| Shop page without Shopify keys | Renders with empty/error state, no crash |
| Phone/address links | `tel:` links work in header, hero, footer, visit section; directions link opens Google Maps |
| Map embeds | Load lazily on homepage visit section and contact page |
| Footer links | Internal links route correctly; external resource links open in new tabs with `noopener` |
| Keyboard focus | Global `:focus-visible` outline present; skip link works |
| Reduced motion | `prefers-reduced-motion` now disables smooth scroll, fade-ins, and hover transforms |
| Console errors | None on homepage, shop, health services, contact |

## Issues found and fixed during testing

1. **Header overflow at every desktop width.** The desktop nav cluster needed ~1,670px against a 1,216px container, so the page always scrolled horizontally from 768px up. Restructured breakpoints: full nav at `xl+` (with "Home" dropped in favour of the logo link and "Health Library" shortened to "Learn"), hamburger below `xl`, search as an icon link, call button shown only `md`-`xl` (the top bar shows the phone number from `md` up).
2. **App-wide crash on /contact without env vars.** `createClient(undefined, undefined)` threw at module load and unmounted the entire React tree. The client now falls back to placeholder credentials and exports `isSupabaseConfigured`; the contact form checks it and directs users to phone instead of failing silently.
3. **Banned copy on the health services hub** ("Comprehensive pharmacy care...") and ~20 "comprehensive" instances in the services data, replaced with plain wording.

## Remaining issues needing owner input

1. **External upload form shows wrong hours.** The embedded prescription upload app (`blackshawsrx.lovable.app`) displays "Mon–Fri 8am–8pm, Sat 8am–2pm, Sun 8am–1pm", which conflicts with the site's hours (Mon–Fri to 9pm, Sat to 6pm, Sun 10–5). That app is a separate deployment and must be corrected there.
2. **Facts requiring confirmation** (marked `TODO(owner)` in code): pharmacist-in-charge name, Alliance Pharmacy vs IPA membership wording, contact email domain, mobile number, service prices in `src/data/services.ts` (pre-existing content listing specific fees such as "$20-$30 flu vaccine", which I could not verify).
3. **Env vars needed in production** for the shop (Shopify) and forms (Supabase); without them those features degrade gracefully but do not work.
4. **Screenshots**: pages were verified interactively in the embedded browser preview at all three widths; no screenshot files are committed because the preview tooling does not export files. `design/screenshots/` is left absent rather than committing placeholders.
