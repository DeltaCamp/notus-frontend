import gql from 'graphql-tag'

export const sourcesQuery = gql`
  query sourcesQuery {
    sources {
      source
      title
      dataType
    }
  }
`
