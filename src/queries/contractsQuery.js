import gql from 'graphql-tag'

import { contractFragment } from '~/fragments/contractFragment'

export const contractsQuery = gql`
  query contractsQuery($contractsQuery: ContractsQuery) {
    contracts(contractsQuery: $contractsQuery) {
      totalCount
      skip
      take
      contracts {
        ...contractFragment
      }
    }
  }
  ${contractFragment}
`
