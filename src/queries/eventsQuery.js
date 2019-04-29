import gql from 'graphql-tag'
import { eventFragment } from '~/fragments/eventFragment'

export const eventsQuery = gql`
  query eventsQuery($eventsQuery: EventsQuery) {
    events(eventsQuery: $eventsQuery) {
      totalCount
      skip
      take
      events {
        ...eventFragment
      }
    }
  }
  ${eventFragment}
`
