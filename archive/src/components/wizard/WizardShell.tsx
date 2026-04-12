import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from '@/components/wizard/shared/StepIndicator'
import ImportStep from '@/components/wizard/steps/ImportStep'
import MapStep from '@/components/wizard/steps/MapStep'
import ComposeStep from '@/components/wizard/steps/ComposeStep'
import ExecuteStep from '@/components/wizard/steps/ExecuteStep'
import { useCampaignStore, type WizardStep } from '@/store/campaignStore'

const stepLabels: Record<WizardStep, string> = {
  1: 'Import',
  2: 'Map & Validate',
  3: 'Compose',
  4: 'Execute',
}

export default function WizardShell() {
  const { step, rawCsvData, mappedColumns, messageTemplate, setStep } = useCampaignStore((state) => ({
    step: state.step,
    rawCsvData: state.rawCsvData,
    mappedColumns: state.mappedColumns,
    messageTemplate: state.messageTemplate,
    setStep: state.setStep,
  }))

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return <ImportStep />
      case 2:
        return <MapStep />
      case 3:
        return <ComposeStep />
      case 4:
        return <ExecuteStep />
      default:
        return null
    }
  }, [step])

  const nextConfig: Record<1 | 2 | 3, { label: string; disabled: boolean; nextStep: WizardStep }> = {
    1: {
      label: 'Continue to Mapping',
      disabled: rawCsvData.length === 0,
      nextStep: 2 as const,
    },
    2: {
      label: 'Continue to Compose',
      disabled: mappedColumns.phoneNumber === null,
      nextStep: 3 as const,
    },
    3: {
      label: 'Review & Send',
      disabled: messageTemplate.trim() === '',
      nextStep: 4 as const,
    },
  }

  const currentNext = step < 4 ? nextConfig[step as 1 | 2 | 3] : null

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="font-serif text-2xl text-slate-800">Burke Messenger</p>
            <p className="text-sm text-slate-500">Step {step} of 4, {stepLabels[step]}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <StepIndicator />
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="translate-y-0 opacity-100 transition-all duration-300 ease-in-out">{stepContent}</div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              className="border-slate-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-200"
              onClick={() => setStep((step - 1) as 1 | 2 | 3)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentNext ? (
            <Button
              type="button"
              variant="primary"
              disabled={currentNext.disabled}
              className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setStep(currentNext.nextStep)}
            >
              {currentNext.label}
              <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
