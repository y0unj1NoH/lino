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

/**
 * 오전 4시 기준의 오늘 날짜(YYYY-MM-DD)를 반환
 * 예) 2024-06-01 오전 3시 → '2024-05-31', 2024-06-01 오전 5시 → '2024-06-01'
 * @returns {string} 오전 4시 기준의 오늘 날짜(YYYY-MM-DD)
 */
export function getToday(): string {
  return getDateBy4am().format('YYYY-MM-DD')
}

/**
 * 오전 4시 기준의 오늘 날짜를 영어 형식(MMM D, YYYY)으로 반환
 * 예) 2024-06-01 오전 3시 → 'May 31, 2024', 2024-06-01 오전 5시 → 'Jun 1, 2024'
 * @returns {string} 오전 4시 기준의 오늘 날짜(영어 형식)
 */
export function getTodayEnglishFormat(): string {
  return getDateBy4am().format('MMM D, YYYY')
}

/**
 * 입력된 날짜(기본값: 현재 시각)에서 4시간을 빼서 dayjs 객체로 반환
 * 내부 정책상 오전 4시 기준 날짜 계산에 사용
 * @param {Date | string} [date=new Date()] 기준이 되는 날짜(기본값: 현재 시각)
 * @returns {dayjs.Dayjs} 4시간이 차감된 dayjs 객체
 */
function getDateBy4am(date: Date | string = new Date()): dayjs.Dayjs {
  return dayjs(date).subtract(4, 'hour')
}

/**
 * 마지막 리셋 날짜가 오늘(오전 4시 기준)과 같은지 여부 반환
 * @param {string | undefined} lastResetDate 마지막 리셋된 날짜(YYYY-MM-DD)
 * @param {Date} [now=new Date()] 기준이 되는 현재 시각(기본값: 현재 시각)
 * @returns {boolean} 오늘(오전 4시 기준)과 같으면 true 아니면 false
 */
export const isResetToday = (lastResetDate: string | undefined): boolean => {
  if (!lastResetDate) {
    return false
  }
  const todayBy4am = getToday()
  return lastResetDate === todayBy4am
}
