import gql from 'graphql-tag'

export const sourceQuery = gql`
  query sourceQuery($source: String!) {
    source(source: $source) {
      source
      title
      dataType
      metaDataType
    }
  }
`
