import gql from 'graphql-tag'

import { matcherFragment } from '~/fragments/matcherFragment'

export const updateMatcherMutation = gql`
  mutation updateMatcherMutation($matcher: MatcherDto!) {
    updateMatcher(matcher: $matcher) {
      ...matcherFragment
    }
  }
  ${matcherFragment}
`
