import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { Link, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { eventsQuery } from '~/queries/eventsQuery'
import { EventCard } from '~/components/events/EventCard'
import * as routes from '~/../config/routes'

export const MyEventsPage =
  graphql(currentUserQuery, { name: 'currentUserData' })(
    graphql(eventsQuery, { name: 'eventsData' })(
      class _MyEventsPage extends PureComponent {
        state = {}

        static propTypes = {
          match: PropTypes.object.isRequired
        }

        static contextTypes = {
          router: PropTypes.object.isRequired
        }

        componentWillMount() {
          const { currentUser } = this.props.currentUserData

          if (!currentUser) {
            toast.error('Please sign in to access this page.')
            this.setState({ redirect: true })
          }
        }

        render () {
          const { eventsData } = this.props
          let events = []

          if (this.state.redirect) {
            return <Redirect to={routes.SIGNIN} />
          }

          if (!eventsData.loading) {
            if (eventsData.error) {
              console.error(eventsData.error)
              return 'There was an error while fetching your events'
            } else {
              events = eventsData.events.map((event) => (
                <EventCard
                  key={`event-${event.id}`}
                  event={event}
                  editable={true}
                />
              ))
            }
          }

          const eventsOrBlankState = (!eventsData.loading && events.length === 0) 
            ? (
              <>
                <h2 className='is-size-2 mt75 has-text-weight-bold'>
                  You have no active events.
                </h2>
                <Link
                  className='button mt20 is-purple'
                  to={routes.NEW_EVENT}
                >
                  Create a Custom Event
                </Link>
              </>
            ) : (
              <>
                <div className='mt20 has-text-right'>
                  <Link
                    className='button is-small mt20 is-purple'
                    to={routes.NEW_EVENT}
                    >
                    Create a Custom Event
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

                            <div className='listing-grid'>
                              <DiscoverEventsListing />
                            </div>
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