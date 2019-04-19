import gql from 'graphql-tag'

import { abiEventFragment } from '~/fragments/abiEventFragment'

export const abiEventQuery = gql`
  query abiEventQuery($id: Float!) {
    abiEvent(id: $id) {
      ...abiEventFragment
    }
  }
  ${abiEventFragment}
`