import gql from 'graphql-tag'

import { webhookHeaderFragment } from '~/fragments/webhookHeaderFragment'

export const createWebhookHeaderMutation = gql`
  mutation createWebhookHeaderMutation($webhookHeader: WebhookHeaderDto!) {
    createWebhookHeader(webhookHeader: $webhookHeader) {
      ...webhookHeaderFragment
    }
  }
  ${webhookHeaderFragment}
`
