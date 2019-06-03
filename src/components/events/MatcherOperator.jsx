import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'

import { OperatorSelect } from '~/components/OperatorSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'

export const MatcherOperator = ReactTimeout(class extends Component {
  static propTypes = {
    abiEventInputId: PropTypes.number,
    handleSetEditMatcher: PropTypes.func.isRequired,
    handleClearEditMatcher: PropTypes.func.isRequired,
    matcher: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    scope: PropTypes.number
  }

  componentDidUpdate() {
    this.props.setTimeout(ReactTooltip.rebuild)
  }

  onChangeOperator = (option) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.operator = option.value
    this.props.onChange(clone)
  }

  handleStartEditing = () => {
    this.props.handleSetEditMatcher()
  }

  handleStopEditing = () => {
    this.props.handleClearEditMatcher()
  }

  render () {
    const { matcher } = this.props
    const { abiEventInputId, operator } = matcher
    // const operatorWords = OPERATOR_LABELS[operator]

    if (!matcher) {
      return null
    }

    return <OperatorSelect
      source={matcher.source}
      abiEventInputId={abiEventInputId}
      value={matcher.operator}
      onChange={this.onChangeOperator}
      handleOpenReactSelect={this.handleStartEditing}
      handleCloseReactSelect={this.handleStopEditing}
    />

  }
})
