import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SourceSelect } from '~/components/SourceSelect'
import { OperatorSelect } from '~/components/OperatorSelect'
import { OperandDataTypeSelect } from '~/components/OperandDataTypeSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'

export class MatcherForm extends PureComponent {
  static propTypes = {
    matcher: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  onChangeSource = (option) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.source = option.value
    this.props.onChange(clone)
  }

  onChangeOperator = (option) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.operator = option.value
    this.props.onChange(clone)
  }

  onChangeOperandDataType = (option) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.operandDataType = option.value
    this.props.onChange(clone)
  }

  onChangeOperand = (e) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.operand = e.target.value
    this.props.onChange(clone)
  }

  render () {
    const { matcher } = this.props

    let operandInput, operandDataTypeSelect

    if (matcher.operator !== 0) {
      operandInput =
        <input
          className='input'
          type='text'
          value={matcher.operand}
          onChange={this.onChangeOperand}
          placeholder={`Enter ${matcher.operandDataType}`}
        />
      operandDataTypeSelect =
        <OperandDataTypeSelect
          value={matcher.operandDataType}
          onChange={this.onChangeOperandDataType}
        />
    }

    return (
      <>
        <SourceSelect
          value={matcher.source}
          onChange={this.onChangeSource}
        />
        <OperatorSelect
          value={matcher.operator}
          onChange={this.onChangeOperator}
        />
        {operandInput}
        {operandDataTypeSelect}
      </>
    )
  }
}
