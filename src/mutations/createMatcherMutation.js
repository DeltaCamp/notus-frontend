import gql from 'graphql-tag'

import { matcherFragment } from '~/fragments/matcherFragment'

export const createMatcherMutation = gql`
  mutation createMatcherMutation($matcher: MatcherDto!) {
    createMatcher(matcher: $matcher) {
      ...matcherFragment
    }
  }
  ${matcherFragment}
`
