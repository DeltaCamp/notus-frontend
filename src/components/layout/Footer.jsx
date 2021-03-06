import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Twitter
} from 'react-feather'
import { withRouter } from 'react-router'
// import NotusLogo from '~/assets/images/notus-logo.svg'
import NotusLogo from '~/assets/images/notus-logo--black-blue-pink4.svg'
import * as routes from '~/../config/routes'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div className='footer--primary'>
            <ul className='footer-list'>
              <li className='list-item is-inline-block'>
                <Link to={routes.ABOUT_PAGE}>About</Link>
              </li>
              <li className='list-item is-inline-block'>
                <a
                  href='https://discord.gg/WXMDXqb'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Discord
                </a>
              </li>
              <li className='list-item is-inline-block'>
                <Link to={routes.TERMS_PAGE}>Terms</Link>
              </li>
              <li className='list-item is-inline-block'>
                <Link to={routes.PRIVACY_PAGE}>Privacy</Link>
              </li>
              <li className='list-item is-inline-block'>
                <Link to={routes.SUPPORT_PAGE}>Support</Link>
              </li>
            </ul>

            <div className='footer-brand pt75'>
              <div className='footer-item'>
                <div className='container'>
                  <div className='row pb50'>
                    <div className='col-xs-12 col-md-6 col-start-md-4'>
                      <Link
                        to={routes.HOME}
                        onClick={this.closeMobileNav}
                      >
                        <NotusLogo
                          className='brand-svg'
                        />
                      </Link>

                      <p className='is-size-7'>
                        Listen to Ethereum using Notus.  Trigger emails or anything you can imagine.
                      </p>

                      <br />

                      <a href='https://twitter.com/NotusEvents'>
                        <Twitter id='twitter' className='is-large twitter-svg' />
                      </a>
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
