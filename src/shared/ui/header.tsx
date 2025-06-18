import { ChevronLeft } from 'lucide-react'
import { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'
import { ButtonGhost } from '@/shared/ui/button'

interface BaseProps {
  children: ReactNode
  className?: string
}

/**
 * 헤더 컴포넌트의 루트 컨테이너
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 헤더 컨테이너
 */
const Header = ({ children, className }: BaseProps) => {
  return (
    <header
      className={cn(
        'bg-background/80 fixed top-0 left-0 right-0 z-10 backdrop-blur-sm border-b border shadow-xs h-12 grid grid-cols-3 items-center px-4 py-2 overflow-hidden truncate',
        className,
      )}
    >
      {children}
    </header>
  )
}

/**
 * 헤더의 왼쪽 섹션
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 왼쪽 섹션 컨테이너
 */
const Left = ({ children, className }: BaseProps) => {
  return (
    <div
      className={cn('col-start-1 col-end-2 flex items-center gap-2', className)}
    >
      {children}
    </div>
  )
}

/**
 * 헤더의 중앙 섹션
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 중앙 섹션 컨테이너
 */
const Center = ({ children, className }: BaseProps) => {
  return (
    <div
      className={cn(
        'col-start-2 col-end-3 flex items-center justify-center gap-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * 헤더의 오른쪽 섹션
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 오른쪽 섹션 컨테이너
 */
const Right = ({ children, className }: BaseProps) => {
  return (
    <div
      className={cn(
        'col-start-3 col-end-4 flex items-center justify-end gap-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * 로고 컴포넌트
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 로고 컨테이너
 */
const Logo = ({ children, className }: BaseProps) => {
  return (
    <div className={cn('text-lg font-bold flex items-center', className)}>
      {children}
    </div>
  )
}

/**
 * 날짜 표시 컴포넌트
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 날짜 컨테이너
 */
const Date = ({ children, className }: BaseProps) => {
  return (
    <span
      className={cn(
        'text-primary text-xs font-semibold flex items-center',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * 페이지 제목 컴포넌트
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 제목 컨테이너
 */
const Title = ({ children, className }: BaseProps) => {
  return (
    <h1 className={cn('text-md font-semibold flex items-center', className)}>
      {children}
    </h1>
  )
}

/**
 * 액션 버튼들을 감싸는 컨테이너
 * @param {BaseProps} props - 컴포넌트 props
 * @returns {JSX.Element} 액션 버튼 컨테이너
 */
const Actions = ({ children, className }: BaseProps) => {
  return (
    <div
      className={cn('text-sm font-light flex items-center gap-1', className)}
    >
      {children}
    </div>
  )
}

/**
 * 뒤로가기 버튼 컴포넌트
 * @returns {JSX.Element} 뒤로가기 버튼
 */
const BackButton = () => {
  return (
    <ButtonGhost onClick={() => window.history.back()} size="icon">
      <ChevronLeft className="h-4 w-4" />
    </ButtonGhost>
  )
}

// 컴포넌트 조합을 위한 네임스페이스
Header.Left = Left
Header.Center = Center
Header.Right = Right
Header.Logo = Logo
Header.Date = Date
Header.Title = Title
Header.Actions = Actions
Header.BackButton = BackButton

export { Header }
