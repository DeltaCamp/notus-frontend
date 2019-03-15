import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const SignupPage = 
  class _SignupPage extends PureComponent {

    handleSignupSubmit = (e) => {
      e.preventDefault()

      const { email, dappName } = this.state

      if (email && dappName) {
        // check if dappName exists in DB, if yes:
        // - name has been taken and recommend to check email used to sign up
        // if no:
        // - create a new dapp in the db and hook it up to this email address
        // - on the API server, send an email to the newly signed up user
      }
    }

    render () {
      return (
        <div className='is-positioned-absolutely'>
          <section className='section has-bg has-no-top-padding'>
            <div className='container'>
              <div className='row'>
                <div className='column col-xs-12 col-lg-8 col-start-lg-3'>
                  <div>
                    <div className='column has-text-centered'>
                      <Link to={routes.HOME} className='navbar-item'>
                        <NotusLogo className='logo logo-signup' /> 
                      </Link>
                    </div>
                    <section className='card has-shadow has-shadow-big'>
                      <header className='card-header has-text-centered'>
                        Get Started for Free
                      </header>
                      <div className='card-content'>
                        <form onSubmit={this.handleSignupSubmit}>
                          <div className='form-error'>
                            <span />
                          </div>
                          <div className='field'>
                            <label for='email' className='label'>
                              email
                            </label>
                            <input
                              autoFocus
                              type='email'
                              id='email'
                              className='input'
                            />
                          </div>
                          <div className='field'>
                            <label for='password' className='label'>
                              dapp name
                            </label>
                            <input
                              type='text'
                              id='dapp-name'
                              className='input'
                            />
                          </div>
                          {/* <div className='control checkbox'>
                            <label for='newsletter'>
                              <input id='newsletter' className='checkbox-input' type='checkbox' />Stay
                              up-to-date with our newsletter
                          </label>
                          </div> */}
                          <div className='control form-submit has-text-centered'>
                            <button
                              type='submit'
                              className='button is-dark is-outlined is-small'
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>
                        {/* <footer className='card-footer has-text-centered'>
                          Signing up signifies you have read and agree to the<a href='/terms'>Terms of Service</a>{' '}
                          and&nbsp;<a href='/privacy'>Privacy Policy</a>.
                        </footer> */}
                      </div>
                    </section>
                    <br />
                    <div className='card-footer has-text-centered'>
                      Already have an account?
                      <br />Check your email for the API key originally sent to you.
                    </div>
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