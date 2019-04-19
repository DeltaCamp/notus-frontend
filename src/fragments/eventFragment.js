import gql from 'graphql-tag'
import { matcherFragment } from '~/fragments/matcherFragment'

export const eventFragment = gql`
  fragment eventFragment on EventEntity {
    id
    title
    isPublic
    isActive
    scope
    user {
      id
      name
      email
    }
    abiEventId
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
`
