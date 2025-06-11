import type { Meta, StoryObj } from '@storybook/nextjs'

import { useTaskStore } from '@/entities/task/model/slice'
import { AddTaskForm } from '@/features/task/add/ui/add-task-form'
import { once } from '@/shared/lib/utils'
import { Toaster } from '@/shared/ui/sonner'

const initializeTaskStoreOnce = once(() => {
  useTaskStore.setState({ tasks: [] })
})

const meta: Meta<typeof AddTaskForm> = {
  title: 'Features/Task/AddTaskForm',
  component: AddTaskForm,
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
type Story = StoryObj<typeof AddTaskForm>

export const Default: Story = {
  args: {
    isTodayActive: true,
  },
}
