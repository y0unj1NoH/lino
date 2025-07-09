import { useMemo } from 'react'

import { useTaskStore } from './slice'
import { Task, TaskList, TaskStatus } from './types'

export const isCompleted = ([_, task]: [string, Task]) => !!task.completedAt
export const isUnsorted = ([_, task]: [string, Task]) =>
  task.status === TaskStatus.Unassigned
export const isPostponed = ([_, task]: [string, Task]) =>
  task.status === TaskStatus.Postponed
export const isTodayTask = ([_, task]: [string, Task]) => task.isToday

/**
 * 현재 상태에서 분류되지 않은 모든 태스크 배열을 반환합니다.
 * (컴포넌트 외부에서 직접 상태 접근용)
 * @returns {TaskList} 분류되지 않은 태스크 목록
 */
export const getUnsortedTasks = (): TaskList => {
  const tasks = useTaskStore.getState().tasks
  return Object.entries(tasks).filter(isUnsorted)
}

/**
 * 현재 상태에서 오늘 날짜이고 분류되지 않은 태스크 배열을 반환합니다.
 * (컴포넌트 외부에서 직접 상태 접근용)
 * @returns {TaskList} 오늘 할 일 중 분류되지 않은 태스크 목록
 */
export const getUnsortedTodayTasks = (): TaskList => {
  const tasks = useTaskStore.getState().tasks
  return Object.entries(tasks).filter(
    (task) => isUnsorted(task) && isTodayTask(task),
  )
}

/**
 * 분류되지 않은 태스크 목록을 구독 및 반환
 * (컴포넌트 내 훅)
 * @returns {TaskList} 분류되지 않은 태스크 목록
 */
export const useUnsortedTasks = (): TaskList => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return Object.entries(tasks).filter(isUnsorted)
  }, [tasks])
}

/**
 * 분류되지 않은 태스크 목록을 구독 및 반환
 * (unsorted 페이지에서 사용)
 * @returns {TaskList} 분류되지 않은 태스크 목록
 */
export const useUnsortedOrPostponeTasks = (): TaskList => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return Object.entries(tasks).filter(
      (task) => isUnsorted(task) || isPostponed(task),
    )
  }, [tasks])
}

/**
 * 오늘 날짜이고 분류되지 않은 태스크 목록을 구독 및 반환
 * (컴포넌트 내 훅)
 * @returns {TaskList} 오늘 할 일 중 분류되지 않은 태스크 목록
 */
export const useUnsortedTodayTasks = (): TaskList => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return Object.entries(tasks).filter(
      (task) => isUnsorted(task) && isTodayTask(task),
    )
  }, [tasks])
}

/**
 * 오늘 날짜이며 특정 상태에 해당하는 분류된 태스크 목록을 구독 및 반환
 * @param {TaskStatus} status - 조회할 태스크 상태
 * @returns {TaskList} 오늘 할 일 중 해당 상태에 속하는 태스크 목록
 */
export const useTodaySortedTasks = (status: TaskStatus): TaskList => {
  const tasks = useTaskStore((state) => state.tasks)

  return useMemo(() => {
    return Object.entries(tasks).filter(
      ([_, task]) => task.status === status && task.isToday,
    )
  }, [tasks, status])
}
