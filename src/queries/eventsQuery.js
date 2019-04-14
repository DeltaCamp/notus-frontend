import gql from 'graphql-tag'
import { eventFragment } from '~/fragments/eventFragment'

export const eventsQuery = gql`
  query {
    events {
      ...eventFragment
    }
  }
  ${eventFragment}
`
