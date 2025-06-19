import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { getCurrentDate, toUTCDate } from '@/shared/lib/date'

import { SortingStatus, Task, TaskStatus, TaskStore } from './types'

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => {
        // 공통 업데이트 헬퍼 함수
        const updateTaskById = (
          id: string,
          updater: (task: Task, now: Date) => Partial<Task>,
          actionName: string,
        ) => {
          const now = getCurrentDate()
          set(
            (state) => ({
              tasks: state.tasks.map((task) =>
                task.id === id
                  ? { ...task, ...updater(task, now), updatedAt: now }
                  : task,
              ),
            }),
            false,
            actionName,
          )
        }

        // resetTasks 헬퍼 함수
        const resetTask = (task: Task, now: Date) => {
          // 1. 오늘 미완료 태스크  → 미분류+isToday 해제+postponedCount 증가
          if (
            (!task.completedAt && task.status !== TaskStatus.Unassigned) ||
            (task.status === TaskStatus.Unassigned && task.isToday)
          ) {
            return {
              ...task,
              status: TaskStatus.Unassigned,
              isToday: false,
              postponedCount: task.postponedCount + 1,
              updatedAt: now,
            }
          }
          // 2. 분류 때 미룬 태스크 → 미분류+isToday 해제
          if (task.status === TaskStatus.Postponed) {
            return {
              ...task,
              status: TaskStatus.Unassigned,
              isToday: false,
              updatedAt: now,
            }
          }
          // 3. 오늘 완료된 태스크 → isToday 해제
          if (task.completedAt && task.isToday) {
            return {
              ...task,
              isToday: false,
              updatedAt: now,
            }
          }
          // 4. 그 외는 변경 없음
          return task
        }

        return {
          tasks: [],
          sortingStatus: undefined,

          addTask: (content, isToday = false) =>
            set(
              (state) => ({
                tasks: [
                  ...state.tasks,
                  {
                    id: nanoid(),
                    content,
                    status: TaskStatus.Unassigned,
                    isToday,
                    postponedCount: 0,
                    updatedAt: getCurrentDate(),
                  },
                ],
              }),
              false,
              'addTask',
            ),

          updateTask: (id, content) =>
            updateTaskById(id, () => ({ content }), 'updateTask'),

          deleteTask: (id) =>
            set(
              (state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
              }),
              false,
              'deleteTask',
            ),

          deleteAllTask: () =>
            set(
              (state) => ({
                tasks: state.tasks.filter(
                  (task) => task.status !== TaskStatus.Unassigned,
                ),
              }),
              false,
              'deleteAllTask',
            ),

          sortTask: (id, status) =>
            updateTaskById(id, () => ({ status, isToday: true }), 'sortTask'),

          postponeTask: (id) =>
            updateTaskById(
              id,
              (task) => ({
                status: TaskStatus.Postponed,
                postponedCount: task.postponedCount + 1,
              }),
              'postponeTask',
            ),

          completeTask: (id) =>
            updateTaskById(
              id,
              (_, now) => ({
                completedAt: now,
              }),
              'completeTask',
            ),

          uncompleteTask: (id) =>
            updateTaskById(
              id,
              () => ({
                completedAt: undefined,
              }),
              'uncompleteTask',
            ),

          setSortingStatus: (status: SortingStatus) =>
            set(
              {
                sortingStatus: status,
              },
              false,
              'setSortingStatus',
            ),

          resetTasks: () => {
            const now = getCurrentDate()
            set(
              (state) => ({
                sortingStatus: 'UNSORTED',
                tasks: state.tasks.map((task) => resetTask(task, now)),
              }),
              false,
              'resetTasks',
            )
          },
          hydrated: false,
          setHydrated: (hydrated) => set({ hydrated }),
        }
      },
      {
        name: 'task-store-persist',
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.tasks = state.tasks.map((task) => ({
              ...task,
              updatedAt: toUTCDate(task.updatedAt),
              completedAt: task.completedAt && toUTCDate(task.completedAt),
            }))

            state.setHydrated(true)
          }
        },
      },
    ),
    {
      name: 'task-store',
    },
  ),
)
