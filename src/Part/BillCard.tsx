import React from 'react'
import moment from 'moment'
import { position } from '../Component'
import { Bill } from '../type'

export const BillCard = (props: { bills: Bill[]; direction: number }) => {
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
