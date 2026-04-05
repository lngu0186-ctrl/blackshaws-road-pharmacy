import { useEffect, useState } from 'react'
import { Phone, MapPin, MessageSquare, Send, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { BrandSignature } from '../components/layout/BrandSignature'
import { supabase } from '../integrations/supabase/client'

const hours = [
  { label: 'Monday–Friday', value: '8:00 AM – 9:00 PM' },
  { label: 'Saturday', value: '8:00 AM – 6:00 PM' },
  { label: 'Sunday', value: '10:00 AM – 5:00 PM' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contact | Blackshaws Road Pharmacy'

    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'Contact Blackshaws Road Pharmacy in Altona North. Call (03) 9391 3257, visit us at 310A Blackshaws Road, or send us an online enquiry. Open 7 days with extended weekday hours.'

    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.name = 'robots'
      document.head.appendChild(metaRobots)
    }
    metaRobots.content = 'index, follow'
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const { data, error } = await supabase.functions.invoke('send-contact', {
        body: {
          ...formData,
          timestamp: new Date().toISOString(),
        },
      })

      if (error) {
        throw new Error(error.message || 'Failed to send message')
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Contact</p>
          <h1 className="text-white">Get in Touch</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">We're here Monday to Saturday. Walk in anytime, or reach us by phone or online.</p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <Phone className="h-10 w-10 text-[var(--color-red)]" />
              <h2 className="mt-5 text-[var(--color-navy)]">Call Us</h2>
              <p className="mt-3 text-lg font-semibold text-[var(--color-navy)]">(03) 9391 3257</p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">For prescription enquiries, health advice, and general questions.</p>
            </div>

            <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <MapPin className="h-10 w-10 text-[var(--color-red)]" />
              <h2 className="mt-5 text-[var(--color-navy)]">Visit Us</h2>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">310A Blackshaws Road, Altona North VIC 3025</p>
              <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                {hours.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                    <span>{item.label}</span>
                    <span className="font-semibold text-[var(--color-navy)]">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">Parking available on Blackshaws Road.</p>
            </div>

            <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <MessageSquare className="h-10 w-10 text-[var(--color-red)]" />
              <h2 className="mt-5 text-[var(--color-navy)]">Send Us a Message</h2>
              {submitted ? (
                <div className="mt-4 rounded-2xl bg-[var(--color-sage-soft)] p-4 text-sm">
                  <p className="font-medium text-[var(--color-sage)]">Thanks!</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">We'll be in touch within 1 business day. For urgent matters, please call us directly.</p>
                </div>
              ) : (
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Name</label>
                    <input id="contact-name" className="form-input" type="text" placeholder="Name *" required aria-required="true" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Phone number</label>
                    <input id="contact-phone" className="form-input" type="tel" placeholder="Phone number (optional)" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Email</label>
                    <input id="contact-email" className="form-input" type="email" placeholder="Email *" required aria-required="true" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea id="contact-message" className="form-input resize-none" placeholder="Message / enquiry *" required aria-required="true" rows={4} value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} />
                  </div>
                  {submitError && (
                    <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{submitError}</div>
                  )}
                  <Button type="submit" variant="red" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Enquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="/prescriptions"><Button variant="red" size="lg">Upload a Prescription</Button></a>
            <a href="/health-services"><Button variant="outline" size="lg">View Health Services</Button></a>
          </div>

          <div className="mt-10 rounded-[28px] overflow-hidden border border-[var(--color-border)] bg-white shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.8235793153158!3d-37.87324797975917!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64e7c4ab2b3b5%3A0x504567521000ce1!2s310A%20Blackshaws%20Rd%2C%20Altona%20North%20VIC%203025!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blackshaws Road Pharmacy map"
            />
          </div>

          <div className="mt-8 text-sm text-[var(--color-text-muted)]">
            For urgent medical concerns outside pharmacy hours, please contact your GP, call NURSE-ON-CALL on 1300 60 60 24, or in an emergency call 000.
          </div>
        </div>
      </section>
    </div>
  )
}
