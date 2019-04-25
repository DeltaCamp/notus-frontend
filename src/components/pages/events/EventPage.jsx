import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import {
  AlertTriangle,
  Cast,
  CheckCircle,
  Edit,
  PlusCircle,
  StopCircle,
} from 'react-feather'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { toast } from 'react-toastify'
import { EventTitle } from '~/components/events/EventTitle'
import { IsAuthed } from '~/components/IsAuthed'
import { Modal } from '~/components/Modal'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { deleteEventMutation } from '~/mutations/deleteEventMutation'
import { updateEventMutation } from '~/mutations/updateEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { eventQuery } from '~/queries/eventQuery'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const EventPage = 
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      graphql(updateEventMutation, {
        name: 'updateEventMutation'
      })(
        graphql(deleteEventMutation, {
          name: 'deleteEventMutation'
        })(
          graphql(eventQuery, {
            name: 'eventData',
            skip: (props) => !props.match.params.eventId,
            options: (props) => ({
              variables: { id: parseInt(props.match.params.eventId, 10) }
            })
          })(
            ReactTimeout(
              class _EventPage extends Component {
                state = {
                  newEventTitle: '',
                  isConfirmingDelete: false,
                  isInputtingTitle: false
                }

                static propTypes = {
                  match: PropTypes.object.isRequired
                }

                static contextTypes = {
                  router: PropTypes.object.isRequired
                }

                handleEdit = (e) => {
                  e.preventDefault()

                  const event = this.props.eventData.event
                  const editPath = formatRoute(routes.EDIT_EVENT, { eventId: event.id })

                  this.props.history.push(editPath)
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
                      'publicEventsQuery',
                    ],
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

                  if (event.title) {
                    this.doPublish()
                  } else {
                    this.setState({ isInputtingTitle: true })
                  }
                }

                handleCloseInputTitleModal = (e) => {
                  if (e) {
                    e.preventDefault()
                  }

                  this.setState({ isInputtingTitle: false })
                }

                handleSaveTitleAndPublish = (e) => {
                  e.preventDefault()

                  if (this.state.newEventTitle.length <= 5) {
                    return false
                  }

                  // if newEventTitle is valid then do this, otherwise
                  // show an error msg!
                  this.setState({ isSaving: true })

                  const event = this.props.eventData.event

                  this.props.updateEventMutation({
                    variables: {
                      event: {
                        id: event.id,
                        title: this.state.newEventTitle,
                        isPublic: true
                      }
                    },
                    refetchQueries: [
                      'eventsQuery',
                      'publicEventsQuery',
                    ],
                  }).then(({ data: { updateEvent } }) => {
                    toast.success(`Event title updated and published`)
                    this.handleCloseInputTitleModal()

                    this.props.setTimeout(() => {
                      this.setState({ isSaving: false })
                    }, 1000)
                  }).catch(error => {
                    toast.error('Error while updating event title and publishing')
                    console.error(error)

                    this.props.setTimeout(() => {
                      this.setState({ isSaving: false })
                    }, 1000)
                  })
                }

                handleNewEventTitleChange = (e) => {
                  if (/^[a-z0-9- ]+$/i.test(e.target.value)) {
                    this.setState({
                      newEventTitle: e.target.value
                    })
                  }
                }

                doPublish = () => {
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
                      'publicEventsQuery',
                    ],
                  }).then(({ data: { updateEvent } }) => {
                    toast.dismiss()
                    toast.success(`Event ${updateEvent.isPublic ? 'published' : 'made private'}`)
                  }).catch(error => {
                    toast.error('Error while updating event')
                    console.error(error)
                  })
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
                      'publicEventsQuery',
                    ],
                  }).then(() => {
                    toast.dismiss()
                    toast.success('Successfully deleted event')
                    this.props.history.push(routes.MY_EVENTS)
                  }).catch(error => {
                    console.error(error)
                  })
                }

                render () {
                  let colorClass,
                    isEventAuthor,
                    eventAuthorButtons,
                    notEventAuthorButtons

                  const { eventData, currentUserData } = this.props
                  
                  const error = eventData.error || currentUserData.error
                  const loading = eventData.loading || currentUserData.loading

                  const { event } = eventData || {}

                  if (loading) {
                    return null
                  } else if (error) {
                    console.error(eventData.error)
                    return null
                  } else if (!event) {
                    return null  
                  }

                  isEventAuthor = (currentUserData.currentUser && currentUserData.currentUser.id === parseInt(event.user.id, 10))
                  colorClass = brandColor(event.id)

                  if (!isEventAuthor) {
                    const createEventFromParentRoute = formatRoute(
                      routes.NEW_EVENT_FROM_PARENT, { eventId: event.id }
                    )

                    notEventAuthorButtons = (
                      <Link
                        to={createEventFromParentRoute}
                        className='button is-small is-outlined is-primary'
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
                            'is-outlined',
                            'is-link'
                          )}
                          onClick={this.handleEdit}
                        >
                          <Edit /> &nbsp;Edit
                        </button>
                        <button
                          className={classnames(
                            'button',
                            'is-small',
                            'is-outlined',
                            'is-pink'
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
                            'is-outlined',
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
                        <button
                          className={classnames(
                            'button',
                            'is-small',
                            'is-outlined',
                            'is-danger',
                            {
                              'is-two-thirds-opacity': !event.isActive,
                              'is-full-opacity': event.isActive
                            }
                          )}
                          onClick={this.handleOpenConfirmDeleteModal}
                        >
                          <AlertTriangle /> &nbsp;Delete
                      </button>
                    </>
                    )
                  }
                  
                  return (
                    <div className='is-positioned-absolutely'>
                      <Helmet
                        title={`${event.title} - Event`}
                      />

                      <ScrollToTop />

                      <Modal
                        isOpen={this.state.isInputtingTitle}
                        handleClose={this.handleCloseInputTitleModal}
                      >
                        <div className='has-text-centered'>
                          <h5 className='is-size-5 has-text-weight-semibold'>
                            Please give this event a custom name
                          </h5>
                          <h6 className='is-size-6 has-text-weight-light'>
                            This will show up for other Notus customers sitewide
                          </h6>
                          <br />
                          <br />
                          <form
                            className='form'
                            onSubmit={this.handleSaveTitleAndPublish}
                          >
                            <input
                              type='text'
                              className='input'
                              required
                              onChange={this.handleNewEventTitleChange}
                              value={this.state.newEventTitle}
                            />
                            <br />
                            <br />
                            <div className='buttons buttons-right'>
                              <button
                                className='button is-success'
                                onClick={this.handleSaveTitleAndPublish}
                                disabled={this.state.isSaving}
                              >
                                Save Title
                              </button>
                            </div>
                          </form>

                        </div>
                      </Modal>

                      <Modal
                        isOpen={this.state.isConfirmingDelete}
                        handleClose={this.handleCloseConfirmDeleteModal}
                        isSmall={true}
                      >
                        <div className='has-text-centered'>
                          <h5 className='is-size-5 has-text-weight-normal'>
                            Are you sure you want to delete this event?
                          </h5>
                          <br/>
                          <div className='buttons'>
                            <button
                              className='button is-small is-light'
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

                      <section
                        className={classnames(
                          'section',
                          'section--main-content'
                        )}
                      >
                        <div
                          className={classnames(
                            'container-fluid',
                            'color-block',
                            'pb20',
                            colorClass,
                            {
                              'is-two-thirds-opacity': !event.isActive,
                              'is-full-opacity': event.isActive
                            }
                          )}
                        >
                          <div className='row'>
                            <div className='col-xs-12'>
                              <div className='container'>
                                <div className='row'>
                                  <div className='col-xs-12 has-text-centered is-size-4'>
                                    <h6 className='is-size-6 has-text-centered is-uppercase has-text-weight-bold mt20 pt20 pb20'>
                                      <EventTitle event={event} />
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='container pt50'>
                          <div className='row'>
                            <div className='col-xs-12 has-text-centered'>
                              <div className='buttons'>
                                {notEventAuthorButtons}
                                
                                {eventAuthorButtons}
                              </div>

                              {event.isActive
                                ? (
                                  <p>
                                    <strong>Active:</strong> currently triggering actions when transactions/blocks/contract events occurs.
                                  </p>
                                )
                                : (
                                  <p>
                                    <strong>Not Active:</strong> Currently not firing when events occur.
                                  </p>
                                )
                              }
                            </div>
                          </div>
                        </div>

                        <br />

                        <div
                          className={classnames(
                            'container',
                            {
                              'is-two-thirds-opacity': !event.isActive,
                              'is-full-opacity': event.isActive
                            }
                          )}
                        >
                          <div className='row'>
                            <div className='col-xs-12 col-md-6 col-start-md-4 pb100'>
                              <h5 className='is-size-5 has-text-centered is-uppercase has-text-weight-bold mt20 pt20'>
                                Event History
                              </h5>
                              <p className='has-text-centered has-text-weight-bold has-text-link'>
                                Triggered 4 times:
                              </p>
                              <br/>

                              <table className='table is-striped is-hoverable is-fullwidth'>
                                <tbody>
                                  <tr>
                                    <td>
                                      <strong>Sent email:</strong>
                                    </td>
                                    <td>
                                      Jan 12<sup>th</sup>, 1994
                                    </td>
                                    <td>
                                      2:03pm
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Sent email:</strong>
                                    </td>
                                    <td>
                                      March 3<sup>rd</sup>
                                    </td>
                                    <td>
                                      4:03pm
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Sent email:</strong>
                                    </td>
                                    <td>
                                      July 4<sup>th</sup>, 2018
                                    </td>
                                    <td>
                                      6:03pm
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Sent email:</strong>
                                    </td>
                                    <td>
                                      Dec 31<sup>st</sup>, 2019
                                    </td>
                                    <td>
                                      1:01am
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </div>
                          </div>
                        </div>
                      </section>


                      <FooterContainer />
                    </div>
                  )
                }
              }
            )
          )
        )
      )
    )
  )