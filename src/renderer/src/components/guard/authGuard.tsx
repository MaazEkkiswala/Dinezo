import useAuthStore from '@renderer/stores/auth'
import { isNil } from 'lodash'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface IAuthGuard {
  children: any
}

export default function AuthGuard({ children }: IAuthGuard) {
  const navigate = useNavigate()

  // const { isLogin } = useAuthStore()

  // useEffect(() => {
  //   if (isNil(isLogin) && !isLogin) {
  //     navigate('/login', { replace: true })
  //   }
  // }, [isLogin])

  return children
}
