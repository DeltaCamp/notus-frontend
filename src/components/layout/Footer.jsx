import React, { Component } from 'react'
import { withRouter } from 'react-router'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div className='footer--primary'>
            <div className='footer-brand'>
              <div className='footer-item'>
                <h6 className='is-size-6'>
                  <NotusLogo />
                </h6>
                <br />
                <h6 className='is-size-7'>
                  <a
                    href='https://github.com/notifyus'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Notus on GitHub
                  </a>
                </h6>
                
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
