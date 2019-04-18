import React from 'react'
import { graphql } from 'react-apollo'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { contractEventsQuery } from '~/queries/contractEventsQuery'

export const ContractEventSelect = graphql(contractEventsQuery, { name: 'contractEventsQuery' })(
  function (props) {
    const { contractEventsQuery } = props
    const { contractEvents, loading, error } = contractEventsQuery

    let options
    if (!loading && !error) {
      options = contractEvents.map(contractEvent => {
        return {
          label: `${contractEvent.contract.name} ${contractEvent.name}`,
          value: contractEvent.id,
          contractEvent
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