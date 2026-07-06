# Visual Assets Plan

Date: 6 July 2026. Companion to `design/site-structure.md`.

## Direction

The site already owns a distinctive palette (deep navy, brick red, warm cream) and a serif/sans pairing (Crimson Pro + Inter). The asset strategy should reinforce warmth and locality, not add stock-photo gloss. Real photography of the actual shop and team is the single biggest visual upgrade available; everything generated is a clearly-labelled stopgap.

## Existing assets worth keeping

- `public/hero-pharmacy.webp` (122KB) — current hero background, appears to be a real interior photo. Keep. The 1.2MB `hero-pharmacy.png` twin is unused by the app and should not ship.
- Logo set (`logo-*.svg/png/webp`) — complete and consistent. Keep.
- `chemist-care-bg*.mp4/webp` — Chemist Care Now section background. Keep.
- Service icon JPGs (`icon-*.jpg`) — mixed quality and inconsistent style; candidates for replacement with a coherent icon set (lucide icons already in use cover this without new assets).

## Recommended assets

### Real photos (owner to supply; these cannot be generated honestly)

| # | Filename | Purpose | Placement | Size | Notes |
|---|----------|---------|-----------|------|-------|
| 1 | `photo-exterior.webp` | Shopfront recognition ("that's the one near the lights") | Visit section, beside the map | 1200x900 | Shoot at golden hour, signage legible. The single most valuable local trust asset. |
| 2 | `photo-team.webp` | Real staff trust | Our story section | 1200x800 | Staff consent required. Casual, behind-the-counter framing beats posed lineup. |
| 3 | `photo-dispensary.webp` | Prescription section texture | Prescriptions band | 1200x800 | Hands-and-shelves framing; no readable patient labels in frame. |
| 4 | `photo-consult.webp` | Advice/services warmth | Services or vaccinations band | 1200x800 | Pharmacist talking with a customer; get customer consent or use staff standing in. |

### Safe generated or sourced placeholders (until real photos exist)

All generated assets must be abstract or close-up enough that they cannot be mistaken for photos of the real premises or staff. Store under `public/placeholders/` and mark with a `-placeholder` suffix so they are easy to find and replace.

| # | Filename | Purpose | Placement | Size | Type | Generation prompt | Guardrails |
|---|----------|---------|-----------|------|------|-------------------|------------|
| 5 | `abstract-tablets-placeholder.webp` | Prescriptions texture | Prescriptions band background | 1600x900 | Generated, abstract close-up | "Extreme close-up macro of pastel-coloured round tablets on a warm cream surface, soft natural light, shallow depth of field, no text, no labels, no packaging" | No readable labels, no branded packaging, no identifiable medicines |
| 6 | `abstract-botanical-placeholder.webp` | Plant Based Therapies page texture | PBT hero | 1600x900 | Generated, abstract | "Soft-focus eucalyptus leaves and gum blossom on warm cream background, gentle morning light, muted sage and navy tones, no text" | Decorative only |
| 7 | `illustration-visit-placeholder.svg` | Location wayfinding warmth | Visit section accent | flexible | Flat illustration | "Minimal flat illustration of a small corner shop street scene with trees, muted navy, red and cream palette, no signage text" | Must not resemble the actual shopfront; illustrative style makes placeholder status obvious |
| 8 | Service icons | Consistent service card icons | Services grid | 24-28px | Icon (lucide-react, already installed) | n/a — use `Pill`, `Syringe`, `MessageCircle`, `HeartPulse`, `Package`, `FlaskConical` | No new assets needed |

### Explicitly not recommended

- Generated pharmacy storefront "photos": too easy to mistake for the real shop.
- Generated staff portraits: forbidden by the brief and misleading.
- Generated medicine packaging with readable text: TGA risk and forbidden by the brief.
- Stock photos of models in white coats: reads as template, undermines the local story.

## Implementation note for this pass

This upgrade ships with **zero new imagery**. The existing real hero photo carries the site, gradients and the established card system carry the sections, and the visit section gets a stronger layout without a photo. TODO markers in code point at the four real-photo slots above so they can be dropped in when supplied.
