'use client'

import { useUnsortedTasks } from '@/entities/task/model/selector'
import { SortingBoard } from '@/widgets/sorting-board/ui/sorting-board'

export default function SortingPage() {
  const unsortedTasks = useUnsortedTasks()
  return <SortingBoard tasks={unsortedTasks} />
}
