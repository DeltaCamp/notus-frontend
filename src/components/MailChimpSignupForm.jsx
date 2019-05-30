import React, { Component } from 'react'
import queryString from 'query-string'
import { Mail } from 'react-feather'
import { CSSTransition } from 'react-transition-group'

export const MailChimpSignupForm =
  class _MailChimpSignupForm extends Component {
    state = {
      email: '',
      success: false
    }

    openInNewTab = (url) => {
      const win = window.open(url, '_blank')
      win.focus()
    }

    handleSignupSubmit = () => {
      if (this.state.email === '') {
        return
      }

      const formData = {
        u: 'dda96220bd3cf850197d3786a',
        id: 'e2bd919bed',
        EMAIL: this.state.email,
        b_dda96220bd3cf850197d3786a_e2bd919bed: ''
      }

      const hostPortAndPath = 'https://gmail.us20.list-manage.com/subscribe/post'
      this.openInNewTab(`${hostPortAndPath}?${queryString.stringify(formData)}`)

      this.setState({
        success: true
      })
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
            className={`form is-tall`}
          >

            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input
                  ref={this.inputRef}
                  placeholder='Your email'
                  type='email'
                  className='input is-white'
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                  value={this.state.email}
                />
              </div>
              <div className='control'>
                <button
                  type='submit'
                  className='button'
                  disabled={this.state.email === ''}
                >
                  Subscribe
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
