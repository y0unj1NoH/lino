import { Meta, StoryObj } from '@storybook/nextjs'

import { useUnsortedTasks } from '@/entities/task/model/selector'
import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'
import { getCurrentDate } from '@/shared/lib/date'
import { once } from '@/shared/lib/utils'
import { Toaster } from '@/shared/ui/sonner'
import { TaskList } from '@/widgets/unsorted-list/ui/task-list'

const initializeTaskStoreOnce = once(() => {
  const now = getCurrentDate()
  useTaskStore.setState({
    tasks: [
      {
        id: '1',
        content: '청소하기',
        status: TaskStatus.Unassigned,
        isToday: true,
        postponedCount: 0,
        updatedAt: now,
      },
      {
        id: '2',
        content: '공부하기',
        status: TaskStatus.Unassigned,
        isToday: false,
        postponedCount: 0,
        updatedAt: now,
      },
    ],
  })
})

const meta: Meta<typeof TaskList> = {
  title: 'Widgets/TaskList',
  component: TaskList,
  parameters: {
    layout: 'fullscreen',
  },
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
}

export default meta
type Story = StoryObj<typeof TaskList>

export const Default: Story = {
  render: () => {
    const unsortedTasks = useUnsortedTasks()
    return <TaskList tasks={unsortedTasks} />
  },
}
