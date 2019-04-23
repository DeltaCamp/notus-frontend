import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { sourcesQuery } from '~/queries/sourcesQuery'
import { SourceSelect } from '~/components/SourceSelect'
import { OperatorSelect } from '~/components/OperatorSelect'
import { OperandDataTypeSelect } from '~/components/OperandDataTypeSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { AbiEventInputSelect } from '~/components/AbiEventInputSelect'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { OPERATORS, OPERAND_DATA_TYPE_LABELS } from '~/constants'

export const MatcherForm = graphql(sourcesQuery, {
  name: 'sourcesQuery'  
})(
  class _MatcherForm extends PureComponent {
    static propTypes = {
      matcher: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      scope: PropTypes.number
    }

    onChangeSource = (option) => {
      const clone = deepCloneMatcher(this.props.matcher)
      clone.source = option.value

      const { sources } = this.props.sourcesQuery
      const source = sources.find(s => s.source === option.value)
      if (!isValidDataTypeOperator(source.dataType, clone.operator)) {
        clone.operator = OPERATORS.EQ
      }

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
      const { matcher, scope } = this.props

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
            scope={scope}
            autoFocus
          />
          {abiEventInputSelect}
          <OperatorSelect
            source={matcher.source}
            value={matcher.operator}
            onChange={this.onChangeOperator}
          />
          {operandInput}
          {operandDataTypeSelect}
        </>
      )
    }
  }
)