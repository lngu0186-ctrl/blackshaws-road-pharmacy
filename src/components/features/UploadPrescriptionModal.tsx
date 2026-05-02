import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useUploadPrescriptionStore } from '../../stores/uploadPrescriptionStore'
import { PrescriptionIframe } from './PrescriptionIframe'

export function UploadPrescriptionModal() {
  const { isOpen, close } = useUploadPrescriptionStore()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-2 sm:p-6"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Upload prescription"
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close upload prescription"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-navy-deep)] shadow-md ring-1 ring-black/10 transition hover:bg-[var(--color-surface-alt)]"
        >
          <X className="h-5 w-5" />
        </button>
        <PrescriptionIframe className="h-full w-full" />
      </div>
    </div>
  )
}
