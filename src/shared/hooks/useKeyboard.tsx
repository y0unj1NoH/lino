'use client'

import { useEffect, useRef, useState } from 'react'

const INPUT_BOTTOM_OFFSET = 16 * 4
const KEYBOARD_DETECT_THRESHOLD = 20

export function useKeyboard() {
  const [isIOS, setIsIOS] = useState(false)
  const [visible, setVisible] = useState(false)
  // 실제 Bottom에 사용할 값 (translateY(shift)으로 변경할 수 있음)
  const [shift, setShift] = useState(INPUT_BOTTOM_OFFSET)
  const keyboardRef = useRef(0)

  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    const handler = () => {
      const keyboardHeight =
        window.innerHeight - (window.visualViewport?.height ?? 0)
      const prev = keyboardRef.current

      if (Math.abs(prev - keyboardHeight) > KEYBOARD_DETECT_THRESHOLD) {
        keyboardRef.current = keyboardHeight
        setVisible(keyboardHeight > 0)
        if (isIOS) {
          setShift(keyboardHeight > 0 ? keyboardHeight : INPUT_BOTTOM_OFFSET)
        } else {
          setShift(keyboardHeight > 0 ? 0 : INPUT_BOTTOM_OFFSET)
        }
      }
    }

    window.visualViewport?.addEventListener('resize', handler)
    return () => {
      window.visualViewport?.removeEventListener('resize', handler)
    }
  }, [isIOS, keyboardRef, setVisible, setShift])

  return {
    visible,
    shift,
  }
}
