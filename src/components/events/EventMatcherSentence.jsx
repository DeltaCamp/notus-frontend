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

  convertTemplate = (source) => {
    let operand,
      operator
    // let matcher = this.props.state[name]
    let { matcher } = this.props
    
    // hack for freq!
    // if (name === 'frequency') {
    //   source = 'frequency'
      
    //   if (matcher) {
    //     return CONSTANTS.en.templates['frequency'][matcher.operand]
    //   }
    // }
    return 'fuck'

    if (!matcher) {
      return CONSTANTS.en.templates[source]['default']
    }

    operand = matcher.operand
    operator = matcher.operator

    console.log('template lookup is: ', `templates.${source}.${operator}`)
    const template = CONSTANTS.en.templates[source][operator]

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
      isActive,
      isFirst,
      matcher
    } = this.props

    const {
      source
    } = matcher
    
    // const sourceName
    const andWord = (isFirst) ? 'where' : '... and'

    if (!source) { return null }

    const humanReadableDescription = (
      <>
        <br />
        <span className='event-box__text'>
          {andWord} the {source.replace('.', '')} is
          {/* {andWord} the {source.title.replace('.', '')} is */}
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
            <SourceAsSentence source={source} /> {this.convertTemplate(source)}
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