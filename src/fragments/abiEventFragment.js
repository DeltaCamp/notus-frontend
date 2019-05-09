import gql from 'graphql-tag'

import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'

export const abiEventFragment = gql`
  fragment abiEventFragment on AbiEventEntity {
    id
    name
    isPublic
    abi {
      id
      name
    }
    abiEventInputs {
      ...abiEventInputFragment
    }
  }
  ${abiEventInputFragment}
`
