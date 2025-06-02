import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 플러그인 설정
dayjs.extend(utc)

// UTC로 통일
export const toUTCDate = (date: Date | string): Date => {
  return dayjs.utc(date).toDate()
}

export const getCurrentDate = (): Date => {
  return dayjs.utc().toDate()
}

export const formatDate = (date: Date | string): string => {
  return dayjs.utc(date).format()
}

export const formatDateToEnglish = (date: Date | string): string => {
  return dayjs.utc(date).format('MMM D, YYYY')
}

export const isToday = (date: Date | string): boolean => {
  return dayjs.utc(date).isSame(dayjs.utc(), 'day')
}
