import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const EventCard = 
  graphql(currentUserQuery, { name: 'currentUserData' })(
    class _EventCard extends PureComponent {
      render () {
        const { currentUserData, recipe } = this.props
        const { currentUser } = currentUserData
        const { user } = recipe

        return (
          <Link
            key={`recipe-${recipe.id}`}
            to={formatRoute(routes.NEW_EVENT_FROM_EVENT_TYPE, { parentEventId: recipe.id })}
            className={`button event-card ${brandColor(recipe.id)}`}
          >
            <div className="event-card__header">
              <p className='event-card__name is-size-5'>
                {recipe.title}
              </p>
            </div>


            <div className="event-card__footer">
              <p className='is-size-7'>
                by {currentUser.id === parseInt(user.id, 10) ? 'you' : user.name || user.email}
              </p>
            </div>
          </Link>
        )
      }
    }
  )