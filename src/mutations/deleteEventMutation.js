import gql from 'graphql-tag'

export const deleteEventMutation = gql`
  mutation deleteEventMutation($eventId: Float!) {
    deleteEvent(eventId: $eventId) {
      id
    }
  }
`
