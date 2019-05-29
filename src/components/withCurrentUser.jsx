import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { currentUserQuery } from '~/queries/currentUserQuery'

// const debug = require('debug')('notus:components:withCurrentUser')

export const withCurrentUser =
  (WrappedComponent) => {
    return graphql(currentUserQuery, {
      name: 'currentUserData',
      options: { fetchPolicy: 'cache-and-network' },
    })(
      class _withCurrentUser extends PureComponent {
        render () {
          const { currentUserData } = this.props || {}
          const { currentUser, loading, error } = currentUserData || {}

          if (loading) {
            // debug('Still loading currentUser query in HoC: ', loading)
          }

          if (error) {
            console.error(error.message)
            // debug('Error in withCurrentUser HoC: ', error)
          }

          const newProps = {
            ...this.props,
            currentUserData,
            currentUser
          }

          return <WrappedComponent {...newProps} />
        }
      }
    )
  }
