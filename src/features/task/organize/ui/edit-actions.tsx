'use client'

import { useTaskStore } from '@/entities/task/model/slice'
import { useUnsorted } from '@/features/task/organize/model/context'
import { cn } from '@/shared/lib/utils'
import { AlertDialog } from '@/shared/ui/alert-dialog'
import { ButtonGhost } from '@/shared/ui/button'

export function EditActions() {
  const { toggleEditMode } = useUnsorted()
  const deleteAllTask = useTaskStore((state) => state.deleteAllTask)

  return (
    <>
      <AlertDialog
        title="Delete All Tasks"
        description="Are you sure you want to delete all tasks? This action cannot be undone."
        confirmText="Delete All"
        cancelText="Cancel"
        onConfirm={deleteAllTask}
        destructive
        trigger={
          <p
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              'text-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
              'h-9 px-4 py-2',
            )}
            aria-label="delete all tasks"
          >
            All delete
          </p>
        }
      />
      <ButtonGhost onClick={toggleEditMode} aria-label="button done">
        Done
      </ButtonGhost>
    </>
  )
}
