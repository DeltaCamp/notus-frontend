import gql from 'graphql-tag'
import { matcherFragment } from '~/fragments/matcherFragment'

export const eventFragment = gql`
  fragment eventFragment on EventEntity {
    id
    title
    isPublic
    isActive
    scope
    runCount
    user {
      id
      name
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
    webhookUrl
    webhookBody
    createdAt
    updatedAt
    deletedAt
  }
  ${matcherFragment}
`
