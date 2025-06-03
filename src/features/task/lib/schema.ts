import { z } from 'zod/v4'

import { FORM_TOAST } from '@/shared/consts/toast-config'

// TODO: error 사용하지 않는 부분에 대해서 개선 필요
const TaskContentSchema = z
  .string()
  .trim()
  .min(1, { error: FORM_TOAST.required.message })
  .max(20, { error: FORM_TOAST.maxLength.message })

export const AddTaskFormSchema = z.object({
  content: TaskContentSchema,
  isToday: z.boolean().optional(),
})

export const EditTaskFormSchema = z.object({
  content: TaskContentSchema,
})
