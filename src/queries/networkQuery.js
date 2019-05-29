import gql from 'graphql-tag'

import { networkFragment } from '~/fragments/networkFragment'

export const networkQuery = gql`
  query networkQuery($networkId: Float!) {
    network(id: $networkId) {
      ...networkFragment
    }
  }
  ${networkFragment}
`
