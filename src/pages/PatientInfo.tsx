import { useEffect } from 'react'
import { LockKeyhole, ShieldCheck, Stethoscope } from 'lucide-react'

const sections = [
  {
    icon: LockKeyhole,
    title: 'Prescription requests and privacy',
    points: [
      'Prescription uploads are intended to help the pharmacy team review and prepare requests before pickup where appropriate.',
      'Patients should provide accurate details and only submit prescriptions that are valid and issued by an authorised Australian prescriber.',
      'The pharmacy may need to contact you to verify details, clarify medicine history or request the original prescription or electronic token before supply.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Medicine availability and supply',
    points: [
      'Medicine availability can change and some items may require ordering, substitution discussion or prescriber follow-up.',
      'Submitting an online request does not guarantee immediate preparation, reservation or dispensing of a medicine.',
      'Supply remains subject to pharmacist judgement, legal requirements, stock levels and clinical suitability.',
    ],
  },
  {
    icon: Stethoscope,
    title: 'General website information',
    points: [
      'Content on this website is general in nature and is not a substitute for personalised medical advice, diagnosis or treatment.',
      'Always consult your doctor or another qualified healthcare professional for advice specific to your situation.',
      'If symptoms persist, worsen or feel urgent, seek prompt medical attention or emergency care where needed.',
    ],
  },
]

export default function PatientInfo() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Patient Information | Blackshaws Road Pharmacy'
  }, [])

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Patient information</p>
          <h1 className="text-white">Clear expectations around prescriptions, privacy and general health information.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">This page supports trust and compliance by explaining how online prescription requests work, how pharmacist review fits in and why website content should be treated as general information only.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-navy-soft)] text-[var(--color-navy)]"><section.icon className="h-7 w-7" /></div>
              <h2 className="mt-5 text-[var(--color-navy)]">{section.title}</h2>
              <ul className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-red)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
