import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { ComponentProps, useState } from 'react'

import { FormField, FormItem, FormMessage } from '../ui/form'

import { cn } from '@renderer/lib/utils'
import DzFormLabel from './dzFormLabel'
import AppUtils from '@renderer/helpers/appUtils'

interface IDzInputPasswordField extends ComponentProps<'input'> {
  control: any
  name: string

  inputClassNames: string
  label?: string | null
  placeholder?: string
}

export default function DzInputPasswordField({
  control,
  name,
  label = null,
  placeholder = '',
  inputClassNames = '',
  ...props
}: IDzInputPasswordField) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <DzFormLabel label={label} />
          <div
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
            )}
          >
            <input
              value={field.value}
              onChange={field.onChange}
              className={AppUtils.classNames(
                'outline-none grow placeholder:text-muted-foreground font-sans',
                inputClassNames
              )}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              {...props}
            />

            <div onClick={toggleShowPassword}>
              {showPassword ? (
                <IconEye className="text-gray-400 cursor-pointer" />
              ) : (
                <IconEyeClosed className="text-gray-400 cursor-pointer" />
              )}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
