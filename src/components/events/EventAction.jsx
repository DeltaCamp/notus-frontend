import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { WebhookUrlInput } from '~/components/forms/WebhookUrlInput'
import { WebhookBodyInput } from '~/components/forms/WebhookBodyInput'

export const EventAction =
  class _EventAction extends PureComponent {
    static propTypes = {
      event: PropTypes.object.isRequired,
      webhookUrl: PropTypes.string,
      webhookBody: PropTypes.string,
      onChangeWebhookUrl: PropTypes.func.isRequired,
      onChangeWebhookBody: PropTypes.func.isRequired
    }

    constructor (props) {
      super(props)
      this.state = {
        showWebhookForm: false
      }
    }

    showWebhookForm = () => {
      this.setState({
        showWebhookForm: true
      })
    }

    render () {
      const showWebhookForm = !!this.props.webhookUrl || this.state.showWebhookForm
      let form
      let state = '... then send me an email'
      if (showWebhookForm) {
        state = '...then trigger a webhook'
        form =
          <form onSubmit={(e) => e.preventDefault()} className='form'>
            <WebhookUrlInput
              placeholder='Enter a url'
              value={this.props.webhookUrl}
              onChange={this.props.onChangeWebhookUrl} />

            <WebhookBodyInput
              value={this.props.webhookBody}
              onChange={this.props.onChangeWebhookBody} />
          </form>
      }

      return (
        <>
          <div
            className='event-box__variable-wrapper'
          >
            <button
              className='event-box__variable event-box__action'
              onClick={this.showWebhookForm}
            >
              {state}
            </button>&nbsp;
            {form}
          </div>
        </>
      )
    }
  }
