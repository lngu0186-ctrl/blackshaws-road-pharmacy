#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://blackshawsroadpharmacy.lovable.app}"

echo "Running post-deploy smoke test against: $BASE_URL"
echo

check_url() {
  local path="$1"
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL$path")
  if [ "$code" = "200" ]; then
    echo "PASS  $code  $path"
  else
    echo "FAIL  $code  $path"
    return 1
  fi
}

echo "1. Checking key routes"
check_url "/"
check_url "/shop"
check_url "/prescriptions"
check_url "/contact"
check_url "/health-services"
check_url "/faq"
check_url "/learn"
check_url "/patient-info"
check_url "/compounding"
check_url "/plant-based-therapies"
check_url "/chemist-care-now"
check_url "/privacy-policy"
check_url "/terms-of-service"

echo
echo "2. Checking homepage metadata"
HTML=$(curl -s "$BASE_URL/")

echo "$HTML" | grep -q "Blackshaws Road Pharmacy" && echo "PASS  title/brand present" || { echo "FAIL  title/brand missing"; exit 1; }
echo "$HTML" | grep -q "hero-pharmacy.webp" && echo "PASS  og/hero image present" || { echo "FAIL  og/hero image missing"; exit 1; }
echo "$HTML" | grep -q "privacy-policy" && echo "PASS  privacy route discoverable in app bundle/html" || echo "WARN  privacy route not visible in raw HTML"

echo
echo "3. Manual checks still required"
echo "- Confirm real ABN is shown in footer"
echo "- Test in-stock product add to cart"
echo "- Test out-of-stock product cannot be added"
echo "- Test multi-variant product sends user to product detail / option selection"
echo "- Test Shopify checkout opens successfully"
echo "- Submit contact form and confirm email delivery"
echo "- Submit prescription upload (image + PDF) and confirm email delivery"
echo "- Test mobile header, cart badge, and footer links"

echo
echo "Smoke test complete."
