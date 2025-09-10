'use client'

import { IconCalendar } from '@tabler/icons-react'
import { format } from 'date-fns'

import SsFormLabel from './dzFormLabel'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@renderer/lib/utils'
import { Calendar } from '../ui/calendar'

interface ISsFormDateInput {
  control: any
  name: string

  label?: string | null
  placeholder?: string
}

export function SsFormDateInput({
  control,
  name,
  label = null,
  placeholder = ''
}: ISsFormDateInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <SsFormLabel label={label} />
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? format(field.value, 'dd-MM-yyyy') : <span>{placeholder}</span>}
                  <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
