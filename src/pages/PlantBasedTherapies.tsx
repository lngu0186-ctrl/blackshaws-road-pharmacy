import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, ShieldCheck, FileCheck2, AlertCircle, Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { BrandSignature } from '../components/layout/BrandSignature'

const faqs = [
  {
    question: 'Do I need a prescription for plant based therapies?',
    answer:
      'For medicinal cannabis products, yes. In Australia, these products can legally be prescribed by medical practitioners and nurse practitioners.',
  },
  {
    question: 'Can any medicinal cannabis product be treated like an ordinary retail item?',
    answer:
      'No. The Pharmacy Board says pharmacists must apply careful professional judgement, and Schedule 8 medicinal cannabis must be supplied with the same care used for opioids and other Schedule 8 medicines.',
  },
  {
    question: 'Why does the pharmacist ask about my other medicines?',
    answer:
      'Because reviewing your medicine history and other relevant information is part of safe supply. This helps identify interactions, safety concerns, and whether clarification from the prescriber is needed.',
  },
  {
    question: 'Can a pharmacist refuse to supply a prescribed product?',
    answer:
      'Yes, where there are professional or safety concerns. The guidance says pharmacists should explain the reasons, communicate with the prescriber where appropriate, and document the decision.',
  },
  {
    question: 'Are all medicinal cannabis products approved by the TGA?',
    answer:
      'No. Many prescribed medicinal cannabis products in Australia are unapproved products and have not been assessed by the TGA for safety, quality, performance, or effectiveness.',
  },
]

const supportPoints = [
  'Checking that your prescription is valid and clinically clear',
  'Reviewing your medicine history and other relevant information',
  'Checking for possible medicine interactions',
  'Counselling you on safe and appropriate use',
  'Contacting the prescriber if clarification is needed or if there are safety concerns',
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

export default function PlantBasedTherapies() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Plant Based Therapies | Blackshaws Road Pharmacy'

    const metaDescription = document.querySelector('meta[name="description"]')
    const description =
      'Learn how Blackshaws Road Pharmacy supports patients with prescribed plant based therapies through safe dispensing, counselling, and pharmacist guidance in line with Australian professional standards.'

    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
  }, [])

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-label !text-white/70">Plant based therapies</p>
            <h1 className="max-w-4xl text-white">Plant Based Therapies</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
              Supportive, professional pharmacy care for patients using prescribed plant based therapies.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/74">
              We provide respectful, patient-centred pharmacy support for prescribed plant based therapies, including dispensing guidance, medicine counselling, and practical help around safe use. Our role is to support quality use of medicines and work within the professional standards set for pharmacists in Australia.
            </p>
            <div className="mt-6">
              <BrandSignature tone="dark" className="max-w-xl" />
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact">
                <Button variant="red" size="lg">Speak with our pharmacy team</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">
                  Enquire about your prescription
                </Button>
              </Link>
            </div>
          </div>

          <div className="premium-panel rounded-[32px] p-7 text-[var(--color-text-dark)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-red)]">Our approach</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, text: 'Patient safety and professional judgement come first' },
                { icon: FileCheck2, text: 'Careful prescription review and clinically grounded supply decisions' },
                { icon: CheckCircle2, text: 'Respectful counselling focused on quality use of medicines' },
                { icon: AlertCircle, text: 'Clarification with prescribers when concerns need to be addressed' },
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
            'Clear advice grounded in pharmacist standards',
            'Careful review of prescriptions, interactions and medicine history',
            'Respectful counselling and practical guidance for safe use',
          ].map((item) => (
            <div key={item} className="rounded-[22px] bg-[var(--color-surface-alt)] px-5 py-4 text-sm font-semibold text-[var(--color-navy)]">{item}</div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Clear advice. Safe supply. Professional care.</p>
              <h2 className="mt-3 text-[var(--color-navy)]">A careful, practical approach to supply</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  Plant based therapies, including medicinal cannabis products prescribed in Australia, sit within a closely regulated area of practice. The Pharmacy Board of Australia says pharmacists must use independent professional judgement and focus on patient safety when deciding whether supply is safe and appropriate. For Schedule 8 medicinal cannabis products, pharmacists are expected to apply the same care and consideration they would use for opioids and other Schedule 8 medicines.
                </p>
                <p>
                  That means our approach is careful and practical. We focus on safe dispensing, respectful communication, and helping patients understand how to use their medicine appropriately.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">How we can support you</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Support centred on safe dispensing and counselling</h2>
              <ul className="mt-6 space-y-4">
                {supportPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-red)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-[24px] bg-[var(--color-surface-alt)] p-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                We do not treat this as a routine retail transaction. The Pharmacy Board&apos;s guidance is clear that supply decisions must be based on patient need, safety, and professional judgement, not financial gain or incentives.
              </div>
            </div>

            <div className="rounded-[30px] bg-[var(--color-navy-deep)] p-6 md:p-8 text-white shadow-[0_30px_90px_-50px_rgba(16,24,63,0.45)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Important information for patients</p>
              <h2 className="mt-3 text-white">Understanding the regulatory setting</h2>
              <p className="mt-5 text-sm leading-relaxed text-white/78">
                Medicinal cannabis can legally be prescribed in Australia by medical practitioners and nurse practitioners. Many medicinal cannabis products prescribed in Australia are unapproved products, which means they have not been assessed by the Therapeutic Goods Administration for safety, quality, performance, or effectiveness. Because of that, good counselling and clear communication matter. Patients should understand how their medicine is intended to be used, what practical precautions may apply, and when they should go back to their prescriber or pharmacist for further advice.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Evidence and expectations</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Treatment decisions sit with your prescriber</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  The current evidence base varies depending on the condition and product involved. Ahpra notes there is evidence of poor practice in some parts of the medicinal cannabis sector that is leading to patient harm, and both Ahpra and the Pharmacy Board have issued guidance to reinforce safe prescribing and safe supply.
                </p>
                <p>
                  For patients, the key point is simple: treatment decisions should sit with your treating prescriber, while your pharmacist helps support safe use, counselling, and appropriate supply.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Safety comes first</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Medicine review is part of safe supply</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  If you are using a prescribed plant based therapy, it is important to tell your pharmacist about all other medicines and supplements you are taking. Reviewing other medicines is part of safe and appropriate supply, especially where there may be interactions, duplication, sedation risk, or other practical safety concerns.
                </p>
                <p>
                  There may also be situations where a pharmacist decides a medicine should not be supplied until concerns are clarified. The Board&apos;s guidance says pharmacists should communicate with the patient and prescriber, explain the reasons, and document the decision appropriately.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Need to talk it through?</p>
              <h2 className="mt-3 text-[var(--color-navy)]">Speak with the pharmacy team</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                If you have questions about your prescription, dispensing process, or what information the pharmacist may need, we can help guide you through the next step.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="tel:0393913257">
                  <Button variant="primary" size="md"><Phone className="mr-2 h-4 w-4" /> (03) 9391 3257</Button>
                </a>
                <Link to="/contact">
                  <Button variant="outline" size="md">Contact page <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
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
              <h2 className="mt-3 text-[var(--color-navy)]">Common questions about plant based therapies</h2>
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
            <h2 className="text-white">Questions about your prescription?</h2>
            <p className="mt-4 text-lg text-white/76">
              If you have a prescription for a plant based therapy, our pharmacy team can help with practical advice around dispensing, safe use, and medicine counselling.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button variant="red" size="lg">Contact Blackshaws Road Pharmacy</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-custom">
          <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-[var(--color-text-muted)]">
            This information is general in nature and does not replace medical advice. Plant based therapies, including medicinal cannabis products, should only be used under the care of an appropriate prescriber and supplied in line with Australian law and professional standards.
          </p>
        </div>
      </section>
    </div>
  )
}
