import gql from 'graphql-tag'
import { UserFragment } from './UserFragment'

export const DappUserFragment = gql`
  fragment dappUserFragment on DappUser {
    id
    user {
      ...userFragment
    }
    dapp {
      id
    }
    owner
    access_key_expires_at
    request_key_expires_at
    created_at
    updated_at
  }
  ${UserFragment}
`;
