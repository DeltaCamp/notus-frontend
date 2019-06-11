import gql from 'graphql-tag'

import { abiEventFragment } from '~/fragments/abiEventFragment'

export const abiFragment = gql`
  fragment abiFragment on AbiEntity {
    id
    name
    abi
    isPublic
    abiEvents {
      ...abiEventFragment
    }
  }
  ${abiEventFragment}
`
