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

/**
 * 기준 시각(오전 4시)을 넘기면 날짜가 하루 증가하도록 오늘 날짜(YYYY-MM-DD) 반환
 * 예) 2024-06-01 오전 3시 → '2024-05-31', 2024-06-01 오전 5시 → '2024-06-01'
 * @param {Date} [date=new Date()] 기준이 되는 날짜(기본값: 현재 시각)
 * @returns {string} 오전 4시 기준의 오늘 날짜(YYYY-MM-DD)
 */
export const getTodayBy4am = (date = new Date()): string => {
  return dayjs(date).subtract(4, 'hour').format('YYYY-MM-DD')
}

/**
 * 마지막 리셋 날짜가 오늘(오전 4시 기준)과 같은지 여부 반환
 * @param {string | undefined} lastResetDate 마지막 리셋된 날짜(YYYY-MM-DD)
 * @param {Date} [now=new Date()] 기준이 되는 현재 시각(기본값: 현재 시각)
 * @returns {boolean} 오늘(오전 4시 기준)과 같으면 true 아니면 false
 */
export const isResetToday = (
  lastResetDate: string | undefined,
  now = new Date(),
): boolean => {
  if (!lastResetDate) {
    return false
  }
  const todayBy4am = getTodayBy4am(now)
  return lastResetDate === todayBy4am
}
