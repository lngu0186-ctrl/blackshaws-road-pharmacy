import { Phone, Mail, Award, Shield, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Prescriptions', href: '#services' },
    { label: 'Vaccinations', href: '#vaccination', highlight: true },
    { label: 'Chemist Care Now', href: '#chemist-care' },
    { label: 'Health Checks', href: '#services' },
    { label: 'Medication Reviews', href: '#services' },
  ],
  about: [
    { label: 'Our Story', href: '#about' },
    { label: 'Our Team', href: '#about' },
    { label: 'Alliance Pharmacy', href: '#about' },
    { label: 'Community', href: '#about' },
  ],
  healthInfo: [
    { label: 'Health Resources', href: '#health-info' },
    { label: 'Better Health Vic', href: 'https://www.betterhealth.vic.gov.au', target: '_blank' },
    { label: 'NPS MedicineWise', href: 'https://www.nps.org.au', target: '_blank' },
    { label: 'HealthDirect', href: 'https://www.healthdirect.gov.au', target: '_blank' },
  ],
  shop: [
    { label: 'Practitioner Range — Shop Online', href: 'https://blackshawspharmacy.com.au/collections/practitioner-only-range', target: '_blank' },
  ]
}

const contactInfo = {
  address: '310A Blackshaws Road\nAltona North VIC 3025',
  phone: '(03) 9391 3257',
  mobile: '0406 692 267',
  email: 'info@blackshawsroadpharmacy.com.au',
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/logo-dark.svg"
                alt="Blackshaws Road Pharmacy"
                className="h-16 w-auto"
                style={{ maxWidth: '180px' }}
              />
            </div>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Altona North's trusted pharmacy since 1968.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-red)' }} />
                <span className="text-white/80 whitespace-pre-line">{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" style={{ color: 'var(--color-red)' }} />
                <div className="flex flex-col">
                  <a href="tel:0393913257" className="text-white/80 hover:text-white transition-colors">
                    {contactInfo.phone}
                  </a>
                  <a href="tel:0406692267" className="text-white/80 hover:text-white transition-colors">
                    {contactInfo.mobile}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" style={{ color: 'var(--color-red)' }} />
                <a href="mailto:info@blackshawsroadpharmacy.com.au" className="text-white/80 hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-white/80 hover:text-white transition-colors text-sm ${link.highlight ? 'font-semibold' : ''}`}
                  >
                    {link.label}
                    {link.highlight && <span className="ml-2 text-xs" style={{ color: 'var(--color-red)' }}>Book →</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">About Us</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Info & Shop */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Health Info & Shop</h4>
            <ul className="space-y-3">
              {footerLinks.healthInfo.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target}
                    rel={link.target ? 'noopener noreferrer' : undefined}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                    {link.target && ' →'}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10 mt-2">
                <a
                  href={footerLinks.shop[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm font-semibold"
                >
                  {footerLinks.shop[0].label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Blackshaws Road Pharmacy. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: 'var(--color-red)' }} />
              <span>Alliance Pharmacy Member</span>
            </div>
          </div>
        </div>

        {/* Alliance Badge */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-white/20 text-white/60 text-xs font-medium">
            <Shield className="w-4 h-4" style={{ color: 'var(--color-red)' }} />
            <span>Proudly part of Alliance Pharmacy Australia</span>
          </div>
        </div>
      </div>

      {/* Subtle decorative pattern */}
      <div className="relative overflow-hidden h-24 opacity-5">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,100 Q300,0 600,50 T1200,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="600" cy="50" r="20" fill="currentColor" />
        </svg>
      </div>
    </footer>
  )
}
