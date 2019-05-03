import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Textarea } from '~/components/forms/Textarea'
import InputTrigger from '~/components/forms/InputTrigger'

export class WebhookBodyInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  onChange = (text) => {
    this.props.onChange(text)
  }

  render () {
    return (
      <div className='field'>
        <div className='control'>
          <InputTrigger
            trigger={{ string: '{{' }}
            onStart={(obj) => console.log('Start: ', obj)}>
            <Textarea
            className='textarea webhook-body'
            value={this.props.value || ''}
            onChange={this.onChange}
            placeholder={
`{
  "foo": "bar"												
}`
}
            />
          </InputTrigger>
        </div>
      </div>
    )
  }
}
