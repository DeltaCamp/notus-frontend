import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { PlusCircle } from 'react-feather'
import { formatRoute } from 'react-router-named-routes'
import { toast } from 'react-toastify'
import { Link, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { eventQuery } from '~/queries/eventQuery'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const EventPage = 
  graphql(currentUserQuery, { name: 'currentUserData' })(
    graphql(eventQuery, {
      name: 'eventData',
      skip: (props) => !props.match.params.eventId,
      options: (props) => ({
        variables: { id: parseInt(props.match.params.eventId, 10) }
      })
    })(
      class _EventPage extends Component {
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

        render () {
          let event,
            colorClass
            // altColorClass

          const { eventData } = this.props

          if (this.state.redirect) {
            return <Redirect to={routes.SIGNIN} />
          }

          if (eventData) {
            if (eventData.loading) {
              return null
            } else {
              if (eventData.error) {
                console.warn(eventData.error)
                return null
              } else {
                event = eventData.event

                colorClass = brandColor(event.id)
                // altColorClass = altBrandColor(event.id + 1)
              }
            }
          }

          if (!event) { return null }

          const createEventFromParentRoute = formatRoute(
            routes.NEW_EVENT_FROM_PARENT, { parentEventId: event.id }
          )

          return (
            <div className='is-positioned-absolutely'>
              <Helmet
                title={`${event.title} - Event`}
              />

              <ScrollToTop />

              <section className='section section--main-content'>
                <div className={`container-fluid color-block pb20 ${colorClass}`}>
                  <div className='row'>
                    <div className='col-xs-12 has-text-centered is-size-4'>
                      <h4 className='is-size-4 has-text-centered is-uppercase has-text-weight-bold mt20 pt20 pb20'>
                        {event.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className='container pt50'>
                  <div className='row'>
                    <div className='col-xs-12 has-text-centered'>
                      <Link
                        to={createEventFromParentRoute}
                        className='button is-small is-outlined is-primary'
                      >
                        <PlusCircle /> &nbsp;Create Event From This One
                      </Link>
                    </div>
                  </div>
                </div>

                    <br />

                <div className='container'>
                  <div className='row'>
                    <div className='col-xs-12 col-md-6 col-start-md-4'>
                      <h5 className='is-size-5 has-text-centered is-uppercase has-text-weight-bold mt20 pt20'>
                        Event History
                      </h5>
                      <p className='has-text-centered has-text-weight-bold has-text-link'>
                        Triggered 4 times:
                      </p>
                      <br/>

                      <table className='table is-striped is-hoverable is-fullwidth'>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Sent email:</strong>
                            </td>
                            <td>
                              Jan 12<sup>th</sup>, 1994
                            </td>
                            <td>
                              2:03pm
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Sent email:</strong>
                            </td>
                            <td>
                              March 3<sup>rd</sup>
                            </td>
                            <td>
                              4:03pm
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Sent email:</strong>
                            </td>
                            <td>
                              July 4<sup>th</sup>, 2018
                            </td>
                            <td>
                              6:03pm
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Sent email:</strong>
                            </td>
                            <td>
                              Dec 31<sup>st</sup>, 2019
                            </td>
                            <td>
                              1:01am
                            </td>
                          </tr>
                        </tbody>
                      </table>

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
  )