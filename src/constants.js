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
export const ADMIN_TABLE_PAGE_SIZE = 50

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

export const META_DATA_TYPES = {
  WEI: 'wei',
  TIMESTAMP: 'timestamp',
  FIXED_POINT_1: "fixedPoint1",
  FIXED_POINT_2: "fixedPoint2",
  FIXED_POINT_3: "fixedPoint3",
  FIXED_POINT_4: "fixedPoint4",
  FIXED_POINT_5: "fixedPoint5",
  FIXED_POINT_6: "fixedPoint6",
  FIXED_POINT_7: "fixedPoint7",
  FIXED_POINT_8: "fixedPoint8",
  FIXED_POINT_9: "fixedPoint9",
  FIXED_POINT_10: "fixedPoint10",
  FIXED_POINT_11: "fixedPoint11",
  FIXED_POINT_12: "fixedPoint12",
  FIXED_POINT_13: "fixedPoint13",
  FIXED_POINT_14: "fixedPoint14",
  FIXED_POINT_15: "fixedPoint15",
  FIXED_POINT_16: "fixedPoint16",
  FIXED_POINT_17: "fixedPoint17",
  FIXED_POINT_18: "fixedPoint18",
  FIXED_POINT_19: "fixedPoint19",
  FIXED_POINT_20: "fixedPoint20",
  FIXED_POINT_21: "fixedPoint21",
  FIXED_POINT_22: "fixedPoint22",
  FIXED_POINT_23: "fixedPoint23",
  FIXED_POINT_24: "fixedPoint24",
  FIXED_POINT_25: "fixedPoint25",
  FIXED_POINT_26: "fixedPoint26",
  FIXED_POINT_27: "fixedPoint27",
  FIXED_POINT_28: "fixedPoint28",
  FIXED_POINT_29: "fixedPoint29",
  FIXED_POINT_30: "fixedPoint30",
  FIXED_POINT_31: "fixedPoint31"
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
