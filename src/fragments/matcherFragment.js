import gql from 'graphql-tag'

export const matcherFragment = gql`
  fragment matcherFragment on MatcherEntity {
    id
    order
    source
    operator
    operand
    operandDataType
    createdAt
    updatedAt
  }
`
