import React from 'react'
import { MdAdd } from 'react-icons/md'
import { IconContext } from 'react-icons'

export const Button = (props: { handleClick: () => void }) => {
  return (
    <IconContext.Provider value={{ color: 'blue', size: '20' }}>
      <button onClick={props.handleClick}>
        添加
        <MdAdd />
      </button>
    </IconContext.Provider>
  )
}
