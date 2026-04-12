import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import CartDrawer from './components/CartDrawer'
import { useCartSync } from './hooks/useCartSync'
import { HeroSection } from './components/sections/HeroSection'
import { TrustBar } from './components/sections/TrustBar'
import { AboutSection } from './components/sections/AboutSection'
import { PatientTrustSection } from './components/sections/PatientTrustSection'
import { PrescriptionPathwaySection } from './components/sections/PrescriptionPathwaySection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ShopCategories } from './components/sections/ShopCategories'
import { VaccinationsSection } from './components/sections/VaccinationsSection'
import { LocationSection } from './components/sections/LocationSection'
import { FaqPreviewSection } from './components/sections/FaqPreviewSection'
import { GoogleReviewsWidget } from './components/sections/GoogleReviewsWidget'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Prescription from './pages/Prescription'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Learn from './pages/Learn'
import LearnArticle from './pages/LearnArticle'
import PatientInfo from './pages/PatientInfo'
import Compounding from './pages/Compounding'
import PlantBasedTherapies from './pages/PlantBasedTherapies'
import ChemistCareNow from './pages/ChemistCareNow'
import HealthServicePlaceholder from './pages/HealthServicePlaceholder'
import { usePageSeo } from './lib/seo'

function HomePage() {
  usePageSeo({
    title: 'Blackshaws Road Pharmacy | Your Trusted Local Health Partner in Altona North',
    description: 'Shop online or visit Blackshaws Road Pharmacy in Altona North for prescriptions, vaccinations, pharmacist advice, medication reviews, and trusted local health support.',
    canonicalPath: '/',
    ogTitle: 'Blackshaws Road Pharmacy | Altona North Pharmacy',
    ogDescription: 'Your trusted local health partner in Altona North, shop online or visit us in-store.',
    ogImage: '/hero-pharmacy.webp',
  })

  useEffect(() => {
    const existing = document.getElementById('local-business-schema')
    if (existing) existing.remove()

    const schema = {
      '@context': 'https://schema.org',
      '@type': ['Pharmacy', 'LocalBusiness'],
      name: 'Blackshaws Road Pharmacy',
      image: 'https://blackshawsroadpharmacy.lovable.app/hero-pharmacy.webp',
      url: 'https://blackshawsroadpharmacy.lovable.app',
      telephone: '+61-3-9391-3257',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '310A Blackshaws Road',
        addressLocality: 'Altona North',
        addressRegion: 'VIC',
        postalCode: '3025',
        addressCountry: 'AU',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '21:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '10:00',
          closes: '17:00',
        },
      ],
      priceRange: '$$',
      areaServed: ['Altona North', 'Altona', 'Williamstown', 'Spotswood', 'Melbourne West'],
    }

    const script = document.createElement('script')
    script.id = 'local-business-schema'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => script.remove()
  }, [])

  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <PatientTrustSection />
      <PrescriptionPathwaySection />
      <ServicesSection />
      <ShopCategories />
      <VaccinationsSection />
      <LocationSection />
      <GoogleReviewsWidget />
      <FaqPreviewSection />
    </>
  )
}

function LegalPage({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  usePageSeo({ title, description, canonicalPath: title.toLowerCase().includes('privacy') ? '/privacy-policy' : '/terms-of-service' })
  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding">
        <div className="container-custom max-w-4xl rounded-[28px] border border-[var(--color-border)] bg-white p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)] md:p-10">
          <h1 className="text-[var(--color-navy)]">{title}</h1>
          <div className="prose prose-slate mt-6 max-w-none text-[var(--color-text-muted)]">{children}</div>
        </div>
      </section>
    </div>
  )
}

function AppShell() {
  useCartSync()

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-text-dark)]">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:handle" element={<ProductDetail />} />
          <Route path="/prescriptions" element={<Prescription />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health-services" element={<Services />} />
          <Route path="/health-services/:slug" element={<ServiceDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<LearnArticle />} />
          <Route path="/patient-info" element={<PatientInfo />} />
          <Route path="/compounding" element={<Compounding />} />
          <Route path="/plant-based-therapies" element={<PlantBasedTherapies />} />
          <Route path="/chemist-care-now" element={<ChemistCareNow />} />
          <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy | Blackshaws Road Pharmacy" description="Privacy policy for Blackshaws Road Pharmacy, including how we handle personal and health information in Australia.">
            <p>Blackshaws Road Pharmacy respects your privacy and handles personal information in line with the Australian Privacy Principles under the Privacy Act 1988.</p>
            <p>We collect only the information needed to respond to enquiries, process prescription requests, provide pharmacy services, and improve the website. Health information is treated as sensitive information and handled with extra care.</p>
            <p>Prescription uploads and contact form details are used only for pharmacy follow-up, patient care, and related operational communication. We do not sell personal data.</p>
            <p>If you contact us or submit a prescription, your information may be processed by service providers that help us deliver website forms, secure hosting, and pharmacy communications. Those providers are only used where reasonably necessary.</p>
            <p>You can request access to or correction of your personal information by contacting the pharmacy on (03) 9391 3257.</p>
          </LegalPage>} />
          <Route path="/terms-of-service" element={<LegalPage title="Terms of Service | Blackshaws Road Pharmacy" description="Terms of service for the Blackshaws Road Pharmacy website and online enquiry tools.">
            <p>This website provides general information about pharmacy services, product availability, and online enquiry pathways. It does not replace personalised medical advice.</p>
            <p>Submitting a prescription or enquiry through this website does not guarantee dispensing, supply, or clinical suitability. All medicines remain subject to pharmacist review, legal requirements, and stock availability.</p>
            <p>Product information on the website is provided for convenience. Patients should always read the label and follow directions for use.</p>
            <p>We may update website content, product ranges, and service information at any time without notice.</p>
            <p>By using the website, you agree not to misuse forms, attempt unauthorised access, or submit false or misleading health information.</p>
          </LegalPage>} />
          <Route path="/services" element={<Navigate to="/health-services" replace />} />
          <Route path="*" element={<HealthServicePlaceholder />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
