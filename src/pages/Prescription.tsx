import { useEffect } from 'react'
import { Clock3, FileText, ShieldAlert, Phone } from 'lucide-react'
import UploadPrescription from './UploadPrescription'
import { Button } from '../components/ui/Button'

const notes = [
  'Please upload a clear photo or PDF of the full prescription.',
  'Submitting a prescription request does not guarantee immediate supply.',
  'Our pharmacist may contact you to confirm details, discuss stock or request the original script where required.',
  'For urgent or clinically complex medicines, please call the pharmacy directly.',
]

export default function Prescription() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Prescriptions | Blackshaws Road Pharmacy'
  }, [])

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-label !text-white/70">Prescriptions</p>
            <h1 className="max-w-4xl text-white">Upload your prescription for a straightforward pickup process.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">Send your prescription ahead so our pharmacy team can review it, prepare where appropriate and let you know the next step. This helps make pickup faster while still allowing for pharmacist review, medicine availability and prescription requirements.</p>
          </div>
          <div className="premium-panel rounded-[32px] p-7 text-[var(--color-text-dark)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-red)]">Before you upload</p>
            <div className="mt-5 space-y-4">
              {notes.map((note) => (
                <div key={note} className="rounded-[22px] bg-white/85 p-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{note}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-10 pb-8">
        <div className="container-custom grid gap-5 rounded-[30px] border border-[var(--color-border)] bg-white p-6 shadow-[0_30px_90px_-50px_rgba(16,24,63,0.28)] md:grid-cols-3">
          <div className="rounded-[22px] bg-[var(--color-surface-alt)] px-5 py-4 text-sm font-semibold text-[var(--color-navy)]">Convenient pre-submission before pickup</div>
          <div className="rounded-[22px] bg-[var(--color-surface-alt)] px-5 py-4 text-sm font-semibold text-[var(--color-navy)]">Pharmacist review before any dispensing decision</div>
          <div className="rounded-[22px] bg-[var(--color-surface-alt)] px-5 py-4 text-sm font-semibold text-[var(--color-navy)]">Call support for urgent, complex or stock-sensitive medicines</div>
        </div>
      </section>

      <UploadPrescription />

      <section className="section-padding pt-0">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
            <h2 className="text-[var(--color-navy)]">How it works</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <p className="flex items-start gap-3"><FileText className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> Upload your prescription request with your name, date of birth and contact number.</p>
              <p className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> Our team reviews the request during pharmacy hours and may contact you if more information is needed.</p>
              <p className="flex items-start gap-3"><ShieldAlert className="mt-0.5 h-4 w-4 text-[var(--color-red)]" /> If the medicine is unavailable, not suitable for advance preparation or needs prescriber clarification, we will let you know the safest next step.</p>
            </div>
          </div>

          <div className="rounded-[28px] bg-[var(--color-navy-deep)] p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Need immediate help?</p>
            <h2 className="mt-3 text-white">Call the pharmacy team.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/76">If the request is urgent, involves specialised medicines or you are unsure whether online upload is appropriate, a quick call is the better path.</p>
            <a href="tel:0393913257" className="mt-5 inline-block">
              <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]"><Phone className="mr-2 h-5 w-5" /> (03) 9391 3257</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
