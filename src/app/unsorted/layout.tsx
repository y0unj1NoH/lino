'use client'

import { useRouter } from 'next/navigation'

import { useTaskStore } from '@/entities/task/model/slice'
import {
  UnsortedProvider,
  useUnsorted,
} from '@/features/task/organize/model/context'
import { EditActions } from '@/features/task/organize/ui/edit-actions'
import { ButtonGhost } from '@/shared/ui/button'
import { Header } from '@/shared/ui/header'

// TODO: 로직 분리
function UnsortedHeader() {
  const { isEditMode, toggleEditMode } = useUnsorted()
  const router = useRouter()

  const sortingStatus = useTaskStore((state) => state.sortingStatus)
  const setSortingStatus = useTaskStore((state) => state.setSortingStatus)

  const handleSortClick = () => {
    const route = sortingStatus?.includes('ADDITIONAL')
      ? '/sorting/additional'
      : '/sorting'

    if (sortingStatus === 'UNSORTED') {
      setSortingStatus('SORTING')
    }
    if (sortingStatus === 'ADDITIONAL') {
      setSortingStatus('ADDITIONAL_SORTING')
    }

    router.push(route)
  }

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
              <ButtonGhost
                onClick={handleSortClick}
                disabled={sortingStatus === 'SORTED'}
              >
                Sort
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
