'use client'
import { AddTaskContainer } from '@/features/task/add/ui/add-task-container'
import { useUnsorted } from '@/features/task/organize/model/context'

export default function UnsortedPage() {
  const { isEditMode } = useUnsorted()

  return (
    <>
      <h1>UnsortedPage</h1>
      {!isEditMode && <AddTaskContainer />}
    </>
  )
}
