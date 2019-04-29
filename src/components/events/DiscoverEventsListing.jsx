import React, { PureComponent } from 'react'
import { formatRoute } from 'react-router-named-routes'
import { graphql } from 'react-apollo'
import { eventsQuery } from '~/queries/eventsQuery'
import { EventCard } from '~/components/events/EventCard'
import * as routes from '~/../config/routes'

export const DiscoverEventsListing =
  graphql(eventsQuery, {
    name: 'eventsData',
    options: {
      fetchPolicy: 'cache-and-network',
      variables: {
        eventsQuery: {
          isPublic: true,
          skip: 0,
          take: 1
        }
      }
    }
  })(
    class _DiscoverEventsListing extends PureComponent {
      fetchMore = () => {
        const { eventsData } = this.props
        const { fetchMore, events } = eventsData || {}
        const { skip, take } = events || {}
        if (fetchMore) {
          fetchMore({
            variables: {
              eventsQuery: {
                take,
                skip: (skip + take),
                isPublic: true
              }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                events: {
                  ...fetchMoreResult.events,
                  events: [...prev.events.events, ...fetchMoreResult.events.events]
                }
              });
            }
          })
        }
      }

      render () {
        let loadMore
        const { searchValue } = this.props

        if (this.props.eventsData.loading) {
          return 'Loading ...'
        } else if (this.props.eventsData.error) {
          console.error(this.props.eventsData.error)
          return null
        }

        const { events, skip, take, totalCount } = this.props.eventsData.events
        let filteredEvents = events

        if (searchValue && searchValue.length) {
          const searchRegExp = new RegExp(searchValue.trim(), 'i')
          filteredEvents = events.filter((event) => (
            searchRegExp.test(event.title)
          ))
        }

        filteredEvents = filteredEvents.map((event) => (
          <EventCard
            {...this.props}
            key={`event-${event.id}`}
            event={event}
            linkTo={formatRoute(routes.NEW_EVENT_FROM_PARENT, { eventId: event.id })}
          />
        ))
        
        if (this.props.limit && filteredEvents.length > 10) {
          filteredEvents = filteredEvents.slice(0, 10)
        }

        if (skip + take < totalCount) {
          loadMore = <p>
            <button
              className='button is-small is-light mt30'
              onClick={this.fetchMore}
            >Load More</button>
          </p>
        }

        return <>
          {(
            filteredEvents.length > 0 ?
                <div className='listing-grid'>
                  {filteredEvents}
                </div>
              : (
                <div className='has-text-centered'>
                  <h2 className='has-text-centered is-size-2'>No events found named '{searchValue}'.</h2>
                </div>
              )
          )}
          {loadMore}
        </>
      }
    }
  )
