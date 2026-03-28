# Blackshaws Road Pharmacy Website

Premium health-tech pharmacy website inspired by Eucalyptus.health, built with React, TypeScript, Tailwind CSS v4, and Framer Motion.

## Features

- **Premium Design System**: Tiempos Headline (Playfair Display) + DM Sans typography, warm neutral palette with eucalyptus greens
- **TGA Compliant**: Strict adherence to Therapeutic Goods Advertising Code 2021 and AHPRA guidelines
- **Responsive Layout**: Mobile-first design with breakpoints at 375px, 768px, 1280px, 1440px
- **Advanced Animations**: Fade-in-up scroll animations, smooth parallax, hover effects using Intersection Observer
- **Dark Mode**: System-preference aware with manual toggle
- **Interactive Forms**:
  - Prescription upload with file preview
  - Multi-step vaccination booking
  - FAQ chat widget
- **Animated Statistics**: Count-up counters triggered on scroll
- **Accessibility**: Skip-to-content, ARIA labels, keyboard navigation, proper focus states
- **Rich Metadata**: SEO-friendly with structured data for local business

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (with CSS-first configuration)
- Framer Motion (for animations)
- Lucide React (icons)
- Next Themes (dark mode)
- Date-fns (date formatting)

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production bundle
npm run preview
```

## Design System

### Colors (CSS Custom Properties)

- `--color-bg`: #F5F0E8 (warm cream)
- `--color-surface`: #FFFFFF
- `--color-text`: #1A1A1A
- `--color-accent`: #2D5A3D (eucalyptus green)
- `--color-secondary`: #8BAF8F (sage green)
- `--color-highlight`: #C4956A (terracotta)
- `--color-muted`: #6B6B6B
- `--color-border`: #E0D9CE
- `--color-surface-dark`: #0F1A14 (dark mode background)

### Typography

- Display: Playfair Display (700-800 weight)
- Body: DM Sans (400-700 weight)
- Line-height: 1.7 for body, 1.1 for headlines
- Max measure: 65ch for readability

## TGA Compliance

This website implements strict compliance with Australian pharmacy advertising regulations:

- No therapeutic claims without proper evidence and registration references
- No pricing for prescription (S4/S8) medicines
- No specific medication names in promotional content
- No testimonials making health outcome claims
- Mandatory health warnings: "Always read the label and follow directions"
- General information disclaimer clearly displayed
- Required statement: "If symptoms persist, see your healthcare professional"
- No comparison claims against other providers
- Children's health content includes appropriate disclaimer

Key compliant sections:
- Health Info links to TGA-approved external resources (NPS MedicineWise, HealthDirect)
- Vaccine booking includes subject-to-stock and qualified provider notes
- Prescription upload includes TGA compliance note
- Sticky compliance banner on all pages

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── HealthInfoSection.tsx
│   │   ├── LocationSection.tsx
│   │   └── TGADisclaimer.tsx
│   ├── features/
│   │   ├── PrescriptionUploadForm.tsx
│   │   ├── VaccinationBooking.tsx
│   │   └── ChatWidget.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ThemeToggle.tsx
├── hooks/
│   └── useIntersectionObserver.ts
├── utils/
│   └── cn.ts (class name merger)
├── App.tsx
├── main.tsx
└── index.css (design system)
```

## Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- CSS custom properties required
- IntersectionObserver and requestAnimationFrame required

## License

Proprietary. All rights reserved.

---

Built with care for Altona North community since 1968.
