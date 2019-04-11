import React, { PureComponent } from 'react'
import { rollbar } from '~/../config/rollbar'
import { varDescriptionToVarName } from '~/utils/varDescriptionToVarName'
import * as CONSTANTS from '~/constants'

export const EditEventVariableForm = class _EditEventVariableForm extends PureComponent {

  uint256Inputs = (variable) => {
    const selectOptions = Object.keys(CONSTANTS.OPERATORS).map((operator, index) => {
      return {
        value: CONSTANTS.OPERATORS[operator],
        text: CONSTANTS.en.formFields.operators[index]
      }
    }) 

    return <>
      {this.selectDropdown(variable, 'operator', selectOptions)}
      {this.textInput(variable, 'operand')}
    </>
  }

  drawerFormInputs = () => {
    let inputs = null

    const variable = this.props.editVariable

    const variableIsNumberish = (variable.sourceDataType === 'uint256')

    // review these datatypes:
    const variableIsStringish = (
      variable.sourceDataType === 'address'
      || variable.sourceDataType === 'bytes'
      || variable.sourceDataType === 'bytes32'
    )

    if (variable.description === 'Frequency') {
      const selectOptions = [
        { value: '0', text: CONSTANTS.en.formFields.frequencies['0'] },
        { value: '1', text: CONSTANTS.en.formFields.frequencies['1'] }
      ]

      inputs = this.selectDropdown(variable, 'operand', selectOptions)
    } else if (variableIsNumberish) {
      inputs = this.uint256Inputs(variable)
    } else if (variableIsStringish) {
      inputs = this.textInput(variable, 'operand')
    } else {
      rollbar.error(
        `drawerFormInputs() called with ${variable.toString()}: no matching variable type!`
      )
    }

    return inputs
  }

  textInput = (variable, operatorOrOperand) => {
    let placeholder = `${variable.description}`

    if (variable.sourceDataType === 'address') {
      placeholder += ` (ie. 0x1234)`
    } else if (variable.sourceDataType === 'uint256') {
      placeholder += ` (Amount in Ether)`
    }

    const name = varDescriptionToVarName(variable.description)

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
              this.props.handleInputChange(
                variable,
                CONSTANTS.OPERATORS.EQ,
                e.target.value
              )
            }}
            value={this.props.event[name]}
          />
        </div>
      </div>
    )
  }

  selectDropdown = (variable, operatorOrOperand, selectOptions) => {
    const name = varDescriptionToVarName(variable.description)

    const callback = (e) => {
      this.props.handleInputChange(
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
              value={this.props.event[name]} 
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

  render () {
    if (!this.props.editVariable) {
      return null
    }

    return (
      <div className='drawer-inputs'>
        {this.drawerFormInputs()}
      </div>
    )
  }
}