import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

// import { AbiEventName } from '~/components/events/AbiEventName'
import { AbiEventSelect } from '~/components/forms/AbiEventSelect'
import { KEYS, SCOPES } from '~/constants'

const debug = require('debug')('notus:AbiEventSelect')

export const ContractAbiEvent = class _ContractAbiEvent extends Component {
  state = {
    showAddContract: false
  }

  static propTypes = {
    event: PropTypes.object.isRequired,
    onChangeAbiEventId: PropTypes.func.isRequired,
    handleToggleEditingEventSource: PropTypes.func.isRequired
  }

  // showAddContract = (e) => {
  //   this.setState({
  //     showAddContract: true
  //   })

  //   document.addEventListener('keyup', this.handleKeyUp, false)
  // }

  // hideAddContract = () => {
  //   this.setState({
  //     showAddContract: false
  //   })

  //   document.removeEventListener('keyup', this.handleKeyUp, false)
  // }

  handleStartEditing = (e) => {
    this.props.handleToggleEditingEventSource(true)
  }

  handleStopEditing = () => {
    this.props.handleToggleEditingEventSource(false)
  }

  // handleChangeSource = (option) => {
  //   this.handleStopEditing()
  // }

  // handleKeyUp = (e) => {
  //   if (e.keyCode === KEYS.escape) {
  //     this.handleStopEditing()
  //   }
  // }

  // handleClickAnywhere = (e) => {
  //   const domNode = ReactDOM.findDOMNode(this.node)

  //   if (domNode && !domNode.contains(e.target)) {
  //     this.handleStopEditing()
  //   }
  // }

  // handleKeyUp = (e) => {
  //   if (e.keyCode === KEYS.escape) {
  //     this.hideAddContract()
  //   }
  // }

  render () {
    if (this.props.event.scope !== SCOPES.CONTRACT_EVENT) {
      return null
    }

    let abiId = this.props.event.contract?.abi?.id
    if (abiId) {
      abiId = parseInt(abiId, 10)
    }

    let abiEventId = this.props.event.abiEventId
    if (abiEventId) {
      abiEventId = parseInt(abiEventId, 10)
    }

    debug(`abiId: ${abiId}, abiEventId: ${abiEventId}`)

    return <AbiEventSelect
      abiId={abiId}
      abiEventId={abiEventId}
      onChangeAbiEventId={this.props.onChangeAbiEventId}
      handleOpenReactSelect={this.handleStartEditing}
      handleCloseReactSelect={this.handleStopEditing}
    />
  }
}
