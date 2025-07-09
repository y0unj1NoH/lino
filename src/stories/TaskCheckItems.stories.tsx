import { Meta, StoryObj } from '@storybook/nextjs'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'
import { TaskCheckItems } from '@/entities/task/ui/task-check-items'
import { getCurrentDate } from '@/shared/lib/date'

const meta: Meta<typeof TaskCheckItems> = {
  title: 'Entities/Task/TaskCheckItems',
  component: TaskCheckItems,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const now = getCurrentDate()
      useTaskStore.setState({
        tasks: {
          '1': {
            content: 'Task 1',
            status: TaskStatus.UrgentImportant,
            isToday: true,
            postponedCount: 0,
            updatedAt: now,
          },
          '2': {
            content: 'Task 2',
            status: TaskStatus.UrgentImportant,
            completedAt: now,
            isToday: true,
            postponedCount: 0,
            updatedAt: now,
          },
          '3': {
            content: 'Task 3',
            status: TaskStatus.UrgentImportant,
            completedAt: now,
            isToday: true,
            postponedCount: 0,
            updatedAt: now,
          },
        },
      })
      return <Story />
    },
  ],
}

export default meta
type Story = StoryObj<typeof TaskCheckItems>

export const Default: Story = {
  args: {
    status: TaskStatus.UrgentImportant,
  },
}
