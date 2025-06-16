import { useDraggable } from '@dnd-kit/core'

import { TaskCard } from '@/entities/task/ui/task-card'
import { cn } from '@/shared/lib/utils'

interface SortingTaskCardProps {
  id: string
  content: string
  index: number
  className?: string
}

export const SortingTaskCard = ({
  id,
  content,
  index,
  className,
}: SortingTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: index !== 0,
    })

  const offsets = [
    'translate-y-[-50%] z-50',
    'translate-y-[calc(-50%-5px)] z-40',
    'translate-y-[calc(-50%-10px)] z-30',
    'translate-y-[calc(-50%-15px)] z-20',
    'translate-y-[calc(-50%-20px)] z-10',
  ]

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div
      data-id={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'w-64 text-center',
        !isDragging && 'transition-transform duration-200 ease-in-out',
        index > 4 ? offsets[4] : offsets[index],
        className,
      )}
    >
      <TaskCard id={id} content={content} />
    </div>
  )
}
