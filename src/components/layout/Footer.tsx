import { Phone, Mail, Award, Shield, MapPin, ArrowUpRight, Clock3 } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Upload a prescription', href: '/prescriptions' },
    { label: 'Vaccinations', href: '/#vaccination' },
    { label: 'Chemist Care Now', href: '/#chemist-care' },
    { label: 'Medication Reviews', href: '/services/medscheck' },
  ],
  explore: [
    { label: 'Shop online', href: '/shop' },
    { label: 'All services', href: '/services' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Patient information', href: '/patient-info' },
    { label: 'Practitioner-only range', href: 'https://blackshawspharmacy.com.au/collections/practitioner-only-range', target: '_blank' },
  ],
  resources: [
    { label: 'Better Health Victoria', href: 'https://www.betterhealth.vic.gov.au', target: '_blank' },
    { label: 'Healthdirect', href: 'https://www.healthdirect.gov.au', target: '_blank' },
    { label: 'NPS MedicineWise', href: 'https://www.nps.org.au', target: '_blank' },
  ],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="container-custom py-16 md:py-20">
        <div className="mb-14 grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <img src="/logo-dark.svg" alt="Blackshaws Road Pharmacy" className="h-16 w-auto" style={{ maxWidth: '190px' }} />
            <p className="mt-6 text-base leading-relaxed text-white/74">A trusted Altona North pharmacy blending expert community care with convenient everyday health support, vaccinations and online shopping.</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <Shield className="h-4 w-4 text-[var(--color-red)]" /> Alliance Pharmacy member since 1968
            </div>
          </div>

          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Explore" links={footerLinks.explore} />

          <div>
            <h4 className="font-serif text-xl font-semibold">Visit or call</h4>
            <div className="mt-6 space-y-4 text-sm text-white/78">
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> 310A Blackshaws Road, Altona North VIC 3025</p>
              <p className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> Open 7 days. Call ahead for current pharmacist services and appointment availability.</p>
              <a href="tel:0393913257" className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-[var(--color-red)]" /> (03) 9391 3257</a>
              <a href="mailto:info@blackshawsroadpharmacy.com.au" className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-[var(--color-red)]" /> info@blackshawsroadpharmacy.com.au</a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <h4 className="font-serif text-xl font-semibold">Trusted health information</h4>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
              {footerLinks.resources.map((link) => (
                <a key={link.label} href={link.href} target={link.target} rel={link.target ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 hover:bg-white/8">
                  {link.label} {link.target && <ArrowUpRight className="h-3.5 w-3.5" />}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-white/6 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Need help choosing a service?</p>
            <h4 className="mt-3 font-serif text-2xl">Speak with the pharmacy team.</h4>
            <p className="mt-3 text-sm text-white/72">We can guide you on bookings, prescriptions, vaccination eligibility and the right in-pharmacy care pathway.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="tel:0393913257" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-navy-deep)]">Call (03) 9391 3257</a>
              <a href="/faq" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/8">Read FAQs</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Blackshaws Road Pharmacy. Independent community pharmacy care.</p>
          <div className="flex items-center gap-2"><Award className="h-4 w-4 text-[var(--color-red)]" /> <span>Proudly part of Alliance Pharmacy Australia</span></div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string; target?: string }> }) {
  return (
    <div>
      <h4 className="font-serif text-xl font-semibold">{title}</h4>
      <ul className="mt-6 space-y-3 text-sm text-white/76">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target={link.target} rel={link.target ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-2 hover:text-white">
              {link.label} {link.target && <ArrowUpRight className="h-3.5 w-3.5" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
