export const getTime = () => {
  const date = new Date()

  let curMonth = `${date.getMonth() + 1}`
  curMonth = curMonth.length === 1 ? '0' + curMonth : curMonth

  let curDate = `${date.getDate()}`
  curDate = curDate.length === 1 ? '0' + curDate : curDate

  let curHours = `${date.getHours()}`
  curHours = curHours.length === 1 ? '0' + curHours : curHours

  let curMinutes = `${date.getMinutes()}`
  curMinutes = curMinutes.length === 1 ? '0' + curMinutes : curMinutes

  let curSeconds = `${date.getSeconds()}`
  curSeconds = curSeconds.length === 1 ? '0' + curSeconds : curSeconds

  return `${date.getFullYear()}${curMonth}${curDate}${curHours}${curMinutes}${curSeconds}`
}
