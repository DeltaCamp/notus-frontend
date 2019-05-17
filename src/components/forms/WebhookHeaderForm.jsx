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
    return <div className='event-box__variable-wrapper event-box__variable-wrapper__matcher'>
        <div className='event-box__variable has-text-input is-truncated'>
          <TextInput
            value={this.props.webhookHeader.key}
            handleSubmit={this.onChangeWebhookKey}
          />
        </div>
        <div className='event-box__variable has-text-input is-truncated'>
          <TextInput
            value={this.props.webhookHeader.value}
            handleSubmit={this.onChangeWebhookValue}
          />
        </div>
      <button
        className='button has-icon plus-button is-light has-fat-icons'
        onClick={this.onRemove}
      >
        <X
          className='icon__button has-stroke-white'
        />
      </button>
    </div>
  }

}