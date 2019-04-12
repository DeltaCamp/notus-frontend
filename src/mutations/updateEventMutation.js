import gql from 'graphql-tag'

import { eventFragment } from '~/fragments/eventFragment'

export const updateEventMutation = gql`
  mutation updateEventMutation($event: EventDto!) {
    updateEvent(event: $event) {
      ...eventFragment
    }
  }
  ${eventFragment}
`
