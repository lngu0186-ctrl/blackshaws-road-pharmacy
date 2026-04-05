import { useEffect } from 'react'
import { BrandSignature } from '../components/layout/BrandSignature'

const faqGroups = [
  {
    title: 'Prescriptions and pickup',
    items: [
      {
        question: 'Can I upload my prescription before coming in?',
        answer: 'Yes. You can upload a clear image or PDF so the pharmacy team can review the request and contact you about pickup timing, medicine availability or any follow-up needed before supply.',
      },
      {
        question: 'Does uploading my prescription guarantee it will be ready straight away?',
        answer: 'No. All prescriptions remain subject to pharmacist review, legal requirements and stock availability. If anything needs clarification, we will contact you.',
      },
      {
        question: 'Should I still bring the original prescription?',
        answer: 'In some cases, yes. Depending on the medicine and prescription type, the pharmacist may require the original prescription or an approved electronic prescription token before supply.',
      },
    ],
  },
  {
    title: 'Services and bookings',
    items: [
      {
        question: 'Do I need an appointment for vaccinations?',
        answer: 'Booking online is recommended for vaccination services so pharmacist availability, vaccine stock and eligibility checks are easier to manage.',
      },
      {
        question: 'Can the pharmacist help with common conditions?',
        answer: 'For some eligible everyday conditions, yes. If pharmacist treatment is not appropriate, we can help guide you to the right GP or urgent care pathway.',
      },
      {
        question: 'Are all pharmacy consultations free?',
        answer: 'Not all. Some consultations may be funded or free, while others are private services. We aim to make this clear on the service page or during booking.',
      },
    ],
  },
  {
    title: 'Online shop and information',
    items: [
      {
        question: 'Is the website health information personalised medical advice?',
        answer: 'No. Website content is general in nature and should not replace advice from your doctor or another qualified healthcare professional.',
      },
      {
        question: 'Can you help me choose products from the online shop?',
        answer: 'Yes. The team can provide general pharmacy guidance on suitable categories and when it may be worth speaking with a pharmacist in store.',
      },
      {
        question: 'How do I contact the pharmacy if I am unsure what to do?',
        answer: 'Call (03) 9391 3257 and the team can help with prescriptions, service pathways, vaccination bookings or the right next step.',
      },
    ],
  },
]

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'FAQ | Blackshaws Road Pharmacy'

    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'Frequently asked questions about Blackshaws Road Pharmacy in Altona North including prescriptions, vaccination bookings, pharmacist consultations, online shop, and how to contact our team.'
  }, [])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    ),
  }

  return (
    <div className="bg-[var(--color-cream)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Frequently asked questions</p>
          <h1 className="text-white">Answers that help patients move faster with less uncertainty.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">This page gives practical guidance on prescriptions, bookings, general health information and how to contact the pharmacy team when a more personal conversation is the better option.</p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)] h-fit">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Quick note</p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">If you have symptoms getting worse, questions about urgent medicines, or need personalised advice, please call the pharmacy or seek GP or emergency care where appropriate.</p>
          </div>

          <div className="space-y-8">
            {faqGroups.map((group) => (
              <div key={group.title} className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
                <h2 className="text-[var(--color-navy)]">{group.title}</h2>
                <div className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <div key={item.question} className="rounded-[22px] bg-[var(--color-surface-alt)] p-5">
                      <h3 className="text-xl text-[var(--color-navy)]">{item.question}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
