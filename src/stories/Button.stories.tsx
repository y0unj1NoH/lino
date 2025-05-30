import type { Meta, StoryObj } from '@storybook/nextjs'
import { History, Settings } from 'lucide-react'

import type { ButtonGhostProps, ButtonProps } from '@/shared/ui/button'
import { Button, ButtonGhost } from '@/shared/ui/button'

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button | typeof ButtonGhost>

export default meta
type Story = StoryObj<typeof Button | typeof ButtonGhost>

/**
 * 기본 버튼
 * 주요 액션에 사용되는 기본 스타일의 버튼입니다.
 */
export const Default: Story = {
  args: {
    children: 'Add',
  },
}

/**
 * 작은 버튼
 * 공간이 제한된 곳에서 사용되는 작은 크기의 버튼입니다.
 */
export const Small: Story = {
  args: {
    children: 'Add',
    size: 'sm',
  },
}

/**
 * 큰 버튼
 * 강조가 필요한 주요 액션에 사용되는 큰 크기의 버튼입니다.
 */
export const Large: Story = {
  args: {
    children: 'Add',
    size: 'lg',
  },
}

/**
 * 전체 너비 버튼
 * 모바일 환경에서 주로 사용되는 전체 너비 버튼입니다.
 */
export const Full: Story = {
  args: {
    children: 'Add',
    size: 'full',
  },
}

/**
 * 아이콘만 있는 버튼
 * 공간이 제한된 곳에서 사용되는 아이콘 전용 버튼입니다.
 */
export const IconOnly: Story = {
  render: (args: ButtonProps) => (
    <Button size="icon" {...args}>
      <Settings className="h-4 w-4" />
    </Button>
  ),
}

/**
 * 아이콘과 텍스트가 있는 버튼
 * 아이콘과 텍스트를 함께 사용하여 액션의 의미를 더 명확하게 전달합니다.
 */
export const WithIcon: Story = {
  render: (args: ButtonProps) => (
    <Button {...args}>
      <History className="mr-2 h-4 w-4" />
      Postpone
    </Button>
  ),
}

/**
 * 고스트 버튼
 * 배경이 없는 투명한 스타일의 버튼입니다.
 * 부가적인 액션이나 덜 강조되어야 하는 액션에 사용됩니다.
 */
export const Ghost: Story = {
  render: (args: ButtonGhostProps) => <ButtonGhost {...args} />,
  args: {
    children: 'sort',
  },
  argTypes: {
    destructive: {
      control: 'boolean',
      description:
        '위험한 액션임을 표시합니다. true일 경우 빨간색 텍스트로 표시됩니다.',
    },
  },
}

/**
 * 위험한 고스트 버튼
 * 삭제나 취소와 같은 위험한 액션에 사용되는 고스트 버튼입니다.
 */
export const DestructiveGhost: Story = {
  render: (args: ButtonGhostProps) => <ButtonGhost destructive {...args} />,
  args: {
    children: 'All delete',
  },
}
