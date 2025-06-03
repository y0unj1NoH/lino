import { useTodaySortedTasks } from '@/entities/task/model/selector'
import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'
import { CheckboxWithLabel } from '@/shared/ui/checkbox-with-label'

interface TaskCheckItemsProps {
  status: TaskStatus
}

export const TaskCheckItems = ({ status }: TaskCheckItemsProps) => {
  const tasks = useTodaySortedTasks(status)
  const completeTask = useTaskStore((state) => state.completeTask)
  const uncompleteTask = useTaskStore((state) => state.uncompleteTask)

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <CheckboxWithLabel
          key={task.id}
          id={task.id}
          label={task.content}
          checked={!!task.completedAt}
          onCheckedChange={() => {
            if (task.completedAt) {
              uncompleteTask(task.id)
            } else {
              completeTask(task.id)
            }
          }}
          strikethrough
        />
      ))}
    </div>
  )
}
