import gql from 'graphql-tag'

import { abiFragment } from '~/fragments/abiFragment'

export const createAbiMutation = gql`
  mutation createAbiMutation($abi: AbiDto!) {
    createAbi(abi: $abi) {
      ...abiFragment
    }
  }
  ${abiFragment}
`