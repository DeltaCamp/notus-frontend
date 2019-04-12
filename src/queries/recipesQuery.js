import gql from 'graphql-tag'

export const recipesQuery = gql`
  query {
    recipes {
      id
      name
      createdAt
      updatedAt
    }
  }
`
