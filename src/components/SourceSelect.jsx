import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { abiEventQuery } from '~/queries/abiEventQuery'
import { NotusSelect } from '~/components/forms/NotusSelect'
import { sourcesQuery } from '~/queries/sourcesQuery'
import { isValidScopeSource } from '~/utils/isValidScopeSource'
import { SOURCES } from '../constants'

const debug = require('debug')('notus:components:SourceSelect')

export const SourceSelect = graphql(sourcesQuery, {
  name: 'sourcesQuery',
  props: ({ sourcesQuery }) => {
    const { sources, loading, error } = sourcesQuery

    let options = []
    if (!loading && !error) {
      options = sources.map(source => {
        return {
          label: source.title,
          value: source.source,
          dataType: source.dataType
        }
      })
    }

    return {
      options
    }
  }
})(
  graphql(abiEventQuery, {
    name: 'abiEventQuery',
    skip: (props) => !props.abiEventId,
    options: (props) => ({
      variables: {
        id: props.abiEventId
      }
    })
  })(
    class _SourceSelect extends Component {
      static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        scope: PropTypes.number,
        abiEventInputId: PropTypes.number,
        abiEventId: PropTypes.number,
        handleOpenReactSelect: PropTypes.func.isRequired,
        handleCloseReactSelect: PropTypes.func.isRequired,
      }

      onChange = (option) => {
        if (option.abiEventInput) {
          this.props.onChange({
            label: option.label,
            value: SOURCES.CONTRACT_EVENT_INPUT,
            abiEventInput: option.abiEventInput
          })
        } else {
          this.props.onChange(option)
        }
      }

      render () {
        let props = this.props
        const {
          abiEventQuery,
          abiEventInputId,
          scope,
          value,
          options
        } = props
        const { abiEvent } = abiEventQuery || {}

        debug('SourceSelect value: ', value)

        let validOptions = (options || []).filter(option => {
          return isValidScopeSource(scope, option.value)
        })

        if (abiEvent) {
          const { title, abiEventInputs } = abiEvent
          validOptions = abiEventInputs.map(abiEventInput => {
            return {
              label: `${title} ${abiEventInput.title}`,
              value: abiEventInput.id,
              abiEventInput
            }
          }).concat(validOptions)
        }

        let selectedOption
        if (value && validOptions) {
          if (value === SOURCES.CONTRACT_EVENT_INPUT) {
            selectedOption = validOptions.find(option =>
              option.abiEventInput && (parseInt(option.abiEventInput.id, 10) === abiEventInputId)
            )
          } else {
            selectedOption = validOptions.find(option =>
              option.value === value
            )
          }
          if (!selectedOption) {
            selectedOption = validOptions[0]
          }
          props = { ...this.props, value: selectedOption }
        }

        return <NotusSelect
          {...props}
          options={validOptions}
          onChange={this.onChange}
          handleOpenReactSelect={this.props.handleOpenReactSelect}
          handleCloseReactSelect={this.props.handleCloseReactSelect}
        />
      }
    }
  )
)
