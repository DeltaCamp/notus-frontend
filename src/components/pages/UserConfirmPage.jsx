import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'

import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { confirmUserMutation } from '~/mutations/confirmUserMutation'

const queryString = require('query-string')

export const UserConfirmPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  graphql(confirmUserMutation, { name: 'confirmUser' })(
    class _UserConfirmPage extends PureComponent {

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

      getOneTimeKey(props) {
        const { oneTimeKey } = queryString.parse(props.location.search)
        return oneTimeKey
      }

      handleConfirmSubmit = (e) => {
        e.preventDefault()

        let error

        let oneTimeKey = this.getOneTimeKey(this.props)
        if (!oneTimeKey) {
          error = "Missing one time key"
        }

        if (!this.state.password) {
          error = "You must enter a password"
        }

        if (this.state.password !== this.state.passwordConfirmation) {
          error = "The passwords do not match"
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
        }).then((param) => {
          this.setState({
            confirming: false,
            confirmed: true
          })
        }).catch(error => {
          this.setState({
            confirming: false,
            error: error.message
          })
        })
      }

      render () {
        const { loading, error, currentUser } = this.props.currentUserData
        const currentUserExists = !loading && !error && currentUser

        let message, createPasswordFormRow

        if (this.state.confirming) {
          message = "Confirming your subscription..."
        } else if (this.state.confirmed) {
          message = `Your subscription is confirmed!`
        }

        if (!this.state.confirmed && !currentUser) {
          createPasswordFormRow =
            <div className='row'>
              <div className='col-xs-12'>
                <h1>Create Your Password</h1>
                <form onSubmit={this.handleConfirmSubmit}>
                  <div className='form-error'>
                    <span />
                    {this.state.error}
                  </div>
                  <div className='field'>
                    <label htmlFor='password' className='label'>
                      Password
                    </label>
                    <input
                      autoFocus
                      type='password'
                      className='input'
                      onChange={(e) => { this.setState({ password: e.target.value }) }}
                      value={this.state.password}
                    />
                  </div>
                  <div className='field'>
                    <label htmlFor='password' className='label'>
                      Confirm Password
                    </label>
                    <input
                      autoFocus
                      type='password'
                      className='input'
                      onChange={(e) => { this.setState({ passwordConfirmation: e.target.value }) }}
                      value={this.state.passwordConfirmation}
                    />
                  </div>
                  <div className='control form-submit has-text-centered'>
                    <button
                      type='submit'
                      className='button is-dark is-outlined is-small'
                    >
                      Save
                  </button>
                  </div>
                </form>
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
                <div className='row'>
                  <div className='col-xs-12'>
                    <p>
                      {message}
                    </p>
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
