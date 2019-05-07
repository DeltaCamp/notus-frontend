import { OPERATORS } from '~/constants'

export function isValidDataTypeOperator (dataType, operator) {
  if (dataType.indexOf('int') !== -1) {
    // int / uint support all operations
    return operator !== OPERATORS.CONTAINS
  }

  if (dataType === 'address') {
    return operator === OPERATORS.EQ || operator === OPERATORS.NOOP  
  }

  return operator === OPERATORS.CONTAINS || operator === OPERATORS.EQ || operator === OPERATORS.NOOP
}
