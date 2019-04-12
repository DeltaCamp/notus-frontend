import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { SourceSelect } from '~/components/SourceSelect'
import { OperatorSelect } from '~/components/OperatorSelect'
import { OperandDataTypeSelect } from '~/components/OperandDataTypeSelect'

export class MatcherForm extends PureComponent {
  static propTypes = {
    matcher: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  onChangeSource = (option) => {
    const copy = {...this.props.matcher}
    copy.source = option.value
    this.props.onChange(copy)
  }

  onChangeOperator = (option) => {
    const copy = {...this.props.matcher}
    copy.operator = option.value
    this.props.onChange(copy)
  }

  onChangeOperandDataType = (option) => {
    const copy = {...this.props.matcher}
    copy.operandDataType = option.value
    this.props.onChange(copy)
  }

  onChangeOperand = (e) => {
    const copy = {...this.props.matcher}
    copy.operand = e.target.value
    this.props.onChange(copy)
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
