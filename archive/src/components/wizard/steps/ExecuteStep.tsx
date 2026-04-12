import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, Pause, Play, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { PreflightModal } from '@/components/wizard/shared/PreflightModal'
import { useCampaignStore } from '@/store/campaignStore'

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const lastFour = digits.slice(-4)
  return `**** **** ${lastFour || '0000'}`
}

function downloadCsv(rows: Array<Record<string, string>>) {
  const headers = ['timestamp', 'phone_masked', 'status', 'error_detail']
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] ?? '')).join(',')),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'burke-messenger-results.csv'
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function ExecuteStep() {
  const {
    rawCsvData,
    mappedColumns,
    discardedRows,
    messageTemplate,
    executionStatus,
    sendProgress,
    sendResults,
    setExecutionStatus,
    appendSendResult,
    setSendProgress,
    resetCampaign,
    setStep,
  } = useCampaignStore((state) => ({
    rawCsvData: state.rawCsvData,
    mappedColumns: state.mappedColumns,
    discardedRows: state.discardedRows,
    messageTemplate: state.messageTemplate,
    executionStatus: state.executionStatus,
    sendProgress: state.sendProgress,
    sendResults: state.sendResults,
    setExecutionStatus: state.setExecutionStatus,
    appendSendResult: state.appendSendResult,
    setSendProgress: state.setSendProgress,
    resetCampaign: state.resetCampaign,
    setStep: state.setStep,
  }))

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedAt, setCompletedAt] = useState<string | null>(null)
  const logRef = useRef<HTMLDivElement | null>(null)

  const activeRows = useMemo(() => {
    return rawCsvData
      .map((row, index) => ({ row, index }))
      .filter(({ index }) => !discardedRows.has(index))
  }, [discardedRows, rawCsvData])

  const recipientCount = activeRows.length
  const segmentCount = Math.max(1, Math.ceil(Math.max(messageTemplate.length, 1) / 160))
  const sentCount = sendResults.filter((result) => result.status === 'success').length
  const failedCount = sendResults.filter((result) => result.status === 'failed').length

  useEffect(() => {
    if (executionStatus !== 'sending') {
      return
    }

    let isCancelled = false

    const run = async () => {
      for (let index = currentIndex; index < activeRows.length; index += 1) {
        if (isCancelled) {
          return
        }

        if (useCampaignStore.getState().executionStatus === 'paused') {
          return
        }

        await delay(80)

        const { row, index: rowIndex } = activeRows[index]
        const phoneField = mappedColumns.phoneNumber
        const phone = phoneField ? row[phoneField] ?? '' : ''
        const isSuccess = Math.random() < 0.9

        appendSendResult({
          rowIndex,
          phone,
          status: isSuccess ? 'success' : 'failed',
          timestamp: new Date().toISOString(),
          errorDetail: isSuccess ? null : 'Carrier rejected message',
        })

        const progress = Math.round(((index + 1) / activeRows.length) * 100)
        setSendProgress(progress)
        setCurrentIndex(index + 1)
      }

      setExecutionStatus('completed')
      setCompletedAt(new Date().toLocaleString('en-AU'))
    }

    void run()

    return () => {
      isCancelled = true
    }
  }, [activeRows, appendSendResult, currentIndex, executionStatus, mappedColumns.phoneNumber, setExecutionStatus, setSendProgress])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [sendResults])

  if (executionStatus === 'idle') {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Campaign summary</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Recipients</p>
              <p className="mt-1 text-2xl font-semibold text-slate-800">{recipientCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Segments</p>
              <p className="mt-1 text-2xl font-semibold text-slate-800">{segmentCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Mapped fields</p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                Phone: {mappedColumns.phoneNumber ?? 'Not mapped'}
                <br />
                First Name: {mappedColumns.firstName ?? 'Not mapped'}
                <br />
                Custom: {mappedColumns.custom ?? 'Not mapped'}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            className="mt-6 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200"
            onClick={() => setIsModalOpen(true)}
          >
            <Rocket className="mr-2 h-4 w-4" aria-hidden="true" />
            Launch Campaign
          </Button>
        </div>

        <PreflightModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false)
            setExecutionStatus('sending')
            setSendProgress(0)
            setCurrentIndex(0)
            setCompletedAt(null)
          }}
          recipientCount={recipientCount}
          segmentCount={segmentCount}
        />
      </section>
    )
  }

  if (executionStatus === 'completed') {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Campaign complete</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-slate-500">Sent</p>
              <p className="mt-1 text-2xl font-semibold text-green-600">{sentCount}</p>
            </div>
            <div className="rounded-2xl bg-red-50 p-4">
              <p className="text-sm text-slate-500">Failed</p>
              <p className="mt-1 text-2xl font-semibold text-red-500">{failedCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Completed</p>
              <p className="mt-1 text-sm font-medium text-slate-800">{completedAt ?? 'Just now'}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="border-slate-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-200"
              onClick={() => {
                downloadCsv(
                  sendResults.map((result) => ({
                    timestamp: result.timestamp,
                    phone_masked: maskPhone(result.phone),
                    status: result.status,
                    error_detail: result.errorDetail ?? '',
                  })),
                )
              }}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Export Results CSV
            </Button>
            <Button
              type="button"
              variant="primary"
              className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200"
              onClick={() => {
                resetCampaign()
                setStep(1)
              }}
            >
              Start New Campaign
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Sending campaign</h2>
            <p className="mt-2 text-sm text-slate-500">Messages are being processed in sequence.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-slate-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-200"
            onClick={() => setExecutionStatus(executionStatus === 'paused' ? 'sending' : 'paused')}
          >
            {executionStatus === 'paused' ? (
              <>
                <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                Resume
              </>
            ) : (
              <>
                <Pause className="mr-2 h-4 w-4" aria-hidden="true" />
                Pause
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <Progress value={sendProgress} />
          <p className="text-sm text-slate-500">{sendProgress}% complete</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Live log</h3>
          <Badge variant={executionStatus === 'paused' ? 'warning' : 'default'}>
            {executionStatus === 'paused' ? 'Paused' : 'Sending'}
          </Badge>
        </div>

        <div
          ref={logRef}
          className="max-h-64 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4"
          aria-live="polite"
        >
          {sendResults.map((result, index) => (
            <div key={`${result.timestamp}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-slate-500">{new Date(result.timestamp).toLocaleTimeString('en-AU')}</p>
                <p className="font-medium text-slate-800">{maskPhone(result.phone)}</p>
                <Badge variant={result.status === 'success' ? 'success' : 'destructive'}>
                  {result.status === 'success' ? 'Sent' : 'Failed'}
                </Badge>
              </div>
              {result.errorDetail ? <p className="mt-2 text-xs text-red-500">{result.errorDetail}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
