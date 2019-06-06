import gql from 'graphql-tag'

import { abiFragment } from '~/fragments/abiFragment'

export const abiQuery = gql`
  query abiQuery($id: Float!) {
    abi(id: $id) {
      ...abiFragment
    }
  }
  ${abiFragment}
`