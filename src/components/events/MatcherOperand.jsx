import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'

import { AddressInput } from '~/components/AddressInput'
import { TextInput } from '~/components/TextInput'
import { UIntInput } from '~/components/UIntInput'
import { abiEventInputQuery } from '~/queries/abiEventInputQuery'
import { sourceQuery } from '~/queries/sourceQuery'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { SOURCES } from '~/constants'

export const MatcherOperand = graphql(sourceQuery, {
  name: 'sourceQuery',
  skip: (props) => !props.matcher,
  options: (props) => ({
    variables: {
      source: props.matcher.source
    }
  })
})(
  graphql(abiEventInputQuery, {
    name: 'abiEventInputQuery',
    skip: (props) => !props.matcher.abiEventInputId,
    options: (props) => ({
      variables: {
        id: props.matcher.abiEventInputId
      }
    })
  })(
    ReactTimeout(class extends Component {
      static propTypes = {
        handleSetEditMatcher: PropTypes.func.isRequired,
        matcher: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
      }

      componentDidUpdate() {
        this.props.setTimeout(ReactTooltip.rebuild)
      }

      handleSubmit = (newValue) => {
        const clone = deepCloneMatcher(this.props.matcher)
        clone.operand = newValue
        this.props.onChange(clone)
      }

      render () {
        const { matcher, sourceQuery, abiEventInputQuery } = this.props
        const { source } = sourceQuery
        const { abiEventInput } = abiEventInputQuery || {}

        const error = (abiEventInputQuery || {}).error || (sourceQuery || {}).error
        if (error) {
          console.error(error)
        }
        // console.log('abiEventInputQuery', abiEventInputQuery)

        if (matcher.operator === 0) {
          return null
        }

        let operandInput
        console.log(source)
        console.log(abiEventInput)
        console.log((source && source.dataType === 'uint256'));
        console.log((abiEventInput && abiEventInput.type === 'address'));
        
        
        if (
          (source && source.dataType === 'address')
          || (abiEventInput && abiEventInput.type === 'address')
        ) {
          operandInput = <AddressInput 
            matcher={matcher}
            handleSubmit={this.handleSubmit}
            handleSetEditMatcher={this.props.handleSetEditMatcher}
          />
        } else if (source && source.dataType === 'uint256') {
          operandInput = <UIntInput
            matcher={matcher}
            handleSubmit={this.handleSubmit}
            handleSetEditMatcher={this.props.handleSetEditMatcher}
          />
        } else if (
          source
          && source.source !== SOURCES.CONTRACT_EVENT_INPUT
          && source.dataType === 'bytes'
        ) {
          operandInput = <TextInput
            matcher={matcher}
            handleSubmit={this.handleSubmit}
            handleSetEditMatcher={this.props.handleSetEditMatcher}
          />
        } else {
          console.warn('Unknown datatype for source & matcher!', source, matcher)
          return null
        }

        return (
          <div className='event-box__variable has-text-input is-truncated'>
            {operandInput}
          </div>
        )
      }
    })
  )
)
