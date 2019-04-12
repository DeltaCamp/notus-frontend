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
    let operandInput, operandDataTypeSelect

    if (this.props.matcher.operator !== 0) {
      operandInput =
        <input
          className='input'
          type='text'
          value={this.props.matcher.operand}
          onChange={this.onChangeOperand}
        />
      operandDataTypeSelect =
        <OperandDataTypeSelect
          value={this.props.matcher.operandDataType}
          onChange={this.onChangeOperandDataType}
        />
    }

    return (
      <div className='row'>
        <div className='col-md-3'>
          <SourceSelect
            value={this.props.matcher.source}
            onChange={this.onChangeSource}
          />
        </div>
        <div className='col-md-4'>
          <OperatorSelect
            value={this.props.matcher.operator}
            onChange={this.onChangeOperator}
          />
        </div>
        <div className='col-md-4'>
          {operandInput}
        </div>
        <div className='col-md-4'>
          {operandDataTypeSelect}
        </div>
      </div>
    )
  }
}
