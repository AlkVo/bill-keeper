import React from 'react'
import styled from '@emotion/styled'

type FormType = 'Normal' | 'Add'

const FormTable = {
  Normal: {
    background: 'transparent',
    opacity: '1',
  },
  Add: {
    background: '#FFFDF0',
    opacity: '0.9',
  },
}

const Div = styled.div((props: { form: FormType }) => ({
  background: FormTable[props.form].background,
  opacity: FormTable[props.form].opacity,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}))

export const View = (props: { form: FormType; children: any }) => {
  return <Div form={props.form}>{props.children}</Div>
}
