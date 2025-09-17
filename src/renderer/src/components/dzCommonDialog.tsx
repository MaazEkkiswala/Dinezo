import * as React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

import DzButton from './dzButton'

interface ICustomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  onSubmit: () => void
  onCancel?: () => void
  cancelLabel?: string
  cancelButtonClass?: string
  submitLabel?: string
  submitButtonClass?: string
}

export function DzCustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  cancelLabel = 'Cancel',
  submitLabel = 'Submit',
  cancelButtonClass,
  submitButtonClass
}: ICustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {description && (
          <DialogDescription className="text-sm text-gray-500">{description}</DialogDescription>
        )}

        <div className="py-4">{children}</div>

        <DialogFooter className="flex w-full items-center justify-center gap-3">
          <DialogClose asChild>
            <DzButton
              variant="outline"
              onClick={onCancel}
              label={cancelLabel}
              className={`flex-1 ${cancelButtonClass}`} // each button takes equal space
            />
          </DialogClose>
          <DzButton
            type="submit"
            onClick={onSubmit}
            label={submitLabel}
            className={`flex-1 ${submitButtonClass}`}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
