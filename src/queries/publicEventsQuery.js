import gql from 'graphql-tag'
import { eventFragment } from '~/fragments/eventFragment'

export const publicEventsQuery = gql`
  query {
    publicEvents {
      ...eventFragment
    }
  }
  ${eventFragment}
`
