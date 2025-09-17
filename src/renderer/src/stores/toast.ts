import { create } from 'zustand'

interface IToastStore {
  message: string
  timestamp?: number | null

  toastActions: {
    show: (message: string) => void
  }
}

const useToastStore = create<IToastStore>()((set) => ({
  message: '',
  timestamp: null,

  toastActions: {
    show: (message: string) => set((state) => ({ ...state, message, timestamp: Date.now() }))
  }
}))

export default useToastStore
