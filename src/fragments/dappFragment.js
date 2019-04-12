import gql from 'graphql-tag'

export const dappFragment = gql`
  fragment dappFragment on DappEntity {
    id
    name
  }
`
