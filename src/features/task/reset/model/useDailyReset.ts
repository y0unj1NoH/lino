import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { useDailyResetStore } from '@/features/task/reset/model/slice'
import { RESET_TOAST } from '@/shared/consts/toast-config'
import { getTodayBy4am, isResetToday } from '@/shared/lib/date'
import { showToast } from '@/shared/lib/toast'

/**
 * 새로고침이나 페이지 이동 시(경로 변경 시) 일일 리셋이 필요한 경우 자동으로 리셋을 수행하는 커스텀 훅
 * - 오전 4시 기준으로 오늘이 바뀌었으면 할 일 목록을 리셋
 */
export function useDailyReset() {
  const pathname = usePathname()
  const lastResetDate = useDailyResetStore((state) => state.lastResetDate)
  const setLastResetDate = useDailyResetStore((state) => state.setLastResetDate)
  const resetTasks = useTaskStore((state) => state.resetTasks)
  useEffect(() => {
    if (isResetToday(lastResetDate)) {
      return
    }

    showToast(RESET_TOAST.success)
    resetTasks()
    setLastResetDate(getTodayBy4am())
  }, [pathname])
}
