import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-bulma-switch'

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
              onChange={this.props.onChangeWebhookUrl}
              webhookBody={this.props.webhookBody} />

            <label>POST Body (optional)</label>

            <WebhookBodyInput
              value={this.props.webhookBody}
              onChange={this.props.onChangeWebhookBody} />
          </form>
      }

      return (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-xl-10 col-start-xl-2 is-size-4'>
                <Switch
                  value={this.state.filterEventBool}
                  onChange={(e) => {
                    this.setState({ filterEventBool: !this.state.filterEventBool })
                  }}
                >
                  ...then send me an email
                </Switch>

                <Switch
                  value={this.state.showWebhookForm}
                  onChange={(e) => {
                    this.setState({ showWebhookForm: !this.state.showWebhookForm })
                  }}
                >
                  ...then trigger a webhook
                </Switch>

                {form}
              </div>
            </div>
          </div>
        </>
      )
    }
  }
