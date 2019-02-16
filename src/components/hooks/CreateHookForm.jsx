import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'

export const CreateHookForm = class _CreateHookForm extends PureComponent {
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
      creationSuccessful: false
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    let hasError
    const requiredFields = ['email', 'name', 'projectName', 'country', 'participate']

    this.setState({ isLoading: true })

    requiredFields.forEach(field => {
      this.setState({
        [`${field}Error`]: false
      })
    })

    requiredFields.forEach(field => {
      if (this.state[field] === '') {
        this.setState({
          [`${field}Error`]: true
        })
        hasError = true
      }
    })

    if (hasError) {
      this.setState({ isLoading: false })
    } else {
      try {
        window.Intercom('update', {
          'email': this.state.email,
          'name': this.state.name,
          // "phone": "5555555555",
          // "signed_up_at": 1392731331,
          // "last_seen_ip": "1.2.3.4",
          // "last_seen_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",

          // Notice that custom attributes can just be thrown in here
          'Project Name': this.state.projectName,
          'GitHub Username': this.state.githubUsername,
          'Country': this.state.country,
          'Questions': this.state.questions,
          'Heard About Us': this.state.hearAbout,
          'Participate': this.state.participate,
          'Participate Other': this.state.participateOther,
          'Additional Info': this.state.additionalInfo
        })

        this.setState({ creationSuccessful: true })
      } catch (error) {
        console.error(error)
        this.setState({ errorMessage: error.message })
      } finally {
        this.setState({ isLoading: false })
      }
    }
  }

  handleParticipateChanged = (e) => {
    this.setState({
      participate: e.currentTarget.value
    })
  }

  render () {
    var content, error

    if (this.state.errorMessage) {
      error =
        <section className='hero is-medium is-dark has-text-centered first'>
          <ScrollToTop />
          <div className='hero-body'>
            <h1 className='title'>
              There was an error
            </h1>
            <h2 className='subtitle is-size-2'>
              You can contact us directly at <a href='mailto:contact@zeppelin.solutions'>contact@zeppelin.solutions</a> for help
            </h2>
            <h5 className='is-size-5'>
              {this.state.errorMessage}
            </h5>
          </div>
        </section>
    }

    content =
      <form onSubmit={this.handleSubmit} className='form'>
        <label htmlFor='contract-address-input' className='label is-size-4 is-uppercase'>
          I want to listen to the contract at this address: <span className='has-text-warning' style={{display: 'none'}}>*</span>
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

        <label htmlFor='webhook-url-input' className='label is-size-4 is-uppercase'>
          When something happens please send a notification to this URL: <span className='has-text-warning' style={{ display: 'none' }}>*</span>
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

        <div className='field'>
          <div className='control has-text-centered'>
            <button
              type='submit'
              className={classnames('button is-success', {
                'is-loading': this.state.isLoading
              })}
            >Create!</button>
          </div>
        </div>
      </form>

    return (
      <>
        {error}

        <CSSTransition
          timeout={600}
          classNames='accordion'
          in={this.state.creationSuccessful}
        >
          {state => (
            <div className='accordion'>
              {this.state.creationSuccessful && <ScrollToTop />}

              <div className='has-text-centered'>
                <ScrollToTop />
                <br />
                <br />
                <h1 className='is-size-1 is-uppercase has-text-success'>
                  Hook created!
                </h1>
                <br />
                <a className='button is-small' href='#'>View Activity Logs</a>
              </div>
            </div>
          )}
        </CSSTransition>

        <CSSTransition
          timeout={600}
          classNames='accordion'
          in={!this.state.creationSuccessful}
        >
          {state => (
            <>
              {content}
            </>
          )}
        </CSSTransition>
      </>
    )
  }
}
