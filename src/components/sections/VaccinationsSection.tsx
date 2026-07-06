import { useState } from 'react'
import { Button } from '../ui/Button'
import { Shield, Baby, Users, Heart, BabyIcon, Plane, AlertCircle } from 'lucide-react'

const vaccineTabs = [
  { id: 'infants', label: 'Children (5+)', icon: Baby, content: { title: 'Childhood Immunisations (Ages 5 and Over)', description: 'NIPVIP-funded vaccines for school-aged children and older, including catch-up doses. Children under 5 should see their GP or council immunisation service, as pharmacists cannot administer vaccines to this age group in Victoria.', details: ['Diphtheria-Tetanus-Pertussis (dTpa) catch-up doses, ages 5–19', 'MMR (measles-mumps-rubella) and Varicella (chickenpox) catch-up', 'Meningococcal ACWY/B catch-up for under-20s', 'Hepatitis A & B catch-up', 'No Jab No Play requirements apply to childcare/kinder enrolment for under-5s (info only, GP-administered)'], cta: { text: 'View Full NIP Schedule', url: 'https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria' } } },
  { id: 'adolescents', label: 'Adolescents', icon: Users, content: { title: 'Vaccines for young people', description: 'Support for school-based programs, HPV catch-up and recommended boosters for adolescents.', details: ['HPV (Gardasil 9) — NIP-funded ages 12–25', 'Meningococcal ACWY/B catch-up', 'dTpa boosters', 'Influenza (all ages 5+)'], cta: { text: 'Check Eligibility', url: 'https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria' } } },
  { id: 'adults', label: 'Adults & Pregnancy', icon: Heart, content: { title: 'Vaccines for adults and pregnancy', description: 'Important protection across flu, COVID-19, pertussis, RSV and shingles for eligible adults and during pregnancy.', details: ['Influenza — funded for pregnant women, people 65+, and medical risk groups; available to everyone 5+ at a fee otherwise', 'COVID-19 vaccine — no upper or lower age restriction beyond 5 years; current ATAGI-recommended schedule applies', 'Pertussis (dTpa) booster recommended in every pregnancy (from 20 weeks)', "RSV vaccine (Abrysvo) — funded for pregnant people from 28 weeks' gestation", 'Herpes zoster (shingles, Shingrix) — funded for adults 65+ and at-risk adults 18+'], cta: { text: 'Book an Adult Vaccination', url: 'https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist' } } },
  { id: 'indigenous', label: 'Aboriginal & Torres Strait Islander', icon: BabyIcon, content: { title: 'Additional funded vaccines', description: 'Guidance on extra funded vaccine access available for Aboriginal and Torres Strait Islander people.', details: ['Pneumococcal vaccine (21vPCV/Capvaxive) — funded from age 25', 'RSV vaccine — funded from age 60', 'Herpes zoster — funded from age 50', 'Meningococcal ACWY — funded for eligible age groups'], cta: { text: 'Ask About Eligible Vaccines', url: '#location' } } },
  { id: 'high-risk', label: 'High-Risk & Catch-Up', icon: AlertCircle, content: { title: 'Catch-up and special-risk vaccination', description: 'Support for patients with specific risk factors and those needing catch-up vaccination.', details: ['Pneumococcal (21vPCV) — funded for adults 18+ with specified medical risk conditions, and everyone 65+', 'RSV vaccine — funded for adults 60–74 with medical risk conditions, and everyone 75+', 'Hepatitis A/B, Hib, and meningococcal — funded for asplenia, immunocompromise, and other listed risk conditions', 'Mpox (JYNNEOS) — available for eligible adults 16+ under protocol'], cta: { text: 'Book a Catch-Up Consultation', url: '#location' } } },
  { id: 'travel', label: 'Travel', icon: Plane, content: { title: 'Travel Health Vaccinations', description: 'Our pharmacists are trained under the Victorian Community Pharmacist Statewide Pilot to provide travel vaccines and advice on an ongoing basis.', details: ['Hepatitis A', 'Hepatitis B', 'Typhoid', 'Poliomyelitis', 'Travel health consultations covering destination-specific risk advice, malaria prevention advice, and vaccine timing before departure'], cta: { text: 'Book Travel Consultation', url: 'https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist' } } },
]

export function VaccinationsSection() {
  const [activeTab, setActiveTab] = useState('infants')
  const activeContent = vaccineTabs.find((tab) => tab.id === activeTab)

  return (
    <section id="vaccination" className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 max-w-3xl">
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>Immunisation services</p>
          <h2 className="text-[var(--color-navy)]">Vaccinations for every stage of life.</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">Book online or ask at the counter. Our accredited pharmacist immunisers look after school-aged children (5+), adults, travellers and high-risk patients under the Victorian NIPVIP program. Children under 5 must see their GP or council immunisation service.</p>
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
            <div className="rounded-[34px] border border-[var(--color-border)] bg-white p-7 shadow-[0_26px_70px_-44px_rgba(16,24,63,0.25)] md:p-10">
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
