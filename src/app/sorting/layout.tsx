'use client'

import { Header } from '@/shared/ui/header'

function SortingHeader() {
  return (
    <Header>
      <Header.Left>
        <Header.BackButton />
      </Header.Left>
      <Header.Center>
        <Header.Title>Lino Sorting</Header.Title>
      </Header.Center>
    </Header>
  )
}

export default function SortingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SortingHeader />
      {children}
    </>
  )
}
