import { cn } from '@/shared/lib/utils'

interface SectionHeaderProps {
  title: string | React.ReactNode
  rightSlot?: React.ReactNode
  className?: string
}

export function SectionHeader({
  title,
  rightSlot,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'p-2 flex items-center justify-between',
        'fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b',
        className,
      )}
    >
      <h1 className="text-lg font-bold">{title}</h1>
      {rightSlot}
    </div>
  )
}
