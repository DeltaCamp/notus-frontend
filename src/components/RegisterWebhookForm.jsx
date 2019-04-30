import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Switch from 'react-bulma-switch'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { ScrollToTop } from '~/components/ScrollToTop'
import * as routes from '~/../config/routes'

const ControlledSwitch = class extends PureComponent {
  render () {
    return <Switch
      rounded
      outlined
      color='info'
      size='medium'
      {...this.props}
      className='is-uppercase'
    />
  }
}

export const RegisterWebhookForm = class _RegisterWebhookForm extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      webhookUrl: '',
      contractAddress: '',
      eventName: '',
      filterTopic1: '',
      filterTopic2: '',
      filterTopic3: '',
      filterEventBool: false,
      filterTopicsBool: false,
      uploadingToIpfs: false,
      creating: false,
      creationSuccessful: false
    }
  }

  hasSentTransaction () {
    const hookTx = this.props.hookTx
    return hookTx && hookTx.sent && !hookTx.completed
  }

  registerWebhookTxError () {
    const hookTx = this.props.hookTx
    return hookTx && !!hookTx.error
  }

  registerWebhookTxCompleted () {
    const hookTx = this.props.hookTx
    // console.log((hookTx && !hookTx.error && hookTx.completed))
    return hookTx && !hookTx.error && hookTx.completed
  }

  helpText = () => {
    let text = ''

    if (this.needsWeb3()) {
      text = `You will need to`
    // } else if (this.hasSentTransaction()) {
    //   text = 'Waiting for confirmation...'
    } else if (this.hasUncompletedTransaction()) {
      text = 'Waiting to receive transaction...'
    // } else if (this.notLoggedIn()) {
      // text = `You need to login to MetaMask`
    } else if (this.state.amountError) {
      text = 'Please enter an amount'
    } else if (this.registerWebhookTxError()) {
      text = 'Webhook was not registered'
    // } else if (this.registerWebhookTxCompleted()) {
    //   text = 'Webhook registration successful'
    }

    return text
  }

  buttonText = () => {
    let text = 'Create!'

    if (this.registerWebhookTxError()) {
      text = 'Retry'
    } else if (this.registerWebhookTxCompleted()) {
      text = 'Done'
    }

    return text
  }

  isWarning () {
    return this.needsWeb3() && !this.hasUncompletedTransaction()
  }

  isDanger () {
    return this.state.amountError || this.registerWebhookTxError() || this.notLoggedIn()
  }

  isSuccess () {
    return this.registerWebhookTxCompleted() && !this.registerWebhookTxError()
  }

  isInputDisabled () {
    return this.hasUncompletedTransaction() || this.registerWebhookTxCompleted() || this.registerWebhookTxError() || this.notLoggedIn()
  }

  isButtonDisabled () {
    return this.hasUncompletedTransaction() || this.registerWebhookTxError()// || this.notLoggedIn()
  }

  formClassName () {
    var className = ''

    if (this.hasUncompletedTransaction()) {
      className = 'tx-in-progress'
    } else if (this.isWarning()) {
      className = 'is-warning'
    } else if (this.isDanger()) {
      className = 'is-danger'
    } else if (this.isSuccess()) {
      className = 'is-success'
    }

    return className
  }

  helpClassName () {
    var className = ''

    if (this.hasUncompletedTransaction()) {
      className = 'has-text-link'
    } else if (this.isWarning()) {
      className = 'has-text-warning'
    } else if (this.isDanger()) {
      className = 'has-text-danger'
    } else if (this.isSuccess()) {
      className = 'has-text-success'
    }

    return className
  }

  registerWebhookTransaction (ipfsHashAsHex) {
    const txData = {
      contractName: 'Notus',
      method: 'registerWebhook',
      args: [
        ipfsHashAsHex
      ]
    }

    try {
      this.props.sendTransaction({
        variables: {
          txData
        }
      })
    } catch (error) {
      // this doesn't work, currently no way to hide the modal
      // if the user rejects the tx in metamask, etc
    }
  }

  notLoggedIn () {
    const { networkAccount } = this.props
    let notLoggedIn = true

    if (networkAccount) {
      notLoggedIn = !networkAccount.account
    }

    return notLoggedIn
  }

  needsWeb3 = () => {
    const { systemInfo } = this.props
    return systemInfo && !systemInfo.hasWeb3Available
  }

  needsIOSWeb3 = () => {
    const { systemInfo } = this.props
    return systemInfo && systemInfo.mobileOS === 'iOS'
  }

  needsAndroidWeb3 = () => {
    const { systemInfo } = this.props
    return systemInfo && systemInfo.mobileOS === 'Android'
  }

  downloadText = () => {
    if (this.needsIOSWeb3()) {
      return 'Download Cipher Browser'
    } else if (this.needsAndroidWeb3()) {
      return 'Download Opera'
    } else {
      return 'Download MetaMask'
    }
  }

  downloadUrl = () => {
    if (this.needsIOSWeb3()) {
      return 'https://itunes.apple.com/us/app/cipher-browser-ethereum/id1294572970'
    } else if (this.needsAndroidWeb3()) {
      return 'https://play.google.com/store/apps/details?id=com.opera.browser'
    } else {
      return 'https://metamask.io/'
    }
  }

  downloadLink = () => {
    return this.needsWeb3() &&
      <a
        href={this.downloadUrl()}
        target='_blank'
        rel='noopener noreferrer'
        className='has-text-link'
      >{this.downloadText()}</a>
  }

  hasUncompletedTransaction () {
    return this.hasUncompletedRegisterWebhookTx()
  }

  hasUncompletedRegisterWebhookTx () {
    return this.props.registerWebhookTx && !this.props.registerWebhookTx.completed
  }

  handleSubmit = async () => {
  }

  showModal = () => {
    return (this.registerWebhookTxCompleted() || this.state.creating)// && !this.registerWebhookTxError()
  }

  render () {
    var content, error

    const newWebhookLink = formatRoute(routes.HOOK, { ipfsHash: this.state.newIpfsHash })

    if (this.state.errorMessage) {
      error =
        <section className='hero is-medium is-dark has-text-centered first'>
          <ScrollToTop />
          <div className='hero-body'>
            <h1 className='title'>
              There was an error
            </h1>
            <h2 className='subtitle is-size-2'>
              You can contact us directly at <a href='mailto:contact@delta.camp'>contact@delta.camp</a> for help
            </h2>
            <h5 className='is-size-5'>
              {this.state.errorMessage}
            </h5>
          </div>
        </section>
    }

    content =
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.handleSubmit()
          }}
          className={classnames('form', this.formClassName())}
        >
          <p className={classnames('help is-size-5', this.helpClassName())}>
            {this.helpText() || '\u00A0'} {this.downloadLink()}
            <br />
            <br />
          </p>

          <label htmlFor='contract-address-input' className='label is-size-4 is-uppercase has-text-grey'>
            I want to listen to events at this <span className='has-text-grey-darker'>contract address</span>: <span className='has-text-warning' style={{ display: 'none' }}>*</span>
          </label>

          <div className='field'>
            <div className='control'>
              <input
                autoFocus
                maxLength='42'
                id='contract-address-input'
                className='input'
                type='text'
                value={this.state.contractAddress}
                onChange={(e) => this.setState({ contractAddress: e.target.value })}
              />
              {/* TODO: validate proper hex address! */}
            </div>

            {this.state.contractAddressError && (
              <>
                <ScrollToTop />
                <label className='hint has-text-danger'>
                  Please enter a proper contract address to listen to
                </label>
              </>
            )}
          </div>

          <label htmlFor='webhook-url-input' className='label is-size-4 is-uppercase  has-text-grey'>
            When an event occurs send a notification to this <span className='has-text-grey-darker'>URL</span>: <span className='has-text-warning' style={{ display: 'none' }}>*</span>
          </label>

          <div className='field'>
            <div className='control'>
              <input
                id='webhook-url-input'
                className='input'
                type='text'
                value={this.state.webhookUrl}
                onChange={(e) => this.setState({ webhookUrl: e.target.value })}
              />
              {/* TODO: validate proper url¿ */}
            </div>

            {this.state.webhookUrlError && (
              <>
                <ScrollToTop />
                <label className='hint has-text-danger'>
                  Please enter a valid URL the server can POST JSON data to
                </label>
              </>
            )}
          </div>

          <hr />
          <br />
          <ControlledSwitch
            value={this.state.filterEventBool}
            onChange={(e) => {
              this.setState({ filterEventBool: !this.state.filterEventBool })
            }}
          >
            <span className='has-text-grey'>I would like to filter by a specific event</span>
          </ControlledSwitch>

          <CSSTransition
            timeout={600}
            classNames='accordion'
            in={this.state.filterEventBool}
          >
            {state => (
              <div className='accordion event-name-accordion'>
                <div className='field'>
                  <div className='control'>
                    <label htmlFor='event-name-input' className='label is-size-4 is-uppercase'>
                      Contract Event name <span className='is-size-5 has-text-grey-light'>(ie. 'Register', 'Transfer', etc.)</span>
                    </label>

                    <input
                      id='event-name-input'
                      className='input'
                      type='text'
                      value={this.state.eventName}
                      onChange={(e) => this.setState({ eventName: e.target.value })}
                    />
                    {/* TODO: validate proper EVENT NAME! */}
                  </div>
                </div>
              </div>
            )}
          </CSSTransition>

          <hr />
          <br />
          <ControlledSwitch
            value={this.state.filterTopicsBool}
            onChange={(e) => {
              this.setState({ filterTopicsBool: !this.state.filterTopicsBool })
            }}
          >
            <span className='has-text-grey'>I would like to filter by the following event topics:</span>
          </ControlledSwitch>

          <CSSTransition
            timeout={600}
            classNames='accordion'
            in={this.state.filterTopicsBool}
          >
            {state => (
              <div className='accordion event-topics-accordion'>
                <div className='field'>
                  <div className='control'>
                    <label htmlFor='filter-topic-1-input' className='label is-size-4 is-uppercase'>
                      Event topic #1
                    </label>

                    <input
                      id='filter-topic-1-input'
                      className='input'
                      type='text'
                      value={this.state.filterTopic1}
                      onChange={(e) => this.setState({ filterTopic1: e.target.value })}
                    />
                    {/* TODO: validate proper EVENT TOPIC[0]! */}
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <label htmlFor='filter-topic-2-input' className='label is-size-4 is-uppercase'>
                      Event topic #2
                    </label>

                    <input
                      id='filter-topic-2-input'
                      className='input'
                      type='text'
                      value={this.state.filterTopic2}
                      onChange={(e) => this.setState({ filterTopic2: e.target.value })}
                    />
                    {/* TODO: validate proper EVENT TOPIC[1]! */}
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <label htmlFor='filter-topic-3-input' className='label is-size-4 is-uppercase'>
                      Event topic #3
                    </label>

                    <input
                      id='filter-topic-3-input'
                      className='input'
                      type='text'
                      value={this.state.filterTopic3}
                      onChange={(e) => this.setState({ filterTopic3: e.target.value })}
                    />
                    {/* TODO: validate proper EVENT TOPIC[0]! */}
                  </div>
                </div>
              </div>
            )}
          </CSSTransition>

          <div className='field'>
            <br />
            <br />

            <div className='control has-text-centered'>
              <button
                disabled={this.isButtonDisabled()}
                className={classnames('button is-success', {
                  'is-loading': this.state.isLoading
                })}
              >
                {this.buttonText()}
              </button>
            </div>
          </div>
        </form>

        <CSSTransition
          timeout={600}
          classNames='fade'
          in={this.showModal()}
        >
          {state => (
            <div className='fade-enter modal has-text-centered'>
              <div className='modal-body'>
                {this.state.uploadingToIpfs
                  ? <span>Registering Webhook on IPFS ...</span>
                  : <span>Registering Webhook on IPFS ... <strong className='has-text-weight-bold'>DONE!</strong></span>
                }

                {!this.registerWebhookTxCompleted() && !this.state.uploadingToIpfs && !this.hasSentTransaction() &&
                  <span><br />Waiting for transaction ...</span>
                }

                {this.hasSentTransaction() &&
                  <span><br />Waiting for confirmations ...</span>
                }

                {
                  this.registerWebhookTxCompleted() &&
                  <>
                    <span><br />Waiting for confirmations ... <strong className='has-text-weight-bold'>DONE!</strong></span>
                    <br />
                    <br />
                    <Link
                      to={newWebhookLink}
                      className='button is-light'
                    >
                      View Webhook Activity
                    </Link>
                  </>
                }
              </div>
            </div>
          )}
        </CSSTransition>
      </>

    return (
      <>
        <div
          className={classnames('modal-background no-select', { 'is-active': this.showModal() })}
        />

        {error}
        {content}
      </>
    )
  }
}
