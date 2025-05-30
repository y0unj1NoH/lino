import { Grid, List } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: <Grid className="h-6 w-6" /> },
  { href: '/unsorted', label: 'Unsorted', icon: <List className="h-6 w-6" /> },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-border bg-background p-3 dark:border-border dark:bg-background">
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center gap-0.5 transition-colors duration-500 ease-in-out hover:text-primary',
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
