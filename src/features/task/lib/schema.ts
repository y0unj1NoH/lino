import { z } from 'zod'

import { CONTENT_MAX_LENGTH } from '@/shared/consts/form'

const TaskContentSchema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .max(CONTENT_MAX_LENGTH, { message: 'maxLength' })

export const AddTaskFormSchema = z.object({
  content: TaskContentSchema,
  isToday: z.boolean().optional(),
})

export const EditTaskFormSchema = z.object({
  content: TaskContentSchema,
})
