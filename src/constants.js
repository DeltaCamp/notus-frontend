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

export const PAGE_SIZE = 12
export const ADMIN_TABLE_PAGE_SIZE = 3

export const KEYS = {
  enter: 13,
  escape: 27,
  tab: 9
}

export const SOURCES = {
  CONTRACT_EVENT_INPUT: 'abiEventInput'
}

export const SCOPES = {
  TRANSACTION: 0,
  BLOCK: 1,
  CONTRACT_EVENT: 2
}

export const SCOPE_LABELS = {
  [SCOPES.TRANSACTION]: 'Transaction',
  [SCOPES.BLOCK]: 'Block',
  [SCOPES.CONTRACT_EVENT]: 'Contract Event'
}

export const OPERATORS = {
  NOOP: 0,
  EQ: 1,
  LT: 2,
  GT: 3,
  LTE: 4,
  GTE: 5,
  CONTAINS: 6
}

export const OPERATOR_LABELS = {
  [OPERATORS.NOOP]: 'is user defined',
  [OPERATORS.EQ]: 'is equal to',
  [OPERATORS.LT]: 'is less than',
  [OPERATORS.GT]: 'is greater than',
  [OPERATORS.LTE]: 'is less than or equal to',
  [OPERATORS.GTE]: 'is greater than or equal to',
  [OPERATORS.CONTAINS]: 'contains'
}

export const FREQUENCIES = {
  EVERY_TIME: '0',
  ONLY_ONCE: '1'
}
