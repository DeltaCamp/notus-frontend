import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'
import * as routes from '~/../config/routes'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div className='footer--primary'>
            <div className='footer-menu'>
              <a
                href='/#your-webhooks'
                className='footer-item is-uppercase has-text-weight-bold'
              >
                Hooks
              </a>
            </div>
          </div>

          <div className='footer--secondary'>
            <div className='footer-brand'>
              <div className='footer-item'>
                <h6 className='is-size-6'>
                  <NotusLogo />
                </h6>
                <br />
                Notus is also an open source project. Learn more on GitHub: 
                <br />
                <a 
                  href='https://github.com/ethnotus'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Visit Notus on GitHub
                </a>
                <br />
                <br />
              </div>
            </div>

            <br />

            <span
              className='footer-item footer-item--copyright'
            >
              &copy; {year} <a
                href='https://delta.camp'
                target='_blank'
                rel='noopener noreferrer'
              >Delta Camp</a> &amp; <a
                href='https://twitter.com/jacque006'
                target='_blank'
                rel='noopener noreferrer'
              >Jake Caban-Tomski</a>
            </span>
          </div>
        </footer>
      </>
    )
  }
}

export const FooterContainer = withRouter(Footer)
