import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'

import { SourceSelect } from '~/components/SourceSelect'
import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'
import { sourceQuery } from '~/queries/sourceQuery'
import { sourcesQuery } from '~/queries/sourcesQuery'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { KEYS, SOURCES, OPERATORS } from '~/constants'

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

export const MatcherSource = graphql(sourcesQuery, {
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
    })(
      ReactTimeout(class _MatcherSource extends Component {
        state = {
          isEditing: false
        }

        static propTypes = {
          abiEventInputId: PropTypes.number,
          handleSetEditMatcher: PropTypes.func.isRequired,
          handleClearEditMatcher: PropTypes.func.isRequired,
          matcher: PropTypes.object.isRequired,
          onChange: PropTypes.func.isRequired,
          event: PropTypes.object.isRequired,
          scope: PropTypes.number
        }

        componentDidUpdate() {
          this.props.setTimeout(ReactTooltip.rebuild)
        }

        handleStartEdit = (e) => {
          e.preventDefault()

          this.setState({
            isEditing: true
          })

          this.props.handleSetEditMatcher()

          document.addEventListener('mousedown', this.handleClickAnywhere, false)
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

          clone.operand = ''

          this.props.onChange(clone)

          this.handleStopEditing()
        }

        handleKeyUp = (e) => {
          if (e.keyCode === KEYS.escape) {
            this.handleStopEditing()
          }
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
          } else if (source && source.source !== SOURCES.CONTRACT_EVENT_INPUT) {
            content = source.title
          } else if (abiEventInput) {
            content = `${abiEventInput.abiEvent.name} ${abiEventInput.name}`
          } else {
            content = '...'
          }

          return content
        }

        handleClickAnywhere = (e) => {
          const domNode = ReactDOM.findDOMNode(this.node)

          if (domNode && !domNode.contains(e.target)) {
            this.handleStopEditing()
          }
        }

        handleStopEditing = () => {
          this.setState({
            isEditing: false
          })

          this.props.handleClearEditMatcher()

          document.removeEventListener('mousedown', this.handleClickAnywhere, false)
        }

        render () {
          const {
            abiEventId,
            scope
          } = this.props.event
          const { matcher } = this.props

          // can't we get this from props?
          const abiEventInputId = matcher.abiEventInputId || (matcher.abiEventInput || {}).id
          const sourceWords = this.sourceWords()

          return (
            <>
              {this.state.isEditing
                ? (
                  <div
                    ref={node => { this.node = node }}
                    className='event-box__variable has-react-select'
                    onKeyUp={this.handleKeyUp}
                  >
                    <SourceSelect
                      abiEventId={abiEventId}
                      abiEventInputId={abiEventInputId}
                      value={matcher.source}
                      onChange={this.handleChangeSource}
                      scope={scope}
                      menuIsOpen={this.state.isEditing}
                    />
                  </div>
                )
                : (
                  <button
                    className='event-box__variable has-react-select is-truncated'
                    onClick={this.handleStartEdit}
                    data-tip={sourceWords.length > 16 ? sourceWords : ''}
                  >
                    {sourceWords}
                  </button>
                )
              }
            </>
          )
        }
      })
    )
  )
)
