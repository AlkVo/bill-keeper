// 根据传入类型，确定显示颜色
export const ColorTable = {
  moneyIncome: '#FF5B59',
  moneyOutcome: '#63FF51',
  time: 'gray',
}

export const FontTable = {
  money: {
    fontWeight: 'bold',
    fontsize: 20,
  },
  time: {
    fontWeight: 'normal',
    fontsize: 10,
  },
}

type CombinationType = {
  color: keyof typeof ColorTable
  font: keyof typeof FontTable
  direction: 'left' | 'right'
}

export const TextTable: { [key: string]: CombinationType } = {
  mInLeft: {
    color: 'moneyIncome',
    font: 'money',
    direction: 'left',
  },
  mInRight: {
    color: 'moneyIncome',
    font: 'money',
    direction: 'right',
  },
  mOutLeft: {
    color: 'moneyOutcome',
    font: 'money',
    direction: 'left',
  },
  mOutRight: {
    color: 'moneyOutcome',
    font: 'money',
    direction: 'right',
  },
  timeLeft: {
    color: 'time',
    font: 'time',
    direction: 'left',
  },
  timeRight: {
    color: 'time',
    font: 'time',
    direction: 'right',
  },
}

export type Bill = {
  type: string
  time: string
  category: string
  amount: string
}

export type Classify = {
  [key: string]: { [key: string]: { [key: string]: Bill[] } }
}
