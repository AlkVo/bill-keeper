import React from 'react'
import { IconContext, IconType } from 'react-icons/lib'

export const IconButton = (props: {
  size?: string
  handleClick?: () => void
  icon: IconType
}) => {
  return (
    <IconContext.Provider value={{ color: 'blue', size: props.size || '10' }}>
      <props.icon onClick={props.handleClick} />
    </IconContext.Provider>
  )
}
