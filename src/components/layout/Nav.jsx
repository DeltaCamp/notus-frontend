import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'
import * as routes from '~/../config/routes'
import { currentUserQuery } from '~/queries/currentUserQuery'

import { graphql } from 'react-apollo'

export const Nav = graphql(currentUserQuery)(
  withRouter(class _Nav extends Component {
    state = {
      mobileNavActive: false
    }

    handleToggleMobileNav = (e) => {
      const mobileNavActive = !this.state.mobileNavActive

      this.setState({ mobileNavActive })
    }

    closeMobileNav = (e) => {
      this.setState({ mobileNavActive: false })
    }

    render () {
      let signUp, dashboard

      if (!this.props.data.currentUser) {
        signUp =
          <Link
            to={routes.SIGNUP}
            className='navbar-item'
          >
            Sign Up
          </Link>
      } else {
        dashboard =
          <Link
            to={routes.DASHBOARD}
            className='navbar-item'>
            Dashboard
          </Link>
      }

      return (
        <>
          <div
            className={classnames('nav-background no-select', { 'is-active': this.state.mobileNavActive })}
            onClick={this.closeMobileNav}
          />

          <nav className='navbar is-transparent'>
            <div className='container'>
              <div className='row navbar-menu-container'>
                <div className='navbar-brand col-xs-8 col-md-8'>
                  <Link to={routes.HOME} className='navbar-item'>
                    <NotusLogo />
                  </Link>
                </div>

                <div className='col-xs-4 is-hidden-tablet has-text-right'>
                  <button
                    className={classnames(
                      'burger',
                      'burger-slip',
                      { 'open': this.state.mobileNavActive }
                    )}
                    data-target='navbar-menu'
                    onClick={this.handleToggleMobileNav}
                  >
                    <div className='burger-lines' />
                  </button>
                </div>

                <div id='navbar-menu' className={classnames(
                  'navbar-menu',
                  'col-xs-4',
                  'col-md-4',
                  { 'is-active': this.state.mobileNavActive }
                )}>
                  <div className='navbar-end'>
                    {signUp}
                    {dashboard}
                  </div>
                </div>
              </div>

            </div>
          </nav>
        </>
      )
    }
    })
)
