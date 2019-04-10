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

export const en = {
  formFields: {
    frequencies: {
      everyTime: 'Every time',
      onlyOnce: 'Only once'
    },
    comparisons: {
      gt: 'more than',
      lt: 'less than',
      eq: 'equal to',
      gte: 'X or more',
      lte: 'X or less'
    }
  },
  templates: {
    string: {
      frequency: {
        default: 'Choose how often',
        everyTime: 'Every time',
        onlyOnce: 'Only once'
      },
    },
    uint256: {
      amount: {
        default: '[amount]',
        gt: 'more than [amount]',
        lt: 'less than [amount]',
        eq: '[amount]',
        gte: '[amount] or more',
        lte: '[amount] or less'
      }
    },
    address: {
      contractAddress: {
        default: '[address]'
      },
      senderAddress: {
        default: '[address]'
      },
      recipientAddress: {
        default: '[address]'
      }
    }
  },
  placeholders: {
    amount: `Amount in Ether`,
    contractAddress: `Contract Address (ie. 0x1234 ...)`,
    senderAddress: `Sender's Address (ie. 0x1234 ...)`,
    recipientAddress: `Recipient's Address (ie. 0x1234 ...)`
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
