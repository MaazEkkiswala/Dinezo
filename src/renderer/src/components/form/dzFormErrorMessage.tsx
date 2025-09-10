import { Label } from '../ui/label'

interface IDzFormErrorMessage {
  message?: string | null | undefined
}

export default function DzFormErrorMessage({ message = null }: IDzFormErrorMessage) {
  if (!message) {
    return
  }

  return <Label className="text-xs text-error-500">{message}</Label>
}
