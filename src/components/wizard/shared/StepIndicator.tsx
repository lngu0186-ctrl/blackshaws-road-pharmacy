import { Check } from 'lucide-react'
import { useCampaignStore } from '@/store/campaignStore'
import { cn } from '@/utils/cn'

const steps = [
  { id: 1, label: 'Import' },
  { id: 2, label: 'Map & Validate' },
  { id: 3, label: 'Compose' },
  { id: 4, label: 'Execute' },
] as const

export function StepIndicator() {
  const step = useCampaignStore((state) => state.step)

  return (
    <ol className="flex items-center justify-between gap-3" role="list" aria-label="Campaign wizard steps">
      {steps.map((item) => {
        const isCompleted = step > item.id
        const isActive = step === item.id

        return (
          <li
            key={item.id}
            className="flex min-w-0 flex-1 flex-col items-center gap-2"
            aria-current={isActive ? 'step' : undefined}
          >
            <div className="flex w-full items-center justify-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200',
                  {
                    'border-blue-600 bg-blue-600 text-white': isCompleted,
                    'border-blue-600 ring-4 ring-blue-100 text-blue-600': isActive,
                    'border-slate-300 bg-white text-slate-400': !isCompleted && !isActive,
                  },
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" aria-hidden="true" /> : item.id}
              </div>
              {item.id !== steps.length ? <div className="hidden h-px flex-1 bg-slate-200 sm:block" aria-hidden="true" /> : null}
            </div>
            <span
              className={cn('text-center text-xs font-medium text-slate-500 sm:text-sm', {
                'text-blue-600': isActive,
                'hidden sm:inline': true,
              })}
            >
              {item.label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
