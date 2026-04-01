import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowRight, FlaskConical, FileText, ClipboardCheck, BellRing, ShieldAlert, PawPrint } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { BrandSignature } from '../components/layout/BrandSignature'

const reasons = [
  'Allergies or sensitivities to excipients in standard products',
  'Dose strengths or dosage forms that are not commercially available',
  'Paediatric or geriatric formulations that need to be tailored',
  'Discontinued medicines where an appropriate compounded option is available',
  'Veterinary compounding where an animal requires an individualised formulation',
]

const processSteps = [
  'Bring in a valid prescription from your doctor.',
  'Our pharmacist reviews the prescription, discusses the medicine with you, and provides counselling where needed.',
  'We facilitate the referral or order with Burke Road Compounding Pharmacy.',
  'We keep you informed about progress, expected timing, and next steps for collection or supply.',
]

const faqs = [
  {
    question: 'What is compounding?',
    answer:
      'Compounding is the preparation of a customised medicine to meet an individual patient’s specific clinical need when a suitable commercial product is not available or appropriate.',
  },
  {
    question: 'Why might a patient need a compounded medicine?',
    answer:
      'Common reasons include allergies to excipients, unavailable dose strengths or dosage forms, paediatric or geriatric needs, discontinued medicines, or veterinary treatment that requires an individual formulation.',
  },
  {
    question: 'How does Blackshaws Road Pharmacy help with compounding?',
    answer:
      'We work in partnership with Burke Road Compounding Pharmacy to help facilitate compounded prescriptions for our patients. Our pharmacist reviews the prescription, provides counselling, and coordinates the next steps with the compounding partner.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      'Please bring a valid prescription from your doctor, along with any relevant information about allergies, previous medicine issues, and how the medicine is intended to be used.',
  },
  {
    question: 'Are compounded medicines TGA-approved?',
    answer:
      'No. Compounded medicines are not TGA-approved products. They are prepared to meet an individual patient’s specific clinical need.',
  },
]

function FaqItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-[24px] border border-[var(--color-border)] bg-white shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-[var(--color-navy)]">{question}</span>
        {open ? <ChevronUp className="h-5 w-5 shrink-0 text-[var(--color-red)]" /> : <ChevronDown className="h-5 w-5 shrink-0 text-[var(--color-red)]" />}
      </button>
      {open && <div className="px-6 pb-6 text-sm leading-relaxed text-[var(--color-text-muted)]">{answer}</div>}
    </div>
  )
}

export default function Compounding() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Compounding | Blackshaws Road Pharmacy'
  }, [])

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-label !text-white/70">Compounding</p>
            <h1 className="max-w-4xl text-white">Compounding services, coordinated with care.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
              Customised medicines tailored to individual patient needs, facilitated through our partnership with Burke Road Compounding Pharmacy.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/74">
              When a commercially available medicine is not suitable, compounding may provide a tailored option for a specific patient. We help patients navigate that process carefully, with pharmacist review, counselling, and coordination through our compounding partner.
            </p>
            <div className="mt-6">
              <BrandSignature tone="dark" className="max-w-xl" />
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact">
                <Button variant="red" size="lg">Talk to our pharmacist about compounding</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">
                  Ask about your prescription
                </Button>
              </Link>
            </div>
          </div>

          <div className="premium-panel rounded-[32px] p-7 text-[var(--color-text-dark)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-red)]">Compounding support</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { icon: FlaskConical, text: 'Customised medicines for specific clinical needs' },
                { icon: ClipboardCheck, text: 'Pharmacist review and counselling before facilitation' },
                { icon: BellRing, text: 'Clear communication throughout the process' },
                { icon: ShieldAlert, text: 'Appropriate expectations around tailored, non-TGA-approved products' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="rounded-[22px] bg-white/85 p-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  <Icon className="mb-3 h-5 w-5 text-[var(--color-red)]" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-10 pb-8">
        <div className="container-custom grid gap-5 rounded-[30px] border border-[var(--color-border)] bg-white p-6 shadow-[0_30px_90px_-50px_rgba(16,24,63,0.28)] md:grid-cols-3">
          {[
            'Tailored formulations for individual patient needs',
            'Facilitated through Burke Road Compounding Pharmacy',
            'Pharmacist review, counselling and practical follow-up',
          ].map((item) => (
            <div key={item} className="rounded-[22px] bg-[var(--color-surface-alt)] px-5 py-4 text-sm font-semibold text-[var(--color-navy)]">{item}</div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">What compounding is</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Customised medicines prepared for a specific patient</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  Compounding is the preparation of a customised medicine that has been tailored to an individual patient&apos;s needs. This may be appropriate where the required medicine, strength, or dosage form is not commercially available, or where a patient has a specific clinical need that cannot be met by a standard product.
                </p>
                <p>
                  The aim is not convenience for its own sake. It is to help meet a genuine patient need in a careful, professionally managed way.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Why compounding matters</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Sometimes standard products are not enough</h2>
              <ul className="mt-6 space-y-4">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {reason.includes('Veterinary') ? <PawPrint className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-red)]" /> : <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-red)]" />}
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[30px] bg-[var(--color-navy-deep)] p-6 md:p-8 text-white shadow-[0_30px_90px_-50px_rgba(16,24,63,0.45)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Our compounding partnership</p>
              <h2 className="mt-3 text-white">Working with Burke Road Compounding Pharmacy</h2>
              <p className="mt-5 text-sm leading-relaxed text-white/78">
                Blackshaws Road Pharmacy works in partnership with Burke Road Compounding Pharmacy to facilitate compounding prescriptions for our patients. That means you can speak with our team locally, have your prescription reviewed by our pharmacist, and rely on us to help coordinate the referral or order process with the compounding pharmacy.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">What patients need to bring</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Please bring a valid prescription</h2>
              <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                To begin the process, patients should bring a valid prescription from their doctor. It also helps to let the pharmacist know about any allergies, excipient sensitivities, prior medicine issues, or practical concerns around swallowing, dosing, or administration.
              </p>
            </div>

            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">The process</p>
              <h2 className="mt-3 text-[var(--color-navy)]">How we help facilitate your prescription</h2>
              <div className="mt-6 space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-[22px] bg-[var(--color-surface-alt)] p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-red)] text-sm font-bold text-white">{index + 1}</div>
                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Important note</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Compounded medicines are prepared for an individual clinical need</h2>
              <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Compounded medicines are not TGA-approved products. They are prepared to meet an individual patient&apos;s specific clinical need, based on a valid prescription and appropriate professional oversight.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact">
                  <Button variant="primary" size="md">Talk to our pharmacist about compounding</Button>
                </Link>
                <a href="tel:0393913257">
                  <Button variant="outline" size="md"><FileText className="mr-2 h-4 w-4" /> (03) 9391 3257</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Frequently asked questions</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Common questions about compounding</h2>
            </div>
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-navy-deep)] text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-white">Need help with a compounding prescription?</h2>
            <p className="mt-4 text-lg text-white/76">
              Our pharmacy team can explain the process, review your prescription, and help facilitate compounding support through Burke Road Compounding Pharmacy.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button variant="red" size="lg">Talk to our pharmacist about compounding</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
