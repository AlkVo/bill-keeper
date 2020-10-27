import {
  AmountString,
  AmountType,
  Bill,
  Classify,
  Day,
  Month,
  SumType,
} from './type'

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

export const addBill = (bill: Bill, data: Classify) => {
  //根据传入时间 取出年月日
  const tmpDate = new Date(parseInt(bill.time))
  const year = tmpDate.getFullYear() + ''
  const month = tmpDate.getMonth() + 1 + ''
  const day = tmpDate.getDate() + ''

  let monthsObj: Month = {}
  monthsObj = !data[year] ? {} : data[year]
  if (!monthsObj[month]) monthsObj[month] = {}
  if (!monthsObj[month][day]) monthsObj[month][day] = []

  monthsObj[month][day].push(bill)

  return { ...data, [year]: monthsObj }
}

export const sum = (data: Day): SumType => {
  //根据数据分析类型，根据day 获取 []，0 则为 in 的累加 reduce
  // [] key  push  reduce
  let tmpBills: Bill[] = []
  Object.keys(data).forEach((value) =>
    tmpBills.push.apply(tmpBills, data[value])
  )

  return {
    income: tmpBills.reduce((acc: number, value: Bill) => {
      if (value.type === AmountType['In']) acc += parseInt(value.amount)
      return acc
    }, 0),
    outcome: tmpBills.reduce((acc: number, value: Bill) => {
      if (value.type === AmountType['Out']) acc += parseInt(value.amount)
      return acc
    }, 0),
  }
}
