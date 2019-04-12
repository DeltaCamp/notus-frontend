import gql from 'graphql-tag'

export const eventTypesQuery = gql`
  query {
    eventTypes {
      id
      name
      createdAt
      updatedAt
    }
  }
`
