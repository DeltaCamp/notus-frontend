import gql from 'graphql-tag'

export const oneTimeKeyValidQuery = gql`
  query oneTimeKeyValidQuery($oneTimeKey: String!) {
    oneTimeKeyValid(oneTimeKey: $oneTimeKey) {
      valid
      expiresAt
    }
  }
`
