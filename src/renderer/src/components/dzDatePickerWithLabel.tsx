'use client'

import * as React from 'react'
import { format } from 'date-fns'

import { IconCalendarWeekFilled } from '@tabler/icons-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Label } from './ui/label'

interface DzDatePickerWithLabelProps {
  label: string
  date?: Date
  onChange: (date: Date | undefined) => void
}

export function DzDatePickerWithLabel({ label, date, onChange }: DzDatePickerWithLabelProps) {
  return (
    <div className="flex flex-row items-center">
      <Popover>
        <PopoverTrigger asChild>
          <IconCalendarWeekFilled
            height={40}
            width={40}
            className="cursor-pointer text-gray-700 hover:text-black"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar mode="single" selected={date} onSelect={onChange} initialFocus />
        </PopoverContent>
      </Popover>
      <div className="flex flex-col items-center">
        <Label className="mt-2 text-sm font-medium">{label}</Label>
        <Label className="text-xs text-gray-500">{date ? format(date, 'dd MMM yyyy') : '--'}</Label>
      </div>
    </div>
  )
}
