import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { HeroSection } from './components/sections/HeroSection'
import { ShopCategories } from './components/sections/ShopCategories'
import { TrustBar } from './components/sections/TrustBar'
import { ChemistCareNowSection } from './components/sections/ChemistCareNowSection'
import { VaccinationsSection } from './components/sections/VaccinationsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { AboutSection } from './components/sections/AboutSection'
import { HealthInfoSection } from './components/sections/HealthInfoSection'
import { LocationSection } from './components/sections/LocationSection'
import { Footer } from './components/layout/Footer'
import { ChatWidget } from './components/features/ChatWidget'
import CartDrawer from './components/CartDrawer'
import ToastContainer from './components/ToastContainer'
import { useCartSync } from './hooks/useCartSync'
import './App.css'

// Lazy-load pages for code splitting
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  useCartSync()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="pt-[var(--header-height-mobile)] md:pt-[var(--header-height-desktop)]">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:handle" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/" element={
                <>
                  <HeroSection />
                  <ShopCategories />
                  <TrustBar />
                  <ChemistCareNowSection id="chemist-care" />
                  <VaccinationsSection />
                  <ServicesSection />
                  <AboutSection />
                  <HealthInfoSection />
                  <LocationSection />
                </>
              } />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <ChatWidget />
        <CartDrawer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App