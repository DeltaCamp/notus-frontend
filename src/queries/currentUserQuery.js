import gql from 'graphql-tag'

import { userFragment } from '~/fragments/userFragment'

export const currentUserQuery = gql`
  query currentUserQuery {
    currentUser {
      ...userFragment
    }
  }
  ${userFragment}
`
