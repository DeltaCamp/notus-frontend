import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { networkQuery } from '~/queries/networkQuery'

export const NetworkName = graphql(networkQuery, { name: 'networkQuery' })(
  class _NetworkName extends PureComponent {
    static propTypes = {
      networkId: PropTypes.number.isRequired
    }

    render () {
      const { loading, network } = this.props.networkQuery
      if (network) {
        return network.name
      } else {
        return null
      }
    }
  }
)