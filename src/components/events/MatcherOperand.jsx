import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'

import { Input } from '~/components/forms/Input'
import { MatcherAddressInput } from '~/components/MatcherAddressInput'
import { TextInput } from '~/components/TextInput'
import { WeiInput } from '~/components/WeiInput'
import { abiEventInputQuery } from '~/queries/abiEventInputQuery'
import { sourceQuery } from '~/queries/sourceQuery'
import { calculateSourceDataType } from '~/utils/calculateSourceDataType'
import { calculateSourceMetaDataType } from '~/utils/calculateSourceMetaDataType'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { META_DATA_TYPES } from '~/constants'

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
        index: PropTypes.number.isRequired,
        matcher: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        handleSetEditMatcher: PropTypes.func.isRequired,
        handleClearEditMatcher: PropTypes.func.isRequired,
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
        const metaDataType = calculateSourceMetaDataType(source, abiEventInput)

        if (
          metaDataType
          && (metaDataType === META_DATA_TYPES.WEI ||
              metaDataType === META_DATA_TYPES.FIXED_POINT_18)
        ) {
          operandInput = <WeiInput
            index={this.props.index}
            value={matcher.operand}
            handleSubmit={this.handleSubmit}
            handleStartEditing={this.props.handleSetEditMatcher}
            handleCancelEditing={this.props.handleClearEditMatcher}
          />
        } else if (dataType && dataType === 'address') {
          operandInput = <MatcherAddressInput 
            matcher={matcher}
            handleSubmit={this.handleSubmit}
            handleSetEditMatcher={this.props.handleSetEditMatcher}
            handleCancelEditMatcher={this.props.handleClearEditMatcher}
          />
        } else if (
          dataType
          && (dataType.startsWith('uint') || dataType.startsWith('int'))
        ) {
          operandInput = <Input
            placeholder='Enter a number'
            type='number'
            value={matcher.operand}
            handleSubmit={this.handleSubmit}
            handleStartEditing={this.props.handleSetEditMatcher}
            handleCancelEditing={this.props.handleClearEditMatcher}
          />
        } else {
          operandInput = <TextInput
            value={matcher.operand}
            handleSubmit={this.handleSubmit}
            handleStartEditing={this.props.handleSetEditMatcher}
            handleCancelEditing={this.props.handleClearEditMatcher}
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
