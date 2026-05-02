import { create } from 'zustand'

interface UploadPrescriptionState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useUploadPrescriptionStore = create<UploadPrescriptionState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
