import React, { PureComponent } from 'react'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const EventTypeCard = 
  class _EventTypeCard extends PureComponent {
    render () {
      const { eventType } = this.props

      return (
        <Link
          key={`event-type-${eventType.id}`}
          to={formatRoute(routes.NEW_EVENT_FROM_EVENT_TYPE, { eventTypeId: eventType.id })}
          className={`button event-card ${brandColor(eventType.id)}`}
        >
          <div className="event-card__header">
            <p className='event-card__name is-size-5'>
              {eventType.name}
            </p>
          </div>


          <div className="event-card__footer">
            <p className='is-size-7'>
              by notus
            </p>
          </div>
        </Link>
      )
    }
  }
