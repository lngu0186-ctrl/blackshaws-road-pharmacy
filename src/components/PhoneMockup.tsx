import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, MessageSquare, FileText } from 'lucide-react'

export function PhoneMockup() {
  return (
    <div className="flex justify-center lg:justify-end">
      {/* Outer device shell */}
      <div
        className="relative w-[420px] md:w-[450px]"
        style={{
          borderRadius: '52px',
          background: 'linear-gradient(145deg, #e0e0e0 0%, #c0c0c0 30%, #a0a0a0 70%, #888 100%)',
          padding: '4px',
          boxShadow:
            '0 50px 100px -30px rgba(0,0,0,0.45), 0 20px 40px -20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* Dark bezel */}
        <div
          style={{
            borderRadius: '50px',
            background: '#1a1a1a',
            padding: '14px 12px',
            position: 'relative',
          }}
        >
          {/* Dynamic Island */}
          <div className="mx-auto mb-3 flex h-[32px] w-[120px] items-center justify-center rounded-full bg-black">
            <div className="h-[10px] w-[10px] rounded-full bg-[#1a1a2e] ring-1 ring-[#2a2a3e]" />
          </div>

          {/* Screen – scrollbar hidden */}
          <div
            className="overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{
              borderRadius: '38px',
              background: 'linear-gradient(180deg, #fefefe 0%, #f9f8f5 100%)',
              height: '780px',
              padding: '24px 20px 20px',
            }}
          >
            {/* Pharmacy name */}
            <h3
              className="text-center font-display leading-tight text-[var(--color-navy-deep)]"
              style={{ fontSize: '1.3rem', letterSpacing: '-0.01em' }}
            >
              Blackshaws Road
              <br />
              Pharmacy
            </h3>

            {/* Address */}
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-[var(--color-navy-soft)] px-4 py-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-navy)]" />
              <p className="text-[0.88rem] font-medium leading-snug text-[var(--color-text-dark)]">
                310A Blackshaws Road
                <br />
                Altona North, Victoria 3025
              </p>
            </div>

            {/* Call */}
            <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-[var(--color-navy-soft)] px-4 py-3">
              <Phone className="h-4 w-4 shrink-0 text-[var(--color-navy)]" />
              <p className="text-[0.88rem] font-medium leading-snug text-[var(--color-text-dark)]">
                Give us a call on{' '}
                <span className="font-bold text-[var(--color-navy-deep)]">03 9391 3257</span>
              </p>
            </div>

            {/* ePrescription */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--color-red)]" />
                <p className="text-[0.85rem] font-bold uppercase tracking-wider text-[var(--color-red)]">
                  ePrescription
                </p>
              </div>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--color-text-muted)]">
                <strong className="text-[var(--color-navy-deep)]">EMAIL</strong> us a copy of your
                prescription. Paper scripts require the original hard-copy upon collection.
              </p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--color-text-muted)]">
                Or <strong className="text-[var(--color-navy-deep)]">TEXT/SMS</strong> us your eScript
                link.
              </p>
            </div>

            {/* Contact grid */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { icon: Phone, label: '03 9391 3257' },
                { icon: MessageSquare, label: '0406 692 267' },
                { icon: Phone, label: 'Fax: 03 9391 8099' },
                { icon: Mail, label: 'online@brp.com.au' },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-cream)] px-3 py-2.5"
                >
                  <c.icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-navy)]" />
                  <span className="truncate text-[0.75rem] text-[var(--color-text-muted)]">{c.label}</span>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="mt-4 rounded-2xl bg-[var(--color-cream)] px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--color-sage)]" />
                <p className="text-[0.8rem] font-bold text-[var(--color-navy-deep)]">Opening Hours</p>
              </div>
              <div className="mt-2 space-y-1 text-[0.78rem] text-[var(--color-text-muted)]">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="font-medium text-[var(--color-navy-deep)]">8am – 8pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-[var(--color-navy-deep)]">8am – 2pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-[var(--color-navy-deep)]">8am – 1pm</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/upload-prescription"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-red)] px-5 py-3 text-[0.9rem] font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              style={{ boxShadow: '0 12px 28px -10px rgba(192,57,43,0.6)' }}
            >
              Upload Prescription
            </Link>
          </div>

          {/* Bottom bar indicator */}
          <div className="mx-auto mt-2 h-[4px] w-[100px] rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}
