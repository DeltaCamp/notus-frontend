import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { rollbar } from '~/../config/rollbar'
import { varDescriptionToVarName } from '~/utils/varDescriptionToVarName'
import * as CONSTANTS from '~/constants'

export const EventVariableButton = class _EventVariableButton extends PureComponent {

  convertTemplate = (name, type) => {
    let operand,
      operator
    let matcher = this.props.state[name]

    
    // hack for freq!
    if (name === 'frequency') {
      type = 'frequency'
      
      if (matcher) {
        return CONSTANTS.en.templates['frequency'][matcher.operand]
      }
    }



    if (!matcher) {
      return CONSTANTS.en.templates[type]['default']
    }

    operand = matcher.operand
    operator = matcher.operator

    // console.log('template lookup is: ', `templates.${type}.${operator}`)
    const template = CONSTANTS.en.templates[type][operator]

    if (!template) {
      return operand
    }

    try {
      operand = template.replace(/(\[.*\])/, operand)
    } catch (err) {
      rollbar.error(`convertTemplate() called with ${template} to replace operand: ${operand} but ${err.message}`)
    }
    
    return operand
  }

  render () {
    const {
      editVariable,
      isFirst,
      isFrequency,
      variable
    } = this.props

    const {
      description,
      sourceDataType,
      isPublic
    } = variable

    if (!isPublic) {
      return null
    }

    const name = varDescriptionToVarName(description)
    const type = sourceDataType

    const andWord = (isFirst || isFrequency) ? 'where' : '... and'
    let humanReadableDescription = null

    if (!isFrequency) {
      humanReadableDescription = (
        <>
          <br />
          <span className='event-box__text'>
            {andWord} the {description.toLowerCase()} is
          </span>
        </>
      )
    }

    return (
      <>
        {humanReadableDescription}

        <button
          className={classnames(
            `event-box__variable`,
            // `has-hint`,
            {
              'is-active': editVariable === variable
            }
          )}
          onClick={(e) => {
            e.preventDefault()
            this.props.handleSetEditVariable(variable)
          }}
        >
          <span className='event-box__variable-value'>
            {this.convertTemplate(name, type)}
          </span>
          {/* <span
            className='hint'
            style={{'textTransform': 'capitalize'}}
          >{name}</span> */}
        </button>
      </>
    )
  }

}