import { Button as ButtonComponent } from '@/components/ui/button'

export interface ButtonProps {
  // 버튼의 children
  children: React.ReactNode
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
    <ButtonComponent variant={variant} size={size} {...props}>
      {children}
    </ButtonComponent>
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
    <ButtonComponent
      className={destructive ? 'text-destructive' : ''}
      size={size}
      variant="ghost"
      {...props}
    >
      {children}
    </ButtonComponent>
  )
}
