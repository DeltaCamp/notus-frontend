import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { AbiEventName } from '~/components/events/AbiEventName'
import { AbiEventSelect } from '~/components/forms/AbiEventSelect'
import { KEYS, SCOPES } from '~/constants'

export const ContractAbiEvent = class _ContractAbiEvent extends Component {
  state = {
    isEditing: false,
    showAddContract: false
  }

  static propTypes = {
    event: PropTypes.object.isRequired,
    onChangeAbiEventId: PropTypes.func.isRequired,
    handleToggleEventSource: PropTypes.func.isRequired
  }

  showAddContract = (e) => {
    this.setState({
      showAddContract: true
    })

    document.addEventListener('keyup', this.handleKeyUp, false)
  }

  hideAddContract = () => {
    this.setState({
      showAddContract: false
    })

    document.removeEventListener('keyup', this.handleKeyUp, false)
  }

  handleStartEdit = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: true
    })

    this.props.handleToggleEventSource()

    document.addEventListener('mousedown', this.handleClickAnywhere, false)
  }

  // handleChangeSource = (option) => {
  //   this.handleStopEditing()
  // }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.handleStopEditing()
    }
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

    this.props.handleToggleEventSource()

    document.removeEventListener('mousedown', this.handleClickAnywhere, false)
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.hideAddContract()
    }
  }

  render () {
    if (this.props.event.scope !== SCOPES.CONTRACT_EVENT) {
      return null
    }

    let abiId = this.props.event.contract?.abi?.id
    if (abiId) {
      abiId = parseInt(abiId, 10)
    }

    return (
      <>
        {this.state.isEditing
          ? (
            <div
              ref={node => { this.node = node }}
              className='event-box__variable has-react-select'
              onKeyUp={this.handleKeyUp}
            >
              <AbiEventSelect
                abiId={abiId}
                onChangeAbiEventId={this.props.onChangeAbiEventId}
                menuIsOpen={this.state.isEditing}
                handleStopEditing={this.handleStopEditing}
              />
            </div>
          )
          : (
            <AbiEventName
              handleStartEdit={this.handleStartEdit}
              abiEventId={this.props.event.abiEventId}
            />
          )
        }
      </>
    )
  }
}