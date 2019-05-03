import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatRoute } from 'react-router-named-routes'
import { graphql } from 'react-apollo'

import { eventsQuery } from '~/queries/eventsQuery'
import { EventCard } from '~/components/events/EventCard'
import * as routes from '~/../config/routes'
import { PAGE_SIZE } from '~/constants'

export const DiscoverEventsListing =
  graphql(eventsQuery, {
    name: 'eventsData',
    options: (props) => {
      const eventsQuery = {
        isPublic: true,
        skip: 0,
        take: PAGE_SIZE
      }
      if (props.searchValue && props.searchValue.trim()) {
        eventsQuery.searchTerms = props.searchValue.trim()
      }
      return {
        fetchPolicy: 'cache-and-network',
        variables: {
          eventsQuery
        }
      }
    }
  })(
    class _DiscoverEventsListing extends PureComponent {
      static propTypes = {
        showLoadMore: PropTypes.bool
      }

      static defaultProps = {
        showLoadMore: true
      }

      fetchMore = () => {
        const { eventsData, searchValue } = this.props
        const { fetchMore, events } = eventsData || {}
        const { skip, take } = events || {}
        const eventsQuery = {
          take,
          skip: (skip + take),
          isPublic: true
        }
        if (searchValue) {
          eventsQuery.searchTerms = searchValue
        }
        if (fetchMore) {
          fetchMore({
            variables: {
              eventsQuery
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return Object.assign({}, prev, {
                events: {
                  ...fetchMoreResult.events,
                  events: [...prev.events.events, ...fetchMoreResult.events.events]
                }
              })
            }
          })
        }
      }

      render () {
        let loadMore, emptyMessage
        const { searchValue, eventsData } = this.props
        const { error } = eventsData || {}
        const eventsQuery = eventsData ? eventsData.events : {}
        const { events, skip, take, totalCount } = eventsQuery || {}

        if (error) {
          console.error(error)
        }

        let eventCards = events ? events.map((event) => (
          <EventCard
            {...this.props}
            key={`event-${event.id}`}
            event={event}
            linkTo={formatRoute(routes.NEW_EVENT_FROM_PARENT, { eventId: event.id })}
          />
        )) : []

        if (this.props.showLoadMore && skip + take < totalCount) {
          loadMore = <p>
            <button
              className='button is-small is-light mt30'
              onClick={this.fetchMore}
            >Load More</button>
          </p>
        }

        if (searchValue) {
          emptyMessage = <>No events found named '{searchValue}'.</>
        } else {
          emptyMessage = <>No events found.</>
        }

        return <>
          {(
            eventCards.length > 0
              ? <div className='listing-grid'>
                  {eventCards}
                </div>
              : (
                <h2 className='has-text-centered is-size-2 has-text-white'>
                  {emptyMessage}
                </h2>
              )
          )}
          {loadMore}
        </>
      }
    }
  )
