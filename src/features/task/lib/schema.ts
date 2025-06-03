import { z } from 'zod'

const TaskContentSchema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .max(20, { message: 'maxLength' })

export const AddTaskFormSchema = z.object({
  content: TaskContentSchema,
  isToday: z.boolean().optional(),
})

export const EditTaskFormSchema = z.object({
  content: TaskContentSchema,
})
