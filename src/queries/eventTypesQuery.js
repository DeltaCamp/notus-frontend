import gql from 'graphql-tag'

export const eventTypesQuery = gql`
  query {
    eventTypes {
      id
      name
      variables {
        id
      }
      createdAt
      updatedAt
    }
  }
`
