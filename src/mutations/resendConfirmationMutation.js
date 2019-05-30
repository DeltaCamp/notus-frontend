import gql from 'graphql-tag'

export const resendConfirmationMutation = gql`
  mutation resendConfirmationMutation {
    resendConfirmation {
      id
    }
  }
`
