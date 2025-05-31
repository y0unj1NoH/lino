import type { Meta, StoryObj } from '@storybook/nextjs'

import { BottomSheet } from '@/shared/ui/bottom-sheet'
import { Button, ButtonGhost } from '@/shared/ui/button'

const meta = {
  title: 'Shared/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '알림 설정',
    description: '알림 설정을 변경할 수 있습니다.',
    trigger: <Button variant="outline">알림 설정</Button>,
    children: (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span>푸시 알림</span>
          <Button variant="outline" size="sm">
            설정
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>이메일 알림</span>
          <Button variant="outline" size="sm">
            설정
          </Button>
        </div>
      </div>
    ),
  },
}

export const WithoutDescription: Story = {
  args: {
    trigger: <Button variant="outline">메뉴</Button>,
    children: (
      <div className="flex flex-col gap-2 w-full">
        <ButtonGhost>프로필</ButtonGhost>
        <ButtonGhost>설정</ButtonGhost>
        <ButtonGhost>로그아웃</ButtonGhost>
      </div>
    ),
  },
}
