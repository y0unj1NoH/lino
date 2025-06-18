'use client'

import { useUnsortedTodayTasks } from '@/entities/task/model/selector'
import { SortingBoard } from '@/widgets/sorting-board/ui/sorting-board'

export default function AdditionalPage() {
  const todayUnassignedTasks = useUnsortedTodayTasks()
  return <SortingBoard tasks={todayUnassignedTasks} />
}
