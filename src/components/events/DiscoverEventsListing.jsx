import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { eventsQuery } from '~/queries/eventsQuery'
import { RecipeCard } from '~/components/events/RecipeCard'

export const DiscoverEventsListing =
  graphql(eventsQuery, { name: 'eventsData' })(
    class _DiscoverEventsListing extends PureComponent {
      render () {
        let events

        if (!this.props.eventsData.loading) {
          if (this.props.eventsData.error) {
            console.error(this.props.eventsData.error)
          } else {
            events = this.props.eventsData.events.map((event) => (
              <RecipeCard
                key={`event-${event.id}`}
                recipe={event}
              />
            ))
          }
        }
        // events = RECIPES.map((event) => (
        //   <RecipeCard
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
