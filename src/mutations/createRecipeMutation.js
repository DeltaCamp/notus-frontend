import gql from 'graphql-tag'

import { recipeFragment } from '~/fragments/recipeFragment'

export const createRecipeMutation = gql`
  mutation createRecipeMutation($recipe: RecipeDto!) {
    createRecipe(recipe: $recipe) {
      ...recipeFragment
    }
  }
  ${recipeFragment}
`
