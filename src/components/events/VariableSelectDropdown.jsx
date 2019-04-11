import React from 'react'
import { varDescriptionToVarName } from '~/utils/varDescriptionToVarName'

export const VariableSelectDropdown = ({
  variable,
  operatorOrOperand,
  event,
  handleInputChange,
  selectOptions
}) => {
  const name = varDescriptionToVarName(variable.description)

  const callback = (e) => {
    handleInputChange(
      variable,
      operatorOrOperand,
      e.target.value
    )
  }

  return (
    <div className='field'>
      <div className='control'>
        <div className='select'>
          <select
            value={event[name]}
            onFocus={(e) => {
              callback(e)
            }}
            onChange={(e) => {
              callback(e)
            }}
          >
            {selectOptions.map((option, index) => (
              <option
                key={`variable-${name}-options-${index}`}
                value={option.value}
              >
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}