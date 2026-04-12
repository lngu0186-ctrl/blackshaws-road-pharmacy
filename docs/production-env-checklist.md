# Production Env and Secrets Checklist

Use this checklist before launch for **Blackshaws Road Pharmacy**.

## 1) Frontend environment variables

Set these in the hosting platform for the production web app.

```bash
VITE_SHOPIFY_STORE_DOMAIN=blackshaws-road-pharmacy.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=REPLACE_WITH_SHOPIFY_STOREFRONT_TOKEN
VITE_SUPABASE_URL=REPLACE_WITH_SUPABASE_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=REPLACE_WITH_SUPABASE_PUBLISHABLE_KEY
```

## 2) Supabase Edge Function secrets

Set these in the Supabase project used by the site.

```bash
SMTP2GO_PASSWORD=REPLACE_WITH_SMTP2GO_API_KEY
SMTP2GO_USERNAME=REPLACE_WITH_SMTP2GO_USERNAME
ADMIN_EMAIL=info@blackshawsroadpharmacy.com.au
```

## 3) Business data to confirm before launch

Replace placeholders and confirm accuracy:

```text
ABN=REPLACE_WITH_REAL_ABN
BUSINESS_NAME=Blackshaws Road Pharmacy
ADDRESS=310A Blackshaws Road, Altona North VIC 3025
PHONE=(03) 9391 3257
EMAIL=info@blackshawsroadpharmacy.com.au
SHOPIFY_DOMAIN=blackshaws-road-pharmacy.myshopify.com
LIVE_SITE=https://blackshawsroadpharmacy.lovable.app
```

## 4) Required service checks

### Shopify
- Storefront API token is active
- Products are published to the Online Store / Storefront channel
- At least one in-stock product exists
- At least one out-of-stock product exists
- At least one product with multiple variants exists

### Supabase
- `send-contact` deployed
- `send-prescription` deployed
- SMTP2GO credentials valid
- Delivery inbox confirmed for contact and prescription submissions

## 5) Launch blockers

Do **not** launch until all of these are true:
- Real ABN inserted in footer
- Shopify token works in production
- Supabase env vars are present in production
- Edge function secrets are set
- Contact form test passes
- Prescription upload test passes
- Cart to Shopify checkout test passes
