import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Mail } from 'react-feather'

import { FooterContainer } from '~/components/layout/Footer'
import { ButtonLoader } from '~/components/ButtonLoader'
import { ScrollToTop } from '~/components/ScrollToTop'
import { signUpMutation } from '~/mutations/signUpMutation'
import { signupHelper } from '~/utils/signupHelper'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:components:SignUpPage')

export const SignUpPage =
  graphql(signUpMutation, { name: 'signUp' })(
    ReactTimeout(class _SignUpPage extends Component {
      state = {
        email: '',
        success: false,
        signingUp: false
      }

      doSignup = async () => {
        debug('doSignUp')
        
        signupHelper(this)
      }

      handleSignupSubmit = (e) => {
        e.preventDefault()

        this.setState({
          signingUp: true
        }, this.doSignup)
      }

      render () {
        const thankYou = (
          <div className='accordion accordion--signup-thank-you'>
            <div className='card-content'>
              <h4 className='is-size-4 has-text-weight-bold has-text-centered mt30'>
                Thanks for using Notus!
              </h4>
              <div className='has-text-centered'>
                <Mail className='icon--signup-large' />
              </div>
              <p className='has-text-weight-semibold has-text-centered has-text-light'>
                Check your <span className='has-text-white'>'{this.state.email}'</span> inbox for a magic link to access your Notus account!
              </p>
              <br />
              <p className='is-size-7 has-text-lighter has-text-weight-semibold has-text-centered'>
                Can't find the email? Check your spam folder first. We can also re-send the link or reach out to us for support.
              </p>
            </div>
          </div>
        )

        const form = (
          <div className='accordion accordion-enter-done accordion--signup-form'>
            <div className='card-content'>
              <form
                onSubmit={this.handleSignupSubmit}
                className='form is-tall'
              >
                <div className='field mt15'>
                  <input
                    placeholder='Your Email Address'
                    autoFocus
                    type='email'
                    id='email'
                    className='input'
                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                    value={this.state.email}
                  />
                </div>
                {/* <div className='control checkbox'>
                                <label htmlFor='newsletter'>
                                  <input id='newsletter' className='checkbox-input' type='checkbox' />Stay
                                  up-to-date with our newsletter
                              </label>
                              </div> */}
                <div className='control form-submit has-text-centered'>
                  <button
                    type='submit'
                    className='button is-small is-dark'
                    disabled={this.state.signingUp || this.state.email === ''}
                  >
                    {this.state.signingUp ? (
                      <>
                        Signing up ... &nbsp;
                              <ButtonLoader />
                      </>
                    ) : 'Sign up'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='Sign Up for Notus'
            />

            <ScrollToTop />

            <section className='section section--main-content has-no-top-padding'>
              <div className='container'>
                <div className='row'>
                  <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
                    <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt30'>
                      Get Started
                    </h1>

                    <section className='card has-bg has-shadow has-shadow-big mt30'>
                      <CSSTransition
                        timeout={600}
                        classNames='accordion'
                        in={!this.state.success}
                      >
                        {state => form}
                      </CSSTransition>

                      <CSSTransition
                        timeout={600}
                        classNames='accordion'
                        in={this.state.success}
                      >
                        {state => thankYou}
                      </CSSTransition>
                    </section>

                    <div className='has-text-centered mt50'>
                      By signing up you are agreeing to the Notus <Link to={routes.TERMS_PAGE}>Terms</Link> &amp; <Link to={routes.PRIVACY_PAGE}>Privacy Policy</Link>.
                    </div>

                    <hr />

                    <div className='has-text-centered pb100'>
                      Already have an account?
                      <br />
                      <Link to={routes.SIGNIN}>
                        Sign In
                      </Link> or <Link to={routes.PASSWORD_RESET}>
                        Reset your Password
                      </Link>
                      {/* <br />Check your email for the API key originally sent to you. */}
                    </div>
                  </div>
                </div>
              </div>

            </section>

            <FooterContainer />
          </div>
        )
      }
    })
  )
