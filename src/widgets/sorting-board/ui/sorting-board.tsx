'use client'

import { Task, TaskStatus } from '@/entities/task/model/types'
import { DropZone } from '@/features/task/sort/ui/drop-zone'
import { SortingTaskCard } from '@/features/task/sort/ui/sorting-task-card'

interface SortingBoardProps {
  tasks: Task[]
}

export function SortingBoard({ tasks }: SortingBoardProps) {
  // TODO: 끝나면 토스트 or 완료 모달 띄우고 페이지 넘어가기
  if (tasks.length === 0) {
    window.location.href = '/'
    return (
      <div className="h-100 bg-primary border-black overflow-x-hidden">
        완료 구리!
      </div>
    )
  }

  return (
    <>
      <div className="border-black grid h-full w-full grid-cols-2 grid-rows-2">
        <DropZone status={TaskStatus.UrgentImportant} />
        <DropZone status={TaskStatus.UrgentNotImportant} />
        <DropZone status={TaskStatus.NotUrgentImportant} />
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
