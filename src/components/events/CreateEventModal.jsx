import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Plus } from 'react-feather'
import { Modal } from '~/components/Modal'
import { EventTitle } from '~/components/events/EventTitle'
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
    return (
      <>
        <Modal
        isLarge
          isOpen={this.props.createEventModalOpen}
          handleClose={this.props.handleCloseCreateEventModal}
        >
          <div
            onKeyUp={this.handleKeyUp}
            className='has-text-centered'
          >
          
            <h5 className='is-size-5 has-text-weight-normal'>
              Please give this event a title:
            </h5>

            <br />
            <br />

            <EventTitle
              event={this.props.event}
              handleSubmitTitle={this.props.handleSubmitTitle}
              handleSaveEvent={this.props.handleSaveEvent}
              onlyShowInput
            />

            <br />
            <hr />
            <br />

            <p>
              <strong>NOTE:</strong> This event will start reacting to Mainnet immediately!
            </p>

            <div className='buttons has-text-centered'>
              <button
                onClick={this.handleSaveEvent}
                className='button is-success has-fat-icons'
                disabled={this.props.isSubmitting}
              >
                <Plus />&nbsp;Create
              </button>
            </div>
          </div>
        </Modal>
      </>
    )
  }
}
