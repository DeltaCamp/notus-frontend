import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { FooterContainer } from '~/components/layout/Footer'
import { Mail } from 'react-feather'
import { axiosInstance } from '~/../config/axiosInstance'
import { ScrollToTop } from '~/components/ScrollToTop'
import * as routes from '~/../config/routes'

export const PasswordResetPage =
  class _PasswordResetPage extends Component {
    state = {
      email: '',
      error: '',
      success: false
    }

    doReset = async () => {
      const { email } = this.state

      if (email) {
        await axiosInstance.post(
          `${process.env.REACT_APP_NOTUS_API_URI}/users/password-reset`,
          {
            email: this.state.email
          }
        ).then(() => {
          this.setState({
            success: true,
            isResetting: false
          })
        }).catch(error => {
          this.setState({
            error: error.message,
            isResetting: false
          })
        })
      }
    }

    handlePasswordReset = (e) => {
      e.preventDefault()

      this.setState({
        error: '',
        isResetting: true
      }, this.doReset)
    }

    render () {
      let message

      if (this.state.isResetting) {
        message = 'Checking account ...'
      }

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
              If an account exists with the email <span className='has-text-white'>'{this.state.email}'</span> check it's inbox for a reset password link.
            </p>
            <br />
            <p className='is-size-7 has-text-lighter has-text-weight-semibold has-text-centered'>
              Can't find the email? Check your spam folder first. Or reach out to us for support.
            </p>
          </div>
        </div>
      )

      const form = (
        <div className='accordion accordion-enter-done accordion--signup-form'>
          <div className='card-content'>
            <form
              onSubmit={this.handlePasswordReset}
              className='form'
            >
              <h6 className='is-size-6 has-text-centered has-text-weight-bold'>
                {this.state.error}
              </h6>

              <div className='field mt15'>
                <input
                  placeholder='Account email address'
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
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )

      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='Reset Your Password'
          />

          <ScrollToTop />

          <section className='section section--main-content has-no-top-padding pb50'>
            <div className='container'>
              <div className='row'>
                <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
                  <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt75'>
                    Reset Your Password
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
                    {/* <footer className='card-footer has-text-centered'>
                      Signing up signifies you have read and agree to the<a href='/terms'>Terms of Service</a>{' '}
                      and&nbsp;<a href='/privacy'>Privacy Policy</a>.
                    </footer> */}
                  </section>

                  <br />

                  <div className='card-footer has-text-centered'>
                    <p className='has-text-weight-bold'>
                      {message}
                    </p>

                    Remembered the password?
                    <br />
                    <Link to={routes.SIGNIN}>
                      Sign In
                    </Link>
                    {/* <br />Check your email for the API key originally sent to you. */}
                  </div>

                  <hr />

                  <div className='card-footer has-text-centered'>
                    Need a new account?
                    <br />
                    <Link to={routes.SIGNUP}>
                      Sign Up
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
  }
