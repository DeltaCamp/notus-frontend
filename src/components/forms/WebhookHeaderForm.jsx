import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { X } from 'react-feather'
import { omit } from 'lodash'

import { TextInput } from '~/components/TextInput'

export const WebhookHeaderForm = class _WebhookHeaderForm extends PureComponent {
  static propTypes = {
    webhookHeader: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  entityToDto = (webhookHeader) => {
    const dto = {
      ...omit(webhookHeader, ['__typename']),
    }
    if (webhookHeader.id) {
      dto.id = parseInt(webhookHeader.id, 10)
    }
    return dto
  }

  onChangeWebhookKey = (key) => {
    const webhookHeader = this.entityToDto(this.props.webhookHeader)
    webhookHeader.key = key
    this.props.onChange(webhookHeader)
  }

  onChangeWebhookValue = (value) => {
    const webhookHeader = this.entityToDto(this.props.webhookHeader)
    webhookHeader.value = value
    this.props.onChange(webhookHeader)
  }

  onRemove = (e) => {
    e.preventDefault()
    this.props.onRemove(this.entityToDto(this.props.webhookHeader))
  }

  render () {
    return (
      <div className='form-box__variable-wrapper form-box__variable-wrapper__matcher'>
        <span className='form-box__flex-mobile-group'>
          <span className='has-text-lighter'>
            Header Info:
          </span>
          <div className='buttons buttons-right'>
            <button
              className='button has-icon plus-button is-light has-fat-icons'
              onClick={this.onRemove}
            >
              <X
                className='icon__button has-stroke-white'
              />
            </button>
          </div>
        </span>

        <div className='form-box__variable has-text-input is-truncated'>
          <TextInput
            placeholder='Enter header name'
            value={this.props.webhookHeader.key}
            handleSubmit={this.onChangeWebhookKey}
            classNames='no-background-color'
          />
        </div>
        <div className='form-box__variable has-text-input is-truncated'>
          <TextInput
            placeholder='Enter header value'
            value={this.props.webhookHeader.value}
            handleSubmit={this.onChangeWebhookValue}
            classNames='no-background-color'
          />
        </div>
        
      </div>
    )
  }

}