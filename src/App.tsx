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
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import { useCartSync } from './hooks/useCartSync'
import './App.css'

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
