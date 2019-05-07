import gql from 'graphql-tag'

import { contractFragment } from '~/fragments/contractFragment'

export const contractQuery = gql`
  query contractQuery($id: Float!) {
    contract(id: $id) {
      ...contractFragment
    }
  }
  ${contractFragment}
`
