import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'

interface CheckboxWithLabelProps {
  id: string
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  color?: 'primary' | 'secondary' | 'muted'
  Strikethrough?: boolean
  className?: string
}

export function CheckboxWithLabel({
  id,
  label,
  checked,
  onCheckedChange,
  color = 'primary',
  Strikethrough = false,
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
      <Label
        htmlFor={id}
        className={cn(checked && Strikethrough && 'line-through', 'text-sm')}
      >
        {label}
      </Label>
    </div>
  )
}
