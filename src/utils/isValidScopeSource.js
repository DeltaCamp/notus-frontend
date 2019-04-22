import { SCOPES } from '~/constants'

export function isValidScopeSource (scope, source) {
  switch (scope) {
    case SCOPES.BLOCK:
      return source.startsWith('block')
    case SCOPES.TRANSACTION:
      return source.startsWith('block') || source.startsWith('transaction')
    default:
      return true
  }
}
