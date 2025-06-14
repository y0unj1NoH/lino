import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/ui/checkbox'

interface CheckboxWithLabelProps {
  id: string
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  color?: 'primary' | 'secondary' | 'muted'
  strikethrough?: boolean
  className?: string
}

export function CheckboxWithLabel({
  id,
  label,
  checked,
  onCheckedChange,
  color = 'primary',
  strikethrough = false,
  className,
}: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        className={className}
        variant={color}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-checked={checked}
        aria-label={label}
      />
      <label
        htmlFor={id}
        className={cn(
          checked && strikethrough && 'line-through',
          'text-sm',
          className,
        )}
      >
        {label}
      </label>
    </div>
  )
}
