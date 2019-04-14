import gql from 'graphql-tag'

import { appFragment } from '~/fragments/appFragment'

export const appUsersQuery = gql`
  query appUsersQuery($owner: Boolean, $userId: Float) {
    appUsers(owner: $owner, userId: $userId) {
      id
      app {
        ...appFragment
      }
    }
  }
  ${appFragment}
`
