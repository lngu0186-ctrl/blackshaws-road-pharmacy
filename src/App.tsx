import { lazy, Suspense, useEffect, useState } from 'react'
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
import { useCartSync } from './hooks/useCartSync'
import './App.css'

// Lazy-load pages
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const UploadPrescription = lazy(() => import('./pages/UploadPrescription'))

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
  const [DeferredFooter, setDeferredFooter] = useState<React.ComponentType | null>(null)
  const [DeferredChat, setDeferredChat] = useState<React.ComponentType | null>(null)
  const [DeferredCart, setDeferredCart] = useState<React.ComponentType | null>(null)
  const [DeferredToast, setDeferredToast] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Defer loading of below-the-fold components until after first paint
    const timer = setTimeout(() => {
      import('./components/layout/Footer').then(mod => setDeferredFooter(() => mod.Footer))
      import('./components/features/ChatWidget').then(mod => setDeferredChat(() => mod.ChatWidget))
      import('./components/CartDrawer').then(mod => setDeferredCart(() => mod.default))
      import('./components/ToastContainer').then(mod => setDeferredToast(() => mod.default))
    }, 2000) // 2s defer - adjust as needed

    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:handle" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/upload-prescription" element={<UploadPrescription />} />
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

        {DeferredFooter && <DeferredFooter />}
        {DeferredChat && <DeferredChat />}
        {DeferredCart && <DeferredCart />}
        {DeferredToast && <DeferredToast />}
      </div>
    </BrowserRouter>
  )
}

export default App