'use client'

import { useTodaySortedTasks } from '@/entities/task/model/selector'
import { TaskStatus } from '@/entities/task/model/types'
import { SortingBoard } from '@/widgets/sorting-board/ui/sorting-board'

export default function AdditionalPage() {
  const todayUnassignedTasks = useTodaySortedTasks(TaskStatus.Unassigned)
  return <SortingBoard tasks={todayUnassignedTasks} />
}
