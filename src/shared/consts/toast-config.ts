import { CONTENT_MAX_LENGTH } from '@/shared/consts/form'

export const TOAST_DEFAULT_OPTIONS = {
  position: 'top-center',
  richColors: true,
} as const

export const ADD_TOAST = {
  success: {
    message: '할 일이 추가되었어요!',
    type: 'success',
    duration: 2000,
  },
  failure: {
    message: '할 일을 추가하는 데 실패했어요. 다시 시도해주세요.',
    type: 'error',
  },
} as const

export const EDIT_TOAST = {
  success: {
    message: '할 일이 수정되었어요!',
    type: 'success',
    duration: 2000,
  },
  noChanges: {
    message: '변경된 내용이 없어요.',
    type: 'warning',
  },
  failure: {
    message: '할 일을 수정하는 데 실패했어요. 다시 시도해주세요.',
    type: 'error',
  },
} as const

export const FORM_TOAST = {
  required: {
    message: '할 일을 입력해주세요.',
    type: 'warning',
  },
  maxLength: {
    message: `할 일은 ${CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
    type: 'warning',
  },
} as const
