import Link from 'next/link'

import { ThemeToggle } from '@/shared/ui/theme-toggle'

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <ThemeToggle />
      <Link href="/about">About</Link>
    </div>
  )
}
