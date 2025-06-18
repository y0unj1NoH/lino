'use client'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'

export function SortingProvider({ children }: { children: React.ReactNode }) {
  const sortTask = useTaskStore((state) => state.sortTask)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !active) {
      return
    }

    setTimeout(() => {
      sortTask(active.id as string, over.id as TaskStatus)
    }, 100)
  }
  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      {children}
    </DndContext>
  )
}
