'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Toggle } from '@/shared/ui/toggle'

interface ThemeToggleProps {
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

export function ThemeToggle({ className, size = 'default' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <Toggle
      variant="outline"
      size={size}
      aria-label="Toggle theme"
      pressed={theme === 'dark'}
      onPressedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      className={className}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  )
}
