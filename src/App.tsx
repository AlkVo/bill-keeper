import React, { useState } from 'react'
import moment from 'moment'
import { position } from './Component'
import { Bill, Classify } from './type'

const classify = (data: Bill[]) => {
  return data.reduce((acc: Classify, obj: Bill) => {
    let tmpDate = new Date(+obj['time'])

    let year = tmpDate.getFullYear()
    let month = tmpDate.getMonth() + 1
    let day = tmpDate.getDate()

    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) acc[year][month] = {}
    if (!acc[year][month][day]) acc[year][month][day] = []

    acc[year][month][day].push(obj)

    return acc
  }, {})
}

const BillCard = (props: { bills: Bill[]; direction: number }) => {
  const { bills, direction } = props
  return (
    <div>
      {bills.map((bill, index) => (
        <position.Card
          key={index}
          width={170}
          height={70}
          left={direction % 2 > 0 ? '0' : 170}>
          <position.Text
            fixed={true}
            top={15}
            height={25}
            type={`m${bill.type === '0' ? 'In' : 'Out'}${
              direction % 2 > 0 ? 'Left' : 'Right'
            }`}>
            {bill.amount}
          </position.Text>
          <position.Text
            fixed={true}
            height={15}
            bottom={10}
            type={`time${direction % 2 > 0 ? 'Left' : 'Right'}`}>
            {moment(new Date(parseInt(bill.time))).format('YY-MM-DD hh:mm:ss')}
          </position.Text>
          <div />
        </position.Card>
      ))}
    </div>
  )
}

const getAllData = (data: Classify) => {
  let tmpObj: { [key: string]: Bill[] } = {}
  Object.keys(data).forEach((year) =>
    Object.keys(data[year]).forEach((month) =>
      Object.keys(data[year][month]).forEach((day) => {
        tmpObj[year + month + day] = data[year][month][day]
      })
    )
  )
  return tmpObj
}

const getMonthData = (data: Classify, date: string) => {
  let tmpDate = new Date(date)
  let year = tmpDate.getFullYear()
  let month = tmpDate.getMonth() + 1
  let tmpObj: { [key: string]: Bill[] } = {}

  Object.keys(data[year][month]).map((day: string) => {
    tmpObj[year + month + day] = data[year][month][day]
  })
  return tmpObj
}

const getMonthsString = (data: Classify) => {
  let tmpArray: string[] = []
  Object.keys(data).forEach((year) =>
    tmpArray.push.apply(
      tmpArray,
      Object.keys(data[year]).map((month) => `${year}-${month}`)
    )
  )
  return tmpArray
}

const showDaysData = (input: { [key: string]: Bill[] }) => {
  return Object.keys(input)
    .sort((a, b) => {
      return parseInt(b) - parseInt(a)
    })
    .map((key, index) => (
      <BillCard key={key} direction={index} bills={input[key]} />
    ))
}

function App() {
  const [allData, setAllData] = useState<Classify>({})
  const [month, setMonth] = useState('')

  window.ipcRenderer.on('ping', (event: any, message: Bill[]) => {
    setAllData(classify(message))
  })

  return (
    <div>
      <position.ComboBox
        options={
          Object.keys(allData).length > 0 ? getMonthsString(allData) : []
        }
        handleChange={(value: string) =>
          setMonth(/\d+/.test(value) ? value : '')
        }
      />
      {showDaysData(
        month === '' ? getAllData(allData) : getMonthData(allData, month)
      )}
    </div>
  )
}

export default App
