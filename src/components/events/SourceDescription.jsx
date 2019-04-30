import React from 'react'

import { AbiEventName } from '~/components/AbiEventName'
import { getNounArticle } from '~/utils/getNounArticle'

import { SCOPES, SCOPE_LABELS } from '~/constants'

export const SourceDescription = function ({ event, handleStartEdit }) {
  let article

  let abiEventId
  if (event.scope === SCOPES.CONTRACT_EVENT) {
    abiEventId = event.abiEventId
    if (event.abiEvent) {
      abiEventId = event.abiEvent.id
    }
  }

  let title
  if (abiEventId) {
    title = <AbiEventName
      abiEventId={abiEventId}
    />
  } else {
    title = SCOPE_LABELS[event.scope]
  }

  return (
    <>
      {getNounArticle(title)}
      <button
        className='event-box__variable has-react-select'
        onClick={handleStartEdit}
      >
        {title}
      </button>
    </>
  )
}