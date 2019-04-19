import React from 'react'

import { AbiEventName } from '~/components/AbiEventName'
import { addArticle } from '~/utils/addArticle'

import { SCOPES, SCOPE_LABELS } from '~/constants'

export const EventTitle = function ({ event }) {

  let abiEventId
  if (event.scope === SCOPES.CONTRACT_EVENT) {
    abiEventId = event.abiEventId
    if (event.abiEvent) {
      abiEventId = event.abiEvent.id
    }
  }

  let title
  if (abiEventId) {
    title = <AbiEventName addArticle={true} abiEventId={abiEventId} />
  } else {
    title = addArticle(SCOPE_LABELS[event.scope])
  }

  return (
    <span>
      {title}
    </span>
  )
}