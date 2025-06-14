'use client'

import { useState } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { Task } from '@/entities/task/model/types'
import { TaskEditableCard } from '@/entities/task/ui/task-editable-card'
import { EditTaskContainer } from '@/features/task/organize/ui/edit-task-container'

interface TaskEditableListProps {
  tasks: Task[]
}

export function TaskEditableList({ tasks }: TaskEditableListProps) {
  const [editingTaskId, setEditingTaskId] = useState<string>('')
  const [editContent, setEditContent] = useState<string>('')
  const deleteTask = useTaskStore((state) => state.deleteTask)

  // 편집 모드 열기
  const openEdit = (task: Task) => {
    setEditingTaskId(task.id)
    setEditContent(task.content)
  }

  // 편집 모드 닫기
  const closeEdit = () => {
    setEditingTaskId('')
    setEditContent('')
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskEditableCard
            key={task.id}
            id={task.id}
            content={task.content}
            onEdit={() => openEdit(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
      {editingTaskId && (
        <EditTaskContainer
          id={editingTaskId}
          content={editContent}
          onClose={closeEdit}
        />
      )}
    </>
  )
}
