import { useCallback, useState } from 'react'

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
  const [showAlert, setShowAlert] = useState(false)
  const isOpen = Boolean(id && content)

  // TODO: beforeunload 기능 확장 고려
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        if (isDirty) {
          setShowAlert(true)
          return
        }
        onClose()
      }
    },
    [isDirty, onClose],
  )

  const handleConfirmClose = useCallback(() => {
    setShowAlert(false)
    onClose()
  }, [onClose])

  return (
    <>
      <BottomSheet open={isOpen} onOpenChange={handleOpenChange}>
        <div className="flex flex-col gap-4 p-4">
          <EditTaskForm
            id={id}
            initialContent={content}
            onDirtyChange={setIsDirty}
            onSuccess={onClose}
          />
        </div>
      </BottomSheet>

      <AlertDialog
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to close?"
        confirmText="Continue"
        cancelText="Cancel"
        destructive
        open={showAlert}
        onConfirm={handleConfirmClose}
        onOpenChange={setShowAlert}
      />
    </>
  )
}
