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
        ) => {
          const now = getCurrentDate()
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id
                ? { ...task, ...updater(task, now), updatedAt: now }
                : task,
            ),
          }))
        }

        return {
          tasks: [],
          sortingStatus: 'UNSORTED',

          addTask: (content, isToday = false) =>
            set((state) => ({
              tasks: [
                {
                  id: nanoid(),
                  content,
                  status: TaskStatus.Unassigned,
                  isToday,
                  postponedCount: 0,
                  updatedAt: getCurrentDate(),
                },
                ...state.tasks,
              ],
            })),

          updateTask: (id, content) => updateTaskById(id, () => ({ content })),

          deleteTask: (id) =>
            set((state) => ({
              tasks: state.tasks.filter((task) => task.id !== id),
            })),

          sortTask: (id, status) =>
            updateTaskById(id, () => ({ status, isToday: true })),

          postponeTask: (id) =>
            updateTaskById(id, (task) => ({
              postponedCount: task.postponedCount + 1,
            })),

          completeTask: (id) =>
            updateTaskById(id, (_, now) => ({
              completedAt: now,
            })),

          uncompleteTask: (id) =>
            updateTaskById(id, () => ({
              completedAt: undefined,
            })),

          setSortingStatus: (status: SortingStatus) =>
            set({
              sortingStatus: status,
            }),

          resetUnfinishedTasks: () => {
            const now = getCurrentDate()

            set((state) => ({
              sortingStatus: 'UNSORTED',
              tasks: state.tasks.map((task) => {
                if (
                  !task.completedAt &&
                  task.status !== TaskStatus.Unassigned
                ) {
                  return {
                    ...task,
                    status: TaskStatus.Unassigned,
                    isToday: false,
                    updatedAt: now,
                  }
                }
                return task
              }),
            }))
          },
        }
      },
      {
        name: 'task-store',
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.tasks = state.tasks.map((task) => ({
              ...task,
              updatedAt: toUTCDate(task.updatedAt),
              completedAt: task.completedAt && toUTCDate(task.completedAt),
            }))
          }
        },
      },
    ),
  ),
)
