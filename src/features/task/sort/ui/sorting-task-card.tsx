import { useDraggable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { TaskCard } from '@/entities/task/ui/task-card'
import { CARD_DECK_OFFSETS } from '@/features/task/sort/ui/consts'
import { cn } from '@/shared/lib/utils'

interface SortingTaskCardProps {
  id: string
  content: string
  index: number
  className?: string
}

// TODO: 책임 분리
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

  const [dragStarted, setDragStarted] = useState(false)
  const [finalTransform, setFinalTransform] = useState<{
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    if (!dragStarted && index === 0 && isDragging) {
      setDragStarted(true)
    }
  }, [isDragging, index])

  useEffect(() => {
    if (transform) {
      setFinalTransform({ x: transform.x, y: transform.y })
    }
  }, [transform?.x, transform?.y])

  const style = finalTransform
    ? {
        transform: `translate3d(${finalTransform.x}px, ${finalTransform.y}px, 0) scale(${
          dragStarted && !isDragging ? 0 : 1
        })`,
      }
    : undefined

  return (
    <div
      data-id={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'w-64 text-center font-semibold ',
        index > 4 ? CARD_DECK_OFFSETS[4] : CARD_DECK_OFFSETS[index],
        !dragStarted && 'transition-transform duration-200 ease-in-out',
        dragStarted &&
          !isDragging &&
          'transition-transform duration-100 ease-in-out',
        className,
      )}
    >
      <TaskCard id={id} content={content} />
    </div>
  )
}
