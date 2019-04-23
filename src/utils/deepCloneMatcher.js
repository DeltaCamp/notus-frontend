import cloneDeep from 'clone-deep'
import { omit } from 'lodash'

export const deepCloneMatcher = (matcher, isCreating) => {
  let filterFields = ['__typename', 'createdAt', 'updatedAt']

  if (isCreating) {
    filterFields = filterFields.concat(['id'])
  }

  const filteredMatcher = omit(matcher, filterFields)

  const clone = cloneDeep(filteredMatcher)

  return clone
}
