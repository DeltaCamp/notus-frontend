import gql from 'graphql-tag'

import { contractFragment } from '~/fragments/contractFragment'

export const updateContractMutation = gql`
  mutation updateContractMutation($contract: ContractDto!) {
    updateContract(contract: $contract) {
      ...contractFragment
    }
  }
  ${contractFragment}
`
