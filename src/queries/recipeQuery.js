import gql from 'graphql-tag'

import { recipeFragment } from '~/fragments/recipeFragment'

export const recipeQuery = gql`
  query($id: String!) {
    recipe(id: $id) {
      ...recipeFragment
    }
  }
  ${recipeFragment}
`
