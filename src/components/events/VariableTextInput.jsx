import React from 'react'
import { varDescriptionToVarName } from '~/utils/varDescriptionToVarName'
import * as CONSTANTS from '~/constants'

export const VariableTextInput = ({
  variable,
  operatorOrOperand,
  state,
  handleInputChange
}) => {
  let placeholder = `${variable.description}`

  if (variable.sourceDataType === 'address') {
    placeholder += ` (ie. 0x1234)`
  } else if (variable.sourceDataType === 'uint256') {
    placeholder += ` (Amount in Ether)`
  }

  const name = varDescriptionToVarName(variable.description)

  const matcher = state[name]
  let value
  if (matcher) {
    value = matcher[operatorOrOperand]
  } else {
    value = ''
  }

  return (
    <div className='field'>
      <div className='control'>
        <input
          type='text'
          autoFocus={(operatorOrOperand === 'operand')}
          placeholder={placeholder}
          className='input is-small'
          onClick={(e) => {
            e.target.setSelectionRange(0, e.target.value.length)
          }}
          onChange={(e) => {
            handleInputChange(
              variable,
              CONSTANTS.OPERATORS.EQ,
              e.target.value
            )
          }}
          value={value}
        />
      </div>
    </div>
  )
}