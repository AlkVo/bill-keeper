import React, { useState } from 'react'
import moment from 'moment'
import { Card } from './Component/Card'
import { position } from './Component'
import { Bill, Classify } from './type'

const classify = (input: Bill[]) => {
  return input.reduce((acc: Classify, obj: Bill) => {
    let tmpDate = new Date(+obj['time'])

    let year = tmpDate.getFullYear()
    let month = tmpDate.getMonth() + 1
    let day = tmpDate.getDate()

    console.log('hhhhh', year, month, day)

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

const getAllData = (input: Classify) => {
  let tmpObj: { [key: string]: Bill[] } = {}
  Object.keys(input).forEach((year) =>
    Object.keys(input[year]).forEach((month) =>
      Object.keys(input[year][month]).forEach((day) => {
        tmpObj[year + month + day] = input[year][month][day]
      })
    )
  )
  return tmpObj
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
  const [data, setData] = useState<Classify>({})

  window.ipcRenderer.on('ping', (event: any, message: Bill[]) => {
    setData(classify(message))
  })

  return <div>{showDaysData(getAllData(data))}</div>
}

export default App
