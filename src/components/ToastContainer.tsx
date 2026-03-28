'use client'

import { X, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { useToast } from '../context/ToastContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start gap-3 p-4 rounded-xl shadow-lg border"
          style={{
            backgroundColor: 'var(--color-white)',
            borderColor:
              toast.type === 'error'
                ? 'var(--color-red)'
                : toast.type === 'success'
                ? 'var(--color-navy)'
                : 'var(--color-gray-200)',
          }}
        >
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-red)' }} />
          )}
          {toast.type === 'success' && (
            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-navy)' }} />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-navy)' }} />
          )}
          <p className="text-sm flex-1" style={{ color: 'var(--color-text-dark)' }}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-gray-600)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
