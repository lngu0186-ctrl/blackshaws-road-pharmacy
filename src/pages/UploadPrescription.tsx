import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Camera, Upload, X, FileText, Shield, CheckCircle,
  Phone, MapPin, Clock3, AlertTriangle, ChevronRight,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { supabase } from '../integrations/supabase/client'
import { usePageSeo } from '../lib/seo'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'image/webp', 'application/pdf']

interface FilePreview {
  file: File
  preview: string
}

export default function UploadPrescription() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    notes: '',
  })
  const [files, setFiles] = useState<FilePreview[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  usePageSeo({
    title: 'Prescriptions | Blackshaws Road Pharmacy',
    description: 'Upload your prescription online for convenient pickup at Blackshaws Road Pharmacy in Altona North. Fast, secure prescription requests with pharmacist review. Call (03) 9391 3257.',
    canonicalPath: '/prescriptions',
  })

  const validate = useCallback(() => {
    const errors: Record<string, string> = {}
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name'
    if (!formData.dob) errors.dob = 'Please enter your date of birth'
    if (!formData.phone.trim()) errors.phone = 'Please enter your phone number'
    else if (!/^[\d\s+()-]{8,20}$/.test(formData.phone.trim())) errors.phone = 'Please enter a valid Australian phone number'
    if (files.length === 0) errors.files = 'Please upload at least one prescription image'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData, files])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    setError(null)

    for (const file of selected) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Something went wrong with your upload. Please try again or call us directly on (03) 9391 3257.')
        e.target.value = ''
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        setError('Something went wrong with your upload. Please try again or call us directly on (03) 9391 3257.')
        e.target.value = ''
        return
      }
    }

    selected.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          setFiles((prev) => [...prev, { file, preview: ev.target?.result as string }])
        }
        reader.readAsDataURL(file)
      } else {
        setFiles((prev) => [...prev, { file, preview: 'pdf' }])
      }
    })

    if (fieldErrors.files) setFieldErrors((prev) => ({ ...prev, files: '' }))
    e.target.value = ''
  }

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    setSubmitting(true)

    try {
      const filePayloads = await Promise.all(
        files.map(
          ({ file }) =>
            new Promise<{ name: string; type: string; data: string }>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1]
                resolve({ name: file.name, type: file.type, data: base64 })
              }
              reader.onerror = reject
              reader.readAsDataURL(file)
            })
        )
      )

      const { error: fnError } = await supabase.functions.invoke('send-prescription', {
        body: {
          fullName: formData.fullName.trim(),
          dob: formData.dob,
          phone: formData.phone.trim(),
          notes: formData.notes.trim(),
          files: filePayloads,
        },
      })

      if (fnError) throw fnError
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Something went wrong with your upload. Please try again or call us directly on (03) 9391 3257.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({ fullName: '', dob: '', phone: '', notes: '' })
    setFiles([])
    setError(null)
    setFieldErrors({})
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }))
  }

  if (submitted) {
    return (
      <div className="bg-[var(--color-surface)]">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link to="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[var(--color-navy)] font-medium">Upload Prescription</span>
          </nav>
        </div>

        <div className="container-custom pb-20 pt-8">
          <Card className="max-w-2xl mx-auto text-center py-12 md:py-16 px-6 md:px-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-sage-soft)]">
              <CheckCircle className="h-12 w-12 text-[var(--color-sage)]" />
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[var(--color-navy-deep)]">
              Prescription received
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-md mx-auto">
              Your prescription has been received. Our team will contact you within 2 business hours to confirm your order.
            </p>

            <div className="mt-8 rounded-[24px] bg-[var(--color-surface-alt)] p-6 text-left max-w-md mx-auto space-y-4">
              {[
                'Our pharmacist will review your prescription',
                `We'll call ${formData.phone || 'you'} to confirm availability and pickup`,
                'Collect at 310A Blackshaws Road, Altona North',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-sage)] text-white text-xs font-bold">{i + 1}</span>
                  <p className="text-sm text-[var(--color-text-muted)]">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[20px] bg-[var(--color-navy-deep)] p-5 text-white max-w-md mx-auto">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Need it urgently?</p>
              <a href="tel:0393913257" className="mt-2 inline-flex items-center gap-2 text-lg font-semibold hover:text-white/85">
                <Phone className="h-5 w-5" /> (03) 9391 3257
              </a>
            </div>

            <Button variant="outline" onClick={handleReset} className="mt-8">
              Submit another prescription
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-surface)]">
      <div className="container-custom py-4">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Link to="/" className="hover:text-[var(--color-navy)]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[var(--color-navy)] font-medium">Upload Prescription</span>
        </nav>
      </div>

      <div className="container-custom pb-20 pt-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.45fr] items-start">
          <Card className="p-6 md:p-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-red-soft)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-red)]">
                <FileText className="h-3.5 w-3.5" /> Prescription upload
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-serif font-semibold text-[var(--color-navy-deep)]">
                Send us your prescription
              </h1>
              <p className="mt-3 text-lg text-[var(--color-text-muted)]">
                Upload a clear photo of your prescription and we\'ll have it ready for pickup. Fast, simple and secure.
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[var(--color-red)]/20 bg-[var(--color-red-soft)] p-4">
                <AlertTriangle className="h-5 w-5 text-[var(--color-red)] shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-[var(--color-red)]">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Full name" htmlFor="prescription-full-name" required error={fieldErrors.fullName}>
                  <input id="prescription-full-name" type="text" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder="As it appears on the prescription" maxLength={100} autoComplete="name" className="form-input" />
                </FormField>
                <FormField label="Date of birth" htmlFor="prescription-dob" required error={fieldErrors.dob}>
                  <input id="prescription-dob" type="date" value={formData.dob} onChange={(e) => updateField('dob', e.target.value)} autoComplete="bday" className="form-input" />
                </FormField>
              </div>

              <FormField label="Phone number" htmlFor="prescription-phone" required error={fieldErrors.phone}>
                <input id="prescription-phone" type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="04XX XXX XXX" maxLength={20} autoComplete="tel" className="form-input" />
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">We\'ll call this number to confirm your prescription is ready and let you know if we need anything else.</p>
              </FormField>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Prescription photo or scan <span className="text-[var(--color-red)]">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-dashed border-[var(--color-border)] text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-navy)] hover:bg-[var(--color-navy-soft)] transition-colors">
                    <Upload className="h-5 w-5" /> Choose file
                  </button>
                  <button type="button" onClick={() => cameraInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-dashed border-[var(--color-border)] text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-navy)] hover:bg-[var(--color-navy-soft)] transition-colors">
                    <Camera className="h-5 w-5" /> Take photo
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" multiple onChange={handleFileChange} className="hidden" />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">JPG, PNG, WebP or PDF — maximum 10 MB per file</p>
                {fieldErrors.files && <p className="mt-1 text-xs text-[var(--color-red)]">{fieldErrors.files}</p>}
              </div>

              {files.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {files.map((fp, idx) => (
                    <div key={idx} className="relative group">
                      {fp.preview === 'pdf' ? (
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                          <FileText className="h-8 w-8 text-[var(--color-navy)]" />
                        </div>
                      ) : (
                        <img src={fp.preview} alt={`Prescription upload ${idx + 1}`} className="h-24 w-24 rounded-2xl object-cover border border-[var(--color-border)]" />
                      )}
                      <button type="button" onClick={() => removeFile(idx)} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-red)] text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`Remove file ${idx + 1}`}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormField label="Notes for the pharmacist (optional)" htmlFor="prescription-notes">
                <textarea id="prescription-notes" value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} placeholder="Any special instructions, repeats needed, or questions..." maxLength={500} rows={3} className="form-input resize-none" />
              </FormField>

              <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-red)]/15 bg-[var(--color-red-soft)] p-4">
                <AlertTriangle className="h-5 w-5 text-[var(--color-red)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--color-red)] font-medium">Paper prescriptions require the original hard copy at pickup. Please bring it with you.</p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-[var(--color-surface-alt)] p-4">
                <Shield className="h-5 w-5 text-[var(--color-navy)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text-dark)]">Privacy notice:</span> Your health information is handled in accordance with the Australian Privacy Principles under the Privacy Act 1988. We do not store your prescription data beyond processing — it is sent directly to our pharmacist team.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--color-navy-deep)] p-5 text-sm text-white/80">
                <p className="font-semibold text-white">What happens next</p>
                <p className="mt-2 leading-relaxed">Our pharmacist team reviews uploads during pharmacy hours, checks prescription requirements and stock availability, then calls you with the safest next step. Please bring any original paper prescription with you at pickup if required.</p>
              </div>

              <Button type="submit" variant="red" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending prescription…
                  </span>
                ) : (
                  'Send prescription'
                )}
              </Button>
            </form>
          </Card>

          <div className="hidden lg:block space-y-6">
            <Card className="p-6">
              <h3 className="font-serif text-xl font-semibold text-[var(--color-navy-deep)]">Tips for a great photo</h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
                {[
                  'Photograph the entire prescription — all edges visible',
                  'Use good lighting with no shadows across the text',
                  'Make sure all text and barcodes are sharp and readable',
                  'Include the prescriber’s details and date',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-red)] shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-[var(--color-navy-deep)] text-white border-0">
              <h3 className="font-serif text-xl font-semibold">Need to talk to us?</h3>
              <p className="mt-3 text-sm text-white/75">Our pharmacists are available 7 days a week to help with prescriptions, repeats and medication queries.</p>
              <div className="mt-5 space-y-3">
                <a href="tel:0393913257" className="flex items-center gap-3 text-sm font-semibold hover:text-white/85"><Phone className="h-4 w-4" /> (03) 9391 3257</a>
                <p className="flex items-center gap-3 text-sm text-white/65"><MapPin className="h-4 w-4" /> 310A Blackshaws Road, Altona North</p>
                <p className="flex items-center gap-3 text-sm text-white/65"><Clock3 className="h-4 w-4" /> Open 7 days</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold mb-2">
        {label} {required && <span className="text-[var(--color-red)]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-[var(--color-red)]">{error}</p>}
    </div>
  )
}
