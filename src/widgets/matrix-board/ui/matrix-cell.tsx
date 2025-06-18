import { cva } from 'class-variance-authority'

import { MatrixTaskStatus, TaskStatus } from '@/entities/task/model/types'
import { TaskCheckItems } from '@/entities/task/ui/task-check-items'
import { cn } from '@/shared/lib/utils'

interface MatrixCellProps {
  status: MatrixTaskStatus
  className?: string
}

const matrixCellVariants = cva(
  'p-4 w-full h-[calc(40dvh-1rem)] border-none rounded-md shadow-xs overflow-y-auto',
  {
    variants: {
      status: {
        [TaskStatus.UrgentImportant]: 'bg-quadrant-red',
        [TaskStatus.NotUrgentImportant]: 'bg-quadrant-yellow',
        [TaskStatus.UrgentNotImportant]: 'bg-quadrant-green',
        [TaskStatus.NotUrgentNotImportant]: 'bg-quadrant-blue',
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
      },
    },
  },
)

export function MatrixCell({ status, className }: MatrixCellProps) {
  return (
    <div className={cn(matrixCellVariants({ status }), className)}>
      <TaskCheckItems status={status} />
    </div>
  )
}
