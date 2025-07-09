import type { Meta, StoryObj } from '@storybook/nextjs'
import { useEffect, useState } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { TaskStatus } from '@/entities/task/model/types'
import { EditTaskContainer } from '@/features/task/organize/ui/edit-task-container'
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

const meta: Meta<typeof EditTaskContainer> = {
  title: 'Features/EditTaskContainer',
  component: EditTaskContainer,
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
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<typeof EditTaskContainer>

export const Default: Story = {
  render: (args) => {
    const [taskId, setTaskId] = useState(args.id)

    useEffect(() => {
      if (args.id) {
        setTaskId(args.id)
      }
    }, [args.id, setTaskId])

    return (
      <EditTaskContainer
        id={taskId}
        content={args.content}
        onClose={() => {
          setTaskId('')
        }}
      />
    )
  },

  args: {
    id: '1',
    content: 'Test Task',
  },
}
