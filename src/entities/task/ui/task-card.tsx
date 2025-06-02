interface TaskCardProps {
  id: string
  content: string
  isToday?: boolean
}

export const TaskCard = ({ id, content, isToday = false }: TaskCardProps) => {
  return (
    <div
      data-id={id}
      className="w-64 border-input flex items-center justify-between gap-2 rounded-md border p-2 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
    >
      <span className="flex-1 break-words text-sm whitespace-pre-wrap">
        {content}
      </span>
      {isToday && (
        <span className="shrink-0 rounded-full bg-primary text-primary-foreground px-2 py-1 text-sm">
          Today
        </span>
      )}
    </div>
  )
}
