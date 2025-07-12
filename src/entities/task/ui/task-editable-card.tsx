import { X } from 'lucide-react'

import { Button, ButtonGhost } from '@/shared/ui/button'

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
      className="w-full h-auto flex items-center justify-between gap-2 p-2 whitespace-normal rounded-md border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
      onClick={onEdit}
      aria-label={`${content} 수정`}
    >
      <span className="flex-1 min-w-0 break-words text-sm font-medium text-left">
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
