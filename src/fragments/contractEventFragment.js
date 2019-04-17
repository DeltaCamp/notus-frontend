import gql from 'graphql-tag'

export const contractEventFragment = gql`
  fragment contractEventFragment on ContractEventEntity {
    id
    name
    topic
    contract {
      id
      name
    }
  }
`