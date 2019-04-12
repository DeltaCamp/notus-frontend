import gql from 'graphql-tag'

export const recipeQuery = gql`
  query($id: String!) {
    recipe(id: $id) {
      id
      name
    }
  }
`
