import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { FooterContainer } from '~/components/layout/Footer'
import { Mail } from 'react-feather'
import { axiosInstance } from '~/../config/axiosInstance'
import { ScrollToTop } from '~/components/ScrollToTop'
import * as routes from '~/../config/routes'

export const SignUpPage =
  class _SignUpPage extends Component {
    state = {
      email: '',
      success: false
    }

    doSignup = async () => {
      const { email } = this.state

      if (email) {
        // check if email and dappName exists in DB, if yes:
        // - name already registered, check email used to sign up
        // - also could re-send email w/ API key if dapp name matches email provided

        // if no:
        // - create a new dapp in the db and hook it up to this email address
        // - on the API server, send an email to the newly signed up user
        // console.log(process.env.REACT_APP_NOTUS_API_URI)

        await axiosInstance.post(
          `${process.env.REACT_APP_NOTUS_API_URI}/users`,
          {
            email: this.state.email
          }
        ).then(() => {
          this.setState({
            success: true,
            isSigningUp: false
          })
        }).catch(error => {
          console.error(error)
          this.setState({
            error: true,
            isSigningUp: false
          })
        })
      }
    }

    handleSignupSubmit = (e) => {
      e.preventDefault()

      this.setState({
        error: false,
        isSigningUp: true
      }, this.doSignup)
    }

    render () {
      const thankYou = (
        <div className='accordion accordion--signup-thank-you'>
          <div className='card-content'>
            <h4 className='is-size-4 has-text-centered mt30'>
              Thanks for using Notus!
            </h4>
            <div className='has-text-centered'>
              <Mail className='icon--signup-large' />
            </div>
            <p>
              Check your <span className='has-text-light'>'{this.state.email}'</span> inbox for a magic link to access your Notus account!
            </p>
            <br />
            <p className='is-size-7 has-text-light'>
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
              className='form'
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
                  className='button is-small'
                >
                  Sign Up
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
                <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3'>
                  <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt75'>
                    Get Started For Free
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
                    Already have an account you lost the password to?
                    <br />
                    <Link to={routes.PASSWORD_RESET}>
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
  }
