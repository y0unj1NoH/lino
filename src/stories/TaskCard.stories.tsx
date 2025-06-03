import { Meta, StoryObj } from '@storybook/nextjs'

import { TaskCard } from '@/entities/task/ui/task-card'

const meta: Meta<typeof TaskCard> = {
  title: 'Entities/Task/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TaskCard>

export const Default: Story = {
  args: {
    id: '1',
    content: '밀린 빨래 다 하기',
  },
}

export const TodayCard: Story = {
  args: {
    id: '2',
    content: '7시까지 회의록 작성 후 노션에 업로드 꼭 해야 함!!!',
    isToday: true,
  },
}
