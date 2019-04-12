import gql from 'graphql-tag'

import { eventFragment } from '~/fragments/eventFragment'

export const createEventMutation = gql`
  mutation createEventMutation($event: EventDto!) {
    createEvent(event: $event) {
      ...eventFragment
    }
  }
  ${eventFragment}
`
