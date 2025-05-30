'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Toggle } from '@/shared/ui/toggle'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Toggle
      variant="outline"
      aria-label="Toggle theme"
      pressed={theme === 'dark'}
      onPressedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  )
}
