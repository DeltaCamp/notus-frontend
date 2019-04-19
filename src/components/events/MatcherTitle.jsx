import React from 'react'

import { SourceTitle } from '~/components/SourceTitle'
import { OPERATOR_LABELS, OPERAND_DATA_TYPE_LABELS } from '~/constants'

export const MatcherTitle = function ({ isFirst, isLast, matcher }) {
  const {
    source,
    operator,
    operand,
    operandDataType
  } = matcher

  const andWord = isFirst ? 'where' : 'and'
  const lastWord = isLast ? ' ...' : ''

  return (
    <span>
      {andWord} the <SourceTitle source={source} /> {OPERATOR_LABELS[operator]} {operand} {OPERAND_DATA_TYPE_LABELS[operandDataType]} {lastWord}
    </span>
  )
}