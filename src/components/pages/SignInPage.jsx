import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'

const queryString = require('query-string')

const signInPageMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) @client
  }
`

export const SignInPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  graphql(signInPageMutation, { name: 'signIn' })(
    class _SignInPage extends PureComponent {

      static propTypes = {
        match: PropTypes.object.isRequired
      }

      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      constructor (props) {
        super(props)
        this.state = {
          signingIn: false,
          password: ''
        }
      }

      getOneTimeKey(props) {
        const { email } = queryString.parse(props.location.search)
        return email
      }

      handleConfirmSubmit = (e) => {
        e.preventDefault()

        let error

        if (!this.state.email) {
          error = "Please enter your email address"
        }

        if (!this.state.password) {
          error = "Please enter your password"
        }

        if (error) {
          this.setState({
            error
          })
          return
        } else {
          this.setState({
            signingIn: true,
            error: null
          })
        }

        this.props.signIn({
          variables: {
            email: this.state.email,
            password: this.state.password
          }
        }).then((param) => {
          this.setState({
            signingIn: false,
            signedIn: true
          })
        }).catch(error => {
          this.setState({
            signingIn: false,
            error: error.message
          })
        })
      }

      render () {
        const { loading, error, currentUser } = this.props.currentUserData
        const currentUserExists = !loading && !error && currentUser

        let message, createPasswordFormRow

        if (this.state.signingIn) {
          message = "Confirming your subscription..."
        } else if (this.state.signedIn) {
          message = `You're signed in`
        }

        if (!this.state.signedIn && !currentUser) {
          createPasswordFormRow =
            <div className='row'>
              <div className='col-xs-12'>
                <h1>Sign In</h1>
                <form onSubmit={this.handleConfirmSubmit}>
                  <div className='form-error'>
                    <span />
                    {this.state.error}
                  </div>
                  <div className='field'>
                    <label htmlFor='password' className='label'>
                      Email
                    </label>
                    <input
                      autoFocus
                      type='text'
                      className='input'
                      onChange={(e) => { this.setState({ email: e.target.value }) }}
                      value={this.state.email}
                    />
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
