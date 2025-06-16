export enum TaskStatus {
  Unassigned = 'unassigned',
  UrgentImportant = 'urgent-important',
  UrgentNotImportant = 'urgent-not-important',
  NotUrgentImportant = 'not-urgent-important',
  NotUrgentNotImportant = 'not-urgent-not-important',
  Postponed = 'postponed',
}

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

export type SortingStatus = 'UNSORTED' | 'SORTING' | 'SORTED'

interface TaskState {
  tasks: Task[]
  sortingStatus: SortingStatus
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
  resetUnfinishedTasks: () => void
}

export type TaskStore = TaskState & TaskActions
