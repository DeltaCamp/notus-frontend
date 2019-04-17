import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

export const IsAuthed = 
  (WrappedComponent) => {
    return graphql(currentUserQuery, { name: 'currentUserData' })(
      class extends Component {
        state = {}
        
        componentDidUpdate() {
          const { currentUser } = this.props.currentUserData

          const isSigningOut = (this.props.history.location.pathname === '/signin')

          if (!currentUser && !this.state.redirect && !isSigningOut) {
            // toast.error('Please sign in to access this page.')
            this.setState({ redirect: true })
          }
        }

        render () {
          if (this.state.redirect) {
            return <Redirect to={routes.SIGNIN} />
          }

          return <WrappedComponent {...this.props} />;
        }
      }
    )
  }