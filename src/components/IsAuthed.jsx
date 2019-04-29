import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

export const IsAuthed = 
  (WrappedComponent) => {
    return graphql(currentUserQuery, { name: 'currentUserData' })(
      class extends Component {
        render () {
          const { currentUser } = this.props.currentUserData
          const isSigningOut = (this.props.history.location.pathname === '/signin')
          if (!currentUser && !isSigningOut) {
            return <Redirect to={routes.SIGNIN} />
          } else {
            return <WrappedComponent {...this.props} />;
          }
        }
      }
    )
  }