import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ScopeAndContractSelect } from '~/components/forms/ScopeAndContractSelect'

// const debug = require('debug')('notus:components:EventSource')

export const EventSource = class _EventSource extends Component {
  state = {
    showAddContract: false
  }

  static propTypes = {
    event: PropTypes.object.isRequired,
    onChangeScopeAndContractId: PropTypes.func.isRequired,
    handleToggleEditingEventSource: PropTypes.func.isRequired
  }

  handleStartEditing = () => {
    this.props.handleToggleEditingEventSource(true)
  }

  handleStopEditing = () => {
    this.props.handleToggleEditingEventSource(false)
  }

  render () {
    return (
      <>
        <span>
          a
        </span>
    
        <ScopeAndContractSelect
          scope={this.props.event.scope}
          contractId={this.props.event.contractId}
          abiEventId={this.props.event.abiEventId}
          networkId={this.props.event.networkId}
          onChangeScopeAndContractId={this.props.onChangeScopeAndContractId}
          onAddAbiEvent={this.showAddContract}
          handleStopEditing={this.handleStopEditing}
          handleStartEditing={this.handleStartEditing}
        />
      </>
    )
  }
}
