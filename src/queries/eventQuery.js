import gql from 'graphql-tag'
import { eventFragment } from '~/fragments/eventFragment'

export const eventQuery = gql`
  query eventQuery($id: Float!) {
    event(id: $id) {
      ...eventFragment
    }
  }
  ${eventFragment}
`
