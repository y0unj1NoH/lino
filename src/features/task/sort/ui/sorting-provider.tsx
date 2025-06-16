'use client'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
// import { restrictToParentElement } from '@dnd-kit/modifiers'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'

export function SortingProvider({ children }: { children: React.ReactNode }) {
  const sortTask = useTaskStore((state) => state.sortTask)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !active) {
      return
    }

    sortTask(active.id as string, over.id as TaskStatus)
    // TODO: ative 요소가 사라지는 애니메이션
    // 이제 저 DOM은 사라져야해
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      // modifiers={[restrictToParentElement]}
    >
      {children}
    </DndContext>
  )
}
