import gql from 'graphql-tag'

export const appFragment = gql`
  fragment appFragment on AppEntity {
    id
    name
  }
`
