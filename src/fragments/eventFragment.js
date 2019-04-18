import gql from 'graphql-tag'
import { matcherFragment } from '~/fragments/matcherFragment'

export const eventFragment = gql`
  fragment eventFragment on EventEntity {
    id
    title
    isPublic
    isActive
    user {
      id
      name
      email
    }
    parent {
      id
      matchers {
        ...matcherFragment
      }
      createdAt
      updatedAt
    }
    matchers {
      ...matcherFragment
    }
    createdAt
    updatedAt
    deletedAt
  }
  ${matcherFragment}
  ${matcherFragment}
`
