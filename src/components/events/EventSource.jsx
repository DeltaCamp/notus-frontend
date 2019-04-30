import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { Modal } from '~/components/Modal'
import { SourceDescription } from '~/components/events/SourceDescription'
import { ContractForm } from '~/components/forms/ContractForm'
import { ScopeAndAbiEventSelect } from '~/components/forms/ScopeAndAbiEventSelect'
import { KEYS } from '~/constants'

export const EventSource = class _EventSource extends Component {
  state = {
    isEditing: false,
    showAddContract: false
  }

  static propTypes = {
    event: PropTypes.object.isRequired,
    onChangeScopeAndAbiEventId: PropTypes.func.isRequired,
    onCreateAbi: PropTypes.func.isRequired,
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

  handleOnCreateAbi = (abi) => {
    this.hideAddContract()
    this.props.onCreateAbi(abi)
  }

  handleStartEdit = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: true
    })

    this.props.handleToggleEventSource()

    document.addEventListener('mousedown', this.handleClickAnywhere, false)
  }

  handleChangeSource = (option) => {
    this.handleStopEditing()
  }

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
    console.log(e.keyCode)
    if (e.keyCode === KEYS.escape) {
      this.hideAddContract()
    }
  }

  render () {
    return (
      <>
        <Modal
          isOpen={this.state.showAddContract}
          handleClose={this.hideAddContract}
          isLarge
          onKeyUp={this.handleKeyUp}
        >
          {
            this.state.showAddContract &&
            <ContractForm
              onCancel={this.hideAddContract}
              onCreate={this.handleOnCreateAbi}
            />
          }
        </Modal>

        {this.state.isEditing
          ? (
            <>
              a
              <div
                ref={node => { this.node = node }}
                className='event-box__variable has-react-select'
                onKeyUp={this.handleKeyUp}
              >
                <ScopeAndAbiEventSelect
                  scope={this.props.event.scope}
                  abiEventId={this.props.event.abiEventId}
                  onChangeScopeAndAbiEvent={this.props.onChangeScopeAndAbiEventId}
                  onAddAbiEvent={this.showAddContract}
                  menuIsOpen={this.state.isEditing}
                  handleStopEditing={this.handleStopEditing}
                />
              </div>
            </>
          )
          : (
            <>
              <SourceDescription
                handleStartEdit={this.handleStartEdit}
                event={this.props.event}
              />
            </>
          )
        }
      </>
    )
  }
}
