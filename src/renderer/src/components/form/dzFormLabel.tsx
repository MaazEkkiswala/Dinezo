import AppUtils from '@renderer/helpers/appUtils'
import { Label } from '../ui/label'

interface IDzFormLabel {
  label?: string | null
  required?: boolean
  className?: string
}

export default function DzFormLabel({
  label = null,
  required = false,
  className = ''
}: IDzFormLabel) {
  if (!label) {
    return
  }

  return (
    <Label className={AppUtils.classNames('font-robot text-xs text-secondary-700', className)}>
      {label}
      {required && <span className="text-error-500 ml-0.5">*</span>}
    </Label>
  )
}
