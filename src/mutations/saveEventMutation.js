import gql from 'graphql-tag'

export const saveEventMutation = gql`
  mutation saveEventMutation($event: Object!) {
    createEvent(event: $event)
  }
`
