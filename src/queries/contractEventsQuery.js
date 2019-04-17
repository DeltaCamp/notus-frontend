import gql from 'graphql-tag'

export const contractEventsQuery = gql`
  query contractEventsQuery {
    contractEvents {
      id
      name
      contract {
        name
      }
      contractEventInputs {
        id
        name
      }
    }
  }
`