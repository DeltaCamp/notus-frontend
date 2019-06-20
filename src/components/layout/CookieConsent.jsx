import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { notusLocalStorage } from '~/utils/notusLocalStorage'
import { CONSENT_COOKIE_NAME } from '~/constants'
import * as routes from '~/../config/routes'

export const CookieConsent = ReactTimeout(
  class _CookieConsent extends Component {
    state = {
      hidden: false
    }

    componentDidMount () {
      const cookieConsent = notusLocalStorage.read(CONSENT_COOKIE_NAME)

      if (cookieConsent) {
        this.setState({ hidden: true })
      } else {
        this.props.setTimeout(this.animateIn, 5000)
      }
    }
 
    handleAccept = (e) => {
      e.preventDefault()

      notusLocalStorage.write(CONSENT_COOKIE_NAME, true)

      this.setState({ hidden: true })
    }

    animateIn = () => {
      this.setState({
        visible: true
      })
    }

    render () {
      return (
        <div
          className={classnames(
            'cookie-consent',
            {
              'cookie-consent-enter': this.state.visible,
              'cookie-consent-exit': this.state.hidden
            }
          )}
        >
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-sm-9'>
                Cookies are used to store your login and for reporting. You consent to cookies if you continue using the <a href='https://notus.events'>notus.events</a> site. Please refer to the <Link to={routes.PRIVACY_PAGE}>privacy policy</Link> for more information.
              </div>
              <div className='col-xs-12 col-sm-3'>
                <button
                  className='button is-link is-small'
                  onClick={this.handleAccept}
                >
                  Ok, got it!
                </button>
              </div>
              
            </div>
          </div>
        </div>
      )
    }
  }
)
