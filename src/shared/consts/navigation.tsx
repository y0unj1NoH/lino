import { Grid2X2, List } from 'lucide-react'

export const BOTTOM_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: <Grid2X2 className="h-6 w-6" /> },
  { href: '/unsorted', label: 'Unsorted', icon: <List className="h-6 w-6" /> },
] as const
