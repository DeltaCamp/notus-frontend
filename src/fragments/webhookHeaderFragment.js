import gql from 'graphql-tag'

export const webhookHeaderFragment = gql`
  fragment webhookHeaderFragment on WebhookHeaderEntity {
    id
    eventId
    key
    value
  }
`
