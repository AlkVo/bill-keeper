import React from 'react'
import { SumType } from '../type'
import { Text } from './Text'

export const Sum = (props: { sum: SumType }) => {
  const { sum } = props
  return (
    <div>
      <Text type={'sum'}>支出总额:{sum.outcome}</Text>
      <Text type={'sum'}>支出总额:{sum.income}</Text>
    </div>
  )
}
