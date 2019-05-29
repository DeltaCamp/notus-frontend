import gql from 'graphql-tag'

export const userFragment = gql`
  fragment userFragment on UserEntity {
    id
    isAdmin
    name
    etherscan_api_key
  }
`
