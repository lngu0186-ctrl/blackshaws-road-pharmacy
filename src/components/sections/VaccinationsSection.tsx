import { useState, useRef } from 'react'
import { Button } from '../ui/Button'
import { Shield, Baby, Users, Heart, BabyIcon, Plane, AlertCircle } from 'lucide-react'

const vaccineTabs = [
  { id: 'infants', label: 'Infants & Children', icon: Baby, content: { title: 'Childhood Immunisations', description: 'Free NIP vaccines from birth through early childhood, with practical pharmacy guidance for parents and carers.', details: ['Includes Hepatitis B, DTP, Polio, Hib, MMR, Varicella and more', 'Vaccines begin at birth and continue from 6 weeks onward', 'No Jab No Play requirements explained clearly', 'Catch-up schedules available where vaccinations are delayed'], cta: { text: 'View Full NIP Schedule', url: 'https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria' } } },
  { id: 'adolescents', label: 'Adolescents', icon: Users, content: { title: 'Vaccines for young people', description: 'Support for school-based programs, HPV catch-up and recommended boosters for adolescents.', details: ['Year 7 and 10 student vaccination support', 'HPV catch-up available for eligible unvaccinated people under 26', 'dTpa booster guidance for adolescents', 'Private options available outside funded age ranges'], cta: { text: 'Check Eligibility', url: 'https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria' } } },
  { id: 'adults', label: 'Adults & Pregnancy', icon: Heart, content: { title: 'Vaccines for adults and pregnancy', description: 'Important protection across flu, whooping cough, pneumococcal disease, shingles and COVID-19.', details: ['Flu vaccination available annually', 'Whooping cough recommended with each pregnancy', 'Pneumococcal and shingles advice for eligible adults', 'COVID-19 vaccination support for eligible patients'], cta: { text: 'Book an Adult Vaccination', url: 'https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist' } } },
  { id: 'indigenous', label: 'Aboriginal & Torres Strait Islander', icon: BabyIcon, content: { title: 'Additional funded vaccines', description: 'Guidance on extra funded vaccine access available for Aboriginal and Torres Strait Islander people.', details: ['Additional pneumococcal vaccine access', 'Funded Hepatitis A for eligible children', 'Enhanced support for risk-based vaccination access', 'Culturally safe and welcoming pharmacy care'], cta: { text: 'Ask About Eligible Vaccines', url: '#location' } } },
  { id: 'high-risk', label: 'High-Risk & Catch-Up', icon: AlertCircle, content: { title: 'Catch-up and special-risk vaccination', description: 'Support for people under 20, refugees, humanitarian entrants and patients with specific risk factors.', details: ['Catch-up immunisations for missed childhood vaccines', 'Refugee and humanitarian entrant programs', 'Risk-based support for chronic conditions', 'Personalised vaccination review where needed'], cta: { text: 'Book a Catch-Up Consultation', url: '#location' } } },
  { id: 'travel', label: 'Travel', icon: Plane, content: { title: 'Travel health and vaccinations', description: 'Destination-led vaccination planning with practical advice for timing, schedules and protection before you fly.', details: ['Yellow fever, typhoid, hepatitis and Japanese encephalitis options', 'Travel health advice including malaria discussion', 'Some vaccines require multiple doses over time', 'Book early for complex itineraries'], cta: { text: 'Book Travel Consultation', url: 'https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist' } } },
]

export function VaccinationsSection() {
  const [activeTab, setActiveTab] = useState('infants')
  const ref = useRef(null)
  const activeContent = vaccineTabs.find((tab) => tab.id === activeTab)

  return (
    <section id="vaccination" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        <div className="mb-12 max-w-3xl">
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>Immunisation services</p>
          <h2 className="text-[var(--color-navy)]">Accredited vaccination care for each stage of life.</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">We provide a more reassuring, easier-to-navigate vaccination experience for families, adults, travellers and high-risk patients — with trusted pharmacist support at every step.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <div className="rounded-[30px] bg-[var(--color-surface-alt)] p-4">
            {vaccineTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`mb-2 flex w-full items-center gap-3 rounded-[22px] px-4 py-4 text-left text-sm font-semibold transition ${activeTab === tab.id ? 'tab-active' : 'text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-navy)]'}`}>
                <tab.icon className="h-5 w-5" /> {tab.label}
              </button>
            ))}
          </div>

          {activeContent && (
            <div className="rounded-[34px] border border-[var(--color-border)] bg-white p-7 shadow-[0_26px_70px_-44px_rgba(16,24,63,0.25)] md:p-10" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '16px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-13 w-13 items-center justify-center rounded-[20px] bg-[var(--color-navy-soft)] text-[var(--color-navy)]"><activeContent.icon className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">{activeContent.label}</p>
                  <h3 className="mt-1 text-3xl text-[var(--color-navy)]">{activeContent.content.title}</h3>
                </div>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-muted)]">{activeContent.content.description}</p>
              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.78fr]">
                <div>
                  <h4 className="font-semibold text-[var(--color-navy)]">What this includes</h4>
                  <ul className="mt-4 space-y-3">
                    {activeContent.content.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3"><Shield className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /><span className="text-sm leading-relaxed text-[var(--color-text-muted)]">{detail}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[26px] bg-[var(--color-navy-deep)] p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Need advice?</p>
                  <p className="mt-3 text-lg font-semibold">Our pharmacists can help you check eligibility, timing and vaccine history.</p>
                  <a href={activeContent.content.cta.url} target={activeContent.content.cta.url.startsWith('http') ? '_blank' : undefined} rel={activeContent.content.cta.url.startsWith('http') ? 'noopener noreferrer' : undefined} className="mt-5 inline-block">
                    <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">{activeContent.content.cta.text}</Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer"><Button variant="red" size="lg">Book your vaccination online</Button></a>
        </div>
      </div>
    </section>
  )
}
