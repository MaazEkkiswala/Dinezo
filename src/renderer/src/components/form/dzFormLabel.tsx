import { Label } from '../ui/label'

interface IDzFormLabel {
  label?: string | null
  required?: boolean
}

export default function DzFormLabel({ label = null, required = false }: IDzFormLabel) {
  if (!label) {
    return
  }

  return (
    <Label className="font-robot text-xs text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </Label>
  )
}
