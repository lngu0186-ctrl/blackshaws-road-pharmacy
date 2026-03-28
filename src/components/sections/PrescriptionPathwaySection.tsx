import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, FileText, PackageCheck, ShieldCheck } from 'lucide-react'
import { Button } from '../ui/Button'

const steps = [
  {
    icon: FileText,
    title: 'Send your prescription',
    description: 'Upload a clear image of your script or call the team if you need guidance before submitting.',
  },
  {
    icon: ShieldCheck,
    title: 'Pharmacist review',
    description: 'We check the prescription details, medicine availability and anything that may need a quick follow-up call.',
  },
  {
    icon: PackageCheck,
    title: 'Pickup confirmation',
    description: 'Once ready, the team can confirm collection timing and any important counselling points for safe use.',
  },
]

export function PrescriptionPathwaySection() {
  return (
    <section id="prescriptions" className="section-padding bg-[var(--color-surface)]">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Prescriptions made easier</p>
            <h2 className="text-[var(--color-navy)]">A clearer path from prescription upload to pharmacy pickup.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-muted)]">
              For patients who want less waiting and more certainty, we offer a simple prescription pathway backed by real pharmacist oversight. It is designed for convenience without sounding like medicine is guaranteed before review.
            </p>

            <div className="mt-8 rounded-[30px] bg-[var(--color-navy-deep)] p-6 text-white md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Helpful to know</p>
              <div className="mt-4 space-y-3 text-sm text-white/78">
                <p className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> Submission helps our team prepare, but all dispensing remains subject to pharmacist review and medicine availability.</p>
                <p className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> For controlled, urgent or clinically complex medicines, the pharmacist may need to speak with you or your prescriber before supply.</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/prescriptions"><Button variant="red" size="lg">Upload a prescription</Button></Link>
                <a href="tel:0393913257"><Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">Call the pharmacy</Button></a>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.2)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-red-soft)] text-[var(--color-red)]"><step.icon className="h-7 w-7" /></div>
                <h3 className="mt-5 text-2xl text-[var(--color-navy)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.description}</p>
              </div>
            ))}
            <Link to="/patient-info" className="group rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 text-[var(--color-navy)] transition hover:-translate-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Patient information</p>
              <h3 className="mt-4 text-2xl">Privacy, safety and what to expect</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">Read how we handle prescription requests, health information and pharmacist follow-up.</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">View patient information <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
