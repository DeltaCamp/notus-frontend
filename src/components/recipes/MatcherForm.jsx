import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SourceSelect } from '~/components/SourceSelect'
import { OperatorSelect } from '~/components/OperatorSelect'
import { OperandDataTypeSelect } from '~/components/OperandDataTypeSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { AbiEventInputSelect } from '~/components/AbiEventInputSelect'

import { OPERAND_DATA_TYPE_LABELS } from '~/constants'

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

  onChangeabiEventInput = (abiEventInput) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.abiEventInput = abiEventInput
    this.props.onChange(clone)
  }

  render () {
    const { matcher } = this.props

    let operandInput, operandDataTypeSelect, abiEventInputSelect

    if (matcher.operator !== 0) {
      operandInput =
        <input
          className='input'
          type='text'
          value={matcher.operand}
          onChange={this.onChangeOperand}
          placeholder={`Enter ${OPERAND_DATA_TYPE_LABELS[matcher.operandDataType]}`}
        />
      operandDataTypeSelect =
        <OperandDataTypeSelect
          value={matcher.operandDataType}
          onChange={this.onChangeOperandDataType}
        />
    }

    if (matcher.source === 'abiEventInput') {
      abiEventInputSelect = (
        <AbiEventInputSelect value={matcher.abiEventInput} onChange={this.onChangeabiEventInput} />
      )
    }

    return (
      <>
        <SourceSelect
          value={matcher.source}
          onChange={this.onChangeSource}
        />
        {abiEventInputSelect}
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
