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

        return {
          tasks: [],
          sortingStatus: 'UNSORTED',

          addTask: (content, isToday = false) =>
            set(
              (state) => ({
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

          resetUnfinishedTasks: () => {
            const now = getCurrentDate()

            set(
              (state) => ({
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
              }),
              false,
              'resetUnfinishedTasks',
            )
          },
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
          }
        },
      },
    ),
    {
      name: 'task-store',
    },
  ),
)
