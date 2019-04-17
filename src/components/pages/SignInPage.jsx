import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

const queryString = require('query-string')

const signInPageMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) @client
  }
`

export const SignInPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  graphql(signInPageMutation, { name: 'signIn' })(
    class _SignInPage extends Component {
      state = {}

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
          password: '',
          email: ''
        }
      }

      componentDidUpdate(prevProps) {
        const { currentUser } = this.props.currentUserData

        if (currentUser && !this.state.redirect) {
          this.setState({
            redirect: true
          })
        }
      }

      getOneTimeKey(props) {
        const { email } = queryString.parse(props.location.search)
        return email
      }

      handleConfirmSubmit = async (e) => {
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
            error,
            message: ''
          })
          return
        } else {
          this.setState({
            signingIn: true,
            error: null,
            message: ''
          })
        }

        try {
          await this.props.signIn({
            variables: {
              email: this.state.email,
              password: this.state.password
            },
            update: (proxy, { data: { signIn }}) => {
              if (signIn) {
                this.props.history.push(routes.MY_EVENTS)
              }
            }
          })
        } catch (error) {
          console.log(error)
          this.setState({
            signingIn: false,
            error: this.translateErrorMessage(error.message),
            message: error.message
          })
        }
      }

      translateErrorMessage = (message) => {
        if (message.match(/401/)) {
          return 'Invalid username and password combination'
        } else if (message.match(/406/)) {
          return 'Invalid password, passwords must be at least 8 characters'
        }

        return message
      }

      render () {
        let message, signInForm

        if (this.state.redirect) {
          return <Redirect to={routes.MY_EVENTS} />
        }

        if (this.state.signingIn) {
          message = "Signing in ..."
        }

        signInForm =
          <div className='row'>
            <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
              <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt75'>
                Welcome Back
              </h1>

              <section className='card has-bg has-shadow has-shadow-big mt30'>
                <div className='card-content'>
                  <form
                    onSubmit={this.handleConfirmSubmit}
                    className='form'
                  >
                    <h6 className='is-size-6 has-text-centered has-text-weight-bold'>
                      {this.state.error}
                    </h6>
                    <div className='field mt15'>
                      <input
                        placeholder='Your email'
                        autoFocus
                        type='email'
                        className='input'
                        onChange={(e) => {
                          this.setState({ 
                            email: e.target.value,
                            error: ''
                          }) }
                        }
                        value={this.state.email}
                      />
                    </div>
                    <div className='field'>
                      <input
                        placeholder='Password'
                        type='password'
                        className='input'
                        onChange={(e) => {
                          this.setState({
                            password: e.target.value,
                            error: ''
                          }) 
                        }}
                        value={this.state.password}
                      />
                    </div>
                    <div className='control form-submit has-text-centered'>
                      <button
                        type='submit'
                        className='button is-small'
                      >
                        Sign In
                    </button>
                    </div>
                  </form>
                </div>
              </section>

              <br />

              <div className='card-footer has-text-centered'>
                <p className='has-text-weight-bold'>
                  {message}
                </p>

                Already have an account you lost the password to?
                <br />
                <Link to={routes.PASSWORD_RESET}>
                  Reset your Password
                </Link>
                {/* <br />Check your email for the API key originally sent to you. */}
              </div>

            </div>
          </div>

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='Sign In to Notus'
            />

            <ScrollToTop />

            <section className='section section--main-content has-no-top-padding'>
              <div className='container'>
                {signInForm}
              </div>
            </section>

            <FooterContainer />
          </div>
        )
      }
    }
  )
)
