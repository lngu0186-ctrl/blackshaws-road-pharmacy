import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const faqs = [
  {
    question: 'Can I upload my prescription before coming in?',
    answer: 'Yes. You can send a clear image so the pharmacy team can review the request and contact you about pickup timing, availability or anything that needs clarification.',
  },
  {
    question: 'Do I need to book for vaccinations?',
    answer: 'Online booking is recommended for vaccination services so eligibility, stock and pharmacist availability are easier to coordinate.',
  },
  {
    question: 'Can pharmacists help with common conditions?',
    answer: 'Yes, for some eligible conditions the pharmacy may be able to help directly, and for others we can guide you on the most appropriate GP or urgent care pathway.',
  },
  {
    question: 'Is the health information on this website personalised medical advice?',
    answer: 'No. Website information is general only and does not replace advice from your doctor or another qualified healthcare professional.',
  },
]

export function FaqPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Frequently asked questions</p>
            <h2 className="text-[var(--color-navy)]">Practical answers for scripts, bookings and pharmacy care.</h2>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">A cleaner FAQ helps reduce friction before patients call. The full page covers prescriptions, services, shopping and general policy notes.</p>
            <Link to="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)]">
              View all FAQs <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
                <h3 className="text-xl text-[var(--color-navy)]">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
