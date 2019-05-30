import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AlertTriangle, Plus } from 'react-feather'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { IsAuthed } from '~/components/IsAuthed'
import { Modal } from '~/components/Modal'
import { deleteEventMutation } from '~/mutations/deleteEventMutation'
import { updateEventMutation } from '~/mutations/updateEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { notusToast } from '~/utils/notusToast'
import * as routes from '~/../config/routes'

export const EditEventButtons =
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      graphql(updateEventMutation, {
        name: 'updateEventMutation'
      })(
        graphql(deleteEventMutation, {
          name: 'deleteEventMutation'
        })(
          ReactTimeout(
            class _EditEventButtons extends Component {
              state = {
                newEventTitle: '',
                isConfirmingDelete: false
              }

              static propTypes = {
                match: PropTypes.object.isRequired
              }

              static contextTypes = {
                router: PropTypes.object.isRequired
              }

              handleOpenConfirmDeleteModal = (e) => {
                e.preventDefault()

                this.setState({ isConfirmingDelete: true })
              }

              handleCloseConfirmDeleteModal = (e) => {
                e.preventDefault()

                this.setState({ isConfirmingDelete: false })
              }

              handleDelete = (e) => {
                e.preventDefault()

                const eventId = parseInt(this.props.eventData.event.id, 10)

                this.props.deleteEventMutation({
                  variables: {
                    eventId
                  },
                  refetchQueries: [
                    'eventsQuery'
                  ]
                }).then(() => {
                  notusToast.success('Successfully deleted event')
                  this.props.history.push(routes.MY_EVENTS)
                }).catch(error => {
                  console.error(error)
                })
              }

              render () {
                let isEventAuthor,
                  eventAuthorButtons,
                  notEventAuthorButtons,
                  event

                const { eventData, currentUserData } = this.props
                if (eventData) {
                  const error = eventData.error || currentUserData.error
                  const loading = eventData.loading || currentUserData.loading

                  event = eventData.event || {}

                  if (loading) {
                    return null
                  } else if (error) {
                    console.error(eventData.error)
                    return null
                  } else if (!event) {
                    return null
                  }

                  isEventAuthor = (currentUserData.currentUser && event.user && (currentUserData.currentUser.id === parseInt(event.user.id, 10)))

                  if (!isEventAuthor) {
                    const createEventFromParentRoute = formatRoute(
                      routes.NEW_EVENT_FROM_PARENT, { eventId: event.id }
                    )

                    notEventAuthorButtons = (
                      <Link
                        to={createEventFromParentRoute}
                        className='button is-small is-link is-outlined has-fat-icons'
                      >
                        <Plus /> &nbsp;Create event from this one
                      </Link>
                    )
                  }
                }

                return (
                  <>
                    <Modal
                      isOpen={this.state.isConfirmingDelete}
                      handleClose={this.handleCloseConfirmDeleteModal}
                      isSmall
                      height={460}
                    >
                      <div className='has-text-centered'>
                        <h5 className='is-size-5 has-text-weight-normal'>
                          Are you sure you want to delete this event?
                        </h5>
                        <br />
                        <div className='buttons'>
                          <button
                            className='button is-small is-outlined is-light'
                            onClick={this.handleCloseConfirmDeleteModal}
                          >
                            Cancel
                          </button>
                          <button
                            className='button is-small is-danger'
                            onClick={this.handleDelete}
                          >
                            Delete event
                          </button>
                        </div>
                      </div>
                    </Modal>

                    <div className='buttons'>
                      {this.props.isCreateMode()
                        ? (
                          <button
                            onClick={this.props.handleOpenCreateEventModal}
                            className='button is-success has-fat-icons'
                            disabled={this.props.isSubmitting}
                          >
                            <Plus />&nbsp;Create event
                          </button>
                        )
                        : (
                          <>
                            {notEventAuthorButtons}
                            {eventAuthorButtons}
                          </>
                        )
                      }
                    </div>

                    {!this.props.isCreateMode() && (
                      <>
                        <br />
                        <button
                          className={classnames(
                            'button',
                            'is-small',
                            'is-text',
                            'has-text-danger'
                          )}
                          onClick={this.handleOpenConfirmDeleteModal}
                        >
                          <AlertTriangle /> &nbsp;Delete event
                        </button>
                      </>
                    )}
                  </>
                )
              }
            }
          )
        )
      )
    )
  )
