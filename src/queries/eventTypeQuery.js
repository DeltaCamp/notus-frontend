import gql from 'graphql-tag'

export const eventTypeQuery = gql`
  query {
    eventType(id: "2") {
      id
      name
      variables {
        id
        source
        sourceDataType
        description
        isPublic
      }
    }
  }
`
