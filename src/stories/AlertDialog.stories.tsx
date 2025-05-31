import type { Meta, StoryObj } from '@storybook/nextjs'

import { AlertDialog } from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'

const meta = {
  title: 'Shared/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Destructive: Story = {
  args: {
    title: '정말 모두 삭제하시겠습니까?',
    description: '삭제하면 다시 복구할 수 없어요.',
    confirmText: '삭제',
    cancelText: '취소',
    onConfirm: () => alert('삭제되었습니다.'),
    trigger: (
      <Button
        variant="outline"
        className="text-destructive hover:text-destructive"
      >
        All delete
      </Button>
    ),
    destructive: true,
  },
}

export const WithoutDescription: Story = {
  args: {
    title: '로그아웃 하시겠습니까?',
    confirmText: '로그아웃',
    cancelText: '취소',
    onConfirm: () => alert('로그아웃되었습니다.'),
    trigger: <Button variant="outline">로그아웃</Button>,
  },
}
