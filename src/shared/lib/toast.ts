import { toast } from 'sonner'

import { TOAST_DEFAULT_OPTIONS } from '@/shared/consts/toast-config'
import type { ToastConfig } from '@/shared/types/toast'

export function showToast(config: ToastConfig) {
  const { message, ...options } = config
  toast(message, { ...TOAST_DEFAULT_OPTIONS, ...options })
}
