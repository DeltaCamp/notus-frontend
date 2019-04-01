import gql from 'graphql-tag'

export const jwtTokenQuery = gql`
  query jwtTokenQuery {
    jwtToken @client
  }
`
