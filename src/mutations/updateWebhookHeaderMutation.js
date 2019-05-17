import gql from 'graphql-tag'

import { webhookHeaderFragment } from '~/fragments/webhookHeaderFragment'

export const updateWebhookHeaderMutation = gql`
  mutation updateWebhookHeaderMutation($webhookHeader: WebhookHeaderDto!) {
    updateWebhookHeader(webhookHeader: $webhookHeader) {
      ...webhookHeaderFragment
    }
  }
  ${webhookHeaderFragment}
`
