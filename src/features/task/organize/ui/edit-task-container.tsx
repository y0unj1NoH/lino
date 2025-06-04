import { useState } from 'react'

import { AlertDialog } from '@/shared/ui/alert-dialog'
import { BottomSheet } from '@/shared/ui/bottom-sheet'

import { EditTaskForm } from './edit-task-form'

interface EditTaskContainerProps {
  id: string
  content: string
  onClose: () => void
}

export function EditTaskContainer({
  id,
  content,
  onClose,
}: EditTaskContainerProps) {
  const [isDirty, setIsDirty] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const isOpen = !!id && !!content

  return (
    <>
      <BottomSheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            if (isDirty) {
              setIsAlertOpen(true)
              return
            }
            onClose()
          }
        }}
      >
        <div className="flex flex-col gap-4 p-4">
          <EditTaskForm
            id={id}
            initialContent={content}
            onDirtyChange={setIsDirty}
            onSubmitSuccess={onClose}
          />
        </div>
      </BottomSheet>

      {isAlertOpen && (
        <AlertDialog
          title="Unsaved Changes"
          description="You have unsaved changes. Are you sure you want to close?"
          confirmText="Continue"
          cancelText="Cancel"
          onConfirm={() => {
            setIsAlertOpen(false)
            onClose()
          }}
          destructive
          open={isAlertOpen}
          onOpenChange={setIsAlertOpen}
        />
      )}
    </>
  )
}
