import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { rollbar } from '~/../config/rollbar'
import * as CONSTANTS from '~/constants'

export const EventVariableButton = class _EventVariableButton extends PureComponent {

  convertTemplate = (name, type) => {
    let val = this.props.event[name]
    // console.log('type', type, 'name', name, val, val)

    if (!val) {
      return `[${name}]`
    }

    const template = CONSTANTS.en.templates[type][name][val]

    if (!template) {
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
    // and the amount is
      // & lt; ether & gt;
    // {
    //   name: 'contractAddress',
    //     type: 'address'
    // }
    // and the recipient is 
    // and the sender is 

    const {
      description,
      sourceDataType,
      isPublic
    } = this.props.variable

    if (!isPublic) {
      return null
    }

    const name = description.charAt(0).toLowerCase() + description.replace(/ /g, '').slice(1)
    console.log(name)
    const type = sourceDataType

    // sourceDataType: 'address',
    //   description: 'Token Contract Address',

    const andWord = this.props.isFirst ? '' : 'and'

    return (
      <>
        <br />
        <span className='event-box__text'>
          {andWord} the {description.toLowerCase()} is
        </span>
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
      </>
    )
  }

}