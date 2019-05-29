import gql from 'graphql-tag'

import { networkFragment } from '~/fragments/networkFragment'

export const networksQuery = gql`
  query networksQuery {
    networks {
      ...networkFragment
    }
  }
  ${networkFragment}
`
