import gql from 'graphql-tag'

import { abiEventFragment } from '~/fragments/abiEventFragment'

export const abiEventsQuery = gql`
  query abiEventsQuery($abiEventsQuery: AbiEventsQuery) {
    abiEvents(abiEventsQuery: $abiEventsQuery) {
      totalCount
      skip
      take
      abiEvents {
        ...abiEventFragment
      }
    }
  }
  ${abiEventFragment}
`