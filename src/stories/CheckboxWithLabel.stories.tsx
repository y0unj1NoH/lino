import type { Meta, StoryObj } from '@storybook/nextjs'

import { CheckboxWithLabel } from '@/shared/ui/checkbox-with-label'

const meta = {
  title: 'Shared/CheckboxWithLabel',
  component: CheckboxWithLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxWithLabel>

export default meta
type Story = StoryObj<typeof CheckboxWithLabel>

export const Primary: Story = {
  args: {
    id: 'primary',
    label: 'Primary 체크박스',
    color: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    id: 'secondary',
    label: 'Secondary 체크박스',
    color: 'secondary',
  },
}

export const Muted: Story = {
  args: {
    id: 'muted',
    label: 'Muted 체크박스',
    color: 'muted',
  },
}

export const Strikethrough: Story = {
  args: {
    id: 'strikethrough',
    label: '취소선 체크박스',
    color: 'secondary',
    checked: true,
    strikethrough: true,
  },
}
