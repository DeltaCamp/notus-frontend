import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { FourOhFour } from '~/components/pages/FourOhFour'
import { currentUserQuery } from '~/queries/currentUserQuery'

export const IsAdmin =
  (WrappedComponent) => {
    return graphql(currentUserQuery, { name: 'currentUserData' })(
      class extends Component {
        render () {
          const { currentUser } = this.props.currentUserData

          if (!currentUser || !currentUser.isAdmin) {
            return <FourOhFour {...this.props} />
          } else {
            return <WrappedComponent {...this.props} />
          }
        }
      }
    )
  }
