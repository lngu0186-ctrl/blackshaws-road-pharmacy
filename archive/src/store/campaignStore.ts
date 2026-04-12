import { create } from 'zustand'

export type WizardStep = 1 | 2 | 3 | 4

export type RawRow = Record<string, string>

export type ColumnMapping = {
  phoneNumber: string | null
  firstName: string | null
  custom: string | null
}

export type ValidationError = {
  rowIndex: number
  rawPhone: string
  reason: string
}

export type ExecutionStatus = 'idle' | 'sending' | 'paused' | 'completed' | 'error'

export type SendResult = {
  rowIndex: number
  phone: string
  status: 'success' | 'failed'
  timestamp: string
  errorDetail: string | null
}

type CampaignState = {
  step: WizardStep
  rawCsvData: RawRow[]
  csvHeaders: string[]
  mappedColumns: ColumnMapping
  validationErrors: ValidationError[]
  discardedRows: Set<number>
  messageTemplate: string
  executionStatus: ExecutionStatus
  sendResults: SendResult[]
  sendProgress: number
  setStep: (step: WizardStep) => void
  setCsvData: (rows: RawRow[], headers: string[]) => void
  setColumnMapping: (mapping: ColumnMapping) => void
  addValidationError: (error: ValidationError) => void
  clearValidationErrors: () => void
  discardRow: (index: number) => void
  restoreRow: (index: number) => void
  setMessageTemplate: (template: string) => void
  setExecutionStatus: (status: ExecutionStatus) => void
  appendSendResult: (result: SendResult) => void
  setSendProgress: (pct: number) => void
  resetCampaign: () => void
}

const initialMappedColumns: ColumnMapping = {
  phoneNumber: null,
  firstName: null,
  custom: null,
}

const initialState = {
  step: 1 as WizardStep,
  rawCsvData: [] as RawRow[],
  csvHeaders: [] as string[],
  mappedColumns: initialMappedColumns,
  validationErrors: [] as ValidationError[],
  discardedRows: new Set<number>(),
  messageTemplate: '',
  executionStatus: 'idle' as ExecutionStatus,
  sendResults: [] as SendResult[],
  sendProgress: 0,
}

export const useCampaignStore = create<CampaignState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setCsvData: (rows, headers) =>
    set({
      rawCsvData: rows,
      csvHeaders: headers,
      mappedColumns: initialMappedColumns,
      validationErrors: [],
      discardedRows: new Set<number>(),
      sendResults: [],
      sendProgress: 0,
      executionStatus: 'idle',
    }),
  setColumnMapping: (mapping) => set({ mappedColumns: mapping }),
  addValidationError: (error) =>
    set((state) => ({
      validationErrors: [...state.validationErrors, error],
    })),
  clearValidationErrors: () => set({ validationErrors: [] }),
  discardRow: (index) =>
    set((state) => {
      const discardedRows = new Set(state.discardedRows)
      discardedRows.add(index)
      return { discardedRows }
    }),
  restoreRow: (index) =>
    set((state) => {
      const discardedRows = new Set(state.discardedRows)
      discardedRows.delete(index)
      return { discardedRows }
    }),
  setMessageTemplate: (template) => set({ messageTemplate: template }),
  setExecutionStatus: (status) => set({ executionStatus: status }),
  appendSendResult: (result) =>
    set((state) => ({
      sendResults: [...state.sendResults, result],
    })),
  setSendProgress: (pct) => set({ sendProgress: Math.max(0, Math.min(100, pct)) }),
  resetCampaign: () =>
    set({
      ...initialState,
      mappedColumns: { ...initialMappedColumns },
      discardedRows: new Set<number>(),
    }),
}))
