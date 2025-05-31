import type { Meta, StoryObj } from '@storybook/nextjs'

import { ButtonGhost } from '@/shared/ui/button'
import { SectionHeader } from '@/shared/ui/section-header'

const meta = {
  title: 'Shared/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  args: {
    title: 'Lino',
    rightSlot: <span className="text-sm text-primary">May 31, 2025</span>,
  },
}

export const WithRightSlot: Story = {
  args: {
    title: 'Unsorted Tasks',
    rightSlot: (
      <div className="flex items-center gap-2">
        <ButtonGhost>Sort</ButtonGhost>
        <ButtonGhost>Organize</ButtonGhost>
      </div>
    ),
  },
}

export const WithCustomTitle: Story = {
  args: {
    title: (
      <svg
        width="46"
        height="30"
        viewBox="0 0 23 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.804 13V4.6H2.364V11.56H6.672V13H0.804ZM7.74319 13V7.216H9.25519V13H7.74319ZM8.48719 6.352C8.23119 6.352 8.01119 6.26 7.82719 6.076C7.65119 5.892 7.56319 5.672 7.56319 5.416C7.56319 5.16 7.65119 4.944 7.82719 4.768C8.01119 4.584 8.23119 4.492 8.48719 4.492C8.74319 4.492 8.95919 4.584 9.13519 4.768C9.31919 4.944 9.41119 5.16 9.41119 5.416C9.41119 5.672 9.31919 5.892 9.13519 6.076C8.95919 6.26 8.74319 6.352 8.48719 6.352ZM10.7976 13V7.216H12.1416L12.2256 7.864C12.3856 7.656 12.5896 7.472 12.8376 7.312C13.0936 7.152 13.3936 7.072 13.7376 7.072C14.3376 7.072 14.8256 7.264 15.2016 7.648C15.5856 8.032 15.7776 8.6 15.7776 9.352V13H14.2656V9.724C14.2656 9.3 14.1816 8.98 14.0136 8.764C13.8536 8.548 13.6336 8.44 13.3536 8.44C13.0496 8.44 12.7976 8.552 12.5976 8.776C12.4056 8.992 12.3096 9.336 12.3096 9.808V13H10.7976ZM19.7043 13.132C19.1683 13.132 18.6843 13.008 18.2523 12.76C17.8283 12.512 17.4923 12.16 17.2443 11.704C17.0043 11.248 16.8843 10.716 16.8843 10.108C16.8843 9.492 17.0043 8.96 17.2443 8.512C17.4923 8.056 17.8283 7.704 18.2523 7.456C18.6843 7.2 19.1683 7.072 19.7043 7.072C20.2483 7.072 20.7323 7.2 21.1563 7.456C21.5803 7.704 21.9123 8.056 22.1523 8.512C22.4003 8.96 22.5243 9.492 22.5243 10.108C22.5243 10.716 22.4003 11.248 22.1523 11.704C21.9123 12.16 21.5803 12.512 21.1563 12.76C20.7323 13.008 20.2483 13.132 19.7043 13.132ZM19.7043 11.764C20.0883 11.764 20.4003 11.624 20.6403 11.344C20.8883 11.056 21.0123 10.644 21.0123 10.108C21.0123 9.564 20.8883 9.152 20.6403 8.872C20.4003 8.584 20.0883 8.44 19.7043 8.44C19.3203 8.44 19.0083 8.584 18.7683 8.872C18.5363 9.152 18.4203 9.564 18.4203 10.108C18.4203 10.644 18.5363 11.056 18.7683 11.344C19.0083 11.624 19.3203 11.764 19.7043 11.764Z"
          fill="#8EE080"
        />
        <line
          y1="15.25"
          x2="23"
          y2="15.25"
          stroke="#3C6434"
          strokeWidth="1.5"
        />
      </svg>
    ),
    rightSlot: <span className="text-sm text-primary">May 31, 2025</span>,
    className: 'items-end',
  },
}
