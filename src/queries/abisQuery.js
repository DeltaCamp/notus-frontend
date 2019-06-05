import gql from 'graphql-tag'

import { abiFragment } from '~/fragments/abiFragment'

export const abisQuery = gql`
  query abisQuery($abisQuery: AbisQuery) {
    abis(abisQuery: $abisQuery) {
      totalCount
      skip
      take
      abis {
        ...abiFragment
      }
    }
  }
  ${abiFragment}
`