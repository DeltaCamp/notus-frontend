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
      sendEmail: PropTypes.bool,
      onChangeSendEmail: PropTypes.func.isRequired,
      onChangeWebhookUrl: PropTypes.func.isRequired,
      onChangeWebhookBody: PropTypes.func.isRequired,
      onChangeDeleteWebhook: PropTypes.func.isRequired,
      currentUserData: PropTypes.object.isRequired
    }

    constructor (props) {
      super(props)
      this.state = {
        showWebhookForm: false
      }
    }

    toggleWebhookForm = () => {
      if (this.state.showWebhookForm) {
        this.props.onChangeDeleteWebhook(null)
      }
      this.setState({
        showWebhookForm: !this.state.showWebhookForm
      })
    }

    onChangeSendEmail = () => {
      this.props.onChangeSendEmail(!this.props.sendEmail)
    }

    render () {
      const usersEmail = this.props.currentUserData.currentUser.email
      const showWebhookForm = this.state.showWebhookForm
      let form
      if (showWebhookForm) {
        form =
          <form onSubmit={(e) => e.preventDefault()} className='form is-inverted'>
            <WebhookUrlInput
              placeholder='https://www.test.com?var1={{block.number}}'
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
                  value={this.props.sendEmail}
                  onChange={this.onChangeSendEmail}
                  color='link'
                >
                  send me an email <span className='has-text-lighter'> - {usersEmail}</span>
                </Switch>

                <Switch
                  value={showWebhookForm}
                  onChange={this.toggleWebhookForm}
                >
                  trigger a webhook
                </Switch>

                {form}
              </div>
            </div>
          </div>
        </>
      )
    }
  }
