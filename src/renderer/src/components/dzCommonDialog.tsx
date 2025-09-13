import * as React from 'react'

import { X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Button } from './ui/button'

interface CommonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  onSubmit: () => void
  onCancel?: () => void
  cancelLabel?: string
  submitLabel?: string
}

export function CommonDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  cancelLabel = 'Cancel',
  submitLabel = 'Submit'
}: CommonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <button className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {description && (
          <DialogDescription className="text-sm text-gray-500">{description}</DialogDescription>
        )}

        <div className="py-4">{children}</div>

        <DialogFooter className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button type="submit" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
