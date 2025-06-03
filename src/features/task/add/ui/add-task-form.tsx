/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTaskStore } from '@/entities/task/model/slice'
import { AddTaskFormSchema } from '@/features/task/lib/schema'
import { ADD_TOAST, FORM_TOAST } from '@/shared/consts/toast-config'
import { showToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui/button'
import { CheckboxWithLabel } from '@/shared/ui/checkbox-with-label'
import { Input } from '@/shared/ui/input'

type AddFromValues = z.infer<typeof AddTaskFormSchema>

interface AddTaskFormProps {
  isTodayActive: boolean
}

export const AddTaskForm = ({ isTodayActive }: AddTaskFormProps) => {
  const addTask = useTaskStore((state) => state.addTask)
  const {
    control,
    reset,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<AddFromValues>({
    mode: 'onSubmit',
    resolver: zodResolver(AddTaskFormSchema),
    defaultValues: {
      content: '',
      isToday: false,
    },
  })

  const currentContentLength = watch('content').length

  const onSubmit = (data: AddFromValues) => {
    const { content, isToday } = data
    addTask(content, isToday === true ? true : undefined)
    showToast(ADD_TOAST.success)
    reset()
  }

  const onError = (errors: FieldErrors<AddFromValues>) => {
    const firstError = Object.values(errors)[0]
    if (firstError?.message) {
      showToast(FORM_TOAST[firstError.message as keyof typeof FORM_TOAST])
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="w-full flex justify-between items-end  gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              {isTodayActive && (
                <Controller
                  control={control}
                  name="isToday"
                  render={({ field }) => (
                    <CheckboxWithLabel
                      id="isToday"
                      label="오늘 해야할 일"
                      checked={field.value as boolean}
                      onCheckedChange={
                        field.onChange as (checked: boolean) => void
                      }
                      className="text-xs"
                    />
                  )}
                />
              )}
              <p className="flex-1 text-xs text-muted-foreground text-right">
                {currentContentLength}/20
              </p>
            </div>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <Input {...field} placeholder="Add a task..." maxLength={20} />
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Add
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  )
}
