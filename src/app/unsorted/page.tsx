'use client'

import { useUnsortedTasks } from '@/entities/task/model/selector'
import { AddTaskContainer } from '@/features/task/add/ui/add-task-container'
import { useUnsorted } from '@/features/task/organize/model/context'
import { cn } from '@/shared/lib/utils'
import { TaskEditableList } from '@/widgets/unsorted-list/ui/task-editable-list'
import { TaskList } from '@/widgets/unsorted-list/ui/task-list'

export default function UnsortedPage() {
  const { isEditMode } = useUnsorted()
  const unsortedTasks = useUnsortedTasks()

  return (
    <div
      className={cn('flex flex-col p-4 pt-14', isEditMode ? 'pb-24' : 'pb-48')}
    >
      {isEditMode ? (
        <TaskEditableList tasks={unsortedTasks} />
      ) : (
        <TaskList tasks={unsortedTasks} />
      )}
      {!isEditMode && <AddTaskContainer />}
    </div>
  )
}
