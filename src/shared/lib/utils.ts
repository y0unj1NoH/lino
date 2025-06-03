import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function once(fn: () => void) {
  let called = false
  return () => {
    if (!called) {
      called = true
      fn()
    }
  }
}
