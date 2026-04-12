# Final Launch Handoff, Blackshaws Road Pharmacy

## Project
- **Project:** Blackshaws Road Pharmacy
- **Live URL:** https://blackshawsroadpharmacy.lovable.app
- **Shopify domain:** blackshaws-road-pharmacy.myshopify.com
- **Repo:** https://github.com/lngu0186-ctrl/blackshaws-road-pharmacy.git

## What has been completed

### 1) App structure and routing
- Replaced the accidental wizard-app entrypoint with the actual pharmacy storefront app.
- Added proper app shell with:
  - header
  - footer
  - cart drawer
  - routed pages
- Added route-level lazy loading and suspense-based code splitting.

### 2) Shopify storefront hardening
- Confirmed Storefront API integration is present and active in code.
- Improved cart error handling and recovery UX.
- Fixed grid-level add-to-cart behavior so multi-variant products no longer blindly add the first variant.
- Improved stock handling so product availability reflects any saleable variant, not just the first variant.
- Improved product structured data to better reflect active availability and price.

### 3) Prescription and contact flow hardening
- Contact and prescription forms now fail more gracefully when Supabase config is missing.
- Added clearer user messaging when forms are not configured.
- Confirmed contact and prescription flows depend on Supabase Edge Functions.

### 4) Trust, compliance, and conversion improvements
- Updated hero messaging toward trusted local care.
- Added legal routes for:
  - Privacy Policy
  - Terms of Service
- Added footer links for those legal pages.
- Footer includes address, phone, hours, and ABN placeholder.
- Trust section strengthened with pharmacy-specific credibility language.

### 5) SEO and metadata
- Improved homepage metadata.
- Improved services metadata.
- Unified page SEO handling via shared helper.
- Added / improved LocalBusiness and Pharmacy schema.
- Fixed old default title issue.
- Updated Open Graph and Twitter image handling.

### 6) Cleanup and repository hygiene
- Removed dead wizard code from active tracking.
- Cleaned archive/submodule-style tracking mistakes from the main repo.
- Archived unrelated local project folders outside Git tracking.
- Removed macOS `._*` junk files from public assets.

### 7) Documentation and launch tooling
- Added production env/secrets checklist:
  - `docs/production-env-checklist.md`
- Added post-deploy smoke test script:
  - `scripts/post-deploy-smoke-test.sh`

## Commits made
- `fix: wire storefront app and harden launch flows`
- `chore: archive boilerplate and polish launch SEO`
- `refactor: split routes and clean archive tracking`
- `docs: add production env checklist and smoke test script`

## Current state
- Build passes.
- Key routes return 200 in preview.
- Route-based code splitting is working.
- The site is significantly closer to launch-ready.

## Remaining blockers before production launch

### Required business data
- Replace the **ABN placeholder** in the footer with the real ABN.

### Required frontend env vars
Set in the production hosting environment:

```bash
VITE_SHOPIFY_STORE_DOMAIN=blackshaws-road-pharmacy.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=REPLACE_WITH_SHOPIFY_STOREFRONT_TOKEN
VITE_SUPABASE_URL=REPLACE_WITH_SUPABASE_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=REPLACE_WITH_SUPABASE_PUBLISHABLE_KEY
```

### Required Supabase Edge Function secrets
Set in Supabase:

```bash
SMTP2GO_PASSWORD=REPLACE_WITH_SMTP2GO_API_KEY
SMTP2GO_USERNAME=REPLACE_WITH_SMTP2GO_USERNAME
ADMIN_EMAIL=info@blackshawsroadpharmacy.com.au
```

## Mandatory pre-launch checks

### Shopify
- Verify Storefront token works in production
- Test one in-stock product
- Test one out-of-stock product
- Test one multi-variant product
- Test cart -> Shopify checkout

### Supabase / email delivery
- Deploy and confirm:
  - `send-contact`
  - `send-prescription`
- Test contact form submission end-to-end
- Test prescription upload with image
- Test prescription upload with PDF
- Confirm delivery to correct inboxes

### UX / QA
- Check homepage on mobile
- Check header/cart badge on mobile
- Check shop grid touch targets on mobile
- Check product detail flow for multi-variant products
- Check legal links in footer
- Confirm hero copy and trust language with stakeholder

## Recommended launch order
1. Insert the real ABN
2. Set production frontend env vars
3. Set Supabase secrets
4. Deploy the latest commit set
5. Run:
   ```bash
   ./scripts/post-deploy-smoke-test.sh
   ```
6. Complete manual Shopify and form submission tests
7. Run Lighthouse/PageSpeed on home, shop, and a product page
8. Approve launch

## Suggested final owner checklist
- [ ] ABN updated
- [ ] Shopify vars set
- [ ] Supabase vars set
- [ ] SMTP2GO secrets set
- [ ] Contact form tested
- [ ] Prescription upload tested
- [ ] Cart checkout tested
- [ ] Footer/legal links confirmed
- [ ] Mobile QA complete
- [ ] Post-deploy smoke test passed
- [ ] Launch approved
