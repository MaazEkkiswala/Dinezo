import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import DzFormLabel from './dzFormLabel'

interface IDzFormTextArea {
  control: any
  label?: string | null
  placeholder?: string
  name: string
}

export default function DzFormTextArea({ control, name, placeholder, label }: IDzFormTextArea) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <DzFormLabel label={label} />
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder={placeholder} className="resize-none" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  )
}
