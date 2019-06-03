import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import { Activity, FileText, Power, Search, Send, Settings } from 'react-feather'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { withCurrentUser } from '~/components/withCurrentUser'
import { signOutMutation } from '~/mutations/signOutMutation'
import { notusToast } from '~/utils/notusToast'
import NotusLogo from '~/assets/images/notus-logo.svg'
import * as routes from '~/../config/routes'

// const debug = require('debug')('notus:components:Nav')

export const Nav = graphql(signOutMutation, { name: 'signOutMutation' })(
  withCurrentUser(
    withRouter(
      ReactTimeout(class _Nav extends Component {
        constructor (props) {
          super(props)
          this.state = {
            signedOut: false
          }
        }

        state = {
          mobileNavActive: false,
          navIsInFront: false
        }

        handleToggleMobileNav = (e) => {
          if (this.state.mobileNavActive) {
            this.closeMobileNav()
          } else {
            this.setState({ 
              mobileNavActive: true,
              navIsInFront: true
            })

            if (this.navFrontFalseTimeout) {
              this.props.clearTimeout(this.navFrontFalseTimeout)
            }
          }
        }

        closeMobileNav = (e) => {
          this.setState({ mobileNavActive: false })

          this.navFrontFalseTimeout = this.props.setTimeout(() => {
            this.setState({ navIsInFront: false })
          }, 1000)
        }

        handleSignOut = (e) => {
          this.props.signOutMutation().then(() => {
            this.closeMobileNav()

            notusToast.info('Successfully signed out. Thanks for using Notus!')
            this.props.history.push(routes.SIGNIN)
          }).catch(error => {
            console.error(error)
          })
        }

        render () {
          const { currentUserData } = this.props || {}
          const { currentUser } = currentUserData || {}
          
          let signUp, myEvents, signOut

          // debug(currentUserData, currentUser)

          if (!currentUserData || !currentUser) {
            signUp = <>
              <NavLink
                exact
                to={routes.SIGNIN}
                className='navbar-item'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
              Sign in
              </NavLink>
              <NavLink
                exact
                to={routes.SIGNUP}
                className='navbar-item bold'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
                Sign up
              </NavLink>
            </>
          } else {
            signOut = (
              <>
                <NavLink
                  exact
                  className='navbar-item bold hide-not-home button'
                  to={routes.MY_EVENTS}
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <Send className='navbar-item--icon' /> Go to App
                </NavLink>
                <NavLink
                  exact
                  className='navbar-item hide-on-home'
                  to={routes.ACCOUNT_SETTINGS}
                  onClick={this.closeMobileNav}
                  activeClassName="is-active"
                >
                  <Settings className='navbar-item--icon' /> Settings
                </NavLink>
                <button
                  className='navbar-item button hide-on-home'
                  onClick={this.handleSignOut}
                >
                  <Power className='navbar-item--icon' /> Sign out
                </button>
              </>
            )

            myEvents =
              <>
                <NavLink
                  exact
                  to={routes.MY_EVENTS}
                  className='navbar-item'
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <Activity className='navbar-item--icon' /> Events
                </NavLink>
                <NavLink
                  exact
                  to={routes.CONTRACTS}
                  className='navbar-item'
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <FileText className='navbar-item--icon' /> Contracts
                </NavLink>
                <NavLink
                  exact
                  to={routes.DISCOVER_EVENTS}
                  className='navbar-item'
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <Search className='navbar-item--icon' /> Discover
                </NavLink>
              </>
          }

          return (
            <>
              <div
                className={classnames(
                  'nav-background',
                  'no-select', 
                  {
                    'is-active': this.state.mobileNavActive
                  }
                )}
                onClick={this.closeMobileNav}
              />

              <nav className={classnames(
                'navbar',
                'is-transparent',
                {
                  'is-active': this.state.mobileNavActive,
                  'is-top-layer': this.state.navIsInFront
                }
              )}>
                <div className='container'>
                  <div className='row navbar-menu-container'>
                    <div className='navbar-brand col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-2'>
                      <Link
                        to={routes.HOME}
                        className='navbar-item'
                        onClick={this.closeMobileNav}
                      >
                        <NotusLogo />
                      </Link>
                    </div>

                    <div className='col-xs-6 is-hidden-tablet has-text-right'>
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
                      'col-xs-12',
                      'col-sm-8',
                      'col-md-9',
                      'col-lg-9',
                      'col-xl-10',
                      { 'is-active': this.state.mobileNavActive }
                    )}>
                      <div className='navbar-start'>
                        {myEvents}
                      </div>
                      <div className='navbar-end'>
                        {signUp}
                        {signOut}
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
  )
)