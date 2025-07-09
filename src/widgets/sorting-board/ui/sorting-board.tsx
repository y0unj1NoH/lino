'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskList, TaskStatus } from '@/entities/task/model/types'
import { DropZone } from '@/features/task/sort/ui/drop-zone'
import { PostponeButton } from '@/features/task/sort/ui/postpone-button'
import { SortingTaskCard } from '@/features/task/sort/ui/sorting-task-card'
import { UndoButton } from '@/features/task/sort/ui/undo-button'

interface SortingBoardProps {
  tasks: TaskList
  originalTasks: TaskList
}

export function SortingBoard({ tasks, originalTasks }: SortingBoardProps) {
  const router = useRouter()
  const hydrated = useTaskStore((state) => state.hydrated)

  const setSortingStatus = useTaskStore((state) => state.setSortingStatus)

  useEffect(() => {
    if (!hydrated) {
      return
    }
    if (tasks.length === 0) {
      setSortingStatus('SORTED')
      router.push('/unsorted')
    }
  }, [tasks.length, router, setSortingStatus, hydrated])

  if (tasks.length === 0 && hydrated) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-lg font-semibold">분류가 완료되었어요!</p>
      </div>
    )
  }

  return (
    <>
      <div className="border-black grid h-full w-full grid-cols-2 grid-rows-2">
        <DropZone status={TaskStatus.UrgentImportant} />
        <DropZone status={TaskStatus.NotUrgentImportant} />
        <DropZone status={TaskStatus.UrgentNotImportant} />
        <DropZone status={TaskStatus.NotUrgentNotImportant} />
      </div>
      {tasks.map(([id, task], index) => (
        <SortingTaskCard
          key={id}
          id={id}
          content={task.content}
          index={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
        />
      ))}
      {tasks.length > 0 && (
        <>
          <PostponeButton
            id={tasks[0][0]}
            className="absolute top-4/7 left-1/2 -translate-x-1/2"
          />
          <UndoButton
            id={tasks[0][0]}
            originalTasks={originalTasks}
            className="absolute top-4 left-1/2 -translate-x-1/2"
          />
        </>
      )}
    </>
  )
}
