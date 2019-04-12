import React from 'react'
import { varDescriptionToVarName } from '~/utils/varDescriptionToVarName'

export const VariableSelectDropdown = ({
  variable,
  typeOrOperand,
  state,
  handleInputChange,
  selectOptions
}) => {
  const name = varDescriptionToVarName(variable.description)

  const callback = (e) => {
    handleInputChange(
      variable,
      typeOrOperand,
      e.target.value
    )
  }

  const matcher = state[name]
  let value
  if (matcher) {
    value = matcher[typeOrOperand]
  } else {
    value = ''
  }

  return (
    <div className='field'>
      <div className='control'>
        <div className='select'>
          <select
            value={value}
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