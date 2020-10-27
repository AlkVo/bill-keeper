import React from 'react'

import styled from '@emotion/styled'
const Selected = styled.select({
  outline: 'none',
  width: '100%',
  height: '100%',
})

export const ComboBox = (props: {
  options: string[]
  handleChange: (value: string) => void
}) => {
  const { options, handleChange } = props
  return (
    <Selected onChange={(e) => handleChange(e.target.value)}>
      <option key={'all'}>所有账单</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Selected>
  )
}
