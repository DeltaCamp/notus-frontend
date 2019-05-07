import gql from 'graphql-tag'

export const metaDataTypesQuery = gql`
  query metaDataTypesQuery {
    metaDataTypes {
      metaDataType
      title
    }
  }
`
