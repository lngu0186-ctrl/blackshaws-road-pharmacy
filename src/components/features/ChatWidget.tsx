'use client'

import { useState } from 'react'
import { MessageCircle, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'

const faqItems = [
  {
    question: 'Do I need a prescription for all medications?',
    answer: 'S4 (prescription-only) medicines require a valid prescription from a registered Australian medical practitioner. S2 and S3 medicines are available over-the-counter. Our pharmacists can advise on the appropriate classification.',
  },
  {
    question: 'How do I transfer my prescriptions to your pharmacy?',
    answer: 'Simply bring your current prescription and medication packaging. We can contact your previous pharmacy to transfer the prescription electronically. The process usually takes a few minutes.',
  },
  {
    question: 'What vaccination services do you offer?',
    answer: 'We provide influenza, COVID-19, whooping cough, shingles, and travel vaccinations. All are administered by qualified immunisation pharmacists. Bookings are recommended but walk-ins are welcome where available.',
  },
  {
    question: 'Do you bulk bill for health checks?',
    answer: 'Some health checks may be eligible for Medicare rebates under specific item numbers. We can provide a receipt for you to claim through Medicare. Pricing varies by service type.',
  },
  {
    question: 'Can you compound medications that are discontinued?',
    answer: 'Yes, our compounding service can prepare many medications that are no longer commercially available, subject to a valid prescription and compounding feasibility assessment.',
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: 'var(--color-accent)' }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 z-50 w-80 sm:w-96 max-h-[500px] bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <div>
                <h3 className="font-semibold text-white">Ask a Pharmacist</h3>
                <p className="text-sm text-white/80">General health information</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-96">
              <p className="text-sm text-[var(--color-muted)] mb-4">
                Find answers to common questions below, or send us a message and we'll get back to you during business hours.
              </p>

              {/* FAQ accordion */}
              <div className="space-y-2">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-3 text-left text-sm font-medium hover:bg-[var(--color-bg)] transition-colors"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="p-3 bg-[var(--color-bg)] text-sm text-[var(--color-muted)] border-t border-[var(--color-border)]">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact form teaser */}
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                <p className="text-sm text-[var(--color-muted)] mb-3">
                  Still have questions? Send us a message.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    // Could open a modal or redirect to contact form
                    window.location.href = '#location'
                  }}
                >
                  Contact Us
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[var(--color-muted)] mt-4 text-center">
                This chat provides general information only and does not replace professional medical advice. For urgent concerns, please call emergency services.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
