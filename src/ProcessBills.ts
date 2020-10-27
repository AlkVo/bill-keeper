import { Bill, Classify, Day } from './type'

export const classify = (data: Bill[]) => {
  return data.reduce((acc: Classify, obj: Bill) => {
    let tmpDate = new Date(+obj['time'])

    let year = +tmpDate.getFullYear() + ''
    let month = tmpDate.getMonth() + 1 + ''
    let day = tmpDate.getDate() + ''

    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) acc[year][month] = {}
    if (!acc[year][month][day]) acc[year][month][day] = []

    acc[year][month][day].push(obj)

    return acc
  }, {})
}

export const getAllData = (data: Classify) => {
  let tmpObj: Day = {}
  Object.keys(data).forEach((year) =>
    Object.keys(data[year]).forEach((month) =>
      Object.keys(data[year][month]).forEach((day) => {
        tmpObj[year + month + day] = data[year][month][day]
      })
    )
  )
  return tmpObj
}

export const getMonthData = (data: Classify, date: string) => {
  let tmpDate = new Date(date)
  let year = tmpDate.getFullYear() + ''
  let month = tmpDate.getMonth() + 1 + ''
  let tmpObj: Day = {}

  Object.keys(data[year][month]).map((day: string) => {
    tmpObj[year + month + day] = data[year][month][day]
  })
  return tmpObj
}

export const getMonthsString = (data: Classify) => {
  let tmpArray: string[] = []
  Object.keys(data).forEach((year) =>
    tmpArray.push.apply(
      tmpArray,
      Object.keys(data[year]).map((month) => `${year}-${month}`)
    )
  )
  return tmpArray
}
