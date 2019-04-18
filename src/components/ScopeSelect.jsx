import React from 'react'
import { NotusSelect } from '~/components/forms/NotusSelect'

import { SCOPES, SCOPE_LABELS } from '~/constants'

export const ScopeSelect = function (props) {

  const options = [
    {
      label: SCOPE_LABELS[SCOPES.TRANSACTION],
      value: SCOPES.TRANSACTION
    },
    {
      label: SCOPE_LABELS[SCOPES.BLOCK],
      value: SCOPES.BLOCK
    },
    {
      label: SCOPE_LABELS[SCOPES.CONTRACT_EVENT],
      value: SCOPES.CONTRACT_EVENT
    }
  ]

  const value = options.find(option => option.value === props.value)
  props = {...props, value}
  return <NotusSelect {...props} options={options} />
}