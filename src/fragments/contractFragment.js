import gql from 'graphql-tag'

import { abiFragment } from '~/fragments/abiFragment'
import { userFragment } from '~/fragments/userFragment'

export const contractFragment = gql`
  fragment contractFragment on ContractEntity {
    id
    name
    address
    isPublic
    owner {
      ...userFragment
    }
    ownerId
    abi {
      ...abiFragment
    }
    networkId
    createdAt
    updatedAt
    deletedAt
  }
  ${abiFragment}
  ${userFragment}
`