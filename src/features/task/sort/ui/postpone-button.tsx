'use client'
import { ClockArrowDown } from 'lucide-react'

import { useTaskStore } from '@/entities/task/model/slice'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface PostponeButtonProps {
  id: string
  className?: string
}

export function PostponeButton({ id, className }: PostponeButtonProps) {
  const postponeTask = useTaskStore((state) => state.postponeTask)

  const handleClick = () => {
    postponeTask(id)
  }

  return (
    <Button
      size="sm"
      variant="muted"
      className={cn('hover:text-foreground/70', className)}
      onClick={handleClick}
    >
      <ClockArrowDown />
      Postpone Task
    </Button>
  )
}
