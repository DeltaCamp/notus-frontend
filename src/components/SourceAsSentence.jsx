import React from 'react'
import { graphql } from 'react-apollo'
import { sourcesQuery } from '~/queries/sourcesQuery'

export const SourceAsSentence = graphql(sourcesQuery,
  {
    name: 'sourcesQuery',
    options: (props) => ({
      variables: { id: props.source.id }
    })
  }
)(
  function (props) {
    let sentence
    const { source, loading, error } = props.sourcesQuery
    console.log('source', source)
    if (error) {
      return `Error: ${error}`
    } else if (!loading) {
      console.log(source)
      return source.toLowerCase()
    } else {
      return ''
    }
    
  }
)
