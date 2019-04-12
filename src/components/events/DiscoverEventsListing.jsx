import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { eventTypesQuery } from '~/queries/eventTypesQuery'
import { EventTypeCard } from '~/components/events/EventTypeCard'
import { EVENT_TYPES } from '~/../config/eventTypes'

export const DiscoverEventsListing =
  graphql(eventTypesQuery, { name: 'eventTypesData' })(
    class _DiscoverEventsListing extends PureComponent {
      render () {
        let eventTypes

        if (!this.props.eventTypesData.loading) {
          if (this.props.eventTypesData.error) {
            console.error(this.props.eventTypesData.error)
          } else {
            // console.log(this.props.eventTypesData)
            eventTypes = this.props.eventTypesData.eventTypes.map((eventType) => (
              <EventTypeCard
                key={`event-type-${eventType.id}`}
                eventType={eventType}
              />
            ))
<<<<<<< HEAD
          } else {
            console.error(this.props.eventTypesData.error)
=======
>>>>>>> * fixes
          }
        }
        // eventTypes = EVENT_TYPES.map((eventType) => (
        //   <EventTypeCard
        //     key={`event-type-${eventType.id}`}
        //     eventType={eventType}
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

            {eventTypes}
          </>
        )
      }
    }
  )
