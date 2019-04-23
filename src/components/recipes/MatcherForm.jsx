import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { sourcesQuery } from '~/queries/sourcesQuery'
import { SourceSelect } from '~/components/SourceSelect'
import { OperatorSelect } from '~/components/OperatorSelect'
import { OperandDataTypeSelect } from '~/components/OperandDataTypeSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { SOURCES, OPERATORS, OPERAND_DATA_TYPE_LABELS } from '~/constants'

export const MatcherForm = graphql(sourcesQuery, {
  name: 'sourcesQuery'  
})(
  class _MatcherForm extends PureComponent {
    static propTypes = {
      matcher: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      scope: PropTypes.number,
      eventAbiEventId: PropTypes.number
    }

    onChangeSource = (option) => {
      const clone = deepCloneMatcher(this.props.matcher)
      clone.source = option.value

      let sourceDataType
      if (option.value === SOURCES.CONTRACT_EVENT_INPUT) {
        const { abiEventInput } = option
        sourceDataType = abiEventInput.type
        clone.abiEventInputId = parseInt(abiEventInput.id, 10)
      } else {
        const { sources } = this.props.sourcesQuery
        const source = sources.find(s => s.source === option.value)
        sourceDataType = source.dataType
      }

      if (!isValidDataTypeOperator(sourceDataType, clone.operator)) {
        clone.operator = OPERATORS.EQ
      }

      this.props.onChange(clone)
    }

    onChangeOperator = (option) => {
      const clone = deepCloneMatcher(this.props.matcher)
      clone.operator = option.value
      this.props.onChange(clone)
    }

    onChangeOperand = (e) => {
      const clone = deepCloneMatcher(this.props.matcher)
      clone.operand = e.target.value
      this.props.onChange(clone)
    }

    onChangeAbiEventInput = (abiEventInput) => {
      const clone = deepCloneMatcher(this.props.matcher)
      clone.abiEventInput = abiEventInput
      console.log(abiEventInput)
      this.props.onChange(clone)
    }

    render () {
      const { abiEventId, matcher, scope } = this.props
      const abiEventInputId = matcher.abiEventInputId || (matcher.abiEventInput || {}).id

      let operandInput

      if (matcher.operator !== 0) {
        operandInput =
          <input
            className='input'
            type='text'
            value={matcher.operand}
            onChange={this.onChangeOperand}
            placeholder={`Enter a value`}
          />
      }

      return (
        <>
          <SourceSelect
            abiEventId={abiEventId}
            abiEventInputId={abiEventInputId}
            value={matcher.source}
            onChange={this.onChangeSource}
            scope={scope}
            autoFocus
          />
          <OperatorSelect
            source={matcher.source}
            abiEventInputId={abiEventInputId}
            value={matcher.operator}
            onChange={this.onChangeOperator}
          />
          {operandInput}
        </>
      )
    }
  }
)