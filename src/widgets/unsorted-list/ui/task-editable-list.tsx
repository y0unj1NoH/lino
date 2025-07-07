'use client'

import { useState } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskList } from '@/entities/task/model/types'
import { TaskEditableCard } from '@/entities/task/ui/task-editable-card'
import { EditTaskContainer } from '@/features/task/organize/ui/edit-task-container'

interface TaskEditableListProps {
  tasks: TaskList
}

export function TaskEditableList({ tasks }: TaskEditableListProps) {
  const [editingTaskId, setEditingTaskId] = useState<string>('')
  const [editContent, setEditContent] = useState<string>('')
  const deleteTask = useTaskStore((state) => state.deleteTask)

  // 편집 모드 열기
  const openEdit = (id: string, content: string) => {
    setEditingTaskId(id)
    setEditContent(content)
  }

  // 편집 모드 닫기
  const closeEdit = () => {
    setEditingTaskId('')
    setEditContent('')
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        {tasks.map(([id, task]) => (
          <TaskEditableCard
            key={id}
            id={id}
            content={task.content}
            onEdit={() => openEdit(id, task.content)}
            onDelete={() => deleteTask(id)}
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
