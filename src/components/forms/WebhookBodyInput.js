import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class WebhookBodyInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render () {
    return <textarea
      className='textarea'
      value={this.props.value || ''}
      onChange={this.onChange}
      placeholder={`Enter the JSON body of the POST request ...`}
    />
  }
}
