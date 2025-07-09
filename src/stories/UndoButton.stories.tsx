import type { Meta, StoryObj } from '@storybook/nextjs'

import { UndoButton } from '@/features/task/sort/ui/undo-button'

const meta = {
  title: 'Features/Task/Sort/UndoButton',
  component: UndoButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UndoButton>

export default meta
type Story = StoryObj<typeof UndoButton>

export const Default: Story = {
  args: {
    id: '1',
  },
}
