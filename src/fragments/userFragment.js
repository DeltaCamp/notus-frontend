import gql from 'graphql-tag'

export const userFragment = gql`
  fragment userFragment on UserEntity {
    id
    isAdmin
    name
    email
    confirmedAt
    etherscan_api_key
  }
`
