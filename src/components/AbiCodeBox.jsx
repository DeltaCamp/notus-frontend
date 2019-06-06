import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { abiQuery } from '~/queries/abiQuery'

// const debug = require('debug')('notus:components:AbiCodeBox')

export const AbiCodeBox = 
  graphql(abiQuery, {
    name: 'abiData',
    skip: (props) => !props.abiId,
    options: (props) => ({
      variables: {
        id: parseInt(props.abiId, 10)
      },
      fetchPolicy: 'cache-and-network'
    })
  })(
    class _AbiCodeBox extends PureComponent {
      static propTypes = {
        abiId: PropTypes.number,
      }

      render () {
        const { abiBody, abiData } = this.props
        const abi = abiData?.abi

        return (
          <code className='code'>
            <pre>
              {abiBody || abi?.abi || 'Choose ABI Method Above'}
            </pre>
          </code>
        )
      }

    }
  )