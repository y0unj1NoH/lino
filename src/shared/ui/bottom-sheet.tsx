'use client'

import * as React from 'react'

import { Button } from '@/shared/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer'

interface BottomSheetProps {
  children: React.ReactNode
  trigger?: React.ReactNode
  title?: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function BottomSheet({
  children,
  trigger,
  title = '',
  description = '',
  open: openProp,
  onOpenChange,
}: BottomSheetProps) {
  const [open, setOpen] = React.useState(false)
  const isControlled = openProp !== undefined

  const actualOpen = isControlled ? openProp : open

  const handleOpenChange = (state: boolean) => {
    if (!isControlled) {
      setOpen(state)
    }
    if (onOpenChange) {
      onOpenChange(state)
    }
  }
  return (
    <Drawer open={actualOpen} onOpenChange={handleOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent>
        {title && (
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
        )}
        {
          // TODO: submit 같이 액션이 완료되었을 때 DrawerClose로 감싸는 거 고려하기
        }
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
