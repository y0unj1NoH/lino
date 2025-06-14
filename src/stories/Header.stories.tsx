import type { Meta, StoryObj } from '@storybook/nextjs'

import { formatDateToEnglish, getCurrentDate } from '@/shared/lib/date'
import { ButtonGhost } from '@/shared/ui/button'
import { Header } from '@/shared/ui/header'

const meta = {
  title: 'Shared/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof Header>

// 기본 헤더 (홈)
export const Home: Story = {
  render: () => (
    <Header>
      <Header.Left>
        <Header.Logo>Lino</Header.Logo>
      </Header.Left>
      <Header.Right>
        <Header.Date>{formatDateToEnglish(getCurrentDate())}</Header.Date>
      </Header.Right>
    </Header>
  ),
}

// 뒤로가기가 있는 헤더
export const WithBackButton: Story = {
  render: () => (
    <Header>
      <Header.Left>
        <Header.BackButton />
      </Header.Left>
      <Header.Center>
        <Header.Title>Page Title</Header.Title>
      </Header.Center>
    </Header>
  ),
}

// 액션 버튼이 있는 헤더
export const WithActions: Story = {
  render: () => (
    <Header>
      <Header.Left>
        <Header.BackButton />
      </Header.Left>
      <Header.Center>
        <Header.Title>Settings</Header.Title>
      </Header.Center>
      <Header.Right>
        <Header.Actions>
          <ButtonGhost>Save</ButtonGhost>
          <ButtonGhost>Reset</ButtonGhost>
        </Header.Actions>
      </Header.Right>
    </Header>
  ),
}

// 모든 요소가 있는 헤더
export const AllSection: Story = {
  render: () => (
    <Header>
      <Header.Left>
        <Header.BackButton />
        <Header.Logo>Lino</Header.Logo>
      </Header.Left>
      <Header.Center>
        <Header.Title>Task Details</Header.Title>
      </Header.Center>
      <Header.Right>
        <Header.Date>{formatDateToEnglish(getCurrentDate())}</Header.Date>
        <Header.Actions>
          <ButtonGhost>Edit</ButtonGhost>
          <ButtonGhost>Delete</ButtonGhost>
        </Header.Actions>
      </Header.Right>
    </Header>
  ),
}
