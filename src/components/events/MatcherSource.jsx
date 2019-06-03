import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { graphql } from 'react-apollo'

import { SourceSelect } from '~/components/SourceSelect'
import { abiEventInputFragment } from '~/fragments/abiEventInputFragment'
import { sourceQuery } from '~/queries/sourceQuery'
import { sourcesQuery } from '~/queries/sourcesQuery'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidDataTypeOperator } from '~/utils/isValidDataTypeOperator'
import { SOURCES, OPERATORS } from '~/constants'

const debug = require('debug')('notus:components:MatcherSource')

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

        handleStartEditing = () => {
          this.props.handleSetEditMatcher()
        }

        handleStopEditing = () => {
          this.props.handleClearEditMatcher()
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
        }

        render () {
          const {
            abiEventId,
            scope
          } = this.props.event
          const { matcher } = this.props

          // can't we get this from props?
          const abiEventInputId = matcher.abiEventInputId || (matcher.abiEventInput || {}).id

          debug('MatcherSource matcher: ', matcher)

          return <SourceSelect
            scope={scope}
            abiEventId={abiEventId}
            abiEventInputId={abiEventInputId}
            value={matcher.source}
            onChange={this.handleChangeSource}
            handleOpenReactSelect={this.handleStartEditing}
            handleCloseReactSelect={this.handleStopEditing}
          />
        }
        
      })
    )
  )
)
