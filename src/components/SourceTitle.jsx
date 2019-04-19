import React from 'react'
import { graphql } from 'react-apollo'

import { sourceQuery } from '~/queries/sourceQuery'

export const SourceTitle = graphql(sourceQuery, {
  name: 'sourceQuery',
  options: (props) => {
    return {
      variables: {
        source: props.source
      }
    }
  }
})(
  function ({sourceQuery}) {
    const { source, loading, error } = sourceQuery
    
    if (loading) {
      return '...'
    } else if (error) {
      return error.toString()
    } else {
      return source.title
    }
  }
)