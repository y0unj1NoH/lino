import { cn } from '@/shared/lib/utils'

interface TaskCardProps {
  id: string
  content: string
  isToday?: boolean
  className?: string
}

export const TaskCard = ({
  id,
  content,
  isToday = false,
  className,
}: TaskCardProps) => {
  return (
    <div
      data-id={id}
      className={cn(
        'w-full flex items-center justify-between gap-2 p-2 rounded-md border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        className,
      )}
    >
      <span className="flex-1 min-w-0 break-words text-sm">{content}</span>
      {isToday && (
        <span className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground">
          Today
        </span>
      )}
    </div>
  )
}
