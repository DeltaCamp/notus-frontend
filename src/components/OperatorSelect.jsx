import React from 'react'
import Select from 'react-select'
// import Select from '~/components/forms/Select'

import { OPERATORS, OPERATOR_LABELS } from '~/constants'

export const OperatorSelect = function (props) {

  let options = Object.keys(OPERATORS).map(key => {
    const value = OPERATORS[key]
    return {
      value,
      label: OPERATOR_LABELS[value]
    }
  })

  let selectedOption
  if (props.value !== undefined) {
    selectedOption = options.find(option => option.value === props.value)
    props = {...props, value: selectedOption}
  }

  // return <Select {...props} options={options} />
  return <Select {...props} options={options} />

}
