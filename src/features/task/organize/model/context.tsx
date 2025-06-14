'use client'

import { createContext, useContext, useReducer } from 'react'

import { UnsortedContextType } from './types'

export const UnsortedContext = createContext<UnsortedContextType | null>(null)

export function UnsortedProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, toggleEditMode] = useReducer((state) => !state, false)

  return (
    <UnsortedContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </UnsortedContext.Provider>
  )
}

export function useUnsorted() {
  const context = useContext(UnsortedContext)
  if (!context) {
    throw new Error('useUnsorted must be used within UnsortedProvider')
  }
  return context
}
