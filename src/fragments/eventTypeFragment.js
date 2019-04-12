import gql from 'graphql-tag'

import { dappFragment } from '~/fragments/dappFragment'
import { matcherFragment } from '~/fragments/matcherFragment'

export const eventTypeFragment = gql`
  fragment eventTypeFragment on EventTypeEntity {
    id
    name
    dapp {
      ...dappFragment
    }
    eventTypeMatchers {
      id
      matcher {
        ...matcherFragment
      }
    }
  }
  ${matcherFragment}
  ${dappFragment}
`
