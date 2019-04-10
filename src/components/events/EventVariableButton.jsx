import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { rollbar } from '~/../config/rollbar'
import * as CONSTANTS from '~/constants'

export const EventVariableButton = class _EventVariableButton extends PureComponent {

  convertTemplate = (name, type) => {
    let val = this.props.event[name]
    const template = CONSTANTS.en.templates[type][name][val]

    if (!template || val === '') {
      return `[${name}]`
    }

    try {
      val = template.replace(/(\[.*\])/, val)
    } catch (err) {
      rollbar.error(`convertTemplate() called with ${template} to replace text ${val} but ${err.message}`)
    }
    
    return val
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
            'is-active': this.props.isEditing && this.props.editVariables.includes(name)
          }
        )}
        onClick={(e) => {
          e.preventDefault()
          this.props.handleVariables([name])
        }}
      >
        <span className='event-box__variable-value'>
          {this.convertTemplate(name, type)}
        </span>
        <span
          className='hint'
          style={{'textTransform': 'capitalize'}}
        >{name}</span>
      </button>
    )
  }

}