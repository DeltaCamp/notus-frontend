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
            <ul className='footer-list'>
              <li className='list-item is-inline-block'><a href="about">About</a></li>
              <li className='list-item is-inline-block'><a href="mailto:help@notus.network">Help</a></li>
              <li className='list-item is-inline-block'>
                <a
                  href='https://github.com/notifyus'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Open Source
                </a>
              </li>
              <li className='list-item is-inline-block'><a href="terms">Terms</a></li>
              <li className='list-item is-inline-block'><a href="privacy">Privacy</a></li>
              <li className='list-item is-inline-block'><a href="trust">Trust</a></li>
            </ul>

            <div className='footer-brand pt75'>
              <div className='footer-item'>
                <div className='container'>
                  <div className='row pb50'>
                    <div className='col-xs-12 col-md-6 col-start-md-4'>
                      <NotusLogo />

                      <p className='is-size-7'>
                        Notus makes it easy to listen for Ethereum smart contract events and triggering webhooks or sending messages in response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span
              className='footer-item footer-item--copyright is-size-7'
            >
              Built by <a
                href='https://delta.camp'
                target='_blank'
                rel='noopener noreferrer'
              >Delta Camp</a>
              <br />
              Copyright &copy; {year}
            </span>
          </div>
        </footer>
      </>
    )
  }
}

export const FooterContainer = withRouter(Footer)
