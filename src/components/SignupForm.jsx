import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'
import { Mail } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { withRouter } from 'react-router'

import { signUpMutation } from '~/mutations/signUpMutation'
import { getSystemInfo } from '~/utils/getSystemInfo'
import { signupHelper } from '~/utils/signupHelper'

const debug = require('debug')('notus:components:SignupForm')

export const SignupForm =
  graphql(signUpMutation, { name: 'signUp' })(
    withRouter(
      ReactTimeout(
        class _SignupForm extends Component {
          state = {
            email: '',
            success: false
          }

          constructor (props) {
            super(props)

            this.inputRef = React.createRef()
          }

          componentDidMount () {
            const { mobileOS } = getSystemInfo()
            const touch = (mobileOS === 'iOS' || mobileOS === 'Android')

            if (!touch && this.props.autoFocus) {
              this.inputRef.current.focus()
            }
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

          // doSignup = async () => {
          //   const { email } = this.state

          //   this.props.setSuccess()

          //   this.setState({
          //     success: true,
          //     signingUp: false
          //   })

          //   this.setState({
          //     signingUp: false
          //   })
          // }

          handleSignupSubmit = (e) => {
            e.preventDefault()

            this.setState({
              signingUp: true
            }, this.doSignup)
          }

          activate = (active) => {
            this.setState({ active: true })
          }

          deactivate = (active) => {
            this.setState({ active: false })
          }

          render () {
            const thankYou = (
              <div className='accordion accordion--signup-thank-you'>
                <div className='signup-message has-text-weight-semibold'>
                  <Mail className='icon--signup' />
                  Thanks! We've invited: <strong>'{this.state.email}'</strong>
                  <div className='is-size-7 signup-message--footer has-text-weight-semibold'>
                    (Can't find it? Check your spam and 'Updates' folders as well!)
                  </div>
                </div>
              </div>
            )

            const form = (
              <div className='accordion accordion-enter-done accordion--signup-form'>
                <form
                  onSubmit={this.handleSignupSubmit}
                  className={`form is-tall ${this.state.active && 'is-active'}`}
                >
                  <div className='field has-addons'>
                    <div className='control is-expanded'>
                      <input
                        ref={this.inputRef}
                        placeholder='Enter your email'
                        type='email'
                        className='input is-white'
                        onFocus={this.activate}
                        onBlur={this.deactivate}
                        onMouseOver={this.activate}
                        onMouseOut={this.deactivate}
                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                        value={this.state.email}
                      />
                    </div>
                    <div className='control'>
                      <button
                        type='submit'
                        className='button'
                        onFocus={this.activate}
                        onBlur={this.deactivate}
                        onMouseOver={this.activate}
                        onMouseOut={this.deactivate}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                  {/* <div className='control checkbox'>
                                          <label htmlFor='newsletter'>
                                            <input id='newsletter' className='checkbox-input' type='checkbox' />Stay
                                            up-to-date with our newsletter
                                        </label>
                                        </div> */}

                </form>
              </div>
            )

            return (
              <div>
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
              </div>
            )
          }
        }
      )
    )
  )
