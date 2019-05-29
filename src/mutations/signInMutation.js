import gql from 'graphql-tag'

export const signInMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) @client
  }
`
