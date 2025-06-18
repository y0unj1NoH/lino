import { Clock, Send, Star, Zap } from 'lucide-react'

import { MatrixTaskStatus, TaskStatus } from '@/entities/task/model/types'

export const CARD_DECK_OFFSETS = [
  'translate-y-[-50%] z-50',
  'translate-y-[calc(-50%-5px)] z-40',
  'translate-y-[calc(-50%-10px)] z-30',
  'translate-y-[calc(-50%-15px)] z-20',
  'translate-y-[calc(-50%-20px)] z-10',
] as const

export const MATRIX_CONFIG: Record<
  MatrixTaskStatus,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  [TaskStatus.UrgentImportant]: {
    label: 'Do Now!',
    icon: Zap,
  },
  [TaskStatus.UrgentNotImportant]: {
    label: 'Delegable',
    icon: Send,
  },
  [TaskStatus.NotUrgentImportant]: {
    label: 'Schedule',
    icon: Star,
  },
  [TaskStatus.NotUrgentNotImportant]: {
    label: 'Later',
    icon: Clock,
  },
}
