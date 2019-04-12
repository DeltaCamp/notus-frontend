import gql from 'graphql-tag'

import { recipeFragment } from '~/fragments/recipeFragment'

export const createEventTypeMutation = gql`
  mutation createEventTypeMutation($recipe: EventTypeDto!) {
    createEventType(recipe: $recipe) {
      ...recipeFragment
    }
  }
  ${recipeFragment}
`
