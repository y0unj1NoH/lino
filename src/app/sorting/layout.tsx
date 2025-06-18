'use client'

import { SortingProvider } from '@/features/task/sort/ui/sorting-provider'
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
      <SortingProvider>
        <div className="relative h-[calc(100dvh-3rem)] mt-12">{children}</div>
      </SortingProvider>
    </>
  )
}
