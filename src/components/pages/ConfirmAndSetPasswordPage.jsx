import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { confirmUserMutation } from '~/mutations/confirmUserMutation'
import * as routes from '~/../config/routes'

const queryString = require('query-string')

export const ConfirmAndSetPasswordPage =
  graphql(confirmUserMutation, { name: 'confirmUser' })(
    class _ConfirmAndSetPasswordPage extends PureComponent {
      static propTypes = {
        match: PropTypes.object.isRequired
      }

      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      constructor (props) {
        super(props)
        this.state = {
          confirming: false,
          password: '',
          passwordConfirmation: ''
        }
      }

      getOneTimeKey (props) {
        const { oneTimeKey } = queryString.parse(props.location.search)
        return oneTimeKey
      }

      handleConfirmSubmit = (e) => {
        e.preventDefault()

        let error

        let oneTimeKey = this.getOneTimeKey(this.props)
        if (!oneTimeKey) {
          error = 'Missing one time key'
        }

        if (!this.state.password) {
          error = 'You must enter a password'
        }

        if (this.state.password !== this.state.passwordConfirmation) {
          error = 'The passwords do not match'
        }

        if (this.state.password.length < 8 || this.state.passwordConfirmation.length < 8) {
          error = 'Passwords must be at least 8 characters in length'
        }

        if (error) {
          this.setState({
            error
          })
          return
        } else {
          this.setState({
            confirming: true,
            error: null
          })
        }

        this.props.confirmUser({
          variables: {
            oneTimeKey,
            password: this.state.password
          }
        }).then((response) => {
          this.props.history.push(routes.MY_EVENTS)
        }).catch(error => {
          this.setState({
            confirming: false,
            error: error.message
          })
        })
      }

      render () {
        let message, createPasswordFormRow

        if (this.state.confirming) {
          message = 'Confirming your account ...'
        }

        const oneTimeKey = this.getOneTimeKey(this.props)

        if (!oneTimeKey) {
          createPasswordFormRow =
            <div className='row'>
              <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
                <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt30'>
                  Set A Password
                </h1>
                <br />
                <br />
                <p>
                  Unable to set password and confirm account without a one time key. (already signed up?).
                </p>
                {/* add forgot password link here */}
              </div>
            </div>
        } else {
          createPasswordFormRow =
            <div className='row'>
              <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
                <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt30'>
                  Set A Password
                </h1>

                <section className='card has-bg has-shadow has-shadow-big mt30'>
                  <div className='card-content'>
                    <form
                      onSubmit={this.handleConfirmSubmit}
                      className='form is-tall'
                    >
                      <h6 className='is-size-6 has-text-centered has-text-weight-bold'>
                        {this.state.error}
                      </h6>

                      <div className='field mt15'>
                        <input
                          autoFocus
                          placeholder='New Password'
                          type='password'
                          className='input'
                          onChange={(e) => {
                            this.setState({
                              error: '',
                              password: e.target.value
                            })
                          }}
                          value={this.state.password}
                        />
                      </div>
                      <div className='field'>
                        <input
                          type='password'
                          placeholder='Confirm Password'
                          className='input'
                          onChange={(e) => {
                            this.setState({
                              error: '',
                              passwordConfirmation: e.target.value
                            })
                          }}
                          value={this.state.passwordConfirmation}
                        />
                      </div>
                      <div className='control form-submit has-text-centered'>
                        <button
                          type='submit'
                          className='button is-small is-dark'
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </section>

                <div className='card-footer has-text-centered'>
                  <p className='has-text-weight-bold'>
                    {message}
                  </p>
                </div>

              </div>
            </div>
        }

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='Confirm Your Account'
            />

            <ScrollToTop />

            <section className='section section--main-content'>
              <div className='container'>
                {createPasswordFormRow}
              </div>
            </section>

            <FooterContainer />
          </div>
        )
      }
    }
  )
