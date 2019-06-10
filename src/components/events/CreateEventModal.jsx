import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Save } from 'react-feather'

import { Modal } from '~/components/Modal'
import { EventTitle } from '~/components/events/EventTitle'
import { NetworkName } from '~/components/NetworkName'
import { KEYS } from '~/constants'

// const debug = require('debug')('notus:components:CreateEventModal')

export const CreateEventModal = class _CreateEventModal extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    createEventModalOpen: PropTypes.bool.isRequired,
    handleCloseCreateEventModal: PropTypes.func.isRequired,
    handleSubmitTitle: PropTypes.func.isRequired,
    handleSaveEvent: PropTypes.func.isRequired
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.props.handleCloseCreateEventModal()
    }
  }

  handleSaveEvent = (e) => {
    e.preventDefault()

    this.props.handleSubmitTitle(
      this.props.event.newTitle,
      this.props.handleSaveEvent
    )
  }

  render () {
    const { currentUserData } = this.props

    const networkName = <NetworkName networkId={this.props.event.networkId} />

    const email = currentUserData?.currentUser?.email || ''

    return (
      <>
        <Modal
          isSmall
          height={660}
          isOpen={this.props.createEventModalOpen}
          handleClose={this.props.handleCloseCreateEventModal}
        >
          <form
            onKeyUp={this.handleKeyUp}
            className='form is-tall is-inverse has-text-centered'
          >
            <h5 className='is-size-5 has-text-weight-normal pb20'>
              Please give this event a title:
            </h5>

            <EventTitle
              event={this.props.event}
              handleSubmitTitle={this.props.handleSubmitTitle}
              handleSaveEvent={this.props.handleSaveEvent}
              onlyShowInput
            />

            <p className='pt20'>
              <strong>NOTE:</strong>
              <br />
              {currentUserData?.currentUser?.confirmedAt ?
                <>
                  This event will start reacting to the <strong>'{networkName}'</strong> network immediately!
                </> :
                <>
                  You will need to <strong>confirm your '{email}' email address</strong> prior to this event reacting to {networkName}.
                </>
              }
            </p>

            <div className='buttons has-text-centered'>
              <button
                onClick={this.handleSaveEvent}
                className='button is-success has-fat-icons'
                disabled={this.props.isSubmitting}
              >
                <Save />&nbsp;Save event
              </button>
            </div>
          </form>
        </Modal>
      </>
    )
  }
}
