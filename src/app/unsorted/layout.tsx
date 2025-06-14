'use client'

import Link from 'next/link'

import {
  UnsortedProvider,
  useUnsorted,
} from '@/features/task/organize/model/context'
import { EditActions } from '@/features/task/organize/ui/edit-actions'
import { ButtonGhost } from '@/shared/ui/button'
import { Header } from '@/shared/ui/header'

function UnsortedHeader() {
  const { isEditMode, toggleEditMode } = useUnsorted()
  return (
    <Header>
      <Header.Left>
        <Header.Title>Unsorted Tasks</Header.Title>
      </Header.Left>
      <Header.Right>
        <Header.Actions>
          {isEditMode ? (
            <EditActions />
          ) : (
            <>
              <ButtonGhost>
                <Link href="/sorting">Sort</Link>
              </ButtonGhost>
              <ButtonGhost onClick={toggleEditMode}>Organize</ButtonGhost>
            </>
          )}
        </Header.Actions>
      </Header.Right>
    </Header>
  )
}

export default function UnsortedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UnsortedProvider>
      <UnsortedHeader />
      {children}
    </UnsortedProvider>
  )
}
