import React from 'react'
import { graphql } from 'react-apollo'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { abiEventsQuery } from '~/queries/abiEventsQuery'
import { SCOPES, SCOPE_LABELS } from '~/constants'

const NEW_ABI_VALUE = '__ADD_NEW_ABI'

export const ScopeAndAbiEventSelect = graphql(abiEventsQuery, { name: 'abiEventsQuery' })(
  class _ScopeAndAbiEventSelect extends PureComponent {
    static propTypes = {
      scope: PropTypes.number.isRequired,
      abiEventId: PropTypes.number,
      onChangeScopeAndAbiEvent: PropTypes.func.isRequired,
      onAddAbiEvent: PropTypes.func.isRequired
    }

    onChange (option) {
      if (option.value === NEW_ABI_VALUE) {
        this.props.onAddAbiEvent()
      } else if (option.abiEvent) {
        this.props.onChangeScopeAndAbiEvent({
          scope: SCOPES.CONTRACT_EVENT,
          abiEventId: option.abiEvent.id
        })
      } else {
        this.props.onChangeScopeAndAbiEvent({
          scope: option.value,
          abiEventId: null
        })
      }
    }

    render () {
      const { scope, abiEventId } = this.props

      const scopeOptions = [
        {
          label: SCOPE_LABELS[SCOPES.TRANSACTION],
          value: SCOPES.TRANSACTION
        },
        {
          label: SCOPE_LABELS[SCOPES.BLOCK],
          value: SCOPES.BLOCK
        }
      ]

      const scopeGroup = {
        label: 'General',
        options: scopeOptions
      }

      const { abiEventsQuery } = props
      const { abiEvents, loading, error } = abiEventsQuery
      let abiEventOptions = [{
        label: 'Add new abi...',
        value: NEW_ABI_VALUE
      }]
      const abiEventGroup = {
        label: 'Contract Event',
        options: abiEventOptions
      }
      if (error) {
        console.error(error)
      } else if (!loading) {
        abiEventOptions = abiEventOptions.concat(abiEvents.map(abiEvent => {
          return {
            label: `${abiEvent.abi.name} ${abiEvent.name}`,
            value: `abi-event-${abiEvent.id}`,
            abiEvent
          }
        }))
      }

      let value
      if (scope === SCOPES.CONTRACT_EVENT) {
        value = abiEventOptions.find(abiEventOption => abiEventOption.abiEvent.id === abiEventId)
      } else {
        value = scopeOptions.find(option => option.value === scope)
      }

      return <NotusSelect {...props} value={value} options={[scopeGroup, abiEventGroup]} onChange={this.onChange} />
    }
  }
)