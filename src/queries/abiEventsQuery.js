import gql from 'graphql-tag'

export const abiEventsQuery = gql`
  query abiEventsQuery {
    abiEvents {
      id
      name
      abi {
        id
        name
      }
      abiEventInputs {
        id
        name
      }
    }
  }
`