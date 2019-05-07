import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment userFragment on User {
    id
    email
    isAdmin
    access_key_expires_at
  }
`
