import gql from 'graphql-tag'

export const eventTypeQuery = gql`
  query($id: String!) {
    eventType(id: $id) {
      id
      name
    }
  }
`
