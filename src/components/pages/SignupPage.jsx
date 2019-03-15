import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const SignupPage = 
  class _SignupPage extends PureComponent {
    render () {
      return (
        <div className='is-positioned-absolutely'>
          <section className='section section--main-content has-bg'>
            <div className='section columns has-no-top-padding'>
              <div className='column is-4 is-offset-4'>
                <div>
                  <div className='column has-text-centered'>
                    <Link to={routes.HOME} className='navbar-item'>
                      <NotusLogo className='logo' /> 
                    </Link>
                  </div>
                  <section className='card has-shadow has-shadow-big'>
                    <header className='card-header has-text-centered'>
                      Get Started for Free
                    </header>
                    <div className='card-content'>
                      <form>
                        <div className='form-error'>
                          <span />
                        </div>
                        <div className='field'>
                          <label for='email' className='label'>
                            email
                          </label>
                          <input
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

          </section>

          <FooterContainer />
        </div>
      )
    }
  }