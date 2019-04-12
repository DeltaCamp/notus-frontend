import gql from 'graphql-tag'

export const sourceQuery = gql`
  query sourceQuery(id: $id) {
    sources {
      source
      title
      dataType
    }
  }
`
