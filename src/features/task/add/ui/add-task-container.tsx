'use client'

import { useCallback, useEffect, useState } from 'react'

import { useTaskStore } from '@/entities/task/model/slice'
import { AddTaskForm } from '@/features/task/add/ui/add-task-form'
import { useKeyboard } from '@/shared/hooks/useKeyboard'
import { cn } from '@/shared/lib/utils'

export function AddTaskContainer() {
  const { shift } = useKeyboard()
  const [showOverlay, setShowOverlay] = useState(false)
  const sortingStatus = useTaskStore((state) => state.sortingStatus)

  const handleFocus = useCallback(() => {
    if (!showOverlay) {
      setShowOverlay(true)
      window.history.pushState({ overlay: true }, '')
    }
  }, [showOverlay])

  const handleOverlayClick = useCallback(() => {
    setShowOverlay(false)
    window.history.back()
  }, [])

  const handleOverlayKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowOverlay(false)
      window.history.back()
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      if (showOverlay) {
        setShowOverlay(false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showOverlay])

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
          onKeyDown={handleOverlayKeyDown}
          role="button"
          tabIndex={0}
          aria-label="close overlay"
        />
      )}
      <div
        className={cn(
          'fixed left-0 right-0 z-500 border h-22',
          'bg-background rounded-t-lg border-t p-4',
          'transition-[bottom] duration-300 ease-in-out',
        )}
        style={{
          bottom: `${shift}px`,
        }}
      >
        <AddTaskForm
          isTodayActive={sortingStatus === 'SORTED'}
          showOverlay={showOverlay}
          onFocus={handleFocus}
        />
      </div>
    </>
  )
}
