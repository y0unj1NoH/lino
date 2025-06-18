import { useMemo } from 'react'

import { useTaskStore } from './slice'
import { Task, TaskStatus } from './types'

export const isCompleted = (task: Task) => !!task.completedAt
export const isUnsorted = (task: Task) => task.status === TaskStatus.Unassigned
export const isTodayTask = (task: Task) => task.isToday

/**
 * 현재 상태에서 분류되지 않은 모든 태스크 배열을 반환합니다.
 * (컴포넌트 외부에서 직접 상태 접근용)
 * @returns {Task[]} 분류되지 않은 태스크 목록
 */
export const getUnsortedTasks = (): Task[] =>
  useTaskStore.getState().tasks.filter(isUnsorted)

/**
 * 현재 상태에서 오늘 날짜이고 분류되지 않은 태스크 배열을 반환합니다.
 * (컴포넌트 외부에서 직접 상태 접근용)
 * @returns {Task[]} 오늘 할 일 중 분류되지 않은 태스크 목록
 */
export const getUnsortedTodayTasks = (): Task[] =>
  useTaskStore
    .getState()
    .tasks.filter((task) => isUnsorted(task) && isTodayTask(task))

/**
 * 분류되지 않은 태스크 목록을 구독 및 반환
 * (컴포넌트 내 훅)
 * @returns {Task[]} 분류되지 않은 태스크 목록
 */
export const useUnsortedTasks = (): Task[] => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return tasks.filter(isUnsorted)
  }, [tasks])
}

/**
 * 오늘 날짜이고 분류되지 않은 태스크 목록을 구독 및 반환
 * (컴포넌트 내 훅)
 * @returns {Task[]} 오늘 할 일 중 분류되지 않은 태스크 목록
 */
export const useUnsortedTodayTasks = (): Task[] => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return tasks.filter((task) => isUnsorted(task) && isTodayTask(task))
  }, [tasks])
}

/**
 * 오늘 날짜이며 특정 상태에 해당하는 분류된 태스크 목록을 구독 및 반환
 * @param {TaskStatus} status - 조회할 태스크 상태
 * @returns {Task[]} 오늘 할 일 중 해당 상태에 속하는 태스크 목록
 */
export const useTodaySortedTasks = (status: TaskStatus): Task[] => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return tasks.filter(
      (task) =>
        task.status === status &&
        task.isToday &&
        task.status !== TaskStatus.Unassigned,
    )
  }, [tasks, status])
}
