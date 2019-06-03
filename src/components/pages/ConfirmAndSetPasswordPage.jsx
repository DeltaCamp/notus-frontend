import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ButtonLoader } from '~/components/ButtonLoader'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { confirmUserMutation } from '~/mutations/confirmUserMutation'
import { oneTimeKeyValidQuery } from '~/queries/oneTimeKeyValidQuery'
import { notusToast } from '~/utils/notusToast'
import * as routes from '~/../config/routes'

const queryString = require('query-string')
const debug = require('debug')('notus:users:ConfirmAndSetPasswordPage')

export const ConfirmAndSetPasswordPage =
  graphql(confirmUserMutation, { name: 'confirmUser' })(
    graphql(oneTimeKeyValidQuery, {
      name: 'oneTimeKeyValidData',
      skip: (props) => {
        const { oneTimeKey } = queryString.parse(props.location.search)
        return !oneTimeKey
      },
      options: (props) => ({
        variables: {
          oneTimeKey: queryString.parse(props.location.search).oneTimeKey
        }
      })
    })(
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
            isConfirming: false,
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
            notusToast.error(error)
            this.setState({
              error
            })
            return
          } else {
            this.setState({
              isConfirming: true
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
            notusToast.info(error.message)

            this.setState({
              isConfirming: false
            })
          })
        }

        render () {
          let message, createPasswordFormRow, keyIsValid, expiresAt
          const { oneTimeKeyValidData } = this.props

          if (oneTimeKeyValidData && !oneTimeKeyValidData.loading) {
            const { oneTimeKeyValid } = oneTimeKeyValidData
            keyIsValid = oneTimeKeyValid && oneTimeKeyValid.valid
            expiresAt = oneTimeKeyValid && oneTimeKeyValid.expiresAt
            
            debug(new Date().getTime() + ' should be before the expiry: ')
            debug(expiresAt)
          }

          const oneTimeKey = this.getOneTimeKey(this.props)

          if (!oneTimeKey) {
            createPasswordFormRow =
              <>
                <br />
                <br />
                <p>
                  Unable to set password and confirm account without a one time key.
                </p>
                <p>
                  If you are already signed up you can try to&nbsp;<Link to={routes.PASSWORD_RESET}>
                  reset your password
                  </Link>.
                </p>
              </>
          } else if (keyIsValid === false) {
            createPasswordFormRow =
              <>
                <br />
                <br />
                <p>
                  The one time key you are attempting to use has expired.
                </p>
                <p>
                  Please use the&nbsp;<Link to={routes.PASSWORD_RESET}>
                    reset password
                  </Link> page to get a new key delivered to your email.
                </p>
              </>
          } else {
            createPasswordFormRow = (
              <>
                <section className='card has-bg has-shadow has-shadow-big mt30'>
                  <div className='card-content'>
                    <form
                      onSubmit={this.handleConfirmSubmit}
                      className='form is-tall'
                    >
                      <div className='field mt15'>
                        <input
                          autoFocus
                          placeholder='New Password'
                          type='password'
                          className='input'
                          onChange={(e) => {
                            this.setState({
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
                          disabled={
                            this.state.isConfirming ||
                            this.state.password === '' ||
                            this.state.passwordConfirmation === ''
                          }
                        >
                          {this.state.isConfirming ? (
                            <>
                              Saving password ... &nbsp;
                            <ButtonLoader />
                            </>
                          ) : 'Save password'}
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
              </>
            )
          }

          return (
            <div className='is-positioned-absolutely'>
              <Helmet
                title='Confirm Your Account'
              />

              <ScrollToTop />

              <section className='section section--main-content'>
                <div className='container'>

                  <div className='row'>
                    <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
                      <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt30'>
                        Set A Password
                      </h1>

                      {createPasswordFormRow}
                    </div>
                  </div>
                </div>
              </section>

              <FooterContainer />
            </div>
          )
        }
      }
    )
  )