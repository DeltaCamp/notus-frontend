import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { FooterContainer } from '~/components/layout/Footer'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'
import AntdIcon from '@ant-design/icons-react'
import { MailOutline } from '@ant-design/icons'
import { axiosInstance } from '~/../config/axiosInstance'
import * as routes from '~/../config/routes'
// FORM VALIDATION AND ERROR div!

const MAX_LENGTH = 120

export const SignupPage =
  class _SignupPage extends Component {
    state = {
      email: '',
      dappName: '',
      success: false
    }

    doSignup = async () => {
      const { email, dappName } = this.state

      if (email && dappName) {
        // check if email and dappName exists in DB, if yes:
        // - name already registered, check email used to sign up
        // - also could re-send email w/ API key if dapp name matches email provided

        // if no:
        // - create a new dapp in the db and hook it up to this email address
        // - on the API server, send an email to the newly signed up user
        // console.log(process.env.REACT_APP_NOTUS_API_URI)

        try {
          const response = await axiosInstance.post(
            `${process.env.REACT_APP_NOTUS_API_URI}/dapps`,
            {
              email: this.state.email,
              dappName: this.state.dappName
            }
          )

          if (response.status === 201) {
            // console.log(response.data)
            this.setState({ success: true })
          } else {
            this.setState({ error: true })
          }
        } catch (err) {
          console.error(err)
          this.setState({ error: true })
        } finally {
          this.setState({
            isSigningUp: false
          })
        }
      }
    }

    handleSignupSubmit = (e) => {
      e.preventDefault()

      this.setState({
        error: false,
        isSigningUp: true
      }, this.doSignup)
    }

    handleDappNameChange = (e) => {
      // strip bad chars
      let dappName = e.target.value.replace(/[$ ^* !#|&;$%@"<>()+,]/g, '')

      // strip strings that are too long
      dappName = dappName.substring(0, MAX_LENGTH)

      this.setState({ dappName })
    }

    render () {
      const thankYou = (
        <div className='accordion accordion--signup-thank-you'>
          <div className='card-content'>
            <h4 className='is-size-4 has-text-centered'>
              Thanks for using Notus!
            </h4>
            <div className='has-text-centered'>
              <AntdIcon type={MailOutline} className='antd-icon icon--signup-large' />
            </div>
            <p>
              Check your <strong>'{this.state.email}'</strong> inbox for the API secret to <strong>'{this.state.dappName}'</strong>.
            </p>
            <br />
            <p className='is-size-7 has-text-grey-light'>
              Can't find the email? Check your spam folder first. We can also re-send the key or reach out to us for support.
            </p>
          </div>
        </div>
      )

      const form = (
        <div className='accordion accordion-enter-done accordion--signup-form'>
          <header className='card-header has-text-centered'>
            Get Started for Free
          </header>
          <div className='card-content'>
            <form onSubmit={this.handleSignupSubmit}>
              <div className='form-error'>
                <span />
              </div>
              <div className='field'>
                <label htmlFor='email' className='label'>
                  email
              </label>
                <input
                  autoFocus
                  type='email'
                  id='email'
                  className='input'
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                  value={this.state.email}
                />
              </div>
              <div className='field'>
                <label htmlFor='password' className='label'>
                  dapp name
              </label>
                <input
                  type='text'
                  id='dapp-name'
                  className='input'
                  onChange={this.handleDappNameChange}
                  value={this.state.dappName}
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
                  className='button is-dark is-outlined is-small'
                >
                  Sign Up
              </button>
              </div>
            </form>
          </div>
        </div>
      )

      return (
        <div>
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
        </div>
      )
    }
  }
