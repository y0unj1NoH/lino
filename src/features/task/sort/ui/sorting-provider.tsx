'use client'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'

export function SortingProvider({ children }: { children: React.ReactNode }) {
  const sortTask = useTaskStore((state) => state.sortTask)

  const pointerSensor = useSensor(PointerSensor)

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 50,
      tolerance: 5,
    },
  })

  const sensors = useSensors(pointerSensor, touchSensor)

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
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      {children}
    </DndContext>
  )
}
