import React from 'react'
import { mapObjIndexed, pick } from 'ramda'
import { Text } from './Text'
import { Card } from './Card'
import { ComboBox } from './ComboBox'
import { View } from './View'
import { AddBill } from './AddBill'

type PositionProp = {
  left?: number | string
  right?: number | string
  top?: number | string
  bottom?: number | string
  width?: number
  height?: number
  fixed?: boolean
}

type PropsType<T> = T extends React.ComponentType<infer R> ? R : any

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
  mapObjIndexed(AddPosition, all) as {
    [P in keyof T]: React.ComponentType<PropsType<T[P]> & PositionProp>
  }

export const position = ___({ Text, Card, ComboBox, View, AddBill })
