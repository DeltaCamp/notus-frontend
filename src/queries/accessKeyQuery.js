import gql from 'graphql-tag'

export const accessKeyQuery = gql`
  query accessKeyQuery {
    accessKey @client
  }
`
