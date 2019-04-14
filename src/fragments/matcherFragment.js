import gql from 'graphql-tag'
import { eventFragment } from '~/fragments/eventFragment'

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
