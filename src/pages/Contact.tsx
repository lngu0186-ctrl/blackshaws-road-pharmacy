import { useEffect } from 'react'
import { LocationSection } from '../components/sections/LocationSection'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contact | Blackshaws Road Pharmacy'
  }, [])

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Contact</p>
          <h1 className="text-white">Talk with the Blackshaws Road Pharmacy team.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
            Call, visit, or get directions for practical support with prescriptions, pharmacy services, and everyday health questions.
          </p>
        </div>
      </section>
      <LocationSection />
    </div>
  )
}
