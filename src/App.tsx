import React, { useState } from 'react'
import { position } from './Component'
import { Bill, Classify, Month } from './type'
import { AddButton } from './Component/AddButton'

import {
  getAllData,
  getMonthData,
  getMonthsString,
  classify,
  addBill,
} from './ProcessBills'
import { BillCard } from './Part/BillCard'
import { View } from './Component/View'
import { IconContext } from 'react-icons/lib'
import { MdAdd } from 'react-icons/md'
import { IconButton } from './Component/IconButton'

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

  return (
    <div>
      <IconButton
        icon={MdAdd}
        handleClick={() => setShowAdd(true)}
        size={'25'}
      />
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
