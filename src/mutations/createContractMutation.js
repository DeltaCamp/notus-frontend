import gql from 'graphql-tag'

import { contractFragment } from '~/fragments/contractFragment'

export const createContractMutation = gql`
  mutation createContractMutation($contract: ContractDto!) {
    createContract(contract: $contract) {
      ...contractFragment
    }
  }
  ${contractFragment}
`
