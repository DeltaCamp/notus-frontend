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
      title
      isPublic
      abiEventInputs {
        ...abiEventInputFragment
      }
    }
  }
  ${abiEventInputFragment}
`
