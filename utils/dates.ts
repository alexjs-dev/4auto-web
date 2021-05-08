import moment from 'moment'

const DAY_MS = 24 * 60 * 60 * 1000

export const getYearStartMs = (year: string) => {
  if (!year || year === '') return 0
  return moment(year).startOf('year').valueOf() - DAY_MS
}

export const getYearEndMs = (year: string) => {
  if (!year || year === '') return 0
  return moment(year).endOf('year').valueOf() - DAY_MS
}
