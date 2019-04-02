import gql from 'graphql-tag'

export const signOutMutation = gql`
  mutation signOutMutation {
    signOut @client
  }
`
