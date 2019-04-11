import React, { PureComponent } from 'react'
import { rollbar } from '~/../config/rollbar'
import * as CONSTANTS from '~/constants'

export const EditEventVariableForm = class _EditEventVariableForm extends PureComponent {

  drawerFormInputs = () => {
    let inputs = null

    if (this.props.editVariable === 'frequency') {
      const selectOptions = [
        { value: 'everyTime', text: CONSTANTS.en.formFields.frequencies['everyTime'] },
        { value: 'onlyOnce', text: CONSTANTS.en.formFields.frequencies['onlyOnce'] }
      ]

      inputs = this.selectDropdown('frequency', 'variableOne', 'string', selectOptions)
    } else if (this.props.editVariable === 'amount') {
      const selectOptions = [
        { value: 'gt', text: CONSTANTS.en.formFields.operators['gt'] },
        { value: 'lt', text: CONSTANTS.en.formFields.operators['lt'] },
        { value: 'eq', text: CONSTANTS.en.formFields.operators['eq'] },
        { value: 'gte', text: CONSTANTS.en.formFields.operators['gte'] },
        { value: 'lte', text: CONSTANTS.en.formFields.operators['lte'] }
      ]

      inputs = <>
        {this.selectDropdown('operator', 'variableOne', 'string', selectOptions)}
        {this.textInput('amount', 'variableTwo', 'decimal')}
      </>
    } else if (this.props.editVariable === 'tokenContractAddress') {
      inputs = this.textInput('tokenContractAddress', 'variableOne', 'string')
    } else if (this.props.editVariable === 'senderAddress') {
      inputs = <>
        {this.textInput('senderAddress', 'variableOne', 'string')}
      </>
    } else if (this.props.editVariable === 'recipientAddress') {
      inputs = <>
        {this.textInput('recipientAddress', 'variableOne', 'string')}
      </>
    } else if (!this.props.editVariable.length) {
      inputs = null
    } else {
      inputs = null
      rollbar.error(
        `drawerFormInputs() called with ${this.props.editVariable.toString()}: no matching variable type!`
      )
    }

    return inputs
  }

  textInput = (variableName, variableNumber, variableType, options = {}) => {
    return (
      <div className='field'>
        <div className='control'>
          <input
            type='text'
            autoFocus={(variableNumber === 'variableOne')}
            placeholder={CONSTANTS.en.placeholders[variableName]}
            className='input is-small'
            onClick={(e) => {
              e.target.setSelectionRange(0, e.target.value.length)
            }}
            onChange={(e) => {
              this.props.handleInputChange(variableNumber, variableType, e.target.value)
            }}
            value={this.props.event[variableName]}
          />
        </div>
      </div>
    )
  }

  selectDropdown = (variableName, variableNumber, variableType, selectOptions) => {
    const callback = (e) => {
      this.props.handleInputChange(variableNumber, variableType, e.target.value)
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