import gql from 'graphql-tag'

export const destroyWebhookHeaderMutation = gql`
  mutation destroyWebhookHeaderMutation($id: Float!) {
    destroyWebhookHeader(webhookHeaderId: $id)
  }
`
