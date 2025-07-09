'use client'

import { useRef } from 'react'

import {
  getUnsortedTodayTasks,
  useUnsortedTodayTasks,
} from '@/entities/task/model/selector'
import { SortingBoard } from '@/widgets/sorting-board/ui/sorting-board'

export default function AdditionalPage() {
  const todayUnassignedTasks = useUnsortedTodayTasks()
  const originalTodayTasks = useRef(getUnsortedTodayTasks())

  return (
    <SortingBoard
      tasks={todayUnassignedTasks}
      originalTasks={originalTodayTasks.current}
    />
  )
}
