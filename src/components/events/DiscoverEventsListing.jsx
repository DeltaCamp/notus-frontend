import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { publicEventsQuery } from '~/queries/publicEventsQuery'
import { EventCard } from '~/components/events/EventCard'

export const DiscoverEventsListing =
  graphql(publicEventsQuery, { name: 'publicEventsData' })(
    class _DiscoverEventsListing extends PureComponent {
      render () {
        let events

        if (!this.props.publicEventsData.loading) {
          if (this.props.publicEventsData.error) {
            console.error(this.props.publicEventsData.error)
          } else {
            // console.log(this.props.publicEventsData)
            events = this.props.publicEventsData.publicEvents.map((event) => (
              <EventCard
                key={`event-${event.id}`}
                event={event}
              />
            ))
          }
        }
        // events = RECIPES.map((event) => (
        //   <EventCard
        //     key={`event-${event.id}`}
        //     event={event}
        //   />
        // ))

        return (
          <>
            {/* <div class="md:tw-flex md:tw-justify-between xl:tw-justify-around xl:tw-mx-8 md:tw-mb-8">
              <div class="skill-card is-laravel tw-relative tw-rounded-lg md:tw-rounded-none tw-mb-6 md:tw-mb-0 md:tw-mx-2 lg:tw-mx-0 tw-flex md:tw-flex-col">
                <div class="skill-card-top tw-text-center tw-py-3 tw-pl-8 tw-pr-6 md:tw-px-8 tw-rounded-lg tw-relative">
                  <h4 class="tw-text-lg tw-leading-tight tw-text-center tw-tracking-tight">
                    <a href="/skills/test" class="tw-text-white hover:tw-text-white link" style={{'text-shadow': 'rgba(0, 0, 0, 0.2) 0px 1px 2px'}}>
                      Test
                    </a>
                  </h4>
                </div>
              </div>
            </div> */}

            {events}
          </>
        )
      }
    }
  )
