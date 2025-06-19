export enum TaskStatus {
  Unassigned = 'unassigned',
  UrgentImportant = 'urgent-important',
  NotUrgentImportant = 'not-urgent-important',
  UrgentNotImportant = 'urgent-not-important',
  NotUrgentNotImportant = 'not-urgent-not-important',
  Postponed = 'postponed',
}

export type MatrixTaskStatus = Exclude<
  TaskStatus,
  TaskStatus.Unassigned | TaskStatus.Postponed
>

export interface Task {
  // UUID
  id: string
  // 할 일 내용
  content: string
  status: TaskStatus
  // "오늘 바로 해야하는 일" 체크시 true
  isToday: boolean
  // 미루기 횟수 (기본값: 0)
  postponedCount: number
  // 수정 시각 (확장성/동기화 대비)
  updatedAt: Date
  // 완료 시각 (isCompleted 대신 사용)
  completedAt?: Date
}

export type SortingStatus =
  | 'UNSORTED' // 분류 전
  | 'SORTING' // 분류 중
  | 'SORTED' // 분류 후
  | 'ADDITIONAL' // 추가 분류 전
  | 'ADDITIONAL_SORTING' // 추가 분류 중

interface TaskState {
  tasks: Task[]
  sortingStatus: SortingStatus | undefined
  hydrated: boolean
}

interface TaskActions {
  addTask: (content: string, isToday?: boolean) => void
  updateTask: (taskId: string, content: string) => void
  deleteTask: (taskId: string) => void
  deleteAllTask: () => void
  sortTask: (taskId: string, status: TaskStatus) => void
  postponeTask: (taskId: string) => void
  completeTask: (taskId: string) => void
  uncompleteTask: (taskId: string) => void
  setSortingStatus: (status: SortingStatus) => void
  resetTasks: () => void
  setHydrated: (hydrated: boolean) => void
}

export type TaskStore = TaskState & TaskActions
