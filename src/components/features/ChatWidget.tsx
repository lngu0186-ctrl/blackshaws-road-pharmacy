'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, ChevronDown } from 'lucide-react'
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
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (panelRef.current && !panelRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggle}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: 'var(--color-navy)' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-8 z-50 w-80 sm:w-96 max-h-[500px] bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden"
          style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.25s ease-out, transform 0.25s ease-out' }}
        >
          <div className="p-4 flex items-center justify-between" style={{ backgroundColor: 'var(--color-navy)' }}>
            <div>
              <h3 className="font-semibold text-white">Ask a Pharmacist</h3>
              <p className="text-sm text-white/80">General health information</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80" aria-label="Close chat widget">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-96">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">Find answers to common questions below, or send us a message and we'll get back to you during business hours.</p>

            <div className="space-y-2">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-[var(--color-text-dark)] hover:bg-[var(--color-surface-alt)] transition-colors" aria-expanded={openFaq === index} aria-label={item.question}>
                    <span className="text-gray-900">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 ml-2 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && <div className="p-3 bg-[var(--color-surface-alt)] text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)]">{item.answer}</div>}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[var(--color-surface-alt)]">
              <p className="text-sm text-[var(--color-text-muted)] mb-3">Still have questions? Send us a message.</p>
              <Button variant="primary" size="sm" className="w-full" onClick={() => { window.location.href = '/contact'; setIsOpen(false) }}>
                Contact Us
              </Button>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] mt-4 text-center">This chat provides general information only and does not replace professional medical advice. For urgent concerns, please call emergency services.</p>
          </div>
        </div>
      )}
    </>
  )
}
