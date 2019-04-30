import { OPERATORS } from '~/constants'

export function isValidDataTypeOperator (dataType, operator) {
  if (dataType.indexOf('int') !== -1) {
    // int / uint support all operations
    return true
  }

  // Otherwise only equals is supported
  return operator === OPERATORS.EQ || operator === OPERATORS.NOOP
}
