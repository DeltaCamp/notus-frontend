import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
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
import { notusToast } from '~/utils/notusToast'
import * as routes from '~/../config/routes'
import { PAGE_SIZE } from '~/constants'

export const MyEventsPage =
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      graphql(deleteEventMutation, { name: 'deleteEventMutation' })(
        graphql(eventsQuery, {
          name: 'eventsData',
          skip: (props) => !props.currentUserData.currentUser,
          options: (props) => ({
            fetchPolicy: 'cache-and-network',
            variables: {
              eventsQuery: {
                take: PAGE_SIZE,
                skip: 0,
                userId: props.currentUserData.currentUser.id
              }
            }
          })
        })(
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
                  'eventsQuery'
                ]
              }).then(() => {
                notusToast.success('Successfully deleted event')
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

            fetchMore = () => {
              const { eventsData, currentUserData } = this.props
              const { currentUser } = currentUserData
              const { fetchMore, events } = eventsData || {}
              const { skip, take } = events || {}
              if (fetchMore) {
                fetchMore({
                  variables: {
                    eventsQuery: {
                      take,
                      skip: (skip + take),
                      userId: currentUser.id
                    }
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    return Object.assign({}, prev, {
                      events: {
                        ...fetchMoreResult.events,
                        events: [
                          ...prev.events.events,
                          ...fetchMoreResult.events.events
                        ]
                      }
                    })
                  }
                })
              }
            }

            render () {
              let loadMore
              const { eventsData } = this.props

              // const { loading } = eventsData || {}
              const { error, events } = eventsData || {}
              const { skip, take, totalCount } = events || {}

              let eventEvents = events ? events.events : []

              if (error) {
                console.error(error)
                return 'There was an error while fetching your events'
              }

              let eventCards = <>
                <TransitionGroup className='listing-grid mt75'>
                  {eventEvents.map((event) => (
                    <CSSTransition
                      key={`event-${event.id}`}
                      timeout={300}
                      classNames='fade'
                    >
                      <EventCard
                        {...this.props}
                        event={event}
                        editable
                        isSmall
                        linkTo={formatRoute(routes.EDIT_EVENT, { eventId: event.id })}
                        handleOpenConfirmDeleteModal={this.handleOpenConfirmDeleteModal}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </>

              if (skip + take < totalCount) {
                loadMore =
                  <button
                    className='button is-small is-info mt30'
                    onClick={this.fetchMore}
                  >Load More</button>
              }

              const eventsOrBlankState = eventEvents.length === 0
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

                    {eventCards}

                    {loadMore}
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
                    isSmall
                  >
                    <div className='has-text-centered'>
                      <h5 className='is-size-5 has-text-weight-normal'>
                        Are you sure you want to delete this event?
                      </h5>
                      <br />
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

                  <section className='section section--main-content'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                            My Events
                          </h4>
                        </div>
                      </div>
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

                    <div className='container-fluid color-block is-blue pt50 pb100'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-xs-12 has-text-centered mt50'>
                                <h4 className='is-size-4 has-text-white has-text-weight-bold'>
                                  Or create a new event based off an existing one:
                                </h4>

                                <br />

                                <DiscoverEventsListing
                                  isDark
                                />
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
