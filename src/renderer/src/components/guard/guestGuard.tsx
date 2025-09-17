import useAuthStore from '@renderer/stores/auth'
import { isNil } from 'lodash'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface IAuthGuard {
  children: any
}

export default function GuestGuard({ children }: IAuthGuard) {
  const navigate = useNavigate()

  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (!isNil(isLogin) && isLogin) {
      navigate('/', { replace: true })
    }
  }, [isLogin])

  if (isNil(isLogin)) {
    return (
      <div className="flex grow justify-center items-center h-screen">
        <Loader2 size={32} className="text-primary-500 animate-spin" />
      </div>
    )
  }

  return children
}
