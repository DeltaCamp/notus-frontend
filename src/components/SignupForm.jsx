import React, { Component } from 'react'
import { Mail } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { axiosInstance } from '~/../config/axiosInstance'
import { getSystemInfo } from '~/utils/getSystemInfo'

export const SignupForm =
  class _SignupForm extends Component {
    state = {
      email: '',
      success: false
    }

    constructor(props) {
      super(props)

      this.inputRef = React.createRef()
    }

    componentDidMount() {
      const { mobileOS } = getSystemInfo()
      const touch = (mobileOS === 'iOS' || mobileOS === 'Android')

      if (!touch && this.props.autoFocus) {
        this.inputRef.current.focus()
      }
    }

    doSignup = async () => {
      const { email } = this.state

      if (email) {
        // check if email and appName exists in DB, if yes:
        // - name already registered, check email used to sign up
        // - also could re-send email w/ API key if app name matches email provided

        // if no:
        // - create a new app in the db and hook it up to this email address
        // - on the API server, send an email to the newly signed up user
        // console.log(process.env.REACT_APP_NOTUS_API_URI)

        await axiosInstance.post(
          `${process.env.REACT_APP_NOTUS_API_URI}/users`,
          {
            email: this.state.email
          }
        ).then(() => {
          this.props.setSuccess()
          
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

    activate = (active) => {
      this.setState({ active: true })
    }

    deactivate = (active) => {
      this.setState({ active: false })
    }

    render () {
      const thankYou = (
        <div className='accordion accordion--signup-thank-you'>
          <p className='signup-message'>
            <Mail className='icon--signup' />
            Thanks! We've invited: <strong>'{this.state.email}'</strong>
            <span className='is-size-7 signup-message--footer'>
              (Can't find it? Check your spam and 'Updates' folders as well!)
            </span>
          </p>
        </div>
      )
      
      const form = (
        <div className='accordion accordion-enter-done accordion--signup-form'>
          <form
            onSubmit={this.handleSignupSubmit}
            className={`form ${this.state.active ? 'is-active' : ''}`}
          >
            <div className="field has-addons">
              <div className="control">
                <input
                  ref={this.inputRef}
                  placeholder='Enter your email'
                  type='email'
                  id='email'
                  className='input'
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
                  Get Started
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
