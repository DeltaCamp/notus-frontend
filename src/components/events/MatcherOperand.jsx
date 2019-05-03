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
import { calculateSourceDataType } from '~/utils/calculateSourceDataType'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'

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

        if (!source || matcher.operator === 0) {
          return null
        }

        let operandInput
        const dataType = calculateSourceDataType(source, abiEventInput)
        if (dataType === 'address') {
          operandInput = <AddressInput 
            matcher={matcher}
            handleSubmit={this.handleSubmit}
            handleSetEditMatcher={this.props.handleSetEditMatcher}
          />
        } else if (dataType === 'uint256') {
          operandInput = <UIntInput
            matcher={matcher}
            handleSubmit={this.handleSubmit}
            handleSetEditMatcher={this.props.handleSetEditMatcher}
          />
        } else {
          operandInput = <TextInput
            value={matcher.operand}
            handleSubmit={this.handleSubmit}
            handleStartEditing={this.props.handleSetEditMatcher}
          />
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
