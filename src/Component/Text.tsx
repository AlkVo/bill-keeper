import React from 'react'
import styled from '@emotion/styled'
import { TextTable, FontTable, ColorTable } from '../type'

const Label = styled.label((props: { type: keyof typeof TextTable }) => ({
  fontsize: FontTable[TextTable[props.type].font].fontsize,
  color: ColorTable[TextTable[props.type].color],
  width: '100%',
  height: '100%',
  display: 'inline-block',
  textAlign: TextTable[props.type].direction,
}))

export const Text = (props: {
  children: any
  type: keyof typeof TextTable
}) => {
  return <Label type={props.type}>{props.children}</Label>
}
