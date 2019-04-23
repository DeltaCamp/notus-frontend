import React from 'react'

import { SourceTitle } from '~/components/SourceTitle'
import { OPERATOR_LABELS } from '~/constants'

export const MatcherTitle = function ({ isFirst, isLast, matcher }) {
  const {
    source,
    abiEventInputId,
    operator,
    operand
  } = matcher

  const andWord = isFirst ? 'where' : 'and'
  const lastWord = isLast ? ' ...' : ''

  return (
    <span>
      {andWord} the <SourceTitle source={source} abiEventInputId={abiEventInputId} /> {OPERATOR_LABELS[operator]} {operand} {lastWord}
    </span>
  )
}