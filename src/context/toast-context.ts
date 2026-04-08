import { createContext } from 'react'

export interface Toast {
  id: number
  message: string
  type: 'error' | 'success' | 'info'
}

export interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type?: 'error' | 'success' | 'info') => void
  removeToast: (id: number) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)
