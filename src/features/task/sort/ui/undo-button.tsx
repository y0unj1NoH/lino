'use client'
import { Undo2 } from 'lucide-react'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskList } from '@/entities/task/model/types'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface UndoButtonProps {
  id: string
  originalTasks: TaskList
  className?: string
}

export function UndoButton({ originalTasks, id, className }: UndoButtonProps) {
  const undoTask = useTaskStore((state) => state.undoTask)

  const handleClick = () => {
    const targetTask = originalTasks.find(
      (_, index) => originalTasks[index + 1][0] === id,
    )
    if (targetTask) {
      undoTask(targetTask[0])
    }
  }

  return (
    <Button
      size="sm"
      variant="muted"
      className={cn(
        'opacity-90 hover:opacity-100 hover:text-foreground/70',
        className,
      )}
      onClick={handleClick}
    >
      <Undo2 />
      Undo Task
    </Button>
  )
}
