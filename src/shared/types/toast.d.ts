export type ToastType = 'default' | 'success' | 'info' | 'warning' | 'error'


export interface ToastConfig {
  message: string
  type: ToastType
  duration?: number
}

