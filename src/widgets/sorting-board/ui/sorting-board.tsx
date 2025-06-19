'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { Task, TaskStatus } from '@/entities/task/model/types'
import { DropZone } from '@/features/task/sort/ui/drop-zone'
import { SortingTaskCard } from '@/features/task/sort/ui/sorting-task-card'

interface SortingBoardProps {
  tasks: Task[]
}

export function SortingBoard({ tasks }: SortingBoardProps) {
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
      {tasks.map((task, index) => (
        <SortingTaskCard
          key={task.id}
          id={task.id}
          content={task.content}
          index={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
        />
      ))}
    </>
  )
}
