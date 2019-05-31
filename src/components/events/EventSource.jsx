import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { SourceDescription } from '~/components/events/SourceDescription'
import { ScopeAndContractSelect } from '~/components/forms/ScopeAndContractSelect'
import { KEYS } from '~/constants'

export const EventSource = class _EventSource extends Component {
  state = {
    isEditing: false,
    showAddContract: false
  }

  static propTypes = {
    event: PropTypes.object.isRequired,
    onChangeScopeAndContractId: PropTypes.func.isRequired,
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
    if (e.keyCode === KEYS.escape) {
      this.hideAddContract()
    }
  }

  render () {
    return (
      <>
        {this.state.isEditing
          ? (
            <>
              <span>
                a
              </span>
            
              <div
                ref={node => { this.node = node }}
                className='event-box__variable has-react-select'
                onKeyUp={this.handleKeyUp}
              >
                <ScopeAndContractSelect
                  scope={this.props.event.scope}
                  abiEventId={this.props.event.abiEventId}
                  networkId={this.props.event.networkId}
                  onChangeScopeAndContractId={this.props.onChangeScopeAndContractId}
                  onAddAbiEvent={this.showAddContract}
                  menuIsOpen={this.state.isEditing}
                  handleStopEditing={this.handleStopEditing}
                />
              </div>
            </>
          )
          : (
            <SourceDescription
              handleStartEdit={this.handleStartEdit}
              event={this.props.event}
            />
          )
        }
      </>
    )
  }
}
