import React, { useState } from 'react'
import moment from 'moment'
import { Card } from './Component/Card'
import { position } from './Component'
import { Bill, Classify } from './type'
import { values } from 'ramda'

const classify = (input: Bill[]) => {
  return input.reduce((acc: Classify, obj: Bill) => {
    let tmpDate = new Date(+obj['time'])

    if (!acc[tmpDate.getFullYear()]) acc[tmpDate.getFullYear()] = {}
    if (!acc[tmpDate.getFullYear()][tmpDate.getMonth()])
      acc[tmpDate.getFullYear()][tmpDate.getMonth()] = {}
    if (!acc[tmpDate.getFullYear()][tmpDate.getMonth()][tmpDate.getDay()])
      acc[tmpDate.getFullYear()][tmpDate.getMonth()][tmpDate.getDay()] = []

    acc[tmpDate.getFullYear()][tmpDate.getMonth()][tmpDate.getDay()].push(obj)

    return acc
  }, {})
}

function App() {
  const [data, setData] = useState<Classify>({})

  window.ipcRenderer.on('ping', (event: any, message: Bill[]) => {
    setData(classify(message))
  })

  const BillCard = (props: { bill: Bill }) => {
    const { bill } = props
    return (
      <Card>
        <position.Text
          right={20}
          top={15}
          width={70}
          height={25}
          type={'mInRight'}>
          {bill.amount}
        </position.Text>
        <position.Text
          width={70}
          height={15}
          right={20}
          bottom={10}
          type={'timeRight'}>
          {moment(new Date(parseInt(bill.time))).format('YY-MM-DD hh:mm:ss')}
        </position.Text>
        <div />
      </Card>
    )
  }

  const showAll = () => {
    let tmpArray: Bill[] = []
    Object.keys(data).forEach((year) =>
      Object.keys(data[year]).forEach((month) =>
        Object.keys(data[year][month]).forEach((day) =>
          tmpArray.push.apply(tmpArray, data[year][month][day])
        )
      )
    )
    return tmpArray.sort((a, b) => parseInt(b.time) - parseInt(a.time))
  }

  return (
    <div>
      {showAll().map((value, index) => (
        <BillCard key={index} bill={value} />
      ))}
    </div>
  )
}

export default App
