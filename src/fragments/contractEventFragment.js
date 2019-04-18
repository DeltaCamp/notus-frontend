import gql from 'graphql-tag'

export const abiEventFragment = gql`
  fragment abiEventFragment on abiEventEntity {
    id
    name
    topic
    abi {
      id
      name
    }
  }
`