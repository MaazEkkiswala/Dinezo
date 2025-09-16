import { ComponentProps } from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import DzFormLabel from './dzFormLabel'

interface IDzFormInput extends ComponentProps<'input'> {
  name: string
  control: any
  required?: boolean
  label?: string | null
  placeholder?: string
  labelClassName?: string
  className?: string
}

export default function DzFormInput({
  control,
  name,
  label = null,
  placeholder = '',
  required = false,
  labelClassName,
  className
}: IDzFormInput) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <DzFormLabel label={label} required={required} className={labelClassName} />
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="w-full">
              <Input
                placeholder={placeholder}
                {...field}
                required={required}
                className={className}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  )
}
