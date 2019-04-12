import React from 'react'
import Select from 'react-select'

import { OPERAND_DATA_TYPES } from '~/constants'

export const OperandDataTypeSelect = function (props) {
  let options = [
    {
      value: OPERAND_DATA_TYPES.NUMBER,
      label: 'Number'
    },
    {
      value: OPERAND_DATA_TYPES.ETHER,
      label: 'Ether'
    },
    {
      value: OPERAND_DATA_TYPES.MILLIETHER,
      label: 'Milliether (finney)'
    },
    {
      value: OPERAND_DATA_TYPES.MICROETHER,
      label: 'Microether (szabo)'
    },
    {
      value: OPERAND_DATA_TYPES.GWEI,
      label: 'Gwei (shannon)'
    },
    {
      value: OPERAND_DATA_TYPES.MWEI,
      label: 'Mwei (lovelace)'
    },
    {
      value: OPERAND_DATA_TYPES.KWEI,
      label: 'Kwei (babbage)'
    },
    {
      value: OPERAND_DATA_TYPES.WEI,
      label: 'Wei'
    }
  ]

  let selectedOption
  if (props.value) {
    selectedOption = options.find(option => option.value === props.value)
    props = {...props, value: selectedOption}
  }

  return <Select {...props} options={options} />
}
