import { ComponentProps } from 'react'

import { Button as BaseButton } from '@/shared/ui/base-button'

export interface ButtonProps extends ComponentProps<'button'> {
  // 버튼의 크기 (default, sm, lg, full, icon)
  size?: 'default' | 'sm' | 'lg' | 'full' | 'icon'
  // 버튼의 스타일 (default, outline, muted, semiMuted)
  variant?: 'default' | 'outline' | 'muted' | 'semiMuted'
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <BaseButton variant={variant} size={size} {...props}>
      {children}
    </BaseButton>
  )
}

export interface ButtonGhostProps extends Omit<ButtonProps, 'variant'> {
  destructive?: boolean
}

export function ButtonGhost({
  children,
  size = 'default',
  destructive = false,
  ...props
}: ButtonGhostProps) {
  return (
    <BaseButton
      className={destructive ? 'text-destructive' : ''}
      size={size}
      variant="ghost"
      {...props}
    >
      {children}
    </BaseButton>
  )
}
