type ProgressProps = {
  value: number
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div
      className={['relative h-3 w-full overflow-hidden rounded-full bg-slate-200', className]
        .filter(Boolean)
        .join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      aria-label="Campaign send progress"
    >
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}
