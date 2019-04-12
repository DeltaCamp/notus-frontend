import gql from 'graphql-tag'

import { dappFragment } from '~/fragments/dappFragment'

export const dappUsersQuery = gql`
  query dappUsersQuery($owner: Boolean, $userId: Float) {
    dappUsers(owner: $owner, userId: $userId) {
      id
      dapp {
        ...dappFragment
      }
    }
  }
  ${dappFragment}
`
