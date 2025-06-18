import { useDroppable } from '@dnd-kit/core'
import { cva } from 'class-variance-authority'

import { MatrixTaskStatus, TaskStatus } from '@/entities/task/model/types'
import { MATRIX_CONFIG } from '@/features/task/sort/ui/consts'
import { cn } from '@/shared/lib/utils'

interface DropZoneProps {
  status: MatrixTaskStatus
}

const dropZoneVariants = cva(
  'flex items-center justify-center border-none text-sm font-semibold',
  {
    variants: {
      status: {
        [TaskStatus.UrgentImportant]: 'bg-quadrant-red text-icon-do',
        [TaskStatus.UrgentNotImportant]:
          'bg-quadrant-green text-icon-delegable',
        [TaskStatus.NotUrgentImportant]:
          'bg-quadrant-yellow text-icon-schedule',
        [TaskStatus.NotUrgentNotImportant]: 'bg-quadrant-blue text-icon-later',
      },
      isOver: {
        true: [
          'drop-shadow-[0_0_2px_var(--background)]',
          'drop-shadow-[0_0_4px_var(--background)]',
          'drop-shadow-[0_0_8px_var(--background)]',
          'shadow-[inset_0_0_2px_var(--background)]',
          'shadow-[inset_0_0_4px_var(--background)]',
          'shadow-[inset_0_0_8px_var(--background)]',
        ].join(' '),
      },

      defaultVariants: {
        status: TaskStatus.UrgentImportant,
        isOver: false,
      },
    },
  },
)

export function DropZone({ status }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  })

  const IconComponent = MATRIX_CONFIG[status].icon

  return (
    <div ref={setNodeRef} className={cn(dropZoneVariants({ status, isOver }))}>
      <div className="flex flex-col items-center justify-center gap-0.5">
        <IconComponent className="w-6 h-6" />
        {MATRIX_CONFIG[status].label}
      </div>
    </div>
  )
}
