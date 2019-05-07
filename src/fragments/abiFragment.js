import gql from 'graphql-tag'

import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'

export const abiFragment = gql`
  fragment abiFragment on AbiEntity {
    id
    name
    abi
    isPublic
    abiEvents {
      id
      name
      abiEventInputs {
        ...abiEventInputFragment
      }
    }
  }
  ${abiEventInputFragment}
`
