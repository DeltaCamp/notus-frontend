import React from 'react'
import { graphql } from 'react-apollo'

import { abiEventQuery } from '~/queries/abiEventQuery'
import { addArticle as articlize } from '~/utils/addArticle'

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
  function ({ addArticle, abiEventQuery }) {
    const { abiEvent, loading, error } = abiEventQuery

    if (loading) { 
      return '...'
    } else if (error) {
      console.error(error)
      return error.toString()
    } else {
      let noun = `${abiEvent.abi.name} ${abiEvent.name}`
      if (addArticle) {
        noun = articlize(noun)
      }
      return (
        <span>{noun}</span>
      )
    }
  }
)