import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '~/components/TextInput'

export class WebhookUrlInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render () {
    return <TextInput value={this.props.value || ''} handleSubmit={this.props.onChange} />
  }
}
