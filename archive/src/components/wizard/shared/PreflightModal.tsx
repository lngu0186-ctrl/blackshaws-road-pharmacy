import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/Dialog'

type PreflightModalProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  recipientCount: number
  segmentCount: number
}

export function PreflightModal({
  open,
  onConfirm,
  onCancel,
  recipientCount,
  segmentCount,
}: PreflightModalProps) {
  const [confirmed, setConfirmed] = useState(false)
  const totalMessages = recipientCount * segmentCount

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setConfirmed(false)
          onCancel()
        }
      }}
    >
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ready to send?</DialogTitle>
          <DialogDescription>
            {recipientCount} recipients × {segmentCount} segment(s) = {totalMessages} total SMS messages.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-medium">⚠️ Once sending begins it cannot be undone.</p>
        </div>

        <label className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
          />
          <span>
            I confirm I have permission to message these recipients and accept responsibility for any carrier costs.
          </span>
        </label>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="border-slate-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-200"
            onClick={() => {
              setConfirmed(false)
              onCancel()
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!confirmed}
            className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              onConfirm()
              setConfirmed(false)
            }}
          >
            Send {recipientCount} Messages
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
