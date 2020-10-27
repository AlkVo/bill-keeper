import React, { Fragment, useState } from 'react'
import { Bill, NewBill } from '../type'
import styled from '@emotion/styled'
import { MdClose } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { IconButton } from './IconButton'

const Div = styled.div({
  width: 260,
  height: 170,
  border: '1px solid #304848',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'translate(-50%,-50%)',
})

const DivColumn = styled.div({
  width: 200,
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const DivRow = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
})

const Button = styled.button({
  width: 60,
  height: 25,
  color: '#304848',
  border: '1px solid #304848',

  outline: 'none',
  '&:hover': {
    background: '#FFFDF0',
  },
})

const Number = styled.input({
  outline: 'none',
  width: 200,
  height: 25,
  '&::-webkit-inner-spin-button ': {
    WebkitAppearance: 'none',
  },
})

const CloseButton = styled.button({
  position: 'absolute',
  left: '100%',
  top: '-4%',
  border: 'none',
  background: 'transparent',
  outline: 'none',
})

export const AddBill = (props: {
  close: () => void
  addBill: (bill: Bill) => void
}) => {
  const { close, addBill } = props
  const [newBill, setNewBill] = useState<NewBill>({ amount: '0', type: '1' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('name', 'value', e.target.name, e.target.value)
    setNewBill({ ...newBill, [e.target.name]: e.target.value })
  }

  return (
    <Div>
      <DivColumn>
        <Number
          placeholder={' 请输入金额'}
          type={'number'}
          name={'amount'}
          onChange={handleChange}
        />
        <DivRow>
          <label>
            <input
              type='radio'
              name={'type'}
              value={'1'}
              onChange={handleChange}
              defaultChecked
            />
            支出
          </label>
          <label>
            <input
              type='radio'
              name={'type'}
              value={'0'}
              onChange={handleChange}
            />
            收入
          </label>
        </DivRow>
        <DivRow>
          <Button
            onClick={() => {
              let date = new Date()
              parseInt(newBill.amount) > 0 &&
                addBill({
                  ...newBill,
                  time: date.getTime().toString(),
                  category: 'muji',
                })

              close()
            }}>
            OK
          </Button>
        </DivRow>
      </DivColumn>
      <CloseButton onClick={close}>
        <IconButton icon={MdClose} size={'15'} />
      </CloseButton>
    </Div>
  )
}
