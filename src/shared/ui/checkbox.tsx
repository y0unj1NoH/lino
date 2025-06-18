'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva } from 'class-variance-authority'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const checkboxVariants = cva(
  'peer bg-background size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        primary:
          'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        secondary:
          'data-[state=checked]:bg-secondary-foreground data-[state=checked]:text-secondary data-[state=checked]:border-secondary-foreground',
        muted:
          'data-[state=checked]:bg-muted-foreground data-[state=checked]:text-muted data-[state=checked]:border-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

function Checkbox({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  variant?: 'primary' | 'secondary' | 'muted'
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
