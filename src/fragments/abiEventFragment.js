import gql from 'graphql-tag'

export const abiEventFragment = gql`
  fragment abiEventFragment on AbiEventEntity {
    id
    name
    abi {
      id
      name
    }
    abiEventInputs {
      id
      name
    }
  }
`
