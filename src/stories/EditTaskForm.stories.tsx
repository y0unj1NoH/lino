import type { Meta, StoryObj } from '@storybook/nextjs'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'
import { EditTaskForm } from '@/features/task/organize/ui/edit-task-form'
import { getCurrentDate } from '@/shared/lib/date'
import { once } from '@/shared/lib/utils'
import { Toaster } from '@/shared/ui/sonner'

const initializeTaskStoreOnce = once(() => {
  const now = getCurrentDate()
  useTaskStore.setState({
    tasks: {
      '1': {
        content: 'Test Task',
        status: TaskStatus.Unassigned,
        completedAt: now,
        isToday: true,
        postponedCount: 0,
        updatedAt: now,
      },
    },
  })
})

const meta: Meta<typeof EditTaskForm> = {
  title: 'Features/Task/EditTaskForm',
  component: EditTaskForm,
  decorators: [
    (Story) => {
      initializeTaskStoreOnce()
      return (
        <>
          <Story />
          <Toaster />
        </>
      )
    },
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof EditTaskForm>

export const Default: Story = {
  args: {
    id: '1',
    initialContent: 'Test Task',
  },
}
