import { IUser } from '@renderer/appInterfaces/iAuth'
import { create } from 'zustand'

interface IAuthStore {
  user: IUser | null
  isLogin: boolean | null
  sessionToken: string | null
  isInitData: boolean

  authActions: {
    setInitData: ({ user }: { user: IUser }) => void
    setIsLogin: (isLogin: boolean) => void
    setSessionToken: (sessionToken: string) => void
  }
}

const useAuthStore = create<IAuthStore>()((set) => ({
  user: null,
  isInitData: false,
  isLogin: null,
  sessionToken: null,

  authActions: {
    setInitData: ({ user }) => set((state) => ({ ...state, user, isInitData: true })),
    setIsLogin: (isLogin) => set((state) => ({ ...state, isLogin })),
    setSessionToken: (sessionToken) => set((state) => ({ ...state, sessionToken }))
  }
}))

export default useAuthStore
