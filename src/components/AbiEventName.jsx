import React from 'react'
import { graphql } from 'react-apollo'

import { abiEventQuery } from '~/queries/abiEventQuery'

export const AbiEventName = graphql(abiEventQuery, {
  name: 'abiEventQuery',
  skip: (props) => (
    !props.abiEventId
  ),
  options: (props) => {
    return {
      variables: {
        id: props.abiEventId
      }
    }
  }
})(
  function ({ abiEventQuery }) {
    const { abiEvent, loading, error } = abiEventQuery

    if (loading) { 
      return '...'
    } else if (error) {
      console.error(error)
      return error.toString()
    } else {
      let noun = `${abiEvent.abi.name} ${abiEvent.name}`
      
      return (
        <span>{noun}</span>
      )
    }
  }
)