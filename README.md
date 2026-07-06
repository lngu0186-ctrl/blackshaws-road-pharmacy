# Blackshaws Road Pharmacy Website

Website for Blackshaws Road Pharmacy, an independent community pharmacy at 310A Blackshaws Road, Altona North VIC 3025, serving the area since 1968.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (CSS-first config in `src/index.css` via `@theme`)
- react-router-dom 7 (SPA routing, lazy-loaded pages)
- zustand (cart, product cache, prescription-upload modal state)
- Supabase (prescription upload storage, contact form edge function)
- Shopify Storefront API (online shop)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev       # development server
npm run build     # typecheck + production build
npm run preview   # preview production bundle
npm run lint      # eslint
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_SHOPIFY_STORE_DOMAIN` / `VITE_SHOPIFY_STOREFRONT_TOKEN` — online shop
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` — prescription upload and contact form

Without these, the shop and forms render but their network features are degraded.

## Design system

Defined in `src/index.css`:

- **Palette:** deep navy `#10183f` / `#1b2a6b`, brick red `#c0392b`, warm cream `#faf8f4`
- **Type:** Crimson Pro (display serif) + Inter (body), loaded async from Google Fonts
- **Components:** utility classes `.btn`, `.card`, `.section-label`, `.container-custom`; 28px card radius; pill buttons
- Reduced-motion preferences are respected (`prefers-reduced-motion`)

## Structure

```
src/
├── components/
│   ├── layout/     Header (mega menu), Footer, drawers
│   ├── sections/   Homepage sections (Hero, TrustBar, Services, ...)
│   ├── features/   Prescription upload, vaccination booking, chat
│   └── ui/         Button, Card, skeletons
├── data/           pharmacyInfo (hours/contact source of truth), services, nav, articles
├── pages/          Lazy-loaded routes
├── stores/         zustand stores
├── services/       Shopify client
└── integrations/   Supabase client
```

Pharmacy contact details and opening hours live in `src/data/pharmacyInfo.ts`. Change them there, not in components.

## Content rules

- No invented reviews, ratings, statistics, or staff claims. Trust content must be verifiable.
- Copy follows Australian pharmacy advertising expectations: general information only, no outcome claims, safety-netting lines kept ("If symptoms persist, see your healthcare professional").
- `TODO(owner)` comments mark facts that need confirmation by the pharmacy owner.

## Deployment

Static SPA build in `dist/`. The host must rewrite unknown paths to `index.html` for client-side routing. Canonical domain: `blackshawspharmacy.com.au`.
