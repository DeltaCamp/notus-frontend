import gql from 'graphql-tag'
import { userFragment } from './userFragment'

export const AppUserFragment = gql`
  fragment appUserFragment on AppUser {
    id
    user {
      ...userFragment
    }
    app {
      id
    }
    owner
    access_key_expires_at
    request_key_expires_at
    created_at
    updated_at
  }
  ${userFragment}
`
