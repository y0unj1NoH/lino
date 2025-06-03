import { Meta, StoryObj } from '@storybook/nextjs'

import { TaskEditableCard } from '@/entities/task/ui/task-editable-card'

const meta: Meta<typeof TaskEditableCard> = {
  title: 'Entities/Task/TaskEditableCard',
  component: TaskEditableCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TaskEditableCard>

export const Default: Story = {
  args: {
    id: '1',
    content: '밀린 빨래 다 하기',
    onEdit: () => alert('편집'),
    onDelete: () => alert('삭제'),
  },
}

export const TodayCard: Story = {
  args: {
    id: '2',
    content: '7시까지 회의록 작성 후 노션에 업로드 꼭 해야 함!!!',
    onEdit: () => alert('편집'),
    onDelete: () => alert('삭제'),
  },
}
