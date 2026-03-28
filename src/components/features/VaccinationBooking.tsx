'use client'

import { useState } from 'react'
import { Syringe, CheckCircle, Calendar } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { format, addDays } from 'date-fns'

const vaccines = [
  { id: 'flu', name: 'Influenza (Flu)', description: 'Annual flu shot for all ages' },
  { id: 'covid', name: 'COVID-19', description: 'Current variant booster' },
  { id: 'shingles', name: 'Shingles', description: 'For adults 50+ (Shingrix)' },
  { id: 'whooping', name: 'Whooping Cough', description: 'Pertussis booster for adults' },
  { id: 'travel', name: 'Travel Vaccines', description: 'Hepatitis, Typhoid, Yellow Fever' },
]

export function VaccinationBooking() {
  const [step, setStep] = useState(1)
  const [selectedVaccine, setSelectedVaccine] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    medicare: '',
  })
  const [booked, setBooked] = useState(false)

  const handleVaccineSelect = (vaccineId: string) => {
    setSelectedVaccine(vaccineId)
    setStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep(3)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a booking API
    console.log('Booking:', { vaccine: selectedVaccine, date: selectedDate, ...formData })
    setBooked(true)
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 16; hour++) {
      slots.push(`${hour}:00`)
      if (hour < 15) slots.push(`${hour}:30`)
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  if (booked) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--color-accent)' }} />
        <h3 className="text-2xl font-serif font-semibold mb-4">
          Vaccination Booked
        </h3>
        <p className="text-[var(--color-muted)] mb-6">
          You're all set! We'll send a confirmation to your phone. Please arrive 10 minutes early and bring your Medicare card and any relevant medical history.
        </p>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          Vaccine: <span className="font-medium">{vaccines.find((v) => v.id === selectedVaccine)?.name}</span>
          <br />
          Date: {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setBooked(false)
            setStep(1)
            setSelectedVaccine(null)
            setSelectedDate(null)
            setFormData({ name: '', dob: '', phone: '', medicare: '' })
          }}
        >
          Book Another
        </Button>
      </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {['Select Vaccine', 'Choose Time', 'Your Details'].map((label, idx) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > idx + 1
                  ? 'bg-[var(--color-accent)] text-white'
                  : step === idx + 1
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              {step > idx + 1 ? '✓' : idx + 1}
            </div>
            <span className={`ml-2 text-sm hidden sm:inline ${step >= idx + 1 ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
              {label}
            </span>
            {idx < 2 && <div className="w-8 h-0.5 mx-2 bg-[var(--color-border)]" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Syringe className="w-6 h-5" style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-xl font-serif font-semibold">Select a Vaccination</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {vaccines.map((vaccine) => (
              <button
                key={vaccine.id}
                onClick={() => handleVaccineSelect(vaccine.id)}
                className="p-4 text-left rounded-2xl border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
              >
                <h4 className="font-semibold mb-1">{vaccine.name}</h4>
                <p className="text-sm text-[var(--color-muted)]">{vaccine.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            <div>
              <h3 className="text-xl font-serif font-semibold">
                {vaccines.find((v) => v.id === selectedVaccine)?.name}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">Select a date and time</p>
            </div>
          </div>

          {/* Date picker */}
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3">Choose a date</h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: 14 }, (_, i) => {
                const date = addDays(new Date(), i + 1)
                return (
                  <button
                    key={i}
                    onClick={() => handleDateSelect(date)}
                    className={`min-w-[80px] p-3 rounded-xl border text-center transition-colors ${
                      selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                        : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
                    }`}
                  >
                    <div className="text-xs text-[var(--color-muted)]">{format(date, 'EEE')}</div>
                    <div className="text-lg font-semibold">{format(date, 'd')}</div>
                    <div className="text-xs">{format(date, 'MMM')}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div>
              <h4 className="text-sm font-medium mb-3">Choose a time</h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      // For simplicity, just proceed to step 3 when a time is selected
                      setStep(3)
                    }}
                    className="py-2 px-3 rounded-lg border border-[var(--color-border)] text-sm hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              disabled={!selectedDate}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-6">
            <h3 className="text-xl font-serif font-semibold mb-2">Your Details</h3>
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Vaccine: {vaccines.find((v) => v.id === selectedVaccine)?.name}
              <br />
              Date: {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </p>
            <div className="bg-[var(--color-bg)] p-4 rounded-xl text-sm">
              <p>TGA Note: All vaccinations are administered by qualified immunisation pharmacists. Subject to stock availability. Please arrive with your Medicare card.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="v-name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="v-name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="v-dob" className="block text-sm font-medium mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="v-dob"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="v-phone" className="block text-sm font-medium mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="v-phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="v-medicare" className="block text-sm font-medium mb-2">
                  Medicare Number
                </label>
                <input
                  type="text"
                  id="v-medicare"
                  placeholder="XXXX-XXXX-XX"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
                  value={formData.medicare}
                  onChange={(e) => setFormData({ ...formData, medicare: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button type="button" variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button type="submit" variant="primary">
             Confirm Booking
            </Button>
          </div>
          <p className="text-xs text-[var(--color-muted)] text-center mt-4">
            By booking, you agree to our privacy policy. You'll receive an SMS confirmation.
          </p>
        </form>
      )}
    </Card>
  )
}
