import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { rollbar } from '~/../config/rollbar'
import { SourceAsSentence } from '~/components/SourceAsSentence'
import { matcherToVarName } from '~/utils/matcherToVarName'
import * as CONSTANTS from '~/constants'

export const EventMatcherSentence = class _EventMatcherSentence extends PureComponent {

  onClick = (e) => {
    e.preventDefault()
    
    this.props.handleSetEditMatcher(this.props.index)
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
      <>
        <br />
        <span className='event-box__text'>
          {andWord} the {source.replace('.', ' ')} is
        </span>
      </>
    )

    return (
      <>
        {humanReadableDescription}

        <button
          className={classnames(
            `event-box__variable`,
            // `has-hint`,
            {
              'is-active': this.props.isActive
            }
          )}
          onClick={this.onClick}
        >
          <span className='event-box__variable-value'>
            {/* <SourceAsSentence source={source} /> */}
            {this.convertTemplate(matcher)}
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