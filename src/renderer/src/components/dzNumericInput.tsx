import { isEmpty, toString } from 'lodash'
import { InputHTMLAttributes, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import SsFormErrorMessage from './form/ssFormErrorMessage'

interface IDzNumericInput extends InputHTMLAttributes<HTMLInputElement> {
  numericValue: number

  label?: string | null
  placeholder?: string
  errorMessage?: string | null

  onValueChange: (val: number | undefined) => void
}

export default function DzNumericInput({
  onValueChange,
  numericValue,
  label = null,
  placeholder = '',
  errorMessage = null,
  ...props
}: IDzNumericInput) {
  const [inputValue, setInputValue] = useState<string>(toString(numericValue))

  const _onChange = (_value: string) => {
    if (isEmpty(_value)) {
      setInputValue(_value)
      return onValueChange(undefined)
    }

    if (new RegExp(/^\d+$/).test(_value)) {
      setInputValue(_value)
      onValueChange(Number(_value))
    }
  }

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label ? <Label className="font-robot text-xs text-gray-700">{label}</Label> : null}
      <Input
        onChange={(e) => _onChange(e.target.value)}
        value={inputValue}
        placeholder={placeholder}
        {...props}
      />

      <SsFormErrorMessage message={errorMessage} />
    </div>
  )
}
