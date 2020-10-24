import React from 'react'

export const ComboBox = (props: {
  options: string[]
  handleChange: (value: string) => void
}) => {
  const { options, handleChange } = props
  return (
    <select onChange={(e) => handleChange(e.target.value)}>
      <option key={'all'}>所有账单</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
