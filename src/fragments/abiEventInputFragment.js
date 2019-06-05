import gql from 'graphql-tag'

export const abiEventInputFragment = gql`
  fragment abiEventInputFragment on AbiEventInputEntity {
    id
    title
    type
    metaType
    abiEventId
  }
`
