import gql from 'graphql-tag'

import { dappFragment } from '~/fragments/dappFragment'
import { matcherFragment } from '~/fragments/matcherFragment'

export const recipeFragment = gql`
  fragment recipeFragment on RecipeEntity {
    id
    name
    dapp {
      ...dappFragment
    }
    recipeMatchers {
      id
      matcher {
        ...matcherFragment
      }
    }
  }
  ${matcherFragment}
  ${dappFragment}
`
