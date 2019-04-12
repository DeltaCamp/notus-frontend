import gql from 'graphql-tag'

import { recipeFragment } from '~/fragments/recipeFragment'
import { matcherFragment } from '~/fragments/matcherFragment'

export const eventFragment = gql`
  fragment eventFragment on EventEntity {
    id
    recipe {
      ...recipeFragment
    }
    eventMatchers {
      id
      matcher {
        ...matcherFragment
      }
    }
    createdAt
    updatedAt
  }
  ${recipeFragment}
  ${matcherFragment}
`
