import gql from 'graphql-tag'

export const destroyMatcherMutation = gql`
  mutation destroyMatcherMutation($id: Float!) {
    destroyMatcher(matcherId: $id)
  }
`
