import type { Meta, StoryObj } from '@storybook/nextjs'

import { BottomNavigation } from '@/shared/ui/bottom-navigation'

const meta = {
  title: 'Shared/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNavigation>

export default meta

type Story = StoryObj<typeof BottomNavigation>

/**
 * 기본 바텀 내비게이션
 * 홈 경로가 활성화되어 있는 기본 상태입니다.
 */
export const Default: Story = {
  render: () => <BottomNavigation />,
}
