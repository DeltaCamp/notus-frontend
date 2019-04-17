import React from 'react'
import { NotusSelect } from '~/components/forms/NotusSelect'

import {
  OPERAND_DATA_TYPES,
  OPERAND_DATA_TYPE_LABELS
} from '~/constants'

export const OperandDataTypeSelect = function (props) {
  let options = Object.values(OPERAND_DATA_TYPES).map((value) => ({
    label: OPERAND_DATA_TYPE_LABELS[value],
    value: value
  }))

  let selectedOption
  if (props.value !== undefined) {
    selectedOption = options.find(option => option.value === props.value)
    props = {...props, value: selectedOption}
  }

  return <NotusSelect {...props} options={options} />
}
