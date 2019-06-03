import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { SOURCES, OPERATORS, OPERATOR_LABELS } from '~/constants'
import { sourceQuery } from '~/queries/sourceQuery'
import { abiEventInputQuery } from '~/queries/abiEventInputQuery'

// const debug = require('debug')('notus:components:OperatorSelect')

export const OperatorSelect = graphql(sourceQuery, {
  name: 'sourceQuery',
  skip: (props) => !props.source,
  options: (props) => ({
    variables: {
      source: props.source
    }
  })
})(
  graphql(abiEventInputQuery, {
    name: 'abiEventInputQuery',
    skip: (props) => !props.abiEventInputId,
    options: (props) => ({
      variables: {
        id: parseInt(props.abiEventInputId, 10)
      }
    })
  })(
    class _OperatorSelect extends PureComponent {
      static propTypes = {
        value: PropTypes.number,
        source: PropTypes.string,
        abiEventInputId: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        handleOpenReactSelect: PropTypes.func.isRequired,
        handleCloseReactSelect: PropTypes.func.isRequired,
      }

      render () {
        var props = this.props
        const { value, showNoop, sourceQuery, abiEventInputQuery } = this.props

        const error = (abiEventInputQuery || {}).error || sourceQuery.error

        if (error) {
          console.error(error)
        }

        let options = Object.keys(OPERATORS).map(key => {
          const value = OPERATORS[key]
          return {
            value,
            label: OPERATOR_LABELS[value]
          }
        }).filter(option => {
          const hide = option.value === OPERATORS.NOOP && !showNoop
          if (hide) { return false }
          if (!sourceQuery) { return true }

          const { source } = sourceQuery
          // debug('sourceQuery: ', sourceQuery)

          if (source && (source.source !== SOURCES.CONTRACT_EVENT_INPUT)) {
            return isValidDataTypeOperator(source.dataType, option.value)
          } else {
            const { abiEventInput } = abiEventInputQuery || {}
            return abiEventInput && isValidDataTypeOperator(
              abiEventInput.type,
              option.value
            )
          }
        })

        let selectedOption
        if (value !== undefined) {
          selectedOption = options.find(option => option.value === value)
          if (!selectedOption) {
            selectedOption = options[0]
          }
          props = { ...this.props, value: selectedOption }
        }

        return <NotusSelect
          {...props}
          options={options}
          className='no-ml'
          handleOpenReactSelect={this.props.handleOpenReactSelect}
          handleCloseReactSelect={this.props.handleCloseReactSelect}
        />
      }
    }
  )
)
