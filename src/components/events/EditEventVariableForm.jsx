import React, { PureComponent } from 'react'
import { rollbar } from '~/../config/rollbar'
import * as CONSTANTS from '~/constants'

export const EditEventVariableForm = class _EditEventVariableForm extends PureComponent {

  drawerFormInputs = () => {
    let inputs = null

    if (this.props.editVariables.includes('frequency')) {
      const selectOptions = [
        { value: 'everyTime', text: CONSTANTS.en.formFields.frequencies['everyTime'] },
        { value: 'onlyOnce', text: CONSTANTS.en.formFields.frequencies['onlyOnce'] }
      ]

      inputs = this.selectDropdown('frequency', 'variableOne', 'string', selectOptions)
    } else if (this.props.editVariables.includes('amount')) {
      const selectOptions = [
        { value: 'gt', text: CONSTANTS.en.formFields.comparisons['gt'] },
        { value: 'lt', text: CONSTANTS.en.formFields.comparisons['lt'] },
        { value: 'eq', text: CONSTANTS.en.formFields.comparisons['eq'] },
        { value: 'gte', text: CONSTANTS.en.formFields.comparisons['gte'] },
        { value: 'lte', text: CONSTANTS.en.formFields.comparisons['lte'] }
      ]

      inputs = <>
        {this.selectDropdown('comparison', 'variableOne', 'string', selectOptions)}
        {this.textInput('amount', 'variableTwo', 'decimal')}
      </>
    } else if (this.props.editVariables.includes('contractAddress')) {
      inputs = this.textInput('contractAddress', 'variableOne', 'string')
    } else if (this.props.editVariables.includes('senderAddress')) {
      inputs = <>
        {this.textInput('senderAddress', 'variableOne', 'string')}
      </>
    } else if (this.props.editVariables.includes('recipientAddress')) {
      inputs = <>
        {this.textInput('recipientAddress', 'variableOne', 'string')}
      </>
    } else if (!this.props.editVariables.length) {
      inputs = null
    } else {
      inputs = null
      rollbar.error(
        `drawerFormInputs() called with ${this.props.editVariables.toString()}: no matching variable type!`
      )
    }

    return inputs
  }

  textInput = (variableName, variableNumber, variableType, options = {}) => {
    return (
      <div className='field'>
        <div className='control'>
          <input
            autoFocus={(variableNumber === 'variableOne')}
            placeholder={CONSTANTS.en.placeholders[variableName]}
            className='input is-small'
            onClick={(e) => {
              e.target.setSelectionRange(0, e.target.value.length)
            }}
            onChange={(e) => {
              this.props.handleVariableChange(variableNumber, variableType, e.target.value)
            }}
            value={this.props.event[variableName]}
          />
        </div>
      </div>
    )
  }

  selectDropdown = (variableName, variableNumber, variableType, selectOptions) => {
    const callback = (e) => {
      this.props.handleVariableChange(variableNumber, variableType, e.target.value)
    }

    return (
      <div className='field'>
        <div className='control'>
          <div className='select'>
            <select
              value={this.props.event[variableName]} 
              onFocus={(e) => {
                callback(e)
              }}
              onChange={(e) => {
                callback(e)
              }}
            >
              {selectOptions.map((option, index) => (
                <option
                  key={`${variableName}-options-${index}`}
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
    return (
      <div className='drawer-inputs'>
        {this.drawerFormInputs()}
      </div>
    )
  }
}