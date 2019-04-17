import React from 'react'
import { NotusSelect } from '~/components/forms/NotusSelect'
import { graphql } from 'react-apollo'
import { sourcesQuery } from '~/queries/sourcesQuery'

export const SourceSelect = graphql(sourcesQuery, { name: 'sourcesQuery' })(
  function (props) {
    const { sources, loading, error } = props.sourcesQuery

    let options = []
    if (error) {
      return `Error: ${error}`
    } else if (!loading) {
      options = sources.map(source => {
        return {
          label: source.title,
          value: source.source,
          dataType: source.dataType
        }
      })
    }

    let selectedOption
    if (props.value) {
      selectedOption = options.find(option => option.value === props.value)
      props = {...props, value: selectedOption}
    }

    return <NotusSelect {...props} options={options} />
  }
)
