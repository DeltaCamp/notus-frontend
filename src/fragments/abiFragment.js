import gql from 'graphql-tag'

export const abiFragment = gql`
  fragment abiFragment on AbiEntity {
    id
    name
    abi
    isPublic
    abiEvents {
      id
      name
    }
  }
`