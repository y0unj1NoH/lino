import { X } from 'lucide-react'

import { Button } from '@/shared/ui/base-button'
import { ButtonGhost } from '@/shared/ui/button'

interface TaskCardProps {
  id: string
  content: string
  onEdit: () => void
  onDelete: () => void
}

// TODO: isToday 추가할 지 결정
export const TaskEditableCard = ({
  content,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  return (
    <Button
      variant="outline"
      // size="card"
      className="w-full flex items-center justify-between gap-2 p-2 rounded-md border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
      onClick={onEdit}
      aria-label={`${content} 수정`}
    >
      <span className="flex-1 break-words whitespace-pre-wrap text-left">
        {content}
      </span>
      <ButtonGhost
        size="iconSm"
        destructive
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        aria-label={`${content} 삭제`}
      >
        <X />
      </ButtonGhost>
    </Button>
  )
}
