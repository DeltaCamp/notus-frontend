import cloneDeep from 'clone-deep'
import { omit } from 'lodash'

export const deepCloneMatcher = (matcher) => {
  const filteredMatcher = omit(matcher, ['id', 'createdAt', 'updatedAt', '__typename'])

  const clone = cloneDeep(filteredMatcher)

  return clone
}
