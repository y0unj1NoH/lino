import type { Meta, StoryObj } from '@storybook/nextjs'

import { PostponeButton } from '@/features/task/sort/ui/postpone-button'

const meta = {
  title: 'Features/Task/Sort/PostponeButton',
  component: PostponeButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostponeButton>

export default meta
type Story = StoryObj<typeof PostponeButton>

export const Default: Story = {
  args: {
    id: '1',
  },
}
