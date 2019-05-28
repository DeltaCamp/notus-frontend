import gql from 'graphql-tag'

import { userFragment } from '~/fragments/userFragment'

export const updateUserMutation = gql`
  mutation updateUserMutation($user: UserDto!) {
    updateUser(user: $user) {
      ...userFragment
    }
  }
  ${userFragment}
`
