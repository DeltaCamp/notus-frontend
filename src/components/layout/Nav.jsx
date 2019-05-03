import React, { Component } from 'react'
import classnames from 'classnames'
import { Activity, Power, Search, Send } from 'react-feather'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'

import NotusLogo from '~/assets/images/notus-logo.svg'
import { signOutMutation } from '~/mutations/signOutMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { notusToast } from '~/utils/notusToast'
import * as routes from '~/../config/routes'

export const Nav = graphql(signOutMutation, { name: 'signOutMutation' })(
  graphql(currentUserQuery)(
    withRouter(class _Nav extends Component {
      constructor (props) {
        super(props)
        this.state = {
          signedOut: false
        }
      }

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
        let signUp, myEvents, signOut

        if (!this.props.data.currentUser) {
          signUp = <>
            <NavLink
              exact
              to={routes.SIGNIN}
              className='navbar-item'
              onClick={this.closeMobileNav}
              activeClassName='is-active'
            >
            Sign In
            </NavLink>
            <NavLink
              exact
              to={routes.SIGNUP}
              className='navbar-item bold'
              onClick={this.closeMobileNav}
              activeClassName='is-active'
            >
              Sign Up
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
                <Send />&nbsp;Go To App
              </NavLink>
              {/* <NavLink
                exact
                className='navbar-item hide-on-home'
                to={routes.ACCOUNT_SETTINGS}
                onClick={this.closeMobileNav}
                activeClassName="is-active"
              >
                <Star />&nbsp;Your Account
              </NavLink>
              */}
              <button
                className='navbar-item button hide-on-home'
                onClick={this.handleSignOut}
              >
                <Power />&nbsp;Sign Out
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
                <Activity />&nbsp;My Events
              </NavLink>
              <NavLink
                exact
                to={routes.DISCOVER_EVENTS}
                className='navbar-item'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
                <Search />&nbsp;Discover Events
              </NavLink>
            </>
        }

        return (
          <>
            <div
              className={classnames('nav-background no-select', { 'is-active': this.state.mobileNavActive })}
              onClick={this.closeMobileNav}
            />

            <nav className={classnames(
              'navbar',
              'is-transparent',
              { 'is-active': this.state.mobileNavActive }
            )}>
              <div className='container'>
                <div className='row navbar-menu-container'>
                  <div className='navbar-brand col-xs-6 col-md-1 col-lg-1'>
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
                    'col-md-10',
                    'col-lg-11',
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
