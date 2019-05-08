import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import { formatRoute } from 'react-router-named-routes'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { IsAuthed } from '~/components/IsAuthed'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { deleteEventMutation } from '~/mutations/deleteEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { eventsQuery } from '~/queries/eventsQuery'
import { EventCard } from '~/components/events/EventCard'
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
              let loadMore,
                content
              const { eventsData } = this.props

              const { loading, error, events } = eventsData || {}
              const { skip, take, totalCount } = events || {}

              let eventEvents = events ? events.events : []

              if (loading) {
                content = <EventsPageLoader />
              }
              if (error) {
                console.error(error)
                content = <h5 className='is-size-5 has-text-danger'>
                  There was an error while fetching your events
                </h5>
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
                  >
                    Load More
                  </button>
              }

              if (!content) {
                content = (
                  eventEvents.length === 0
                    ? (
                      <>
                        <h2 className='is-size-4 mt75 has-text-weight-bold'>
                          You haven't created any events.
                        </h2>
                        <Link
                          className='button mt20 is-purple'
                          to={routes.NEW_EVENT}
                        >
                          Create Event
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className='mt20'>
                          <Link
                            className='button is-small mt20 is-link is-outlined has-fat-icons'
                            to={routes.NEW_EVENT}
                          >
                            <Plus /> &nbsp;Create Event
                          </Link>
                        </div>

                        {eventCards}

                        {loadMore}
                      </>
                    )
                )
              } 

              return (
                <div className='is-positioned-absolutely'>
                  <Helmet
                    title='My Events'
                  />

                  <ScrollToTop />

                  <section className='section section--main-content'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <h4 className='is-size-2 has-text-weight-bold mt75 has-text-centered'>
                            My Events
                          </h4>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-xs-12 has-text-centered'>
                          {content}
                        </div>
                      </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className='container-fluid color-block is-dark pt50 pb100'>
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
