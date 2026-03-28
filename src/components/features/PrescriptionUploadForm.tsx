'use client'

import { useState } from 'react'
import { Upload, Camera, FileText, CheckCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function PrescriptionUploadForm() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    pickup: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload to a secure server
    // Debug logging removed for production
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--color-accent)' }} />
        <h3 className="text-2xl font-serif font-semibold mb-4">
          Prescription Received
        </h3>
        <p className="text-[var(--color-muted)] mb-6">
          Thank you for submitting your prescription. Our pharmacist will review it and contact you shortly to confirm readiness and answer any questions.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', dob: '', phone: '', pickup: '' })
            setUploadedFile(null)
          }}
        >
          Submit Another
        </Button>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-secondary)/20' }}
        >
          <FileText className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
        </div>
        <div>
          <h3 className="text-xl font-serif font-semibold">Upload Your Prescription</h3>
          <p className="text-sm text-[var(--color-muted)]">
            Quick and convenient — we'll prepare your medication for pickup
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium mb-2">
              Preferred Pickup
            </label>
            <select
              id="pickup"
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
              value={formData.pickup}
              onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
            >
              <option value="">Select a time</option>
              <option value="morning">Morning (9AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 5PM)</option>
              <option value="evening">Evening (5PM - 7PM)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Prescription (clear photo of the script) *
          </label>
          <div
            className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-[var(--color-accent)] transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {uploadedFile ? (
              <div className="flex items-center justify-center gap-2 text-[var(--color-accent)]">
                <CheckCircle className="w-5 h-5" />
                <span>File uploaded</span>
              </div>
            ) : (
              <>
                <div className="flex justify-center gap-4 mb-4">
                  <Upload className="w-10 h-10" style={{ color: 'var(--color-muted)' }} />
                  <Camera className="w-10 h-10" style={{ color: 'var(--color-muted)' }} />
                </div>
                <p className="text-[var(--color-muted)] mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  PNG, JPG or PDF (max 10MB)
                </p>
              </>
            )}
            <input
              type="file"
              id="file-upload"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setUploadedFile(file.name)
                }
              }}
            />
          </div>
        </div>

        <div className="bg-[var(--color-bg)] p-4 rounded-xl text-sm text-[var(--color-muted)]">
          <p>
            <strong>TGA Compliance:</strong> Prescription medicines require a valid prescription from a registered Australian medical practitioner. We cannot dispense without a legitimate prescription. Turnaround time depends on medication availability and pharmacist review.
          </p>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Upload Prescription
        </Button>
      </form>
    </Card>
  )
}
