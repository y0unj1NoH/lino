import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog as BaseAlertDialog,
} from '@/shared/ui/base-alert-dialog'

interface AlertDialogProps {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  trigger?: React.ReactNode
  destructive?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AlertDialog({
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  trigger,
  destructive = false,
  open,
  onOpenChange,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction destructive={destructive} onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  )
}
