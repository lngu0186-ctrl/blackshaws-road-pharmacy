import { useMemo, useRef } from 'react'
import type { MouseEvent } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Textarea } from '@/components/ui/Textarea'
import { useCampaignStore } from '@/store/campaignStore'
import { cn } from '@/utils/cn'

function replaceTemplate(template: string, row: Record<string, string>) {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_match, token: string) => {
    const normalizedToken = token.trim()
    if (row[normalizedToken]) {
      return row[normalizedToken]
    }

    return `[[${normalizedToken}]]`
  })
}

export default function ComposeStep() {
  const { csvHeaders, rawCsvData, discardedRows, messageTemplate, setMessageTemplate } = useCampaignStore((state) => ({
    csvHeaders: state.csvHeaders,
    rawCsvData: state.rawCsvData,
    discardedRows: state.discardedRows,
    messageTemplate: state.messageTemplate,
    setMessageTemplate: state.setMessageTemplate,
  }))
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const firstActiveRow = useMemo(() => {
    return rawCsvData.find((_row, index) => !discardedRows.has(index)) ?? rawCsvData[0] ?? {}
  }, [discardedRows, rawCsvData])

  const previewMessage = useMemo(() => replaceTemplate(messageTemplate, firstActiveRow), [messageTemplate, firstActiveRow])
  const charCount = messageTemplate.length
  const segmentCount = Math.max(1, Math.ceil(Math.max(charCount, 1) / 160))
  const showVariableWarning = csvHeaders.length > 0 && !messageTemplate.includes('{{')

  const insertVariable = (header: string) => {
    const textarea = textareaRef.current
    const tag = `{{${header}}}`

    if (!textarea) {
      setMessageTemplate(`${messageTemplate}${tag}`)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const nextValue = `${messageTemplate.slice(0, start)}${tag}${messageTemplate.slice(end)}`
    setMessageTemplate(nextValue)

    requestAnimationFrame(() => {
      const cursorPosition = start + tag.length
      textarea.focus()
      textarea.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  const counterClassName = cn('text-sm', {
    'text-slate-500': charCount <= 160,
    'text-amber-600': charCount > 160 && charCount <= 480,
    'text-red-500': charCount > 480,
  })

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Message</h2>
            <p className="mt-2 text-sm text-slate-500">Build your message template and insert recipient variables.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {csvHeaders.map((header) => (
              <button
                key={header}
                type="button"
                className="transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault()
                  insertVariable(header)
                }}
              >
                <Badge className="cursor-pointer border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100">
                  {`{{${header}}}`}
                </Badge>
              </button>
            ))}
          </div>

          <Textarea
            ref={textareaRef}
            rows={6}
            maxLength={918}
            value={messageTemplate}
            onChange={(event) => setMessageTemplate(event.target.value)}
            placeholder="Write your SMS template here..."
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className={counterClassName}>
              {charCount} characters · {segmentCount} SMS segment{segmentCount === 1 ? '' : 's'}
            </p>
            {showVariableWarning ? <Badge variant="destructive">No merge tags detected</Badge> : null}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex justify-center">
          <div className="h-[480px] w-[240px] overflow-hidden rounded-[2.5rem] border-4 border-slate-800 bg-slate-100 shadow-2xl">
            <div className="border-b border-slate-200 px-4 py-3 text-center text-xs text-slate-500">Burke Messenger</div>
            <div className="h-[428px] overflow-y-auto bg-slate-100 p-4">
              <div className="ml-auto max-w-[75%] clear-both rounded-2xl bg-blue-600 p-3 text-sm text-white">
                {previewMessage.split(/(\[\[[^\]]+\]\])/g).map((part, index) => {
                  if (/^\[\[[^\]]+\]\]$/.test(part)) {
                    return (
                      <span key={`missing-${index}`} className="rounded bg-amber-300 px-1 text-amber-950">
                        {part.slice(2, -2)}
                      </span>
                    )
                  }

                  return <span key={`part-${index}`}>{part}</span>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
