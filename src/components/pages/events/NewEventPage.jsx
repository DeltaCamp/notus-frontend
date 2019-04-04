import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

import { EVENT_TYPES } from '~/../config/eventTypes'

export const NewEventPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _NewEventPage extends PureComponent {
    state = {}

    static propTypes = {
      match: PropTypes.object.isRequired
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    componentWillMount() {
      const { currentUser } = this.props.currentUserData

      if (!currentUser) {
        toast.error('Please sign in to access this page.')
        this.setState({ redirect: true })
      }
    }

    handleSubmitEvent = (e) => {
      e.preventDefault()

    }

    buttonColor = (id) => {
      const classes = [
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
      if (this.state.redirect) {
        return <Redirect to={routes.SIGNIN} />
      }

      const eventTypeId = this.props.match.params.eventTypeId

      const event = EVENT_TYPES.find(
        (eventType) => (eventType.id === parseInt(eventTypeId, 10))
      )

      if (!event) {
        return <Redirect to={routes.DISCOVER_EVENTS} />
      }

      const colorClass = this.buttonColor(event.id)
      const altColorClass = this.buttonColor(event.id + 1)

      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='Create New Event'
          />

          <ScrollToTop />

          <section className='section section--main-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 has-text-centered'>
                  <h4 className='is-size-4 has-text-centered is-uppercase has-text-weight-extrabold mt20'>
                    {event.name}
                  </h4>
                </div>
              </div>

              <div className='row'>
                <div className='col-xs-12 has-text-centered'>
                  <div className={`is-size-4 event-box event-box__header ${colorClass}`}>
                    <button className='event-box__variable'>
                      Every time
                    </button>
                    <button className='event-box__variable'>
                      more than 200
                    </button>
                    <span className='event-box__text'>
                      of the token at
                    </span>
                    <button className='event-box__variable has-hint'>
                      0x1234...5619
                      <span className='hint'>Contract Address</span>
                    </button>
                    <button className='event-box__variable'>
                      is sent to 0x1234
                    </button>
                  </div>

                  <div className={`is-size-4 event-box event-box__footer ${altColorClass}`}>
                    ... then turn on my Phillips Hue lightbulb
                  </div>

                  <form className='form mt20'>
                  </form>
                  
                </div>
              </div>
            </div>
          </section>

          <FooterContainer />
        </div>
      )
    }
  }
)
