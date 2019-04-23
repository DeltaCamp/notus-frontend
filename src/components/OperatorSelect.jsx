import React from 'react'
import { graphql } from 'react-apollo'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { OPERATORS, OPERATOR_LABELS } from '~/constants'
import { sourceQuery } from '~/queries/sourceQuery'

export const OperatorSelect = graphql(sourceQuery, {
  name: 'sourceQuery',
  skip: (props) => !props.source,
  options: (props) => ({
    variables: {
      source: props.source
    }
  })
})(
  function (props) {
    const { value, showNoop, sourceQuery } = props

    let options = Object.keys(OPERATORS).map(key => {
      const value = OPERATORS[key]
      return {
        value,
        label: OPERATOR_LABELS[value]
      }
    }).filter(option => {
      const hide = option.value === OPERATORS.NOOP && !showNoop
      return !hide && (!sourceQuery || isValidDataTypeOperator(sourceQuery.source.dataType, option.value))
    })

    let selectedOption
    if (value !== undefined) {
      selectedOption = options.find(option => option.value === value)
      if (!selectedOption) {
        selectedOption = options[0]
      }
      props = {...props, value: selectedOption}
    }

    const isDisabled = options.length === 1

    return <NotusSelect {...props} options={options} isDisabled={isDisabled} />
  }
)