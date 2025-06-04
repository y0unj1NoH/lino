/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTaskStore } from '@/entities/task/model/slice'
import { EditTaskFormSchema } from '@/features/task/lib/schema'
import { EDIT_TOAST, FORM_TOAST } from '@/shared/consts/toast-config'
import { showToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

type EditFromValues = z.infer<typeof EditTaskFormSchema>

interface EditTaskFormProps {
  id: string
  initialContent: string
  onDirtyChange?: (isDirty: boolean) => void
  onSubmitSuccess?: () => void
}

export const EditTaskForm = ({
  id,
  initialContent,
  onDirtyChange,
  onSubmitSuccess,
}: EditTaskFormProps) => {
  const updateTask = useTaskStore((state) => state.updateTask)
  const {
    control,
    reset,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    watch,
  } = useForm<EditFromValues>({
    mode: 'onSubmit',
    resolver: zodResolver(EditTaskFormSchema),
    defaultValues: {
      content: initialContent,
    },
  })
  const currentContentLength = watch('content').length

  useEffect(() => {
    reset({ content: initialContent })
  }, [initialContent, reset])

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  const onSubmit = (data: EditFromValues) => {
    if (!isDirty) {
      showToast(EDIT_TOAST.noChanges)
      return
    }
    const { content } = data
    updateTask(id, content)
    reset({ content })
    showToast(EDIT_TOAST.success)
    onSubmitSuccess?.()
  }

  const onError = (errors: FieldErrors<EditFromValues>) => {
    const firstError = Object.values(errors)[0]
    if (firstError?.message) {
      showToast(FORM_TOAST[firstError.message as keyof typeof FORM_TOAST])
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="w-full flex justify-between items-end  gap-2">
          <div className="w-full flex flex-col gap-1">
            <p className="flex-1 text-xs text-muted-foreground text-right">
              {currentContentLength}/40
            </p>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={initialContent}
                  maxLength={40}
                  className="w-full"
                />
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  )
}
