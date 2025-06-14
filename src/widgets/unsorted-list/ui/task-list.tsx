import { Task } from '@/entities/task/model/types'
import { TaskCard } from '@/entities/task/ui/task-card'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          content={task.content}
          isToday={task.isToday}
        />
      ))}
    </div>
  )
}
