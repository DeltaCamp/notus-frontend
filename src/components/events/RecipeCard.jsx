import React, { PureComponent } from 'react'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const RecipeCard = 
  class _RecipeCard extends PureComponent {
    render () {
      const { recipe } = this.props

      return (
        <Link
          key={`recipe-${recipe.id}`}
          to={formatRoute(routes.NEW_EVENT_FROM_EVENT_TYPE, { recipeId: recipe.id })}
          className={`button event-card ${brandColor(recipe.id)}`}
        >
          <div className="event-card__header">
            <p className='event-card__name is-size-5'>
              {recipe.name}
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
