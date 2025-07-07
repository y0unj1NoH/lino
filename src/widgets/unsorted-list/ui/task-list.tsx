import { TaskList as TypeTaskList } from '@/entities/task/model/types'
import { TaskCard } from '@/entities/task/ui/task-card'

interface TaskListProps {
  tasks: TypeTaskList
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map(([id, task]) => (
        <TaskCard
          key={id}
          id={id}
          content={task.content}
          isToday={task.isToday}
        />
      ))}
    </div>
  )
}
