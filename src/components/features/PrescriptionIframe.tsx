import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, RefreshCw, ExternalLink, FileText } from 'lucide-react'

const UPLOAD_URL = 'https://blackshawsrx.lovable.app/'
const LOAD_TIMEOUT_MS = 15000

interface PrescriptionIframeProps {
  className?: string
  title?: string
}

export function PrescriptionIframe({ className = 'h-full w-full', title = 'Upload Prescription' }: PrescriptionIframeProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => {
      setStatus((prev) => (prev === 'loading' ? 'error' : prev))
    }, LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(t)
  }, [attempt])

  const retry = () => {
    setStatus('loading')
    setAttempt((n) => n + 1)
    if (iframeRef.current) {
      // Force reload by resetting src
      iframeRef.current.src = UPLOAD_URL + (UPLOAD_URL.includes('?') ? '&' : '?') + '_r=' + Date.now()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        ref={iframeRef}
        src={UPLOAD_URL}
        title={title}
        className="h-full w-full border-0"
        allow="clipboard-write; camera; microphone"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
      />

      {status === 'loading' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-white p-6"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy-soft)]">
            <FileText className="h-6 w-6 animate-pulse text-[var(--color-navy)]" />
          </div>
          <div className="w-full max-w-md space-y-3">
            <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="h-3 w-full animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="mt-6 h-32 w-full animate-pulse rounded-2xl bg-[var(--color-navy-soft)]" />
            <div className="flex gap-3">
              <div className="h-10 flex-1 animate-pulse rounded-full bg-[var(--color-navy-soft)]" />
              <div className="h-10 w-28 animate-pulse rounded-full bg-[var(--color-navy-soft)]" />
            </div>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            Loading secure upload form…
          </p>
        </div>
      )}

      {status === 'error' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white p-6 text-center"
          role="alert"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-red)]/10">
            <AlertTriangle className="h-7 w-7 text-[var(--color-red)]" />
          </div>
          <div className="max-w-md space-y-2">
            <h3 className="text-lg font-bold text-[var(--color-navy-deep)]">We couldn't load the upload form</h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              The secure prescription upload form is taking longer than expected. Please check your connection and try
              again, or call the pharmacy on <a href="tel:0393913257" className="font-semibold text-[var(--color-navy)] underline">(03) 9391 3257</a>.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-red)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
            <a
              href={UPLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-navy-deep)] transition hover:bg-[var(--color-surface-alt)]"
            >
              <ExternalLink className="h-4 w-4" /> Open in new tab
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
