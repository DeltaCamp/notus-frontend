import gql from 'graphql-tag'

export const confirmUserMutation = gql`
  mutation confirmUser($oneTimeKey: String!, $password: String!) {
    confirmUser(oneTimeKey: $oneTimeKey, password: $password) @client
  }
`
