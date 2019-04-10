import React, { Component } from 'react'
import classnames from 'classnames'
import { rollbar } from '~/../config/rollbar'
import * as CONSTANTS from '~/constants'

export const EventVariableButton = class _EventVariableButton extends Component {

  drawerFormInputs = () => {
    let inputs = null

    if (this.state.editVariables.includes('frequency')) {
      const selectOptions = [
        { value: 'everyTime', text: CONSTANTS.en.formFields.frequencies['everyTime'] },
        { value: 'onlyOnce', text: CONSTANTS.en.formFields.frequencies['onlyOnce'] }
      ]

      inputs = this.selectDropdown('frequency', 'variableOne', 'string', selectOptions)
    } else if (this.state.editVariables.includes('amount')) {
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
    } else if (this.state.editVariables.includes('contractAddress')) {
      inputs = this.textInput('contractAddress', 'variableOne', 'string')
    } else if (this.state.editVariables.includes('senderAddress')) {
      inputs = <>
        {this.textInput('senderAddress', 'variableOne', 'string')}
      </>
    } else if (this.state.editVariables.includes('recipientAddress')) {
      inputs = <>
        {this.textInput('recipientAddress', 'variableOne', 'string')}
      </>
    } else if (!this.state.editVariables.length) {
      inputs = null
    } else {
      inputs = null
      rollbar.error(
        `drawerFormInputs() called with ${this.state.editVariables.toString()}: no matching variable type!`
      )
    }

    return inputs
  }
  convertTemplate = (template, val) => {
    if (val === '') {
      return template
    }

    try {
      val = template.replace(/(\[.*\])/, val)
    } catch (err) {
      rollbar.error(`convertTemplate() called with ${template} to replace text ${val} but ${err.message}`)
    }
    
    return val
  }

  amountButton = () => {
    return (
      <button
        className={classnames(
          `event-box__variable`,
          `has-hint`,
          {
            'is-active': this.state.isEditing && this.state.editVariables.includes('comparison')
          }
        )}
        onClick={(e) => {
          e.preventDefault()
          this.handleVariables(['comparison', 'amount'])
        }}
      >
        <span className='event-box__variable-value'>
          {this.convertTemplate(
            CONSTANTS.en.templates.comparisonsAndAmounts[this.state.event.comparison],
            this.state.event.amount
          )}
        </span>
        <span className='hint'>Transfer Amount</span>
      </button>
    )
  }

  frequencyButton = () => {
    return (
      <button
        className={classnames(
          `event-box__variable`,
          `has-hint`,
          {
            'is-active': this.state.isEditing && this.state.editVariables.includes('frequency')
          }
        )}
        onClick={(e) => {
          e.preventDefault()
          this.handleVariables(['frequency'])
        }}
      >
        <span className='event-box__variable-value'>
          {CONSTANTS.en.templates.frequencies[this.state.event.frequency]}
        </span>
        <span className='hint'>Freqency</span>
      </button>
    )
  }

  handleVariableChange = (varName, type, val) => {
    const key = varName === 'variableOne'
      ? this.state.editVariables[0]
      : this.state.editVariables[1]

    if (type === 'decimal') {
      // note: currently does not handle negative values:
      val = val.replace(/[^0-9.]/g, '')
    }

    this.setState({
      [varName]: val
    }, this.updateEvent(key, val))
  }

  updateEvent = (key, val) => {
    this.setState({
      event: {
        ...this.state.event,
        [key]: val
      }
    })
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
              this.handleVariableChange(variableNumber, variableType, e.target.value)
            }}
            value={this.state.event[variableName]}
          />
        </div>
      </div>
    )
  }

  selectDropdown = (variableName, variableNumber, variableType, selectOptions) => {
    const callback = (e) => {
      this.handleVariableChange(variableNumber, variableType, e.target.value)
    }

    return (
      <div className='field'>
        <div className='control'>
          <div className='select'>
            <select
              value={this.state.event[variableName]} 
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
    const {
      name,
      type
    } = this.props.variable

    return (
      <button
        className={classnames(
          `event-box__variable`,
          `has-hint`,
          {
            'is-active': this.state.isEditing && this.state.editVariables.includes('senderAddress')
          }
        )}
        onClick={(e) => {
          e.preventDefault()
          this.props.handleVariables([name])
        }}
      >
        <span className='event-box__variable-value'>
          {this.convertTemplate(
            CONSTANTS.en.templates[type]['default'],
            this.props.event[name]
          )}
        </span>
        <span className='hint'>{name}</span>
      </button>
    )
  }

}