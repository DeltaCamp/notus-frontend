import gql from 'graphql-tag'

export const matcherFragment = gql`
  fragment matcherFragment on MatcherEntity {
    id
    order
    source
    abiEventInputId
    eventId
    operator
    operand
    createdAt
    updatedAt
  }
`
