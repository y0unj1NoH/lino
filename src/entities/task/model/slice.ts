import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { getCurrentDate, toUTCDate } from '@/shared/lib/date'

import { Task, TaskStatus, TaskStore } from './types'

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
            (state) => {
              const task = state.tasks[id]
              if (!task) {
                return state
              }

              return {
                tasks: {
                  ...state.tasks,
                  [id]: {
                    ...task,
                    ...updater(task, now),
                    updatedAt: now,
                  },
                },
              }
            },
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
          tasks: {},
          sortingStatus: undefined,

          addTask: (content, isToday = false) =>
            set(
              (state) => ({
                tasks: {
                  ...state.tasks,
                  [nanoid()]: {
                    content,
                    status: TaskStatus.Unassigned,
                    isToday,
                    postponedCount: 0,
                    updatedAt: getCurrentDate(),
                  },
                },
              }),
              false,
              'addTask',
            ),

          updateTask: (id, content) =>
            updateTaskById(id, () => ({ content }), 'updateTask'),

          deleteTask: (id) =>
            set(
              (state) => {
                const { [id]: _, ...rest } = state.tasks
                return { tasks: rest }
              },
              false,
              'deleteTask',
            ),

          deleteAllTask: () =>
            set(
              (state) => {
                const rest = Object.fromEntries(
                  Object.entries(state.tasks).filter(
                    ([_, task]) => task.status !== TaskStatus.Unassigned,
                  ),
                )
                return { tasks: rest }
              },
              false,
              'deleteAllTask',
            ),

          sortTask: (id, status) =>
            updateTaskById(id, () => ({ status, isToday: true }), 'sortTask'),

          undoTask: (id) =>
            set(
              (state) => {
                const sortingStatus = state.sortingStatus
                const task = state.tasks[id]
                if (!task) {
                  return state
                }

                return {
                  tasks: {
                    ...state.tasks,
                    [id]: {
                      ...task,
                      status: TaskStatus.Unassigned,
                      isToday: sortingStatus === 'ADDITIONAL_SORTING',
                      postponedCount:
                        task.status === TaskStatus.Postponed
                          ? task.postponedCount - 1
                          : task.postponedCount,
                      updatedAt: getCurrentDate(),
                    },
                  },
                }
              },
              false,
              'undoTask',
            ),

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

          setSortingStatus: (status) =>
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
              (state) => {
                const newTasks = Object.fromEntries(
                  Object.entries(state.tasks).map(([id, task]) => [
                    id,
                    resetTask(task, now),
                  ]),
                )
                return { tasks: newTasks }
              },
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
            const newTasks = Object.fromEntries(
              Object.entries(state.tasks).map(([id, task]) => [
                id,
                {
                  ...task,
                  updatedAt: toUTCDate(task.updatedAt),
                  completedAt: task.completedAt
                    ? toUTCDate(task.completedAt)
                    : undefined,
                },
              ]),
            )

            state.tasks = newTasks
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
