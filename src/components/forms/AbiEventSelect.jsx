import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { abiEventsQuery } from '~/queries/abiEventsQuery'

const debug = require('debug')('notus:AbiEventSelect')

export const AbiEventSelect = graphql(abiEventsQuery, {
  name: 'abiEventsData',
  skip: (props) => !props.abiId,
  options: (props) => {
    return {
      variables: {
        abiEventsQuery: {
          abiId: parseInt(props.abiId, 10)
        }
      }
    }
  }
})(
  class _AbiEventSelect extends PureComponent {
    static propTypes = {
      abiId: PropTypes.number,
      onChangeAbiEventId: PropTypes.func.isRequired,
      handleOpenReactSelect: PropTypes.func.isRequired,
      handleCloseReactSelect: PropTypes.func.isRequired
    }

    onChange = (option) => {
      this.props.onChangeAbiEventId({
        abiEvent: option.abiEvent
      })
    }

    render () {
      const { abiId, abiEventId, abiEventsData } = this.props

      if (!abiId) { return null }

      let options = [],
        abiEvents = []

      const { loading, error } = abiEventsData

      abiEvents = abiEventsData?.abiEvents?.abiEvents

      if (error) {
        console.error(error)
        return null
      } else if (!loading) {
        options = abiEvents.map(abiEvent => {
          return {
            label: abiEvent.title,
            value: `abi-event-${abiEvent.id}`,
            abiEvent
          }
        })
      }

      const value = options.find(abiEventOption => {
        const abiEventOptionId = parseInt(abiEventOption.abiEvent.id, 10)

        return abiEventOption.abiEvent
          && abiEventOptionId === parseInt(abiEventId, 10)
      })

      debug(`abiEventId: ${abiEventId} value: `, value)

      return <NotusSelect
        {...this.props}
        value={value}
        options={options}
        className='react-select__half-width'
        onChange={this.onChange}
        handleOpenReactSelect={this.props.handleOpenReactSelect}
        handleCloseReactSelect={this.props.handleCloseReactSelect}
      />
    }
  }
)
