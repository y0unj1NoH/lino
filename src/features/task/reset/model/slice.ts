import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface DailyResetStore {
  lastResetDate: string | undefined
  setLastResetDate: (date: string) => void
  hydrated: boolean
  setHydrated: (hydrated: boolean) => void
}

export const useDailyResetStore = create<DailyResetStore>()(
  devtools(
    persist(
      (set) => ({
        lastResetDate: undefined,
        setLastResetDate: (date) =>
          set({ lastResetDate: date }, false, 'setLastResetDate'),
        hydrated: false,
        setHydrated: (hydrated) => set({ hydrated }),
      }),
      {
        name: 'daily-reset-store-persist',
        onRehydrateStorage: (state) => {
          return () => state.setHydrated(true)
        },
      },
    ),
    {
      name: 'daily-reset-store',
    },
  ),
)
