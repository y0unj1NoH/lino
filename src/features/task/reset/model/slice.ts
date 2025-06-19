import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface DailyResetStore {
  lastResetDate: string | undefined
  setLastResetDate: (date: string) => void
}

export const useDailyResetStore = create<DailyResetStore>()(
  devtools(
    persist(
      (set) => ({
        lastResetDate: undefined,
        setLastResetDate: (date) => set({ lastResetDate: date }),
      }),
      {
        name: 'daily-reset-store-persist',
      },
    ),
    {
      name: 'daily-reset-store',
    },
  ),
)
