import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import { SourceSelect } from '~/components/SourceSelect'
import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'
import { sourceQuery } from '~/queries/sourceQuery'
import { sourcesQuery } from '~/queries/sourcesQuery'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { SOURCES, OPERATORS } from '~/constants'

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

export const SourceTitle = graphql(sourcesQuery, {
  name: 'sourcesQuery'
})(
  graphql(sourceQuery, {
    name: 'sourceQuery',
    options: (props) => {
      return {
        variables: {
          source: props.matcher.source
        }
      }
    }
  })(
    graphql(abiEventInputQuery, {
      name: 'abiEventInputQuery',
      skip: (props) => !props.matcher.abiEventInputId,
      options: (props) => ({
        variables: {
          id: parseInt(props.matcher.abiEventInputId, 10)
        }
      })
    }) (
      class _SourceTitle extends Component {
        state = {
          isEditing: false
        }

        static propTypes = {
          abiEventInputId: PropTypes.number,
          handleEdit: PropTypes.func.isRequired,
          matcher: PropTypes.object.isRequired,
          onChange: PropTypes.func.isRequired,
          event: PropTypes.object.isRequired,
          scope: PropTypes.number
        }

        handleEdit = (e) => {
          e.preventDefault()

          this.setState({
            isEditing: true
          })

          this.props.handleEdit()
        }

        handleChangeSource = (option) => {
          const clone = deepCloneMatcher(this.props.matcher)
          clone.source = option.value

          let sourceDataType
          if (option.value === SOURCES.CONTRACT_EVENT_INPUT) {
            const { abiEventInput } = option
            sourceDataType = abiEventInput.type
            clone.abiEventInputId = parseInt(abiEventInput.id, 10)
          } else {
            const { sources } = this.props.sourcesQuery
            const source = sources.find(s => s.source === option.value)
            sourceDataType = source.dataType
          }

          if (!isValidDataTypeOperator(sourceDataType, clone.operator)) {
            clone.operator = OPERATORS.EQ
          }

          this.props.onChange(clone)

          this.setState({
            isEditing: false
          })
        }

        sourceWords = () => {
          let content

          const { sourceQuery, abiEventInputQuery } = this.props
          const { abiEventInput, abiError } = abiEventInputQuery || {}
          const { source, loading, sourceError } = sourceQuery

          const error = abiError || sourceError

          if (loading) {
            content = '...'
          } else if (error) {
            console.error(error)
            content = error.toString()
          } else if (source.source !== SOURCES.CONTRACT_EVENT_INPUT) {
            content = source.title
          } else if (abiEventInput) {
            content = `${abiEventInput.abiEvent.name} ${abiEventInput.name}`
          } else {
            content = '...'
          }

          return content
        }

        render () {
          const {
            abiEventId,
            scope
          } = this.props.event
          const { matcher } = this.props
          
          // can't we get this from props?
          const abiEventInputId = matcher.abiEventInputId || (matcher.abiEventInput || {}).id
          
          return (
            <>
              {this.state.isEditing
                ? (
                  <div className="event-box__variable">
                    <SourceSelect
                      abiEventId={abiEventId}
                      abiEventInputId={abiEventInputId}
                      value={matcher.source}
                      onChange={this.handleChangeSource}
                      scope={scope}
                      autoFocus
                    />
                  </div>
                )
                : (
                  <button
                    className='event-box__variable'
                    onClick={this.handleEdit}
                  >
                    {this.sourceWords()}
                  </button>
                )
              }
            </>
          )
        }
      }
    )
  )
)