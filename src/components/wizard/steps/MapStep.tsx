import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { useCampaignStore, type ColumnMapping, type RawRow, type ValidationError } from '@/store/campaignStore'
import { cn } from '@/utils/cn'

const phoneRegex = /^(\+?61|0)[2-578]\d{8}$|^\+?[1-9]\d{6,14}$/

const mappingOptions = [
  { label: 'Phone Number', value: 'phoneNumber' },
  { label: 'First Name', value: 'firstName' },
  { label: 'Custom Variable', value: 'custom' },
  { label: 'Ignore', value: 'ignore' },
] as const

function guessMapping(header: string): keyof ColumnMapping | 'ignore' {
  const normalized = header.trim().toLowerCase()

  if (/(phone|mobile|number|contact)/.test(normalized)) {
    return 'phoneNumber'
  }

  if (/(first|fname|name)/.test(normalized)) {
    return 'firstName'
  }

  if (/custom|variable|merge/.test(normalized)) {
    return 'custom'
  }

  return 'ignore'
}

function buildInitialMapping(headers: string[]): ColumnMapping {
  const nextMapping: ColumnMapping = {
    phoneNumber: null,
    firstName: null,
    custom: null,
  }

  headers.forEach((header) => {
    const guessed = guessMapping(header)
    if (guessed !== 'ignore' && nextMapping[guessed] === null) {
      nextMapping[guessed] = header
    }
  })

  return nextMapping
}

export default function MapStep() {
  const {
    csvHeaders,
    rawCsvData,
    mappedColumns,
    validationErrors,
    discardedRows,
    setColumnMapping,
    clearValidationErrors,
    addValidationError,
    discardRow,
    restoreRow,
  } = useCampaignStore((state) => ({
    csvHeaders: state.csvHeaders,
    rawCsvData: state.rawCsvData,
    mappedColumns: state.mappedColumns,
    validationErrors: state.validationErrors,
    discardedRows: state.discardedRows,
    setColumnMapping: state.setColumnMapping,
    clearValidationErrors: state.clearValidationErrors,
    addValidationError: state.addValidationError,
    discardRow: state.discardRow,
    restoreRow: state.restoreRow,
  }))

  useEffect(() => {
    if (csvHeaders.length === 0) {
      return
    }

    if (!mappedColumns.phoneNumber && !mappedColumns.firstName && !mappedColumns.custom) {
      setColumnMapping(buildInitialMapping(csvHeaders))
    }
  }, [csvHeaders, mappedColumns, setColumnMapping])

  useEffect(() => {
    clearValidationErrors()

    if (!mappedColumns.phoneNumber) {
      return
    }

    rawCsvData.forEach((row, index) => {
      const rawPhone = row[mappedColumns.phoneNumber ?? ''] ?? ''
      if (!phoneRegex.test(rawPhone.trim())) {
        const error: ValidationError = {
          rowIndex: index,
          rawPhone,
          reason: 'Invalid phone number format',
        }
        addValidationError(error)
      }
    })
  }, [mappedColumns.phoneNumber, rawCsvData, clearValidationErrors, addValidationError])

  const previewRows = useMemo(() => rawCsvData.slice(0, 5), [rawCsvData])

  const errorsByRow = useMemo<Map<number, ValidationError>>(() => {
    return new Map<number, ValidationError>(validationErrors.map((error) => [error.rowIndex, error]))
  }, [validationErrors])

  const rowsReady = rawCsvData.length - validationErrors.length - discardedRows.size

  const selectedValueForHeader = (header: string) => {
    if (mappedColumns.phoneNumber === header) return 'phoneNumber'
    if (mappedColumns.firstName === header) return 'firstName'
    if (mappedColumns.custom === header) return 'custom'
    return 'ignore'
  }

  const updateMapping = (header: string, value: string) => {
    const nextMapping: ColumnMapping = {
      phoneNumber: mappedColumns.phoneNumber === header ? null : mappedColumns.phoneNumber,
      firstName: mappedColumns.firstName === header ? null : mappedColumns.firstName,
      custom: mappedColumns.custom === header ? null : mappedColumns.custom,
    }

    if (value !== 'ignore') {
      nextMapping[value as keyof ColumnMapping] = header
    }

    setColumnMapping(nextMapping)
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Map your columns</h2>
        <p className="mt-2 text-sm text-slate-500">Assign each uploaded field to the message campaign data model.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {csvHeaders.map((header: string) => (
            <div key={header} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800">{header}</p>
              <Select value={selectedValueForHeader(header)} onValueChange={(value: string) => updateMapping(header, value)}>
                <SelectTrigger className="hover:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-200">
                  <SelectValue placeholder="Choose mapping" />
                </SelectTrigger>
                <SelectContent>
                  {mappingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-blue-50 p-4 text-sm text-slate-700">
        <span className="font-semibold text-blue-700">{Math.max(rowsReady, 0)} rows ready</span>
        <span className="mx-2 text-slate-400">·</span>
        <span>{validationErrors.length} rows with errors</span>
        <span className="mx-2 text-slate-400">·</span>
        <span>{discardedRows.size} discarded</span>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {csvHeaders.map((header: string) => (
                <th key={header} className="px-4 py-3 text-left font-medium text-slate-500">
                  {header}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-medium text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {previewRows.map((row: RawRow, index: number) => {
              const error = errorsByRow.get(index)
              const isDiscarded = discardedRows.has(index)

              return (
                <tr
                  key={`map-row-${index}`}
                  className={cn({
                    'bg-red-50': Boolean(error) && !isDiscarded,
                    'line-through opacity-40': isDiscarded,
                  })}
                >
                  {csvHeaders.map((header: string) => (
                    <td key={`${header}-${index}`} className="px-4 py-3 text-slate-800">
                      {row[header] || '—'}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    {isDiscarded ? (
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                        onClick={() => restoreRow(index)}
                      >
                        Restore
                      </button>
                    ) : error ? (
                      <div className="space-y-2">
                        <p className="text-xs text-red-600">{error.reason}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="border border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-200"
                          onClick={() => discardRow(index)}
                        >
                          Discard Row
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-green-600">Valid</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
