import type { Meta, StoryObj } from '@storybook/nextjs'
import { ThemeProvider } from 'next-themes'

import { ThemeToggle } from '@/shared/ui/ThemeToggle'

const meta = {
  title: 'Shared/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  args: {},
}

// TODO: 공통 컴포넌트 예시 추가
