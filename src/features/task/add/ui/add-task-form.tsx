'use client'

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTaskStore } from '@/entities/task/model/slice'
import { AddTaskFormSchema } from '@/features/task/lib/schema'
import { CONTENT_MAX_LENGTH } from '@/shared/consts/form'
import { ADD_TOAST, FORM_TOAST } from '@/shared/consts/toast-config'
import { showToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui/button'
import { CheckboxWithLabel } from '@/shared/ui/checkbox-with-label'
import { Input } from '@/shared/ui/input'

type AddFromValues = z.infer<typeof AddTaskFormSchema>

interface AddTaskFormProps {
  isTodayActive: boolean
  showOverlay?: boolean
  onFocus?: () => void
}

export const AddTaskForm = ({
  isTodayActive,
  showOverlay,
  onFocus,
}: AddTaskFormProps) => {
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

  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (!showOverlay) {
      reset()
    }
  }, [showOverlay, reset])

  useEffect(() => {
    if (!showOverlay) {
      inputRef.current?.blur()
    }
  }, [showOverlay])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="w-full flex justify-between items-end  gap-2">
          <div className="w-full flex flex-col gap-1">
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
                <Input
                  {...field}
                  placeholder="Add a task..."
                  maxLength={CONTENT_MAX_LENGTH}
                  className="w-full"
                  onFocus={onFocus}
                  onBlur={() => {
                    if (showOverlay) {
                      inputRef.current?.focus()
                      // 일부 환경에선 onBlur → focus()가 즉시 호출되면 무시되는 경우가 있어서 아래처럼 살짝 delay를 주기도 해요
                      // setTimeout(() => {
                      //   inputRef.current?.focus()
                      // }, 0)
                    }
                  }}
                  ref={inputRef}
                />
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
