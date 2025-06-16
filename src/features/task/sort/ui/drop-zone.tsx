import { useDroppable } from '@dnd-kit/core'
import { cva } from 'class-variance-authority'
import { Clock, Send, Star, Zap } from 'lucide-react'

import { TaskStatus } from '@/entities/task/model/types'
import { cn } from '@/shared/lib/utils'

interface DropZoneProps {
  status: Exclude<TaskStatus, TaskStatus.Unassigned | TaskStatus.Postponed>
}

const dropZoneVariants = cva('border-none text-sm font-semibold', {
  variants: {
    status: {
      [TaskStatus.UrgentImportant]: 'bg-quadrant-red text-icon-do',
      [TaskStatus.UrgentNotImportant]: 'bg-quadrant-green text-icon-delegable',
      [TaskStatus.NotUrgentImportant]: 'bg-quadrant-yellow text-icon-schedule',
      [TaskStatus.NotUrgentNotImportant]: 'bg-quadrant-blue text-icon-later',
    },
    defaultVariants: {
      status: TaskStatus.UrgentImportant,
    },
  },
})

const matrixTypo: Record<TaskStatus, string> = {
  [TaskStatus.UrgentImportant]: 'Do Now!',
  [TaskStatus.UrgentNotImportant]: 'Delegable',
  [TaskStatus.NotUrgentImportant]: 'Schedule',
  [TaskStatus.NotUrgentNotImportant]: 'Later',
}

export function DropZone({ status }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  })

  const style = {
    filter: isOver
      ? `drop-shadow(0 0 2px var(--background))
                      drop-shadow(0 0 4px var(--background))
                      drop-shadow(0 0 8px var(--background))`
      : undefined,
    boxShadow: isOver
      ? `inset 0 0 2px var(--background),
      inset 0 0 4px var(--background),
      inset 0 0 8px var(--background)`
      : undefined,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        dropZoneVariants({ status }),
        'flex items-center justify-center',
      )}
    >
      <div className="flex flex-col items-center justify-center gap-0.5">
        {status === TaskStatus.UrgentImportant && <Zap className="w-6 h-6" />}
        {status === TaskStatus.UrgentNotImportant && (
          <Send className="w-6 h-6" />
        )}
        {status === TaskStatus.NotUrgentImportant && (
          <Star className="w-6 h-6" />
        )}
        {status === TaskStatus.NotUrgentNotImportant && (
          <Clock className="w-6 h-6" />
        )}
        {matrixTypo[status]}
      </div>
    </div>
  )
}
