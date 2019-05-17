import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { KEYS } from '~/constants'
import { SourceSelect } from '~/components/SourceSelect'
import InputTrigger from '~/components/forms/InputTrigger'

import { WebhookInput } from '~/components/forms/WebhookInput'

export function WebhookBodyInput(props) {
  return <WebhookInput {...props} />
}