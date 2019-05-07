import gql from 'graphql-tag'

import { abiFragment } from '~/fragments/abiFragment'

export const contractFragment = gql`
  fragment contractFragment on ContractEntity {
    id
    name
    address
    abi {
      ...abiFragment
    }
    createdAt
    updatedAt
    deletedAt
  }
  ${abiFragment}
`