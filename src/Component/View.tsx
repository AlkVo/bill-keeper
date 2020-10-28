import React from 'react'
import styled from '@emotion/styled'

// transform add

const FormTable = {
  Normal: {
    background: 'transparent',
    opacity: '1',
    flex: false,
    transform: 'none',
  },
  Add: {
    background: '#FFFDF0',
    opacity: '0.9',
    flex: false,
    transform: 'none',
  },
  Flex: {
    background: 'transparent',
    opacity: '1',
    flex: true,
    transform: 'none',
  },
  TurnLeft50Per: {
    background: 'transparent',
    opacity: '1',
    flex: false,
    transform: 'translate(-50%,0)',
  },
}

const Div = styled.div((props: { form: keyof typeof FormTable }) => ({
  background: FormTable[props.form].background,
  opacity: FormTable[props.form].opacity,
  width: '100%',
  height: '100%',
  display: FormTable[props.form].flex ? 'flex' : 'block',
  justifyContent: 'space-between',
  transform: FormTable[props.form].transform,
}))

export const View = (props: {
  form: keyof typeof FormTable
  children: any
}) => {
  return <Div form={props.form}>{props.children}</Div>
}
