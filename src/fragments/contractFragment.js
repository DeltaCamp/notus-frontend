import gql from 'graphql-tag'

import { abiFragment } from '~/fragments/abiFragment'

export const contractFragment = gql`
  fragment contractFragment on ContractEntity {
    id
    name
    address
    isPublic
    abi {
      ...abiFragment
    }
    networkId
    createdAt
    updatedAt
    deletedAt
  }
  ${abiFragment}
`