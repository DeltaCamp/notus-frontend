import gql from 'graphql-tag'

export const signUpMutation = gql`
  mutation signUp($email: String!) {
    signUp(email: $email) @client
  }
`
