import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  AlertTriangle,
  Cast,
  CheckCircle,
  PlusCircle,
  StopCircle
} from 'react-feather'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { toast } from 'react-toastify'
import { IsAuthed } from '~/components/IsAuthed'
import { Modal } from '~/components/Modal'
import { deleteEventMutation } from '~/mutations/deleteEventMutation'
import { updateEventMutation } from '~/mutations/updateEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
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

              handleActivate = (e) => {
                e.preventDefault()

                const event = this.props.eventData.event

                this.props.updateEventMutation({
                  variables: {
                    event: {
                      id: event.id,
                      isActive: !event.isActive
                    }
                  },
                  refetchQueries: [
                    'eventsQuery',
                    'eventsQuery'
                  ]
                }).then(({ data: { updateEvent } }) => {
                  toast.dismiss()
                  toast.success(`Event ${updateEvent.isActive ? 're-activated' : 'deactivated'}`)
                }).catch(error => {
                  toast.error('Error while updating event')
                  console.error(error)
                })
              }

              handlePublishClick = (e) => {
                e.preventDefault()

                const event = this.props.eventData.event

                this.props.updateEventMutation({
                  variables: {
                    event: {
                      id: event.id,
                      isPublic: !event.isPublic
                    }
                  },
                  refetchQueries: [
                    'eventsQuery',
                    'eventsQuery'
                  ]
                }).then(({ data: { updateEvent } }) => {
                  toast.dismiss()
                  toast.success(`Event ${updateEvent.isPublic ? 'published' : 'made private'}`)
                }).catch(error => {
                  toast.error('Error while updating event')
                  console.error(error)
                })
              }

              runUpdateEventMutation (variables, successCallback, errorCallback) {
                if (!errorCallback) {
                  errorCallback = error => {
                    console.error(error)
                  }
                }

                this.props.updateEventMutation({
                  variables,
                  refetchQueries: [
                    // only refetch the event we just updated (1 record)
                    'eventsQuery',
                    'eventsQuery'
                  ]
                }).then(successCallback).catch(errorCallback)
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
                    'eventsQuery',
                    'eventsQuery'
                  ]
                }).then(() => {
                  toast.dismiss()
                  toast.success('Successfully deleted event')
                  this.props.history.push(routes.MY_EVENTS)
                }).catch(error => {
                  console.error(error)
                })
              }

              render () {
                let isEventAuthor,
                  eventAuthorButtons,
                  notEventAuthorButtons,
                  event,
                  eventPublishedState,
                  eventActiveState

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

                  console.log(currentUserData)
                  console.log(currentUserData.currentUser)
                  console.log(currentUserData.currentUser.id)
                  console.log(event)
                  console.log(event.user)
                  isEventAuthor = (currentUserData.currentUser && event.user && (currentUserData.currentUser.id === parseInt(event.user.id, 10)))

                  if (!isEventAuthor) {
                    const createEventFromParentRoute = formatRoute(
                      routes.NEW_EVENT_FROM_PARENT, { eventId: event.id }
                    )

                    notEventAuthorButtons = (
                      <Link
                        to={createEventFromParentRoute}
                        className='button is-small is-success'
                      >
                        <PlusCircle /> &nbsp;Create Event From This One
                      </Link>
                    )
                  } else {
                    eventAuthorButtons = (
                      <>
                        <button
                          className={classnames(
                            'button',
                            'is-small',
                            'is-link'
                          )}
                          onClick={this.handlePublishClick}
                        >

                          {event.isPublic
                            ? (<><Cast /> &nbsp;Make Private</>)
                            : (<><Cast /> &nbsp;Make Public</>)
                          }
                        </button>
                        <button
                          className={classnames(
                            'button',
                            'is-small',
                            {
                              'is-info': event.isActive,
                              'is-success': !event.isActive
                            }
                          )}
                          onClick={this.handleActivate}
                        >
                          {event.isActive
                            ? (<><StopCircle /> &nbsp;Deactivate</>)
                            : (<><CheckCircle /> &nbsp;Activate</>)
                          }
                        </button>
                      </>
                    )
                  }

                  eventPublishedState = event.isPublic
                    ? (
                      <>
                        <strong>Published:</strong> This will show up as a useable event for other Notus customers sitewide.
                        </>
                    )
                    : (
                      <>
                        <strong>Private:</strong> Only you will be able to see this event.
                        </>
                    )

                  eventActiveState = event.isActive
                    ? (
                      <>
                        <strong>Active:</strong> currently triggering actions when transactions/blocks/contract events occurs.
                      </>
                    )
                    : (
                      <>
                        <strong>Not Active:</strong> Currently not firing when events occur.
                      </>
                    )
                }

                return (
                  <>
                    <Modal
                      isOpen={this.state.isConfirmingDelete}
                      handleClose={this.handleCloseConfirmDeleteModal}
                      isSmall
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
                            No
                          </button>
                          <button
                            className='button is-small is-success'
                            onClick={this.handleDelete}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </Modal>

                    <div className='buttons'>
                      {this.props.isCreateMode()
                        ? (
                          <button
                            onClick={this.props.handleSaveEvent}
                            className='button is-success'
                            disabled={this.props.isSubmitting}
                          >
                            <PlusCircle />&nbsp;Create Event
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
                      <div className='is-size-7'>
                        {eventPublishedState}
                        <br />
                        {eventActiveState}
                      </div>
                    )}

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
                      <AlertTriangle /> &nbsp;Delete
                    </button>
                  </>
                )
              }
            }
          )
        )
      )
    )
  )
