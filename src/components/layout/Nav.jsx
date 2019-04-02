import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import NotusLogo from '~/assets/images/notus--wordmark--black-transparent2.svg'
import * as routes from '~/../config/routes'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { signOutMutation } from '~/mutations/signOutMutation'

import { graphql } from 'react-apollo'

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
          this.props.history.push(routes.SIGNIN)
        }).catch(error => {
          console.error(error)
        })
      }

      render () {
        let signUp, dashboard, signOut

        if (!this.props.data.currentUser) {
          signUp = <>
            <Link
              to={routes.SIGNIN}
              className='navbar-item'
              onClick={this.closeMobileNav}
            >
              Sign In
            </Link>
            <Link
              to={routes.SIGNUP}
              className='navbar-item bold'
              onClick={this.closeMobileNav}
            >
              Sign Up
            </Link>
          </>
        } else {
          signOut =
            <a className='navbar-item' onClick={this.handleSignOut}>Sign Out</a>
          dashboard =
            <Link
              to={routes.DASHBOARD}
              className='navbar-item'
              onClick={this.closeMobileNav}
            >
              Dashboard
            </Link>
        }

        // {this.state.signedOut && <Redirect to={routes.SIGNIN} />}

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
