import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { toast } from 'sonner'

import useToastStore from '@renderer/stores/toast'
import { Toaster } from './ui/sonner'

export default function DzToaster() {
  const { message, timestamp } = useToastStore()

  useEffect(() => {
    if (!isEmpty(message)) {
      toast(message)
    }
  }, [message, timestamp])

  return <Toaster />
}
