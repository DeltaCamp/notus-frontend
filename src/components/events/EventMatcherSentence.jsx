import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Edit, XCircle } from 'react-feather'
import * as CONSTANTS from '~/constants'

export const EventMatcherSentence = class _EventMatcherSentence extends PureComponent {

  handleEdit = (e) => {
    e.preventDefault()
    this.props.handleSetEditMatcher(this.props.index)
  }

  handleRemove = (e) => {
    e.preventDefault()
    this.props.handleRemoveMatcher(this.props.index)
  }

  convertTemplate = (matcher) => {
    let {
      operand,
      operator,
      operandDataType,
      source,
    } = matcher

    // operandDataType is units: ether, gwei, etc

    // console.log('template lookup is: ', `templates.${source}.${operator}`)
    const template = CONSTANTS.en.templates[source][operator]

    if (!template) {
      return operand
    }

    if (operand === '') {
      return template
    }

    return template.replace(/(\[.*\])/, operand)
  }

  render () {
    const {
      editVariable,
      isActive,
      isFirst,
      matcher
    } = this.props

    const {
      source
    } = matcher

    const andWord = (isFirst) ? 'where' : '... and'
    
    const humanReadableDescription = (
      <span className='event-box__text'>
        {andWord} the {source.replace('.', ' ')} is
      </span>
    )

    return (
      <div
        className={classnames(
          `event-box__variable-wrapper`,
          {
            'is-active': this.props.isActive
          }
        )}
      >
        <button
          className={classnames(
            `event-box__variable`,
            // `has-hint`,
            {
              'is-active': this.props.isActive
            }
          )}
          onClick={this.handleEdit}
        >
          {humanReadableDescription}
          {this.convertTemplate(matcher)}
        </button>

        <span className="icons">
          <button
            className='button has-icon has-icon__transparent has-stroke-light edit'
            onClick={this.handleEdit}
          >
            <Edit
              className='icon__button has-stroke-light'
            />
          </button>

          <button
            className='button has-icon has-icon__transparent has-stroke-light'
            onClick={this.handleRemove}
          >
            <XCircle
              className='icon__button has-stroke-light'
            />
          </button>
        </span>
      </div>
    )
  }

}