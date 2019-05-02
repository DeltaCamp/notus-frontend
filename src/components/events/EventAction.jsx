import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const EventAction =
  class _EventAction extends PureComponent {
    static propTypes = {
      webhookUrl: PropTypes.string.isRequired,
      webhookBody: PropTypes.string.isRequired,
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
          <form>
              <WebhookUrlInput
                value={this.props.webhookUrl}
                onChange={this.props.onChangeWebhookUrl} />
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
