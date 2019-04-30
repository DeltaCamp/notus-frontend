import gql from 'graphql-tag'

import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'

export const abiEventInputQuery = gql`
  query abiEventInputQuery($id: Float!) {
    abiEventInput (id: $id) {
      ...abiEventInputFragment
    }
  }
  ${abiEventInputFragment}
`
