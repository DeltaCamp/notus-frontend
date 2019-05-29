import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { withCurrentUser } from '~/components/withCurrentUser'
import * as routes from '~/../config/routes'

// const debug = require('debug')('notus:components:IsAuthed')

export const IsAuthed =
  (WrappedComponent) => {
    return withCurrentUser(
      class extends Component {
        render () {
          const { currentUserData } = this.props || {}
          const { currentUser, loading } = currentUserData || {}
          const isSigningOut = (this.props.history.location.pathname === '/signin')

          // debug(currentUserData)

          if (!loading && !currentUser && !isSigningOut) {
            return <Redirect to={routes.SIGNIN} />
          } else {
            return <WrappedComponent {...this.props} />
          }
        }
      }
    )
  }
