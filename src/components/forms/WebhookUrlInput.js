import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { WebhookInput } from '~/components/forms/WebhookInput'

export class WebhookUrlInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    webhookBody: PropTypes.string,
    placeholder: PropTypes.string
  }

  render () {
    const method = this.props.webhookBody ? 'POST' : 'GET'
    return (
      <div className='field has-addons'>
        <div className='control'>
          <label
            htmlFor='webhook-url-input'
            className='label method-addon is-addon'
          >{method}</label>
        </div>
        <div className='control is-expanded'>
          <WebhookInput
            isTextarea={false}
            placeholder={this.props.placeholder}
            value={this.props.value || ''}
            onChange={this.props.onChange}
            className='input'
          />
        </div>
      </div>
    )
  }
}
