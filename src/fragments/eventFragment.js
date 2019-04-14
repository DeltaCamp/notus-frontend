import gql from 'graphql-tag'
import { matcherFragment } from '~/fragments/matcherFragment'

export const eventFragment = gql`
  fragment eventFragment on EventEntity {
    id
    title
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
  }
  ${matcherFragment}
  ${matcherFragment}
`
