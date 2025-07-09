'use client'
import { useRef } from 'react'

import {
  getUnsortedTasks,
  useUnsortedTasks,
} from '@/entities/task/model/selector'
import { SortingBoard } from '@/widgets/sorting-board/ui/sorting-board'

export default function SortingPage() {
  const unsortedTasks = useUnsortedTasks()
  const originalTasks = useRef(getUnsortedTasks())
  return (
    <SortingBoard tasks={unsortedTasks} originalTasks={originalTasks.current} />
  )
}
