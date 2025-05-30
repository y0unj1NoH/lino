'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { BOTTOM_NAV_ITEMS } from '@/shared/consts/navigation'
import { cn } from '@/shared/lib/utils'

export function BottomNavigation() {
  const pathname = usePathname()
  const [clickedTab, setClickedTab] = useState<string>('')

  useEffect(() => {
    setClickedTab('')
  }, [pathname])

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-border bg-background p-3 dark:border-border dark:bg-background">
      {BOTTOM_NAV_ITEMS.map(({ href, label, icon }) => {
        const isActive = clickedTab === href || pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setClickedTab(href)}
            className={cn(
              'flex flex-col items-center gap-0.5 transition-colors duration-300 ease-in-out hover:text-primary',
              isActive ? 'text-primary' : 'text-muted-foreground/70',
            )}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`${label} 페이지로 이동`}
          >
            {icon}
            <small className="text-xs">{label}</small>
          </Link>
        )
      })}
    </nav>
  )
}
