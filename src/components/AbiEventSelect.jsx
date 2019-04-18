import React from 'react'
import { graphql } from 'react-apollo'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { abiEventsQuery } from '~/queries/abiEventsQuery'

export const AbiEventSelect = graphql(abiEventsQuery, { name: 'abiEventsQuery' })(
  function (props) {
    const { abiEventsQuery } = props
    const { abiEvents, loading, error } = abiEventsQuery

    let options
    if (!loading && !error) {
      options = abiEvents.map(abiEvent => {
        return {
          label: `${abiEvent.abi.name} ${abiEvent.name}`,
          value: abiEvent.id,
          abiEvent
        }
      })
    } else {
      options = []
    }

    const value = options.find(option => option.value === props.value)

    return (
      <NotusSelect {...props} value={value} options={options} />
    )
  }
)