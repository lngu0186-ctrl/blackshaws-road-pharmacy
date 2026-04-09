import { useMemo, useState } from 'react'
import type { DragEvent } from 'react'
import Papa from 'papaparse'
import type { ParseResult } from 'papaparse'
import * as XLSX from 'xlsx'
import { FileSpreadsheet, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/toast'
import { useCampaignStore, type RawRow } from '@/store/campaignStore'
import { cn } from '@/utils/cn'

type ParsedSpreadsheet = {
  rows: RawRow[]
  headers: string[]
}

function isCsvFile(file: File) {
  return file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv'
}

function isXlsxFile(file: File) {
  return file.name.toLowerCase().endsWith('.xlsx')
}

function normalizeCell(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return ''
}

function rowsFromMatrix(matrix: unknown[][]): ParsedSpreadsheet {
  const [headerRow = [], ...dataRows] = matrix
  const headers = headerRow.map((cell, index) => {
    const value = normalizeCell(cell).trim()
    return value || `Column ${index + 1}`
  })

  const rows = dataRows
    .filter((row) => row.some((cell) => normalizeCell(cell).trim() !== ''))
    .map((row) => {
      return headers.reduce<RawRow>((accumulator, header, index) => {
        accumulator[header] = normalizeCell(row[index]).trim()
        return accumulator
      }, {})
    })

  return { rows, headers }
}

async function parseFile(file: File): Promise<ParsedSpreadsheet> {
  if (isCsvFile(file)) {
    return new Promise((resolve, reject) => {
      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: ParseResult<Record<string, string>>) => {
          const headers = result.meta.fields ?? []
          const rows = result.data.map((row: Record<string, string>) => {
            return Object.entries(row).reduce<RawRow>((accumulator, [key, value]) => {
              accumulator[key] = typeof value === 'string' ? value : ''
              return accumulator
            }, {})
          })
          resolve({ rows, headers })
        },
        error: (error: Error) => reject(error),
      })
    })
  }

  if (isXlsxFile(file)) {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]

    if (!firstSheetName) {
      throw new Error('No worksheet found in spreadsheet')
    }

    const worksheet = workbook.Sheets[firstSheetName]
    const matrix = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
      header: 1,
      defval: '',
    })

    return rowsFromMatrix(matrix)
  }

  throw new Error('Unsupported file type')
}

export default function ImportStep() {
  const { rawCsvData, csvHeaders, setCsvData, clearValidationErrors, resetCampaign } = useCampaignStore((state) => ({
    rawCsvData: state.rawCsvData,
    csvHeaders: state.csvHeaders,
    setCsvData: state.setCsvData,
    clearValidationErrors: state.clearValidationErrors,
    resetCampaign: state.resetCampaign,
  }))
  const { showToast } = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState('')

  const previewRows = useMemo(() => rawCsvData.slice(0, 3), [rawCsvData])
  const hasData = rawCsvData.length > 0

  const handleDragState = (event: DragEvent<HTMLDivElement>, dragging: boolean) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(dragging)
  }

  const handleFile = async (file: File) => {
    if (!isCsvFile(file) && !isXlsxFile(file)) {
      showToast('Please upload a CSV or XLSX file only.', 'error')
      return
    }

    try {
      const { rows, headers } = await parseFile(file)
      setCsvData(rows, headers)
      clearValidationErrors()
      setFileName(file.name)
      showToast(`Imported ${rows.length} rows successfully.`, 'success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to parse file'
      showToast(message, 'error')
    } finally {
      setIsDragging(false)
    }
  }

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    handleDragState(event, false)
    const file = event.dataTransfer.files[0]
    if (file) {
      await handleFile(file)
    }
  }

  return (
    <section className="space-y-6">
      <div
        className={cn(
          'rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 ease-in-out',
          {
            'border-slate-200 bg-slate-100': !isDragging && !hasData,
            'scale-[1.01] border-blue-600 bg-blue-100': isDragging,
            'border-green-600 bg-green-50': hasData,
          },
        )}
        onDragEnter={(event) => handleDragState(event, true)}
        onDragOver={(event) => handleDragState(event, true)}
        onDragLeave={(event) => handleDragState(event, false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept=".csv,.xlsx"
          className="sr-only"
          id="campaign-file-upload"
          onChange={async (event) => {
            const file = event.target.files?.[0]
            if (file) {
              await handleFile(file)
            }
          }}
        />

        <label htmlFor="campaign-file-upload" className="flex cursor-pointer flex-col items-center gap-4">
          {hasData ? (
            <FileSpreadsheet className="h-12 w-12 text-green-600" aria-hidden="true" />
          ) : (
            <Upload className="h-12 w-12 text-slate-500" aria-hidden="true" />
          )}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-800">Import recipient file</h2>
            <p className="text-sm text-slate-500">
              Drag and drop your CSV or XLSX file here, or click to choose a file.
            </p>
            {hasData ? (
              <p className="text-sm font-medium text-green-700">
                {fileName} loaded, {rawCsvData.length} rows ready.
              </p>
            ) : null}
          </div>
        </label>
      </div>

      {hasData ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Preview</h3>
              <p className="text-sm text-slate-500">Showing the first 3 rows from your uploaded file.</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-200"
              onClick={() => {
                resetCampaign()
                setFileName('')
              }}
            >
              <X className="mr-2 h-4 w-4" aria-hidden="true" />
              Remove file
            </Button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {csvHeaders.map((header) => (
                    <th key={header} className="px-4 py-3 text-left font-medium text-slate-500">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {previewRows.map((row, index) => (
                  <tr key={`preview-row-${index}`}>
                    {csvHeaders.map((header) => (
                      <td key={`${header}-${index}`} className="px-4 py-3 text-slate-800">
                        {row[header] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  )
}
