import React, { Component } from 'react'
import { NotusSelect } from '~/components/forms/NotusSelect'
import { graphql } from 'react-apollo'
import { sourcesQuery } from '~/queries/sourcesQuery'
import { isValidScopeSource } from '~/utils/isValidScopeSource'

export const SourceSelect = graphql(sourcesQuery, {
  name: 'sourcesQuery',
  props: ({ sourcesQuery }) => {
    const { sources, loading, error } = sourcesQuery

    let options = []
    if (!loading && !error) {
      options = sources.map(source => {
        return {
          label: source.title,
          value: source.source,
          dataType: source.dataType
        }
      })
    }

    return {
      options
    }
  }
})(
  class _SourceSelect extends Component {
    render () {
      let props = this.props
      const { scope, value, options } = props

      let validOptions = (options || []).filter(option => {
        return isValidScopeSource(scope, option.value)
      })

      let selectedOption
      if (value && validOptions) {
        selectedOption = validOptions.find(option => option.value === value)
        if (!selectedOption) {
          selectedOption = validOptions[0]
        }
        props = {...this.props, value: selectedOption}
      }

      return <NotusSelect {...props} options={validOptions} />
    }
  }
)
