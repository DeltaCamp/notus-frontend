import React, { PureComponent } from 'react'
import { formatRoute } from 'react-router-named-routes'
import { graphql } from 'react-apollo'
import { publicEventsQuery } from '~/queries/publicEventsQuery'
import { EventCard } from '~/components/events/EventCard'
import * as routes from '~/../config/routes'

export const DiscoverEventsListing =
  graphql(publicEventsQuery, { name: 'publicEventsData' })(
    class _DiscoverEventsListing extends PureComponent {
      render () {
        const { searchValue } = this.props
        const searchRegExp = new RegExp(searchValue, 'i')

        if (this.props.publicEventsData.loading) {
          return 'Loading ...'
        } else if (this.props.publicEventsData.error) {
          console.error(this.props.publicEventsData.error)
          return null
        }

        const { publicEvents } = this.props.publicEventsData
        let filteredEvents = publicEvents

        if (searchValue && searchValue.length) {
          filteredEvents = publicEvents.filter((event) => (
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

        // events = RECIPES.map((event) => (
        //   <EventCard
        //     key={`event-${event.id}`}
        //     event={event}
        //   />
        // ))

        
        if (this.props.limit && filteredEvents.length > 10) {
          filteredEvents = filteredEvents.slice(0, 10)
        }
        // console.log(filteredEvents)
        filteredEvents = filteredEvents.concat(filteredEvents).concat(filteredEvents).concat(filteredEvents).concat(filteredEvents)

        return (
          filteredEvents.length > 0 ?
              <div className='listing-grid'>
                {filteredEvents}
              </div>
            : (
              <div className='has-text-centered'>
                <h2 className='has-text-centered is-size-2'>No events found named '{searchValue}'.</h2>
              </div>
            )
        )
      }
    }
  )
