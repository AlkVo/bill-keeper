import React, { useState } from 'react'
import { position } from './Component'
import { Bill, Classify, Month } from './type'
import { Button } from './Component/Button'

import {
  getAllData,
  getMonthData,
  getMonthsString,
  classify,
} from './ProcessBills'
import { BillCard } from './Part/BillCard'
import { View } from './Component/View'

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
  const [currentMonth, setCurrentMonth] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  window.ipcRenderer.on('ping', (event: any, message: Bill[]) => {
    setAllData(classify(message))
  })

  const addBill = (bill: Bill, data: Classify) => {
    //根据传入时间 取出年月日
    const tmpDate = new Date(parseInt(bill.time))
    const year = tmpDate.getFullYear() + ''
    const month = tmpDate.getMonth() + 1 + ''
    const day = tmpDate.getDate() + ''

    console.log('+++', year, month, day, bill.time)
    //年 月 日 判断是否为空，是则创建，否则push

    let monthsObj: Month = {}
    monthsObj = !data[year] ? {} : allData[year]
    if (!monthsObj[month]) monthsObj[month] = {}
    if (!monthsObj[month][day]) monthsObj[month][day] = []

    monthsObj[month][day].push(bill)

    return { ...data, [year]: monthsObj }
  }

  return (
    <div>
      <Button handleClick={() => setShowAdd(true)} />
      <position.ComboBox
        options={
          Object.keys(allData).length > 0 ? getMonthsString(allData) : []
        }
        handleChange={(value: string) =>
          setCurrentMonth(/\d+/.test(value) ? value : '')
        }
      />
      {showDaysData(
        currentMonth === ''
          ? getAllData(allData)
          : getMonthData(allData, currentMonth)
      )}

      {showAdd && (
        <position.View fixed={true} left={0} top={0} form={'Normal'}>
          <View form={'Add'}>{''}</View>
          <position.AddBill
            fixed={true}
            left={'50%'}
            top={'50%'}
            close={() => setShowAdd(false)}
            addBill={(newBill: Bill) => setAllData(addBill(newBill, allData))}
          />
        </position.View>
      )}
    </div>
  )
}

export default App
