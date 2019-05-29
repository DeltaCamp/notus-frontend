import gql from 'graphql-tag'

export const networkFragment = gql`
  fragment networkFragment on NetworkEntity {
    id
    name
  }
`
