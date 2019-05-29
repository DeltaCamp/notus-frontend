import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { networksQuery } from '~/queries/networksQuery'

const debug = require('debug')('notus:NetworkSelect')

export const NetworkSelect = graphql(networksQuery, {
  name: 'networksQuery'
})(
  class _NetworkSelect extends PureComponent {
    static propTypes = {
      networkId: PropTypes.number,
      onChangeNetworkId: PropTypes.func.isRequired
    }

    onChange = (option) => {
      this.props.onChangeNetworkId(option.value, option.label)
    }

    render () {
      const { networkId, networksQuery } = this.props

      let options = []

      const { error, networks } = networksQuery

      if (error) {
        console.error(error)
        return null
      } else if (networks) {
        options = networks.map(network => {
          return {
            label: network.name,
            value: network.id
          }
        })
      }

      const value = options.find(option => {
        const id = parseInt(option.value, 10)
        return id && id === parseInt(networkId, 10)
      })

      debug(`networkId: ${networkId} value: `, value)

      return <NotusSelect
        {...this.props}
        value={value}
        options={options}
        onChange={this.onChange}
      />
    }
  }
)
