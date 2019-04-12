import React, { PureComponent } from 'react'
import { rollbar } from '~/../config/rollbar'
import { VariableTextInput } from '~/components/events/VariableTextInput'
import { VariableSelectDropdown } from '~/components/events/VariableSelectDropdown'
import * as CONSTANTS from '~/constants'

export const EditEventVariableForm = class _EditEventVariableForm extends PureComponent {

  uint256Inputs = (variable) => {
    const selectOptions = Object.keys(CONSTANTS.OPERATORS).map((operator, index) => (
      {
        value: CONSTANTS.OPERATORS[operator],
        text: CONSTANTS.en.formFields.operators[index]
      }
    )) 

    return <>
      <VariableSelectDropdown
        state={this.props.state}
        handleInputChange={this.props.handleInputChange}
        variable={variable}
        typeOrOperand='type'
        selectOptions={selectOptions}
      />

      <VariableTextInput
        state={this.props.state}
        handleInputChange={this.props.handleInputChange}
        variable={variable}
        typeOrOperand='operand'
      />
    </>
  }

  variableInputs = () => {
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

      inputs = <VariableSelectDropdown
        state={this.props.state}
        handleInputChange={this.props.handleInputChange}
        variable={variable}
        typeOrOperand='operand'
        selectOptions={selectOptions}
      />
    } else if (variableIsNumberish) {
      inputs = this.uint256Inputs(variable)
    } else if (variableIsStringish) {
      inputs = <VariableTextInput
        state={this.props.state}
        handleInputChange={this.props.handleInputChange}
        variable={variable}
        typeOrOperand='operand'
      />
    } else {
      rollbar.error(
        `variableInputs() called with ${variable.toString()}: no matching variable type!`
      )
    }

    return inputs
  }
  
  render () {
    if (!this.props.editVariable) {
      return null
    }

    return (
      <div className='drawer-inputs'>
        {this.variableInputs()}
      </div>
    )
  }
}