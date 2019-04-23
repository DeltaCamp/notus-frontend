import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import { sourceQuery } from '~/queries/sourceQuery'
import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'
import { SOURCES } from '../constants';

const abiEventInputQuery = gql`
  query abiEventInputQuery($id: Float!) {
    abiEventInput(id: $id) {
      ...abiEventInputFragment
      abiEvent {
        id
        name
      }
    }
  }
  ${abiEventInputFragment}
`

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
  graphql(abiEventInputQuery, {
    name: 'abiEventInputQuery',
    skip: (props) => !props.abiEventInputId,
    options: (props) => ({
      variables: {
        id: parseInt(props.abiEventInputId, 10)
      }
    })
  }) (
    class _SourceTitle extends PureComponent {
      static propTypes = {
        abiEventInputId: PropTypes.number,
        source: PropTypes.string.isRequired
      }

      render () {
        const {sourceQuery, abiEventInputQuery} = this.props
        const { abiEventInput, abiError } = abiEventInputQuery || {}
        const { source, loading, sourceError } = sourceQuery
        
        const error = abiError || sourceError

        if (loading) {
          return '...'
        } else if (error) {
          console.error(error)
          return error.toString()
        } else if (source.source !== SOURCES.CONTRACT_EVENT_INPUT) {
          return source.title
        } else if (abiEventInput) {
          return `${abiEventInput.abiEvent.name} ${abiEventInput.name}`
        } else {
          return '...'
        }
      }
    }
  )
)