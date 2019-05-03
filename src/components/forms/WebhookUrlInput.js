import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Input } from '~/components/forms/Input'

export class WebhookUrlInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    webhookBody: PropTypes.string
  }

  render () {
    const method = this.props.webhookBody ? 'POST' : 'GET'
    return (
      <div className='field has-addons'>
        <div className='control'>
          <span className='method-addon is-addon'>{method}</span>
        </div>
        <div className='control is-expanded'>
          <Input
            value={this.props.value || ''}
            handleSubmit={this.props.onChange}
            className='input'
            />
        </div>
      </div>
    )
  }
}
