import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Input } from '~/components/forms/Input'

export class WebhookUrlInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='field'>
        <div className='control'>
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
