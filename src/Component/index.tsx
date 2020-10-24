import React from 'react'
import { mapObjIndexed, pick } from 'ramda'
import { Text } from './Text'
import { Card } from './Card'

type PositionProp = {
  left?: number
  right?: number
  top?: number
  bottom?: number
  width?: number
  height?: number
  fixed?: boolean
}

const AddPosition = <T extends any>(C: React.ComponentType<T>) => (
  props: T & PositionProp
) => {
  const directionObj: PositionProp = pick(
    ['left', 'right', 'top', 'bottom'],
    props
  )

  const positionObj = {
    ...directionObj,
    width: props.width || '100%',
    height: props.height || '100%',
  }
  return (
    <div
      style={{
        position: props.fixed ? 'absolute' : 'relative',
        ...positionObj,
      }}>
      <C {...props} />
    </div>
  )
}

const ___ = <T extends { [key: string]: React.ComponentType<any> }>(all: T) =>
  mapObjIndexed(AddPosition, all)

export const position = ___({ Text, Card })
