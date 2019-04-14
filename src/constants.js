export const CHALLENGE_PRIORITY_LOW = 'Low'
export const CHALLENGE_PRIORITY_MEDIUM = 'Medium'
export const CHALLENGE_PRIORITY_HIGH = 'High'

export const CHALLENGE_STATUS_OPEN = 'Open'
export const CHALLENGE_STATUS_CLOSED = 'Closed'

export const SUCCESS = 'success'
export const GREY = 'grey'
export const INFO = 'info'
export const WARNING = 'warning'
export const DANGER = 'danger'

export const OPERATORS = {
  NOOP: 0,
  EQ: 1,
  LT: 2,
  GT: 3,
  LTE: 4,
  GTE: 5
}

export const OPERATOR_LABELS = {
  [OPERATORS.NOOP]: 'is user defined',
  [OPERATORS.EQ]: 'equal to',
  [OPERATORS.LT]: 'less than',
  [OPERATORS.GT]: 'greater than',
  [OPERATORS.LTE]: 'less than or equal to',
  [OPERATORS.GTE]: 'greater than or equal to',
}

export const OPERAND_DATA_TYPES = {
  WEI: 0,
  KWEI: 1,
  MWEI: 2,
  GWEI: 3,
  MICROETHER: 4,
  MILLIETHER: 5,
  ETHER: 6,
  NUMBER: 7
}

export const FREQUENCIES = {
  EVERY_TIME: '0',
  ONLY_ONCE: '1'
}

export const en = {
  formFields: {
    frequencies: {
      [FREQUENCIES.EVERY_TIME]: 'every time',
      [FREQUENCIES.ONLY_ONCE]: 'only once'
    },
    operators: {
      [OPERATORS.EQ]: 'equal to',
      [OPERATORS.LT]: 'less than',
      [OPERATORS.GT]: 'more than',
      [OPERATORS.LTE]: 'X or less',
      [OPERATORS.GTE]: 'X or more',
    }
  },
  templates: {
    frequency: { // type
      [FREQUENCIES.EVERY_TIME]: 'every time',
      [FREQUENCIES.ONLY_ONCE]: 'only once'
    },
    'transaction.value': {
      [OPERATORS.EQ]: '[amount]', // operator
      [OPERATORS.LT]: 'less than [amount]',
      [OPERATORS.GT]: 'more than [amount]',
      [OPERATORS.LTE]: '[amount] or less',
      [OPERATORS.GTE]: '[amount] or more',
    },
    'transaction.to': {
      [OPERATORS.EQ]: '[address]'
    },
    'transaction.from': {
      [OPERATORS.EQ]: '[address]'
    },
    'log.topic[2]': {
      [OPERATORS.EQ]: '[address]'
    },
    'log.topic[3]': {
      [OPERATORS.EQ]: '[amount]', // operator
      [OPERATORS.LT]: 'less than [amount]',
      [OPERATORS.GT]: 'more than [amount]',
      [OPERATORS.LTE]: '[amount] or less',
      [OPERATORS.GTE]: '[amount] or more',
    },
    address: {
    }
  },
  placeholders: {
    amount: `Amount in Ether`
  }
}

// export const CHALLENGE_ANSWER_LABEL = [
//   'Pending',
//   'Accepted',
//   'Rejected'
// ]

// export const CHALLENGE_RESOLUTION_LABEL = [
//   'Pending',
//   'Appeal Affirmed',
//   'Appeal Dismissed',
//   'Confirmed'
// ]

// export const CHALLENGE_STATUS_LABEL = [
//   { label: 'Open', colour: GREY },
//   { label: 'Acceptance Pending', colour: GREY },
//   { label: 'Rejection Pending', colour: GREY },
//   { label: 'Challenge Accepted', colour: SUCCESS },
//   { label: 'Challenge Rejected', colour: DANGER },
//   { label: 'Acceptance Appealed', colour: GREY },
//   { label: 'Rejection Appealed', colour: GREY }
// ]

// export const CHALLENGE_PRIORITY_COLORS = {
//   [CHALLENGE_PRIORITY_LOW]: INFO,
//   [CHALLENGE_PRIORITY_MEDIUM]: WARNING,
//   [CHALLENGE_PRIORITY_HIGH]: DANGER
// }
