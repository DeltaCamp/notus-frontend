import React, { Component } from 'react'
import { NotusSelect } from '~/components/forms/NotusSelect'
import { graphql } from 'react-apollo'
import { sourcesQuery } from '~/queries/sourcesQuery'
import { isValidScopeSource } from '~/utils/isValidScopeSource'

export const SourceSelect = graphql(sourcesQuery, {
  name: 'sourcesQuery',
  props: ({ sourcesQuery, ownProps }) => {
    const { scope } = ownProps
    const { sources, loading, error } = sourcesQuery

    let options = []
    if (!loading && !error) {
      options = sources.map(source => {
        return {
          label: source.title,
          value: source.source,
          dataType: source.dataType
        }
      }).filter(option => {
        return isValidScopeSource(scope, option.value)
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
      const { value, options } = props

      console.log(this.props)

      let selectedOption
      if (value && options) {
        selectedOption = options.find(option => option.value === value)
        props = {...this.props, value: selectedOption}
      }

      return <NotusSelect {...props} options={options} />
    }
  }
)
