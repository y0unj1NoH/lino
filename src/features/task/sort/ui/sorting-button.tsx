'use client'

import { useRouter } from 'next/navigation'

import { useTaskStore } from '@/entities/task/model/slice'
import { Button } from '@/shared/ui/button'

interface SortingButtonProps {
  className?: string
}

export function SortingButton({ className }: SortingButtonProps) {
  const sortingStatus = useTaskStore((state) => state.sortingStatus)
  const router = useRouter()

  const handleClick = () => {
    router.push('/unsorted')
  }

  if (sortingStatus !== 'UNSORTED') {
    return null
  }

  return (
    <Button size="full" className={className} onClick={handleClick}>
      Sort Today's Tasks
    </Button>
  )
}
