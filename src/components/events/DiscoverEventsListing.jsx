import React, { PureComponent } from 'react'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

import { EVENT_TYPES } from '~/../config/eventTypes'

export const DiscoverEventsListing = 
  class _DiscoverEventsListing extends PureComponent {
    buttonColor = (id) => {
      const classes =[
        'is-link',
        'is-info',
        'is-fun',
        'is-primary',
        'is-purple',
        'is-success',
        'is-danger',
        'is-warning'
      ]

      return classes[id % classes.length]
    }

    render () {
      const eventTypes = EVENT_TYPES.map((value) => (
        <Link
          key={`event-type-${value.id}`}
          to={formatRoute(routes.NEW_EVENT, { eventTypeId: value.id })}
          className={`button event-card ${this.buttonColor(value.id)}`}
        >
          <div className="event-card__header">
            <p className='event-card__name is-size-5'>
              {value.name}
            </p>
          </div>

          
          <div className="event-card__footer">
            <p className='is-size-7'>
              by notus
            </p>
          </div>
        </Link>
      ))

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
