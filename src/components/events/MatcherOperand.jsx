import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'

import { AddressInput } from '~/components/AddressInput'
import { TextInput } from '~/components/TextInput'
import { sourceQuery } from '~/queries/sourceQuery'
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
      const { matcher, sourceQuery } = this.props
      const { source } = sourceQuery

      const error = (sourceQuery || {}).error
      if (error) {
        console.error(error)
      }

      if (matcher.operator === 0) {
        return null
      }

      let operandInput = <TextInput
        matcher={matcher}
        handleSubmit={this.handleSubmit}
        handleSetEditMatcher={this.props.handleSetEditMatcher}
      />

      if (source && source.dataType === 'address') {
        operandInput = <AddressInput 
          matcher={matcher}
          handleSubmit={this.handleSubmit}
          handleSetEditMatcher={this.props.handleSetEditMatcher}
        />
      }

      return (
        <div className='event-box__variable has-text-input event-box__variable--truncated'>
          {operandInput}
        </div>
      )
    }
  })
)
