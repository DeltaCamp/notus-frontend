import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { formatRoute } from 'react-router-named-routes'
import { PlusCircle } from 'react-feather'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { IsAuthed } from '~/components/IsAuthed'
import { Modal } from '~/components/Modal'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { deleteEventMutation } from '~/mutations/deleteEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { eventsQuery } from '~/queries/eventsQuery'
import { EventCard } from '~/components/events/EventCard'
import * as routes from '~/../config/routes'

export const MyEventsPage =
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      graphql(deleteEventMutation, { name: 'deleteEventMutation' })(
        graphql(eventsQuery, { name: 'eventsData' })(
          class _MyEventsPage extends PureComponent {
            state = {
              isConfirmingDelete: false
            }

            static propTypes = {
              match: PropTypes.object.isRequired
            }

            static contextTypes = {
              router: PropTypes.object.isRequired
            }

            handleDelete = (e) => {
              e.preventDefault()

              const eventId = parseInt(this.state.eventId, 10)

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
                this.handleCloseConfirmDeleteModal()
              }).catch(error => {
                console.error(error)
              })
            }

            handleOpenConfirmDeleteModal = (eventId) => {
              this.setState({ 
                eventId,
                isConfirmingDelete: true
              })
            }

            handleCloseConfirmDeleteModal = (e) => {
              if (e) {
                e.preventDefault()
              }

              this.setState({
                eventId: null,
                isConfirmingDelete: false
              })
            }

            render () {
              const { eventsData } = this.props
              let events = []

              if (!eventsData.loading) {
                if (eventsData.error) {
                  console.error(eventsData.error)
                  return 'There was an error while fetching your events'
                } else {
                  events = eventsData.events.map((event) => (
                    <EventCard
                      {...this.props}
                      key={`event-${event.id}`}
                      event={event}
                      editable={true}
                      isSmall={true}
                      linkTo={formatRoute(routes.EVENT, { eventId: event.id })}
                      handleOpenConfirmDeleteModal={this.handleOpenConfirmDeleteModal}
                    />
                  ))
                }
              }

              const eventsOrBlankState = (!eventsData.loading && events.length === 0) 
                ? (
                  <>
                    <h2 className='is-size-2 mt75 has-text-weight-bold'>
                      You haven't created any events.
                    </h2>
                    <Link
                      className='button mt20 is-purple'
                      to={routes.NEW_EVENT}
                    >
                      Create an Event
                    </Link>
                  </>
                ) : (
                  <>
                    <div className='mt20 has-text-right'>
                      <Link
                        className='button is-small mt20 is-outlined is-link'
                        to={routes.NEW_EVENT}
                        >
                        <PlusCircle /> &nbsp;Create a Custom Event
                      </Link>
                    </div>
                    <div className='listing-grid mt75'>
                      {events}
                    </div>
                  </>
                )

              return (
                <div className='is-positioned-absolutely'>
                  <Helmet
                    title='My Events'
                  />

                  <ScrollToTop />

                  <Modal
                    isOpen={this.state.isConfirmingDelete}
                    handleClose={this.handleCloseConfirmDeleteModal}
                    isSmall={true}
                  >
                    <div className='has-text-centered'>
                      <h5 className='is-size-5 has-text-weight-normal'>
                        Are you sure you want to delete this event?
                      </h5>
                      <br />
                      <div className="buttons">
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

                  <section className='section section--main-content'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 has-text-centered'>
                          {eventsOrBlankState}
                        </div>
                      </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className='container-fluid has-bg is-blue pt50 pb100'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-xs-12 has-text-centered mt50'>
                                <h4 className='is-size-4 has-text-white has-text-weight-bold'>
                                  Or create a new event based off an existing one:
                                </h4>

                                <br />

                                
                                <DiscoverEventsListing />
                              </div>
                            </div>
                          </div>
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