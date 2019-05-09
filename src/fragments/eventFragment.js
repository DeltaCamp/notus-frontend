import gql from 'graphql-tag'

import { contractFragment } from '~/fragments/contractFragment'
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
    contract {
      ...contractFragment
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
    sendEmail
    color
  }
  ${contractFragment}
  ${matcherFragment}
`
