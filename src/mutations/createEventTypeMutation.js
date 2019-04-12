import gql from 'graphql-tag'

import { eventTypeFragment } from '~/fragments/eventTypeFragment'

export const createEventTypeMutation = gql`
  mutation createEventTypeMutation($eventType: EventTypeDto!) {
    createEventType(eventType: $eventType) {
      ...eventTypeFragment
    }
  }
  ${eventTypeFragment}
`
