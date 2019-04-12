import gql from 'graphql-tag'

export const matcherFragment = gql`
  fragment matcherFragment on MatcherEntity {
    id
    source
    operator
    operand
    operandDataType
  }
`
